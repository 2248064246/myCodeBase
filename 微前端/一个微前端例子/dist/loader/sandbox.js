"use strict";
/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:22:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 11:40:34
 * @Description:
 */
// 用于实现一个js沙箱
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxySandbox = void 0;
/**
 * 以上代码只是一个初版的沙箱，核心思路就是创建一个假的 window 出来，
 * 如果用户设置值的话就设置在 fakeWindow 上，这样就不会影响全局变量了。
 * 如果用户取值的话，就判断属性是存在于 fakeWindow 上还是 window 上。
 */
var ProxySandbox = /** @class */ (function () {
    function ProxySandbox() {
        var _this = this;
        this.running = false;
        var fakeWindow = Object.create(null);
        var proxy = new Proxy(fakeWindow, {
            set: function (target, p, value) {
                // 如果当前沙箱在运行，就直接把值设置到 fakeWindow 上
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
                // 假如属性不存在 fakeWindow 上，但是存在于 window 上
                // 从 window 上取值
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
