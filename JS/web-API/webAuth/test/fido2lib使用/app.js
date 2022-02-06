/*
 * @Author: huangyingli
 * @Date: 2022-02-06 19:31:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-06 21:41:40
 * @Description:
 */
let express = require('express');
const { Fido2Lib } = require('fido2-lib');
const base64url = require('base64url');
const crypto = require('crypto');

let app = express();
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.listen(8088, function () {
  console.log('http://localhost:8088');
});

var f2l = new Fido2Lib({
  rpId: 'localhost',
  rpName: 'DEMO',
  challengeSize: 32,
  cryptoParams: [-7, -257],
  authenticatorAttachment: 'platform',
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: 'discouraged',
});

var attestationExpectations = {
  challenge: '',
  origin: 'http://localhost:5500',
  factor: 'either',
};

var assertionExpectations = {
  challenge: '',
  origin: 'http://localhost:5500',
  factor: 'either',
  publicKey: '',
  prevCounter: 0,
  userHandle: ''
};
let user = {};
app.get('/getRegisterAuth', function (req, res) {
  let userName = req.query.name;
  let userId = randomBase64URLBuffer(32);
  console.log('用户id', userId, base64url.toBuffer(userId))
  f2l.attestationOptions().then(function (attestation) {
    attestation.user = {
      id: userId,
      name: userName,
      displayName: userName,
    };
    attestation.challenge = base64url.encode(attestation.challenge);
    attestationExpectations.challenge = attestation.challenge;
    console.log('attestation', attestation);
    user[userName] = {};
    user[userName].id = userId
    res.send(JSON.stringify(attestation));
  });
});
app.post('/register', function (req, res) {
  let userName = req.query.name;
  req.on('data', function (data) {
    let credential = JSON.parse(data.toString());

    credential.rawId = new Uint8Array(
      base64url.toBuffer(credential.rawId)
    ).buffer;

    console.log(credential);
    f2l
      .attestationResult(
        ({ id, rawId, response } = credential),
        attestationExpectations
      )
      .then(function (regResult) {
        console.log('注册结果', regResult);
        user[userName] = {...regResult, ...user[userName]};
        res.send(regResult);
      });
  });
});

app.get('/getLoginAuth', function (req, res) {
  userAuth = user[req.query.name];
  let challenge = randomBase64URLBuffer(32);
  assertionExpectations.challenge = challenge;
  assertionExpectations.publicKey = userAuth.authnrData.get(
    'credentialPublicKeyPem'
  );
  let id = base64url.encode(toBuffer(userAuth.request.rawId))
  assertionExpectations.userHandle = userAuth.id
  res.send({
    challenge,
    id
  });
});
app.post('/login', function (req, res) {
  req.on('data', function (data) {
    let credential = JSON.parse(data.toString());
    credential.rawId = new Uint8Array(
      base64url.toBuffer(credential.rawId)
    ).buffer;
    console.log(assertionExpectations)
    f2l.assertionResult(credential, assertionExpectations).then(function(authnResult) {
      console.log(authnResult)
      res.send(authnResult)
    })
  });
});

let randomBase64URLBuffer = (len) => {
  len = len || 32;

  let buff = crypto.randomBytes(len);

  return base64url(buff);
};

function toBuffer(ab) {
  var buf = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
  }
  return buf;
}
