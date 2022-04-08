/*
 * @Author: huangyingli
 * @Date: 2022-04-07 16:31:23
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-08 12:15:38
 * @Description:
 */

const http = require('http');

let WebSocketServer = require('websocket').server;

/* 服务端websocket需要通过httpServer 启动 */
let httpServer = http.createServer((req, res) => {
  /* 拒绝所有请求 */
  res.writeHead(404);
  res.send();
});

httpServer.listen(6504, () => {
  console.log(new Date() + ' Server: http://localhost:6504');
});

let wsServer = new WebSocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false,
});

let connectionArray = [];
let nextID = Date.now();

function originIsAllowed(origin) {
  // This is where you put code to ensure the connection should
  // be accepted. Return false if it shouldn't be.
  return true;
}

wsServer.on('request', (request) => {
  console.log('有连接进入: ', request.origin);
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log('此地址不被允许: ', request.origin);
    return;
  }

  let connection = request.accept('json', request.origin);
  console.log(new Date() + ' 连接接入');

  connectionArray.push(connection);

  connection.clientID = nextID;
  nextID++;

  connection.sendUTF(
    JSON.stringify({
      type: 'id',
      id: connection.clientID,
    })
  );

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);

      let msg = JSON.parse(message.utf8Data);
      let connect = getConnectionForID(msg.id);

      switch (msg.type) {
        case 'message':
          msg.name = connect.username;

          sendMsgToAll(JSON.stringify(msg));

          break;
        case 'username':
          if (isUsernameUnique(msg.name)) {
            connect.sendUTF(
              JSON.stringify({
                type: 'reject',
                message: '名字已存在',
              })
            );
          } else {
            connect.username = msg.name;
            sendUserListToAll();
          }
          break;
      }
      console.log('msg', msg.target)
      if (msg.target) {
        sendToOneUser(msg.target, msg);
      }
    } else if (message.type === 'binary') {
      console.log(
        'Received Binary Message of ' + message.binaryData.length + ' bytes'
      );
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on('close', (connection) => {
    connectionArray = connectionArray.filter(function (el, idx, ar) {
      return el.connected;
    });
    sendUserListToAll();
    console.log(new Date() + ' 连接 ' + connection.remoteAddress + ' 关闭 ');
  });
});

function getConnectionForID(id) {
  return connectionArray.find((connect) => connect.clientID === id);
}

function isUsernameUnique(name) {
  return !!connectionArray.find((connect) => connect.username === name);
}

function makeUserListMessage() {
  let userListMsg = {
    type: 'userlist',
    users: connectionArray
      .map((connect) => connect.username)
      .filter((name) => name != ''),
  };

  return userListMsg;
}

function sendUserListToAll() {
  let userListMsg = makeUserListMessage();
  let userListMsgStr = JSON.stringify(userListMsg);
  sendMsgToAll(userListMsgStr);
}

function sendMsgToAll(msg) {
  connectionArray.forEach((connect) => {
    connect.sendUTF(msg);
  });
}

function sendToOneUser(target, msgString) {
  let connect = connectionArray.find((connect) => connect.username === target);
  console.log('发送数据给指定用户', target);
  if (connect) {
    connect.sendUTF(JSON.stringify(msgString));
  }
}
