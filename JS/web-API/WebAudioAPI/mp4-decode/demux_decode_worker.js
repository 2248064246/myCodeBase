/*
 * @Author: huangyingli
 * @Date: 2022-04-12 16:11:22
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-13 18:00:24
 * @Description: 
 */
importScripts('./mp4box.all.min.js');
importScripts('./mp4_demuxer.js');

self.addEventListener('message', function(e) {
  let offscreen = e.data.canvas;
  let ctx = offscreen.getContext('2d');
  let startTime = 0;
  let frameCount = 0;

  let demuxer = new MP4Demuxer("../media/bbb.mp4");

  function getFrameStats() {
      let now = performance.now();
      let fps = "";

      if (frameCount++) {
        let elapsed = now - startTime;
        fps = " (" + (1000.0 * frameCount / (elapsed)).toFixed(0) + " fps)"
      } else {
        // This is the first frame.
        startTime = now;
      }

      return "Extracted " + frameCount + " frames" + fps;
  }

  let decoder = new VideoDecoder({
    output : frame => {
      ctx.drawImage(frame, 0, 0, offscreen.width, offscreen.height);

      // Close ASAP.
      frame.close();

      // Draw some optional stats.
      ctx.font = '35px sans-serif';
      ctx.fillStyle = "#ffffff";
      ctx.fillText(getFrameStats(), 40, 40, offscreen.width);
    },
    error : e => console.error(e),
  });

  demuxer.getConfig().then((config) => {
    offscreen.height = config.codedHeight;
    offscreen.width = config.codedWidth;

    decoder.configure(config);
    demuxer.start((chunk) => { decoder.decode(chunk); })
  });
})
