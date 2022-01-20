/*
 * @Author: huangyingli
 * @Date: 2022-01-20 17:12:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 17:12:17
 * @Description: 
 */
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();