"use strict";
/*
 * @Author: huangyingli
 * @Date: 2022-01-25 16:46:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-25 17:35:38
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
var xterm_1 = require("xterm");
var xterm_addon_fit_1 = require("xterm-addon-fit");
var element = document.getElementById('xterm') || document.body;
var term = new xterm_1.Terminal({
    cursorBlink: true,
    cursorStyle: 'underline',
    scrollback: 100,
});
var fitAddon = new xterm_addon_fit_1.FitAddon();
term.loadAddon(fitAddon);
term.open(element);
term.focus();
term.write("\r\n$");
term.onData(function (data) {
    console.log(data);
    term.write(data);
});
