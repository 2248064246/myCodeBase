/*
 * @Author: huangyingli
 * @Date: 2022-04-13 16:47:18
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-13 17:47:38
 * @Description:
 */
importScripts('./webm-writer2.js');

let webmWriter = null;
let fileWritableStream = null;
let frameReader = null;

self.onmessage = function (e) {
  switch (e.data.type) {
    case 'start':
      startRecording(
        e.data.fileHandle,
        e.data.frameStream,
        e.data.trackSetting
      );
      break;
    case 'stop':
      stopRecording();
      break;
  }
};

async function startRecording(fileHandle, frameStream, trackSetting) {
  let frameCounter = 0;

  /* 创建一个可用于写入文件的 FileSystemWritableFileStream  */
  fileWritableStream = await fileHandle.createWritable();

  webmWriter = new WebMWriter({
    fileWriter: fileWritableStream,
    codec: 'VP9',
    width: trackSetting.width,
    height: trackSetting.height,
  });

  frameReader = frameStream.getReader();

  let init = {
    output: (chunk) => {
      webmWriter.addFrame(chunk);
    },
    error: (e) => {
      console.log('error', e.message);
      stopRecording();
    },
  };

  let config = {
    codec: 'vp09.00.10.08',
    width: trackSetting.width,
    height: trackSetting.height,
    bitrate: 10e6,
  };

  let encoder = new VideoEncoder(init);
  /* 判断是否支持这个配置 */
  let support = await VideoEncoder.isConfigSupported(config);
  console.assert(support.supported);

  encoder.configure(config);

  /* 读取流数据 */
  frameReader.read().then(async function processFrame({ done, value }) {
    let frame = value;
    if (done) {
      await encoder.flush();
      encoder.close();
      return;
    }
    if (encoder.encodeQueueSize <= 30) {
      if (++frameCounter % 20 == 0) {
        console.log(frameCounter + ' frames processed');
      }

      /* 每150帧设置一个关键帧??? */
      const insert_keyframe = frameCounter % 150 == 0;
      encoder.encode(frame, { keyFrame: insert_keyframe });
    } else {
      console.log('dropping frame, encoder falling behind');
    }

    frame.close();
    frameReader.read().then(processFrame);
  });
}

async function stopRecording() {
  await frameReader.cancel();
  await webmWriter.complete();
  fileWritableStream.close();
  frameReader = null;
  webmWriter = null;
  fileWritableStream = null;
}
