/*
 * @Author: huangyingli
 * @Date: 2022-04-07 17:23:56
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-09 12:34:03
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
  log('Starting to prepare an invitation');
  if (myPeerConnection) {
    alert("You can't start a call because you already have one open!");
  } else {
    var clickedUsername = document.querySelector('#user-name').value;

    // Don't allow users to call themselves, because weird.

    if (clickedUsername === document.querySelector('#login-name').value) {
      alert(
        "I'm afraid I can't let you talk to yourself. That would be weird."
      );
      return;
    }

    // Record the username being called for future reference

    targetUsername = clickedUsername;
    log('Inviting user ' + targetUsername);

    // Call createPeerConnection() to create the RTCPeerConnection.
    // When this returns, myPeerConnection is our RTCPeerConnection
    // and webcamStream is a stream coming from the camera. They are
    // not linked together in any way yet.

    log('Setting up connection to invite user: ' + targetUsername);
    createPeerConnection();

    // Get access to the webcam stream and attach it to the
    // "preview" box (id "local_video").

    try {
      webcamStream = await navigator.mediaDevices.getUserMedia(
        mediaConstraints
      );
      document.getElementById('local_video').srcObject = webcamStream;
    } catch (err) {
      // handleGetUserMediaError(err);
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
      handleGetUserMediaError(err);
    }
  }
}

async function handleVideoOfferMsg(msg) {
  let targetUsername = msg.name;

  if (!myPeerConnection) {
    createPeerConnection();
  }

  console.log('offer', msg);

  var desc = new RTCSessionDescription(msg.sdp);

  if (myPeerConnection.signalingState != 'stable') {
    log("  - But the signaling state isn't stable, so triggering rollback");

    // Set the local and remove descriptions for rollback; don't proceed
    // until both return.
    await Promise.all([
      myPeerConnection.setLocalDescription({ type: 'rollback' }),
      myPeerConnection.setRemoteDescription(desc),
    ]);
    return;
  } else {
    log('  - Setting remote description');
    await myPeerConnection.setRemoteDescription(desc);
  }
  if (!webcamStream) {
    try {
      webcamStream = await window.navigator.mediaDevices.getUserMedia(
        mediaConstraints
      );
    } catch (err) {
      console.warn('发生错误', err);
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
      console.log('发生错误');
      // handleGetUserMediaError(err);
    }
  }

  log('---> Creating and sending answer to caller');

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
  log('*** Call recipient has accepted our call');

  // Configure the remote description, which is the SDP payload
  // in our "video-answer" message.

  var desc = new RTCSessionDescription(msg.sdp);
  await myPeerConnection.setRemoteDescription(desc).catch(reportError);
}

async function createPeerConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'turn:openrelay.metered.ca:80',
        username: 'openrelayproject',
        credential: 'openrelayproject',
      },
    ],
  });
  log('启动RTC');
  myPeerConnection.onicecandidate = handleICECandidateEvent;
  myPeerConnection.oniceconnectionstatechange =
    handleICEConnectionStateChangeEvent;
  myPeerConnection.onicegatheringstatechange =
    handleICEGatheringStateChangeEvent;
  myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
  myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  myPeerConnection.ontrack = handleTrackEvent;
  myPeerConnection.onicecandidateerror = function (error) {
    console.log('连接turn 错误', error);
  };
}

function handleICECandidateEvent(event) {
  if (event.candidate) {
    log('*** Outgoing ICE candidate: ' + event.candidate);

    sendToServer({
      type: 'new-ice-candidate',
      target: targetUsername,
      candidate: event.candidate,
    });
  }
}

function handleICEConnectionStateChangeEvent(event) {
  log(
    '*** ICE connection state changed to ' + myPeerConnection.iceConnectionState
  );

  switch (myPeerConnection.iceConnectionState) {
    case 'closed':
    case 'failed':
    case 'disconnected':
      closeVideoCall();
      break;
  }
}

function handleICEGatheringStateChangeEvent(event) {
  log(
    '*** ICE gathering state changed to: ' + myPeerConnection.iceGatheringState
  );
}

function handleSignalingStateChangeEvent(event) {
  log(
    '*** WebRTC signaling state changed to: ' + myPeerConnection.signalingState
  );
  switch (myPeerConnection.signalingState) {
    case 'closed':
      closeVideoCall();
      break;
  }
}

async function handleNegotiationNeededEvent() {
  log('*** Negotiation needed');

  try {
    log('---> Creating offer');
    const offer = await myPeerConnection.createOffer();

    // If the connection hasn't yet achieved the "stable" state,
    // return to the caller. Another negotiationneeded event
    // will be fired when the state stabilizes.

    if (myPeerConnection.signalingState != 'stable') {
      log("     -- The connection isn't stable yet; postponing...");
      return;
    }

    // Establish the offer as the local peer's current
    // description.

    log('---> Setting local description to the offer');
    await myPeerConnection.setLocalDescription(offer);

    // Send the offer to the remote peer.

    log('---> Sending the offer to the remote peer');
    console.log(
      'myPeerConnection.localDescription',
      myPeerConnection.localDescription
    );
    sendToServer({
      name: document.querySelector('#login-name').value,
      target: targetUsername,
      type: 'video-offer',
      sdp: myPeerConnection.localDescription,
    });
  } catch (err) {
    log(
      '*** The following error occurred while handling the negotiationneeded event:'
    );
    // reportError(err);
  }
}

function handleTrackEvent(event) {
  log('*** Track event');
  document.getElementById('received_video').srcObject = event.streams[0];
}

async function handleNewICECandidateMsg(msg) {
  var candidate = new RTCIceCandidate(msg.candidate);

  log('*** Adding received ICE candidate: ' + JSON.stringify(candidate));
  try {
    await myPeerConnection.addIceCandidate(candidate);
  } catch (err) {
    reportError(err);
  }
}

function closeVideoCall() {
  var localVideo = document.getElementById('local_video');

  log('Closing the call');

  // Close the RTCPeerConnection

  if (myPeerConnection) {
    log('--> Closing the peer connection');

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

  document.getElementById('hangup-button').disabled = true;
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
