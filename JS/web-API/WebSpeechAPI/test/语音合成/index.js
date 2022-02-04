/*
 * @Author: huangyingli
 * @Date: 2022-02-02 14:56:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-03 00:35:15
 * @Description:
 */

const synth = window.speechSynthesis;
let voiceSelect = document.querySelector('select');

const inputTxt = document.querySelector('textarea');

const startBtn = document.querySelector('#read');

const stop = document.querySelector('#stop');

const abort = document.querySelector('#abort');

let voices = [];
function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(),
      bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    else if (aname == bname) return 0;
    else return +1;
  });
  for (i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if (voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoiceList;
}

function speak() {
  if (synth.speaking) {
    console.error('正在阅读中...');
    return;
  }

  if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = function (event) {
      console.log('阅读结束');
    };
    utterThis.onerror = function (event) {
      console.error('阅读出现错误', event);
    };
    var selectedOption =
      voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    // utterThis.pitch = pitch.value;
    // utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

startBtn.addEventListener('click', () => {
  speak();
});

stop.addEventListener('click', () => {
  if (synth.paused) {
    synth.resume();
  } else {
    synth.pause();
  }
});

abort.addEventListener('click', () => {
  synth.cancel();
});
