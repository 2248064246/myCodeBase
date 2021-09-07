"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxySandbox = void 0;
/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:22:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:27:56
 * @Description:
 */
// 用于实现一个js沙箱
var ProxySandbox = /** @class */ (function () {
    function ProxySandbox() {
        var _this = this;
        this.running = false;
        var fakeWindow = Object.create(null);
        var proxy = new Proxy(fakeWindow, {
            set: function (target, p, value) {
                if (_this.running) {
                    target[p] = value;
                }
                return true;
            },
            get: function (target, p) {
                switch (p) {
                    case 'window':
                    case 'self':
                    case 'globalThis':
                        return proxy;
                }
                if (!window.hasOwnProperty.call(target, p) &&
                    window.hasOwnProperty(p)) {
                    // @ts-ignore
                    var value = window[p];
                    if (typeof value === 'function')
                        return value.bind(window);
                    return value;
                }
                return target[p];
            },
            has: function () {
                return true;
            },
        });
        this.proxy = proxy;
    }
    ProxySandbox.prototype.active = function () {
        this.running = true;
    };
    ProxySandbox.prototype.inactive = function () {
        this.running = false;
    };
    return ProxySandbox;
}());
exports.ProxySandbox = ProxySandbox;
