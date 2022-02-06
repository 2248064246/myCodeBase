/*
 * @Author: huangyingli
 * @Date: 2022-02-05 23:27:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-06 18:25:11
 * @Description:
 */
const base64url = require('base64url');
const cbor = require('cbor');
const crypto = require('crypto');
const jwkToPem = require("jwk-to-pem");
const coseToJwk = require("cose-to-jwk");

function decodeRegisterCredential(clientDataJSON, attestationObject) {
  // 解析客户端数据, 包含客户端返回的 challenge, origin
  const clientDataObj = JSON.parse(base64url.decode(clientDataJSON));

  // let buffer = Buffer.from(attestationObject, 'base64');

  // const decodedAttestationObj = cbor.decode(buffer);
  const attestationBuffer = base64url.toBuffer(attestationObject);
  const decodedAttestationObj = cbor.decodeAllSync(attestationBuffer)[0];

  const { authData } = decodedAttestationObj;

  // get the length of the credential ID
  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach((value, index) => dataView.setUint8(index, value));
  const credentialIdLength = dataView.getUint16();

  // 获取身份ID
  const credentialId = authData.slice(55, 55 + credentialIdLength);

  // 获取公钥
  const publicKeyBytes = authData.slice(55 + credentialIdLength);

  // the publicKeyBytes are encoded again as CBOR
  const publicKeyObject = cbor.decode(publicKeyBytes);

  const authrDataStruct = parseMakeCredAuthData(authData);

  console.log('authrDataStruct', authrDataStruct);

  // const publicKey = COSEECDHAtoPKCS(authrDataStruct.COSEPublicKey);
  var jwk = coseToJwk(authrDataStruct.COSEPublicKey);

  return {
    publicKeyBytes,
    publicKeyObject,
    // publicKey,
    credentialPublicKeyJwk: jwk,
    credentialPublicKeyPem: jwkToPem(jwk),
    credentialId: base64url.encode(credentialId),
    clientDataObj,
    decodedAttestationObj,
  };
}

function COSEECDHAtoPKCS(COSEPublicKey) {
  const coseStruct = cbor.decodeAllSync(COSEPublicKey)[0];
  const tag = Buffer.from([0x04]);
  const x = coseStruct.get(-2);
  const y = coseStruct.get(-3);

  console.log(tag, x, y)

  return Buffer.concat([tag, x, y]);
}

let randomBase64URLBuffer = (len) => {
  len = len || 32;

  let buff = crypto.randomBytes(len);

  return base64url(buff);
};

function hash(data) {
  return crypto.createHash('SHA256').update(data).digest();
}

function parseMakeCredAuthData(buffer) {
  const rpIdHash = buffer.slice(0, 32);
  buffer = buffer.slice(32);

  const flagsBuf = buffer.slice(0, 1);
  buffer = buffer.slice(1);

  const flags = flagsBuf[0];

  const counterBuf = buffer.slice(0, 4);
  buffer = buffer.slice(4);

  const counter = counterBuf.readUInt32BE(0);

  const aaguid = buffer.slice(0, 16);
  buffer = buffer.slice(16);

  const credIDLenBuf = buffer.slice(0, 2);
  buffer = buffer.slice(2);

  const credIDLen = credIDLenBuf.readUInt16BE(0);

  const credID = buffer.slice(0, credIDLen);
  buffer = buffer.slice(credIDLen);

  const COSEPublicKey = buffer;

  return {
    rpIdHash,
    flagsBuf,
    flags,
    counter,
    counterBuf,
    aaguid,
    credID,
    COSEPublicKey,
  };
}

function parseGetAssertAuthData(buffer) {
  const rpIdHash = buffer.slice(0, 32);
  buffer = buffer.slice(32);

  const flagsBuf = buffer.slice(0, 1);
  buffer = buffer.slice(1);

  const flags = flagsBuf[0];

  const counterBuf = buffer.slice(0, 4);
  buffer = buffer.slice(4);

  const counter = counterBuf.readUInt32BE(0);

  return { rpIdHash, flagsBuf, flags, counter, counterBuf };
}

function parseGetAssertAuthData(buffer) {
  const rpIdHash = buffer.slice(0, 32);
  buffer = buffer.slice(32);

  const flagsBuf = buffer.slice(0, 1);
  buffer = buffer.slice(1);

  const flags = flagsBuf[0];

  const counterBuf = buffer.slice(0, 4);
  buffer = buffer.slice(4);

  const counter = counterBuf.readUInt32BE(0);

  return { rpIdHash, flagsBuf, flags, counter, counterBuf };
}

function ASN1toPEM(pkBuffer) {
  if (!Buffer.isBuffer(pkBuffer)) {
    throw new Error('ASN1toPEM: pkBuffer must be Buffer.');
  }

  let type;
  if (pkBuffer.length == 65 && pkBuffer[0] == 0x04) {
    pkBuffer = Buffer.concat([
      new Buffer.from(
        '3059301306072a8648ce3d020106082a8648ce3d030107034200',
        'hex'
      ),
      pkBuffer,
    ]);

    type = 'PUBLIC KEY';
  } else {
    type = 'CERTIFICATE';
  }

  const b64cert = pkBuffer.toString('base64');

  let PEMKey = '';
  for (let i = 0; i < Math.ceil(b64cert.length / 64); i++) {
    const start = 64 * i;
    PEMKey += b64cert.substr(start, 64) + '\n';
  }

  PEMKey = `-----BEGIN ${type}-----\n` + PEMKey + `-----END ${type}-----\n`;
  return PEMKey;
}

function verifySignature(signature, data, publicKey) {
  return crypto
    .createVerify('SHA256')
    .update(data)
    .verify(publicKey, signature);
}

function verifyAuthenticatorAssertionResponse(webauthnResponse, authr) {
  const authenticatorData = base64url.toBuffer(
    webauthnResponse.authenticatorData
  );

  console.log('authenticatorData', authenticatorData);

  const response = { verified: false };

  const authrDataStruct = parseGetAssertAuthData(authenticatorData);

  console.log('authrDataStruct', authrDataStruct);

  if (!(authrDataStruct.flags & 0x01)) {
    // U2F_USER_PRESENTED
    throw new Error('User was not presented durring authentication!');
  }

  const clientDataHash = hash(base64url.toBuffer(webauthnResponse.clientDataJSON))

  console.log('clientDataHash', clientDataHash)

  const signatureBase = Buffer.concat([authenticatorData, clientDataHash]);

  const publicKey = authr.credentialPublicKeyPem;
  // const publicKey = authr.publicKeyBytes
  console.log('publicKey', publicKey);
  const signature = base64url.toBuffer(webauthnResponse.signature);

  response.counter = authrDataStruct.counter;
  response.verified = verifySignature(signature, signatureBase, publicKey);

  return response;
}

module.exports = {
  decodeRegisterCredential,
  randomBase64URLBuffer,
  hash,
  verifyAuthenticatorAssertionResponse,
};
