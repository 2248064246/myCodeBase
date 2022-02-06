/*
 * @Author: huangyingli
 * @Date: 2022-02-05 12:25:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-06 01:06:57
 * @Description:
 */

let express = require('express');

const {
  decodeRegisterCredential,
  randomBase64URLBuffer,
  verifyAuthenticatorAssertionResponse,
} = require('./utils');

const { addUser, userExists, getUser } = require('./store');

let publicKey = {
  // 这代表"依赖方";它可以被视为描述负责注册和验证用户的组织。
  // 必须是浏览器中当前域的子集
  rp: {
    /* 这里id要和浏览器的访问域名一致, 不要写ip */
    name: 'localhost',
    id: 'localhost',
  },
  // 这个值理论上需要服务器提供
  // 另外说明一下, 这个和 new TextEncoder().encode('GGbone') 结果一致
  challenge: undefined,
  // 这是有关当前注册的用户的信息。 身份验证器使用 将凭据与用户关联。
  user: {
    id: 'GGbone',
    name: 'GGbone',
    displayName: 'GGbone',
  },
  // 这是一个对象数组，用于描述服务器可接受的公钥类型。

  pubKeyCredParams: [
    {
      type: 'public-key',
      alg: -7,
    },
    {
      type: 'public-key',
      alg: -35,
    },
    {
      type: 'public-key',
      alg: -36,
    },
    {
      type: 'public-key',
      alg: -257,
    },
    {
      type: 'public-key',
      alg: -258,
    },
    {
      type: 'public-key',
      alg: -259,
    },
    {
      type: 'public-key',
      alg: -37,
    },
    {
      type: 'public-key',
      alg: -38,
    },
    {
      type: 'public-key',
      alg: -39,
    },
    {
      type: 'public-key',
      alg: -8,
    },
  ],
  // 此可选对象可帮助信赖方对允许注册的身份验证器类型进行进一步限制
  authenticatorSelection: {
    // 这个可选对象帮助依赖方对允许注册的验证器类型进行进一步限制
    // platform: 表示只允许当前平台 (例如: 只能在这台电脑登录)
    // cross-platform: 表示可以跨平台
    authenticatorAttachment: 'platform',
    userVerification: 'discouraged',
    requireResidentKey: false,
  },
  // 从身份验证器返回的证明数据具有可用于跟踪用户的信息。
  // 此选项允许服务器指示证明数据对此注册事件的重要性。
  // none: 值表示服务器不关心认证。
  // indirect: 值表示服务器将允许匿名认证数据
  // direct: 意味着服务器希望从身份验证器接收身份验证数据。
  attestation: 'direct',
  extensions: {
    txAuthSimple: '',
  },
  /* 这个值不要太小, 不然会报错 */
  timeout: 100000,
};

let app = express();
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/webauthn', function (req, res) {
  console.log(req.url);

  /* 客户端返回的challenge需要和这个一致 */
  let challenge = randomBase64URLBuffer(32);
  publicKey.challenge = challenge;
  res.send(JSON.stringify(publicKey));
});
app.post('/register', function (req, res) {
  req.on('data', function (data) {
    console.log('查询参数', req.query);
    let credential = JSON.parse(data.toString());
    let clientDataJSON = credential.response.clientDataJSON;
    let attestationObject = credential.response.attestationObject;
    let credentialDecode = decodeRegisterCredential(
      clientDataJSON,
      attestationObject
    );

    console.log(credentialDecode);

    let result = addUser(req.query.name, clientDataJSON, attestationObject);
    if (result == 'existed') {
      res.send(
        JSON.stringify({
          status: false,
          msg: '该用户已存在',
        })
      );
    } else {
      res.send(
        JSON.stringify({
          status: true,
          msg: '注册成功',
        })
      );
    }
  });
});

app.get('/userCredentials', function (req, res) {
  let name = req.query.name;
  let user = getUser(name);
  if (user) {
    let credentialDecode = decodeRegisterCredential(
      user.clientDataJSON,
      user.attestationObject
    );
    console.log(credentialDecode);
    res.send(
      JSON.stringify({
        id: credentialDecode.credentialId,
        challenge: randomBase64URLBuffer(32),
        type: 'public-key',
      })
    );
  } else {
    res.send(
      JSON.stringify({
        status: 'false',
        msg: '用户不存在, 请先注册',
      })
    );
  }
});

app.post('/login', function (req, res) {
  req.on('data', function (data) {
    let credential = JSON.parse(data.toString());
    console.log('查询参数', req.query);
    console.log(credential);
    let user = getUser(req.query.name);
    let authr = decodeRegisterCredential(
      user.clientDataJSON,
      user.attestationObject
    );
    console.log(authr);
    let result = verifyAuthenticatorAssertionResponse(
      credential.response,
      authr
    );
    console.log('验证结果', result);
  });
});

app.listen(8088, function () {
  console.log('http://localhost:8088');
});
