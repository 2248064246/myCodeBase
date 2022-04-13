/*
 * @Author: huangyingli
 * @Date: 2022-04-12 19:28:24
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-13 10:40:08
 * @Description:
 */

self.onmessage = function (e) {
  let frame_source = e.data.frame_source;
  let canvas = e.data.canvas;
  let fps = e.data.fps;

  console.log('worker', e.data);

  main(frame_source, canvas, fps);
};

function main(stream, canvas, fps) {
  let decoder = startDecodingAndRendering(canvas);
  function processChunk(chunk, md) {
    let config = md.decoderConfig;
    if (config) {
      console.log('decoder recofnig', config);
      decoder.configure(config);
    }
    decoder.decode(chunk);
  }
  captureAndEncode(stream, canvas, fps, processChunk)
}

function startDecodingAndRendering(canvas) {
  let ctx = canvas.getContext('2d');
  let readyFrames = [];
  /* 为true表示向下流动 */
  /* 控制frame能够绘制到canvas上 */
  let underflow = true;

  function renderFrame() {
    /* 当缓存中没有帧需要绘制时, 返回 */
    if (readyFrames.length == 0) {
      underflow = true;
      return;
    }
    let frame = readyFrames.shift();
    underflow = false;
    ctx.drawImage(frame, 0, 0);
    /* 帧使用后关闭 */
    frame.close();

    self.requestAnimationFrame(renderFrame);
  }

  function handleFrame(frame) {
    readyFrames.push(frame);
    if (underflow) {
      underflow = false;
      renderFrame();
    }
  }

  let init = {
    output: handleFrame,
    error: function (e) {
      self.postMessage(e.message);
    },
  };

  let decoder = new VideoDecoder(init);
  return decoder;
}

function captureAndEncode(stream, canvas, fps, processChunk) {
  let frameCounter = 0;
  let codec_string = 'avc1.42001E';
  let init = {
    output: processChunk,
    error: function (e) {
      self.postMessage(e.message);
    },
  };
  let config = {
    codec: codec_string,
    width: canvas.width,
    height: canvas.height,
    bitrate: 1000000,
    avc: { format: 'avc' },
    framerate: fps,
  };

  let encoder = new VideoEncoder(init);
  encoder.configure(config);

  let reader = stream.getReader();
  async function readFrame() {
    let result = await reader.read();
    let frame = result.value;
    // console.log(frame)

    if (encoder.encodeQueueSize < 2) {
      frameCounter++;
      let insetKeyframe = false;
      encoder.encode(frame, { keyFrame: insetKeyframe });
      frame.close();
    } else {
      /* 队列中帧太多了, 放弃一些 */
      console.log('队列中帧太多了, 放弃一些');
      frame.close();
    }

    self.requestAnimationFrame(readFrame);
  }

  readFrame();
}
