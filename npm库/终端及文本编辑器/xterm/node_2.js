/*
 * @Author: huangyingli
 * @Date: 2022-01-25 16:34:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-25 16:34:15
 * @Description:
 */

const { exec } = require('child_process');

const Server = require('ws').Server;

const wss = new Server({
  port: 2000,
});

wss.on('connection', function (ws) {
  createSocket(ws);
});

function createSocket(ws) {
  ws.on('message', function (data) {
    console.log('执行指令: ', data);
    exec(data, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      ws.send(stdout);
    });
  });
}
