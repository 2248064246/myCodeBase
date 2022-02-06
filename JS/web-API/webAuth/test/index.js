/*
 * @Author: huangyingli
 * @Date: 2022-02-04 23:32:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-06 00:43:30
 * @Description:
 */
var publicKeyCredentialToJSON = (pubKeyCred) => {
  if (pubKeyCred instanceof Array) {
    let arr = [];
    for (let i of pubKeyCred) arr.push(publicKeyCredentialToJSON(i));

    return arr;
  }

  if (pubKeyCred instanceof ArrayBuffer) {
    return base64url.encode(pubKeyCred);
  }

  if (pubKeyCred instanceof Object) {
    let obj = {};

    for (let key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
    }

    return obj;
  }

  return pubKeyCred;
};

function register() {
  fetch('http://localhost:8088/webauthn', {
    method: 'get',
  })
    .then((res) => res.json())
    .then((data) => {
      data.user.id = base64url.decode(data.user.id);
      data.challenge = base64url.decode(data.challenge);

      console.log(data);
      navigator.credentials
        .create({
          publicKey: data,
        })
        .then((credential) => {
          console.log(credential);
          /* 返回一个PublicKeyCredential 对象 */
          /**
           * id: 新生成的凭证的id;它将用于在对用户进行身份验证时识别凭据。
           * rawId: 还是ID，但以二进制形式
           * response:
           *      clientDataJSON: 他表示从浏览器传递到身份验证器的数据，以便将新凭证与服务器和浏览器关联起来。验证器将其作为UTF-8字节数组提供。
           *      attestationObject: 此对象包含凭据公钥、可选的认证证书和其他元数据，这些元数据也用于验证注册事件。它是用CBOR编码的二进制数据。
           * type: 'public-key
           */

          let credentialObj = publicKeyCredentialToJSON(credential);
          console.log(credentialObj);

          fetch('http://localhost:8088/register?name=GGbone', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentialObj),
          });
        });
    });
}

function login() {
  fetch('http://localhost:8088/userCredentials?name=GGbone')
    .then((res) => res.json())
    .then((userCredentials) => {
      console.log(userCredentials);
      const publicKeyCredentialRequestOptions = {
        challenge: base64url.decode(userCredentials.challenge),
        allowCredentials: [
          {
            id: base64url.decode(userCredentials.id),
            type: 'public-key',
          },
        ],
        timeout: 60000,
        rpId: 'localhost',
        userVerification: 'discouraged',
        authenticatorAttachment: 'platform',
      };

      navigator.credentials
        .get({
          publicKey: publicKeyCredentialRequestOptions,
        })
        .then((assertion) => {
          console.log('登录信息', assertion);
          let assertionObj = publicKeyCredentialToJSON(assertion);
          console.log(assertionObj);
          fetch('http://localhost:8088/login?name=GGbone', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(assertionObj)
          }).then(res => res.json()).then(data => {

          })
        });
    });
}

let registerBtn = document.querySelector('#register');
registerBtn.addEventListener('click', register);

let loginBtn = document.querySelector('#login');
loginBtn.addEventListener('click', login);
