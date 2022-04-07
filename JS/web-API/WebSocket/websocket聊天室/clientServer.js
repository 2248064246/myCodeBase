/*
 * @Author: huangyingli
 * @Date: 2022-04-07 17:23:56
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-07 20:12:26
 * @Description:
 */

const remote = 'ws://localhost:6504';

let loginNameEl = document.querySelector('#login-name');
let loginBtn = document.querySelector('#login-btn');

let userListEl = document.querySelector('.user-list');
let msgListEl = document.querySelector('.msg-list');

let msgInputEl = document.querySelector('#textarea');
let msgSubmitBtn = document.querySelector('#msg-submit');
let userId;
let ws;
function connect() {
  ws = new WebSocket(remote, 'json');

  ws.addEventListener('open', () => {
    console.log('与服务端已建立连接');
    // msgSubmitBtn.removeAttribute('disabled');
  });

  ws.addEventListener('message', (data) => {
    console.log('服务端数据: ', data);
    let msg = JSON.parse(data.data);
    switch (msg.type) {
      case 'id':
        userId = msg.id;
        break;
      case 'reject':
        console.warn(msg.message);
        break;
      case 'userlist':
        msgSubmitBtn.removeAttribute('disabled');
        setUserList(msg.users);
        break;
      case 'message':
        setMsgList(msg);
    }
  });

  ws.addEventListener('close', () => {
    console.log('连接已断开');
    msgSubmitBtn.setAttribute('disabled', true);
  });
}

loginBtn.addEventListener('click', () => {
  connect();
});

msgSubmitBtn.addEventListener('click', () => {
  ws.send(
    JSON.stringify({
      type: 'message',
      info: msgInputEl.value,
      id: userId,
      date: Date.now(),
    })
  );
});

function setUserList(userList) {
  let frag = document.createDocumentFragment();

  let ul = document.createElement('ul');

  userList.forEach((user) => {
    let li = document.createElement('li');
    li.textContent = user;
    ul.appendChild(li);
  });

  frag.appendChild(ul);
  userListEl.appendChild(frag);
}

function setMsgList(msg) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  name.textContent = msg.name;
  let info = document.createElement('span');
  info.textContent = msg.info;
  li.appendChild(name);
  li.appendChild(info);
  msgListEl.appendChild(li);
}

window.onload = function () {
  console.log('页面');
  // connect();
};
