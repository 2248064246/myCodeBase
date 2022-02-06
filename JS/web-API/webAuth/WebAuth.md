# WebAuth

[webauthn.guide](https://webauthn.guide/)

[mdn Web Authentication ](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Authentication_API)

此 API 继承自 CredentialManagementAPI

```js
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
  challenge: randomBase64URLBuffer(32),
  // 这是有关当前注册的用户的信息。 身份验证器使用 将凭据与用户关联。
  user: {
    id: 'GGbone',
    name: 'GGbone',
    displayName: 'GGbone',
  },
  // 这是一个对象数组，用于描述服务器可接受的公钥类型。(最好写成这样, 不然容易出错)
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

/* 创建证明 */
navigator.credentials.create({
  publicKey: publicKey,
});
```

```js
/* 返回一个PublicKeyCredential 对象 */
/**
 * id: 新生成的凭证的id;它将用于在对用户进行身份验证时识别凭据。
 * rawId: 还是ID，但以二进制形式
 * response:
 *      clientDataJSON: 他表示从浏览器传递到身份验证器的数据，以便将新凭证与服务器和浏览器关联起来。验证器将其作为UTF-8字节数组提供。
 *      attestationObject: 此对象包含凭据公钥、可选的认证证书和其他元数据，这些元数据也用于验证注册事件。它是用CBOR编码的二进制数据。
 * type: 'public-key
 */
```

服务器需要的 clientDataJSON 和 attestationObject 这两个数据
clientDataJSON 解码为字符对应数据

```js
let clientDataJSONDecode = {
  type: 'webauthn.create',
  // 这个数据需要和服务器生成的一致
  challenge: 'sE-Gd6DEw-KhvXr0fZZ8zfvqS1YfHyU2DpJA8WWty8Q',
  // 这个源需要和服务器允许的一致
  origin: 'http://localhost:5500',
  crossOrigin: false,
};
```

attestationObject 的解码需要用到 cbor 库

```js
/* 这里以windows hello为样例, 其他的安全秘钥可能不同 */
{
  /* 这个的表示的是使用什么类型的安全秘钥 */
  fmt: 'packed',
  attStmt: {
    alg: -257,
    sig: Buffer
  },
  /* 这里面存储了公钥信息 */
  authData: Buffer
}
```

公钥信息存储在 authData 中, 需要进行解码

## 整个流程

### 注册

- 告知服务器要注册, 服务器返回 challenge, 其余的值都可以不由服务器给出. (rp.id 这个值可以由服务器返回, 返回当前域名)
- 浏览器输入用户名信息, 选择验证器类型(authenticatorAttachment), 选择证明类型(userVerification)等
- 浏览器向认证器调用 authenticatorMakeCredential() - 在浏览器内部，浏览器将验证参数并用默认值补全缺少的参数，然后这些参数会变为 AuthenticatorResponse.clientDataJSON。其中最重要的参数之一是 origin，它是 clientData 的一部分，同时服务器将能在稍后验证它。调用 create() 的参数与 clientDataJSON 的 SHA-256 哈希一起传递到身份验证器（只有哈希被发送是因为与认证器的连接可能是低带宽的 NFC 或蓝牙连接，之后认证器只需对哈希签名以确保它不会被篡改）。
- 认证器创建新的密钥对和证明 - 在进行下一步之前，认证器通常会以某种形式要求用户确认，如输入 PIN，使用指纹，进行虹膜扫描等，以证明用户在场并同意注册。之后，认证器将创建一个新的非对称密钥对，并安全地存储私钥以供将来验证使用。公钥则将成为证明的一部分，被在制作过程中烧录于认证器内的私钥进行签名。这个私钥会具有可以被验证的证书链。
- 认证器将数据返回浏览器 - 新的公钥、全局唯一的凭证 ID 和其他的证明数据会被返回到浏览器，成为 attestationObject。
- 浏览器生成最终的数据，应用程序将响应发送到服务器 - create() 的 Promise 会返回一个 PublicKeyCredential (en-US)，其中包含全局唯一的证书 ID PublicKeyCredential.rawId (en-US) 和包含 AuthenticatorResponse.clientDataJSON 的响应 AuthenticatorAttestationResponse (en-US)。你可以使用任何你喜欢的格式和协议将 PublicKeyCredential (en-US) 发送回服务器（注意 ArrayBuffer 类型的属性需要使用 base64 或类似编码方式进行编码）
- 服务器验证数据并完成注册 - 最后，服务器需要执行一系列检查以确保注册完成且数据未被篡改。步骤包括：
  1. 验证接收到的挑战与发送的挑战相同
  2. 确保 origin 与预期的一致
  3. 使用对应认证器型号的证书链验证 clientDataHash 的签名和证明
     验证步骤的完整列表可以在 WebAuthn 规范中找到。一旦验证成功，服务器将会把新的公钥与用户帐户相关联以供将来用户希望使用公钥进行身份验证时使用。

### 登录

- 用户填写用户名, 设置其他配置
- 告知浏览要登录, 浏览器发送 challenge, 和 用户 id 过来
- 用户调用 authenticatorGetCredential(), 在浏览器内部, 浏览器将验证参数并填写默认值，这些默认值将成为 AuthenticatorResponse.clientDataJSON。最重要的参数之一是源，它记录为 clientData 的一部分，以便服务器以后可以验证源。create（） 调用的参数与 clientDataJSON 的 SHA-256 哈希一起传递给身份验证器（仅发送哈希，因为到身份验证器的链接可能是低带宽 NFC 或蓝牙链接，身份验证器只是对哈希进行签名以确保其不会被篡改）
- 身份验证器根据id查找凭据, 并提示用户进行身份验证
- 身份验证器将数据返回到浏览器 - 身份验证器将身份验证器数据和签名返回到浏览器。
- 服务器验证并确定用户身份 
  1.  使用在注册请求期间存储的公钥来验证身份验证器的签名。
  2.  确保由身份验证器签名的challenge与服务器生成的challenge相匹配。
  3.  检查信赖方 ID 是否为此服务所需的 ID。
  

