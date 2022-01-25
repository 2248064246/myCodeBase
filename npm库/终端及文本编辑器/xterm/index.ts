/*
 * @Author: huangyingli
 * @Date: 2022-01-25 16:46:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-25 17:35:38
 * @Description:
 */

import { Terminal } from 'xterm';

import { FitAddon } from 'xterm-addon-fit';

const element: HTMLElement = document.getElementById('xterm') || document.body;

const term = new Terminal({
  cursorBlink: true,
  cursorStyle: 'underline',
  scrollback: 100,
});

const fitAddon = new FitAddon();

term.loadAddon(fitAddon);

term.open(element);


term.focus()

term.write("\r\n$")


term.onData(data => {
  console.log(data)
  term.write(data)
})




