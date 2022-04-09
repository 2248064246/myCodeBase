/*
 * @Author: huangyingli
 * @Date: 2022-04-07 17:23:56
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-09 14:46:18
 * @Description:
 */

const remote = 'ws://192.168.124.2:6504';

let loginNameEl = document.querySelector('#login-name');
let loginBtn = document.querySelector('#login-btn');

let userListEl = document.querySelector('.user-list');
let msgListEl = document.querySelector('.msg-list');

let msgInputEl = document.querySelector('#textarea');
let msgSubmitBtn = document.querySelector('#msg-submit');
let userId;
let ws;
// let myPeerConnection;
var targetUsername = null; // To store username of other peer
var myPeerConnection = null; // RTCPeerConnection
var transceiver = null; // RTCRtpTransceiver
var webcamStream = null; // MediaStream from webcam
var mediaConstraints = {
  audio: true, // We want an audio track
  video: {
    aspectRatio: {
      ideal: 1.333333, // 3:2 aspect is preferred
    },
  },
};
function connect() {
  ws = new WebSocket(remote, 'json');

  ws.addEventListener('open', () => {
    console.log('与服务端已建立连接');
    // msgSubmitBtn.removeAttribute('disabled');
  });

  ws.addEventListener('message', (data) => {
    let msg = JSON.parse(data.data);
    console.log('服务端数据: ', msg);
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
        break;
      case 'video-offer':
        handleVideoOfferMsg(msg);
        break;
      case 'video-answer':
        handleVideoAnswerMsg(msg);
        break;
      case 'new-ice-candidate':
        handleNewICECandidateMsg(msg);
        break;
      case 'hang-up':
        break;
    }
  });

  ws.addEventListener('close', () => {
    console.log('连接已断开');
    msgSubmitBtn.setAttribute('disabled', true);
  });
}

loginBtn.addEventListener('click', () => {
  // connect();
  let loginName = loginNameEl.value;
  ws.send(
    JSON.stringify({
      type: 'username',
      name: loginName,
      id: userId,
      date: Date.now(),
    })
  );
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
  connect();
};

function sendToServer(msg) {
  msg.date = Date.now();
  msg.id = userId;
  ws.send(JSON.stringify(msg));
}

async function invite(evt) {
  if (myPeerConnection) {
    alert('已经有一个链接正在进行, 无法开始新的连接');
  } else {
    var clickedUsername = document.querySelector('#user-name').value;

    if (clickedUsername === document.querySelector('#login-name').value) {
      alert('不能打给自己');
      return;
    }

    targetUsername = clickedUsername;

    log('建立连接邀请用户: ' + targetUsername);
    createPeerConnection();

    try {
      webcamStream = await navigator.mediaDevices.getUserMedia(
        mediaConstraints
      );
      document.getElementById('local_video').srcObject = webcamStream;
    } catch (err) {
      console.warn('获取本地视频出错', err);
      return;
    }

    // Add the tracks from the stream to the RTCPeerConnection

    try {
      webcamStream
        .getTracks()
        .forEach(
          (transceiver = (track) =>
            myPeerConnection.addTransceiver(track, { streams: [webcamStream] }))
        );
    } catch (err) {
      console.warn('添加本地视频到RTC出错', err);
    }
  }
}

async function handleVideoOfferMsg(msg) {
  targetUsername = msg.name;

  if (!myPeerConnection) {
    createPeerConnection();
  }

  console.log('offer', msg);

  var desc = new RTCSessionDescription(msg.sdp);

  if (myPeerConnection.signalingState != 'stable') {
    await Promise.all([
      myPeerConnection.setLocalDescription({ type: 'rollback' }),
      myPeerConnection.setRemoteDescription(desc),
    ]);
    return;
  } else {
    console.log('设置远程 sdp');
    await myPeerConnection.setRemoteDescription(desc);
  }
  if (!webcamStream) {
    try {
      webcamStream = await window.navigator.mediaDevices.getUserMedia(
        mediaConstraints
      );
    } catch (err) {
      console.warn('启动本地视频发生错误', err);
      // return;
    }

    document.getElementById('local_video').srcObject = webcamStream;

    // Add the camera stream to the RTCPeerConnection

    try {
      webcamStream
        .getTracks()
        .forEach(
          (transceiver = (track) =>
            myPeerConnection.addTransceiver(track, { streams: [webcamStream] }))
        );
    } catch (err) {
      console.log('设置本地视频到RTC发生错误', err);
      // handleGetUserMediaError(err);
    }
  }

  await myPeerConnection.setLocalDescription(
    await myPeerConnection.createAnswer()
  );

  sendToServer({
    name: document.querySelector('#login-name').value,
    target: targetUsername,
    type: 'video-answer',
    sdp: myPeerConnection.localDescription,
  });
}

async function handleVideoAnswerMsg(msg) {
  console.log('设置answer');
  var desc = new RTCSessionDescription(msg.sdp);
  await myPeerConnection.setRemoteDescription(desc).catch((err) => {
    console.warn('设置answer错误', err);
  });
}

async function createPeerConnection() {
  log('启动RTC');
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'turn:openrelay.metered.ca:80',
        username: 'openrelayproject',
        credential: 'openrelayproject',
      },
    ],
  });
  /* ICE候选者发生变化 */
  myPeerConnection.onicecandidate = handleICECandidateEvent;
  /* 连接状态发生改变 */
  myPeerConnection.oniceconnectionstatechange =
    handleICEConnectionStateChangeEvent;
  /* ICE收集状态 */
  myPeerConnection.onicegatheringstatechange =
    handleICEGatheringStateChangeEvent;
  /* RTC通信状态的结构体，这个结构体描述了本地连接的通信状态 */
  myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
  /* 需要进行连接时触发, 它的作用是创建 SDP 产品/服务，并通过信令通道将其发送到远程对等方 */
  myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  myPeerConnection.ontrack = handleTrackEvent;
  myPeerConnection.onicecandidateerror = function (error) {
    console.log('连接turn 错误', error);
  };
}

function handleICECandidateEvent(event) {
  if (event.candidate) {
    sendToServer({
      type: 'new-ice-candidate',
      target: targetUsername,
      candidate: event.candidate,
    });
  }
}

function handleICEConnectionStateChangeEvent(event) {
  switch (myPeerConnection.iceConnectionState) {
    case 'closed':
    case 'failed':
    case 'disconnected':
      closeVideoCall();
      break;
    case 'checking':
    case 'connect':
    case 'completed':
  }
}

function handleICEGatheringStateChangeEvent(event) {}

function handleSignalingStateChangeEvent(event) {
  switch (myPeerConnection.signalingState) {
    case 'closed':
      closeVideoCall();
      break;
  }
}

async function handleNegotiationNeededEvent() {
  try {
    const offer = await myPeerConnection.createOffer();

    if (myPeerConnection.signalingState != 'stable') {
      return;
    }

    await myPeerConnection.setLocalDescription(offer);

    console.log('本地sdp', myPeerConnection.localDescription);
    sendToServer({
      name: document.querySelector('#login-name').value,
      target: document.querySelector('#user-name').value,
      type: 'video-offer',
      sdp: myPeerConnection.localDescription,
    });
  } catch (err) {
    console.log('本地offer生成失败', err);
    // reportError(err);
  }
}

function handleTrackEvent(event) {
  document.getElementById('received_video').srcObject = event.streams[0];
}

async function handleNewICECandidateMsg(msg) {
  var candidate = new RTCIceCandidate(msg.candidate);

  try {
    await myPeerConnection.addIceCandidate(candidate);
  } catch (err) {
    reportError(err);
  }
}

function closeVideoCall() {
  var localVideo = document.getElementById('local_video');

  // Close the RTCPeerConnection

  if (myPeerConnection) {
    // Disconnect all our event listeners; we don't want stray events
    // to interfere with the hangup while it's ongoing.

    myPeerConnection.ontrack = null;
    myPeerConnection.onnicecandidate = null;
    myPeerConnection.oniceconnectionstatechange = null;
    myPeerConnection.onsignalingstatechange = null;
    myPeerConnection.onicegatheringstatechange = null;
    myPeerConnection.onnotificationneeded = null;

    // Stop all transceivers on the connection

    myPeerConnection.getTransceivers().forEach((transceiver) => {
      transceiver.stop();
    });

    // Stop the webcam preview as well by pausing the <video>
    // element, then stopping each of the getUserMedia() tracks
    // on it.

    if (localVideo.srcObject) {
      localVideo.pause();
      localVideo.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }

    // Close the peer connection

    myPeerConnection.close();
    myPeerConnection = null;
    webcamStream = null;
  }

  // Disable the hangup button

  // document.getElementById('hangup-button').disabled = true;
  targetUsername = null;
}

function log(text) {
  var time = new Date();

  console.log('[' + time.toLocaleTimeString() + '] ' + text);
}
function log_error(text) {
  var time = new Date();

  console.trace('[' + time.toLocaleTimeString() + '] ' + text);
}

function reportError(errMessage) {
  log_error(`Error ${errMessage.name}: ${errMessage.message}`);
}
