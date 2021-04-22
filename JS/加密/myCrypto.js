  /*
 * @Author: ys4225/黄迎李
 * @Date: 2021-02-21 17:31:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-22 14:44:13
 * @Description: 
 */

class CRY {
  constructor(message, type, length) {
    this.messageBuffer = message && this.encodeMessage(message)
    this.type = type
    this.length = length | 128
    this.key = null
    this.publicKey = null
    this.privateKey = null
    this.options = null
    this.iv = crypto.getRandomValues(new Uint8Array(16))
  }
  buffer2hex(buffer) {
    const hex = Array.from(new Uint8Array(buffer))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');
    return hex;
  }

  hex2buffer(hex) {
    const typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    return typedArray.buffer
  }
  /**
   * 将字符串编码为 ArrayBuffer
   * @param {String} message 要加密信息 
   */
  encodeMessage(message) {
    return new TextEncoder().encode(message)
  }

  /**
   * 将buffer数据转为字符串
   * @param {Buffer} messageBuffer buffer数据
   */
  decodeMessage(messageBuffer) {
    return new TextDecoder().decode(messageBuffer) 
  }

  paramsFromType(type, length, iv) {
    let params = {}
    switch (type) {
      case 'AES-CTR':
        params = {
          name: type,
          length: length,
          counter: iv
        };
        break;
      case 'AES-CBC':
        params = {
          name: type,
          iv: iv
        }
        break;
      case 'AES-GCM':
        params = {
          name: type,
          iv: iv
        }
        break;
      case 'RSA-PSS':
        params = {
          name: "RSA-PSS",
          saltLength: length || 32,
        }
        break;
      case 'HMAC':
      case 'ECDSA':
        params = {
          name: type,
          hash: {
            name: "SHA-256"
          },
        }
        break;
    }
    console.log(type)
    return params
  }

  keyOptions(type, length) {
    let options = {};
    switch (type) {
      case 'AES-CTR':
      case 'AES-CBC':
      case 'AES-GCM':
        options.algorithm = {
          name: type,
          length: length || 128
        };
        options.extractable = true;
        options.keyUsages = ["encrypt", "decrypt"];
        break;
      case 'RSA-OAEP':
        options.algorithm = {
          name: type,
          modulusLength: 2048, // 1024 2048 4096
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256", // SHA-1, SHA-256, SHA-384, SHA-512
        };
        options.extractable = true;
        options.keyUsages = ["encrypt", "decrypt"]
        break;
      case 'RSA-PSS':
        options.algorithm = {
          name: type,
          modulusLength: 2048, // 1024 2048 4096
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256", // SHA-1, SHA-256, SHA-384, SHA-512
          saltLength: length || 32,
        };
        options.extractable = true;
        options.keyUsages = ["sign", "verify"]
        break;
      case 'RSASSA-PKCS1-v1_5':
        options.algorithm = {
          name: type,
          modulusLength: 2048, // 1024 2048 4096
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256" // SHA-1, SHA-256, SHA-384, SHA-512
        };
        options.extractable = true;
        options.keyUsages = ["sign", "verify"]
        break;
      case 'ECDSA':
        options.algorithm = {
          name: type,
          namedCurve: 'P-384'
        }
        options.extractable = true;
        options.keyUsages = ["sign", "verify"]
        break;
      case 'HMAC':
        options.algorithm = {
          name: type,
          hash: {
            name: "SHA-256"
          }
        }
        options.extractable = true;
        options.keyUsages = ["sign", "verify"]
        break;
    }
    return Object.values(options).length === 0 ? undefined : options
  }

  buffer2base64(buffer) {
    const asStr = this.ab2str(buffer)
    const base64Str = window.btoa(asStr)
    return base64Str;
  }

  base2buffer(baseStr) {
    // const padding = '='.repeat((4 - baseStr.length % 4) % 4);
    // const base64 = (baseStr + padding)
    //   .replace(/\-/g, '+')
    //   .replace(/_/g, '/');

    const rawData = window.atob(baseStr);
    const outputArray = this.str2ab(rawData)
    return outputArray;
  }

  str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.codePointAt(i);
    }
    return buf;
  }


  ab2str(buffer) {
    const asStr = String.fromCharCode.apply(null, new Uint8Array(buffer))
    return asStr
  }

  async PpKey(type) {
    const options = this.keyOptions(type)
    this.options = options
    const key = await crypto.subtle.generateKey(options.algorithm, options.extractable, options.keyUsages)
    this.publicKey = key.publicKey
    this.privateKey = key.privateKey
    return key
  }

  /**
   * 获取秘钥
   * @param {String} type 加密方式
   * @param {*} length 
   * @returns 秘钥
   */
  async singleKey(type, length = 128) {
    const options = this.keyOptions(type)
    this.options = options
    const key = await crypto.subtle.generateKey(options.algorithm, options.extractable, options.keyUsages)
    return key;
  }

  async exportKey(key, type) {
    type = type || this.type
    if (/^(RSA)|(ECDSA)/g.test(type)) {
      // spki 解密公钥
      let publicKey = await window.crypto.subtle.exportKey('spki', key.publicKey)
      // pkcs8 解密私钥;
      let privateKey = await window.crypto.subtle.exportKey('pkcs8', key.privateKey)
      publicKey = this.buffer2base64(publicKey)
      publicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
      privateKey = `-----BEGIN PRIVATE KEY-----\n${this.buffer2base64(privateKey)}\n-----END PRIVATE KEY-----`;

      return {
        publicKey,
        privateKey
      }
    } else {
      const exported = await window.crypto.subtle.exportKey(
        "raw",
        key
      );
      const exportedKeyBuffer = new Uint8Array(exported);
      return {
        hexKey: this.buffer2hex(exportedKeyBuffer),
        bufferKey: exportedKeyBuffer,
        base64Key: this.buffer2base64(exportedKeyBuffer)
      }
    }

  }

  async importEncodeKey(pem, type) {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
    const binaryDer = this.base2buffer(pemContents);
    const options = this.keyOptions(type) || this.options
    const publicKey = await window.crypto.subtle.importKey('spki', binaryDer,
      options.algorithm,
      options.extractable,
      [options.keyUsages[0]] // spki 对应加密
    )
    return publicKey
  }

  async importDecodeKey(pem, type) {
    type = type || this.type
    if (/^(RSA)|(ECDSA)/g.test(type)) {
      const pemHeader = "-----BEGIN PUBLIC KEY-----\n";
      const pemFooter = "\n-----END PUBLIC KEY-----";
      const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
      const binaryDerString = window.atob(pemContents);
      const binaryDer = this.str2ab(binaryDerString);
      const options = this.keyOptions(type) || this.options
      const privateKey = await window.crypto.subtle.importKey('pkcs8', binaryDer,
        options.algorithm,
        options.extractable,
        [options.keyUsages[1]] // pkcs8 对应解密
      )
      return privateKey
    } else {
      const bufferKey = this.base2buffer(pem)
      const options = this.keyOptions(type) || this.options
      const key = await window.crypto.subtle.importKey('raw', bufferKey, options.algorithm,
        options.extractable, this.options.keyUsages)
      return key
    }

  }

}

class SHA extends CRY {
  constructor(message, type = 'SHA-256') {
    super(message, type)
  }
  async encode(message, type) {
    if (!message && !this.messageBuffer) throw Error('请输入要加密的信息')
    message = this.messageBuffer || this.encodeMessage(message)
    type = type || this.type
    const messageDigest = await crypto.subtle.digest(type, message);
    const hexDigest = Array.from(new Uint8Array(messageDigest))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');
    return {
      hex: hexDigest,
      messageBuffer: messageDigest
    };
  }
}

class AES extends CRY {
  constructor(message, type = 'AES-CTR', length = 128) {
    super(message, type, length)
  }


  // 解密
  async decode(ciphertext, key, type, length) {
    key = key || this.key
    type = type || this.type
    length = length || this.length
    const messageBuffer = await crypto.subtle.decrypt(this.paramsFromType(type, length, this.iv), key, ciphertext)
    const hex = this.buffer2hex(messageBuffer)
    const message = this.decodeMessage(messageBuffer)
    return {
      message,
      hex,
      messageBuffer
    };
  }
  // 加密
  async encode(message, key, type, length) {
    if (!message && !this.messageBuffer) throw Error('请输入要加密的信息')
    message = this.messageBuffer || this.encodeMessage(message)
    this.key = await this.singleKey(this.type, this.length);
    key = key || this.key
    type = type || this.type
    length = length || this.length
    const messageBuffer = await crypto.subtle.encrypt(this.paramsFromType(type, length, this.iv), key, message)
    const hex = this.buffer2hex(messageBuffer)
    return {
      hex,
      messageBuffer
    };
  }

}

class RSA extends CRY {
  constructor(message, type) {
    super(message, type)
  }

  async encode(message, key, type) {
    if (!message && !this.messageBuffer) throw Error('请输入要加密的信息')
    message = this.messageBuffer || this.encodeMessage(message)
    this.key = await this.PpKey(this.type);
    type = type || this.type
    let messageBuffer;
    if (type === 'RSA-OAEP') {
      key = key || this.publicKey
      // 使用公钥加密, 用于客户端加密信息
      messageBuffer = await crypto.subtle.encrypt(
        this.options.algorithm,
        key,
        message
      )
    } else {
      key = key || this.privateKey // 使用私钥签名, 用于验证服务器的数字签名
      messageBuffer = await crypto.subtle.sign(
        this.options.algorithm,
        key,
        message
      )
    }
    const hex = this.buffer2hex(messageBuffer)
    return {
      hex,
      messageBuffer
    };
  }

  async decode(ciphertext, key, type) {
    type = type || this.type
    let messageBuffer = null;
    if (type === 'RSA-OAEP') {
      // 使用私钥解密密文
      key = key || this.privateKey
      messageBuffer = await crypto.subtle.decrypt(
        this.options.algorithm,
        key,
        ciphertext
      )
    } else {
      // 使用公钥验证签名
      key = key || this.publicKey
      messageBuffer = await crypto.subtle.verify(
        this.options.algorithm,
        key,
        ciphertext,
        this.messageBuffer.buffer
      )
    }
    if (typeof messageBuffer !== 'boolean') {
      const hex = this.buffer2hex(messageBuffer)
      const message = this.decodeMessage(messageBuffer)
      return {
        message,
        hex,
        messageBuffer
      };
    } else {
      return {
        verify: messageBuffer
      };
    }

  }

}

class ECDSA extends CRY {
  constructor(message, type = 'ECDSA') {
    super(message, type)
  }

  async encode(message, key, type) {
    if (!message && !this.messageBuffer) throw Error('请输入要加密的信息')
    message = this.messageBuffer || this.encodeMessage(message)
    type = type || this.type
    this.key = await this.PpKey(this.type);
    key = key || this.privateKey // 使用私钥签名, 用于验证服务器的数字签名
    const messageBuffer = await crypto.subtle.sign(
      this.paramsFromType(type),
      key,
      message
    )
    const hex = this.buffer2hex(messageBuffer)
    return {
      hex,
      messageBuffer
    };
  }

  async decode(ciphertext, key, type) {
    type = type || this.type
    let messageBuffer = null;
    key = key || this.publicKey
    messageBuffer = await crypto.subtle.verify(
      this.paramsFromType(type),
      key,
      ciphertext,
      this.messageBuffer.buffer
    )
    return {
      verify: messageBuffer
    };
  }

}

class HMAC extends CRY {
  constructor(message, type = 'HMAC') {
    super(message, type)
  }
  async encode(message, key, type) {
    if (!message && !this.messageBuffer) throw Error('请输入要加密的信息')
    message = this.messageBuffer || this.encodeMessage(message)
    type = type || this.type
    this.key = await this.singleKey(this.type);
    key = key || this.key // 使用私钥签名, 用于验证服务器的数字签名
    const messageBuffer = await crypto.subtle.sign(
      this.paramsFromType(type),
      key,
      message
    )
    const hex = this.buffer2hex(messageBuffer)
    return {
      hex,
      messageBuffer
    };
  }

  async decode(ciphertext, key, type) {
    type = type || this.type
    let messageBuffer = null;
    key = key || this.key
    messageBuffer = await crypto.subtle.verify(
      this.paramsFromType(type),
      key,
      ciphertext,
      this.messageBuffer.buffer
    )
    return {
      verify: messageBuffer
    };
  }
}

// console.log(new SHA('hello', 'SHA-256').encode().then(res => {
//   console.log(res)
// }))
// new SHA().encode('H3CCloud', 'SHA-1').then(res => {
//   console.log(res.hex)

//   // new SHA(atob(new CRY().buffer2base64(res.messageBuffer)), 'SHA-1').encode().then(result => {
//   //     console.log(result)
//   //     console.log(result.hex)
//   // })
//   crypto.subtle.digest('SHA-1', res.messageBuffer).then(rsult => {
//     console.log(new CRY().buffer2hex(rsult))
//   })
// })




// var aes = new AES()
// aes.importDecodeKey()

// aes.encode().then(res => {
//   console.log(res)
//   console.log(aes.key)
//   var str = JSON.stringify(new Uint8Array(res.messageBuffer))
//   console.log(str)
//   console.log('base64', new CRY().buffer2base64(aes.messageBuffer))
//   var ary = JSON.parse(str)
//   console.log(ary, new Uint8Array(Object.values(ary)))
//   aes.exportKey(aes.key).then(key => {
//     console.log(key)
//     aes.importDecodeKey(key.base64Key).then(mykey => {
//       aes.decode(res.messageBuffer, mykey).then(result => {
//         console.log(result)
//       })
//     })
//   })

// })

var rsa = new RSA('卐〓™♣☛✔', 'RSA-OAEP')
rsa.encode().then(res => {
  console.log(res)
  rsa.decode(res.messageBuffer).then(result => {
    console.log(result)
    console.log(rsa.key)
    rsa.exportKey(rsa.key).then(key => {
      console.log(key.publicKey)
      console.log(key.privateKey)
      rsa.importDecodeKey(key.privateKey).then(priKey => {
        console.log(priKey)
        rsa.decode(res.messageBuffer, priKey).then(res => {
          console.log(res)
          window.res= res
        })
      })
    })

  })
})

// var rsa = new RSA('你好, 世界', 'RSA-PSS')
// rsa.encode().then(res => {
//   console.log(res)
//   console.log(rsa.key)
//   rsa.exportKey(rsa.key).then(res => {
//     console.log(res)
//   })
//   rsa.decode(res.messageBuffer).then(result => {
//     console.log(result, 'result')
//   })
// })

// var dsa = new ECDSA('你好, 世界')

// dsa.encode().then(res => {
//   console.log(res)
//   dsa.exportKey(dsa.key).then(res => {
//     console.log(res)
//   })
//   dsa.decode(res.messageBuffer).then(result => {
//     console.log(result)
//   })
// })

// var dsa = new HMAC('你好, 世界')

// dsa.encode().then(res => {
//   console.log(res)
//   console.log(dsa.key)
//   dsa.exportKey(dsa.key).then(key => {
//     console.log(key)
//     dsa.importDecodeKey(key.base64Key).then(mykey => {
//       console.log(mykey)
//       dsa.decode(res.messageBuffer, mykey).then(result => {
//         console.log(result)
//       })
//     })

//   })

// })