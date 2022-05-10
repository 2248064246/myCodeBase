# String 上的骚操作

## 表情字符长度判断

```js
let rsAstralRange = '\\ud800-\\udfff',
  rsZWJ = '\\u200d',
  rsVarRange = '\\ufe0e\\ufe0f',
  rsComboMarksRange = '\\u0300-\\u036f',
  reComboHalfMarksRange = '\\ufe20-\\ufe2f',
  rsComboSymbolsRange = '\\u20d0-\\u20ff',
  rsComboRange =
    rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
let reHasUnicode = RegExp(
  '[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']'
);

let rsFitz = '\\ud83c[\\udffb-\\udfff]',
  rsOptVar = '[' + rsVarRange + ']?',
  rsCombo = '[' + rsComboRange + ']',
  rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
  reOptMod = rsModifier + '?',
  rsAstral = '[' + rsAstralRange + ']',
  rsNonAstral = '[^' + rsAstralRange + ']',
  rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
  rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
  rsOptJoin =
    '(?:' +
    rsZWJ +
    '(?:' +
    [rsNonAstral, rsRegional, rsSurrPair].join('|') +
    ')' +
    rsOptVar +
    reOptMod +
    ')*',
  rsSeq = rsOptVar + reOptMod + rsOptJoin,
  rsSymbol =
    '(?:' +
    [
      rsNonAstral + rsCombo + '?',
      rsCombo,
      rsRegional,
      rsSurrPair,
      rsAstral,
    ].join('|') +
    ')';
let reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

function toArray(val) {
  // 字符串转成数组
  return hasUnicode(val) ? unicodeToArray(val) : asciiToArray(val);
}

function hasUnicode(val) {
  return reHasUnicode.test(val);
}

function unicodeToArray(val) {
  return val.match(reUnicode) || [];
}

function asciiToArray(val) {
  return val.split('');
}

let c = '❤️😂';

let artStr = toArray(c); // => ['❤️', '😂']
console.log(artStr.length);

console.log(toArray('你好世界, xxx').length);
```

> 另外, 也可是使用第三方库来判断, 例如: [stringz](https://www.npmjs.com/package/stringz)

## 将 js 字符串转为码点, 并能够还原码点

```js
/**
 * 有一种是将字符串转为码点, 然后通过 String.fromCodePoint 方法还原码点
 * 能够达到支持超过 utf-16 的字符
 */

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xd800 && value <= 0xdbff && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xfc00) == 0xdc00) {
        // Low surrogate.
        output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
var ucs2encode = function ucs2encode(array) {
  return String.fromCodePoint.apply(String, toConsumableArray(array));
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

console.log(ucs2decode(c), ucs2encode(ucs2decode(c)));
```


## 字符串转base64

> 参见 web-API/WebCrypto/test/base64