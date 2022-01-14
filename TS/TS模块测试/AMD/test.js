/*
 * @Author: huangyingli
 * @Date: 2022-01-14 11:11:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-14 16:09:26
 * @Description:
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "../uri.all.js", "../uri.all.js"], function (require, exports, uri, uri_all_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    uri = __importStar(uri);
    console.log(uri);
    console.log(uri_all_js_1.parse);
    // console.log(mime.lookup('json'));
    console.log(uri.parse('http://www.baidu.com'));
});
