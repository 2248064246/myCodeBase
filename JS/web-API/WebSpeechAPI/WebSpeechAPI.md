# web speech api

这是一个可以识别语音和阅读文本的 API

## SpeechRecognition

> 这个用于语音识别

### 构造函数

- SpeechRecognition

### 实例参数

- grammars 返回并设置 SpeechGrammar 对象集合, 表示当前能够理解的语法
- lang 放回并设置语言, 如果没有这默认是 html 的 lang 属性值
- continuous 是返回连续结果还是单个结果, 默认 false
- interimResults 控制是否返回中期结果, 默认 false
- maxAlternatives 设置每个结果提供的最大语音识别数, 默认值 1

### 方法

- abort()
- start()
- stop()

### 事件

- audiostart 当用户开始捕获音频时激发
- audioend 当用户完成捕获音频时激发
- end 当语音识别服务断开时触发
- error
- nomatch 当语音识别服务没有显著识别结果时触发
- result 当语音服务返回结果时触发, 已肯定识别某个单词或短语，并且已将其传达回应用
- soundstart 当检测到任何声音时触发
- soundend 当已停止检测到语音识别服务识别的语音时激发
- start

### 例子

> 实际中 grammar 这个属性并不一定需要, 没有它也能识别

```js
var grammar =
  '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;';
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

document.body.onclick = function () {
  recognition.start();
  console.log('Ready to receive a color command.');
};

recognition.onresult = function (event) {
  var color = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + color;
  bg.style.backgroundColor = color;
};
```


## SpeechSynthesis


