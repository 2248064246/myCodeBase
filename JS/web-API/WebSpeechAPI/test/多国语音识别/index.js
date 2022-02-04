/*
 * @Author: huangyingli
 * @Date: 2022-02-02 13:31:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-02 14:43:04
 * @Description:
 */
const langs = [
  ['Afrikaans', ['af-ZA']],
  ['Bahasa Indonesia', ['id-ID']],
  ['Bahasa Melayu', ['ms-MY']],
  ['Català', ['ca-ES']],
  ['Čeština', ['cs-CZ']],
  ['Deutsch', ['de-DE']],
  [
    'English',
    ['en-AU', 'Australia'],
    ['en-CA', 'Canada'],
    ['en-IN', 'India'],
    ['en-NZ', 'New Zealand'],
    ['en-ZA', 'South Africa'],
    ['en-GB', 'United Kingdom'],
    ['en-US', 'United States'],
  ],
  [
    'Español',
    ['es-AR', 'Argentina'],
    ['es-BO', 'Bolivia'],
    ['es-CL', 'Chile'],
    ['es-CO', 'Colombia'],
    ['es-CR', 'Costa Rica'],
    ['es-EC', 'Ecuador'],
    ['es-SV', 'El Salvador'],
    ['es-ES', 'España'],
    ['es-US', 'Estados Unidos'],
    ['es-GT', 'Guatemala'],
    ['es-HN', 'Honduras'],
    ['es-MX', 'México'],
    ['es-NI', 'Nicaragua'],
    ['es-PA', 'Panamá'],
    ['es-PY', 'Paraguay'],
    ['es-PE', 'Perú'],
    ['es-PR', 'Puerto Rico'],
    ['es-DO', 'República Dominicana'],
    ['es-UY', 'Uruguay'],
    ['es-VE', 'Venezuela'],
  ],
  ['Euskara', ['eu-ES']],
  ['Français', ['fr-FR']],
  ['Galego', ['gl-ES']],
  ['Hrvatski', ['hr_HR']],
  ['IsiZulu', ['zu-ZA']],
  ['Íslenska', ['is-IS']],
  ['Italiano', ['it-IT', 'Italia'], ['it-CH', 'Svizzera']],
  ['Magyar', ['hu-HU']],
  ['Nederlands', ['nl-NL']],
  ['Norsk bokmål', ['nb-NO']],
  ['Polski', ['pl-PL']],
  ['Português', ['pt-BR', 'Brasil'], ['pt-PT', 'Portugal']],
  ['Română', ['ro-RO']],
  ['Slovenčina', ['sk-SK']],
  ['Suomi', ['fi-FI']],
  ['Svenska', ['sv-SE']],
  ['Türkçe', ['tr-TR']],
  ['български', ['bg-BG']],
  ['Pусский', ['ru-RU']],
  ['Српски', ['sr-RS']],
  ['한국어', ['ko-KR']],
  [
    '中文',
    ['cmn-Hans-CN', '普通话 (中国大陆)'],
    ['cmn-Hans-HK', '普通话 (香港)'],
    ['cmn-Hant-TW', '中文 (台灣)'],
    ['yue-Hant-HK', '粵語 (香港)'],
  ],
  ['日本語', ['ja-JP']],
  ['Lingua latīna', ['la']],
];

const selectLanguage = document.querySelector('#select_language');
const selectDialect = document.querySelector('#select_dialect');

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');

let final_transcript = '';

for (var i = 0; i < langs.length; i++) {
  selectLanguage.options[i] = new Option(langs[i][0], i);
}

selectLanguage.selectedIndex = langs.length - 3;
selectLanguage.addEventListener('change', updateCountry);
updateCountry();

function updateCountry() {
  for (var i = selectDialect.options.length - 1; i >= 0; i--) {
    selectDialect.remove(i);
  }
  var list = langs[selectLanguage.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    selectDialect.options.add(new Option(list[i][1], list[i][0]));
  }
  selectDialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

if (!('webkitSpeechRecognition' in window)) {
  console.warn('此浏览器不支持语音识别');
  startBtn.setAttribute('disabled', true);
} else {
  let recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = selectDialect.value;

  recognition.addEventListener('start', () => {
    console.log('识别开始');
    startBtn.setAttribute('disabled', true);
  });
  recognition.addEventListener('end', () => {
    console.log('识别结束');
    startBtn.removeAttribute('disabled');
  });

  recognition.addEventListener('error', (event) => {
    console.error('识别错误', event);
  });

  recognition.addEventListener('result', (event) => {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
  });

  startBtn.addEventListener('click', () => {
    recognition.start();
  });

  stopBtn.addEventListener('click', () => {
    recognition.stop();
  });
}

let two_line = /\n\n/g;
let one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

const first_char = /\S/;

function capitalize(s) {
  return s.replace(first_char, function (m) {
    return m.toUpperCase();
  });
}
