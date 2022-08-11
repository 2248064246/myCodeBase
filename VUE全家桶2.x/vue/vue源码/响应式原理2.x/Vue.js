/*
 * @Author: huangyingli
 * @Date: 2022-06-13 16:14:50
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-11 16:20:40
 * @Description: 
 */
import Compile from "./Compile.js";
import observe from './observe.js';
import Watcher from './Watcher.js';

export default class Vue {
    constructor(options) {
        // 把参数options对象存为$options
        this.$options = options || {};
        // 数据
        this._data = options.data || undefined;
        this._initData();
        observe(this._data);
        // 默认数据要变为响应式的，这里就是生命周期
        // 调用默认的watch
        this._initWatch();
        // 模板编译
        new Compile(options.el, this);
    }

    _initData() {
        var self = this;
        /* 这里的作用是将data里面的值代理到最外层 */
        Object.keys(this._data).forEach(key => {
            console.log('这里是为了什么??? ::', key)
            Object.defineProperty(self, key, {
                get: () => {
                    console.log('这里也可以获取', self._data[key])
                    return self._data[key];
                },
                set: (newVal) => {
                    console.log('这里也设置了', newVal)
                    self._data[key] = newVal;
                }
            });
        });
    }

    _initWatch() {
        var self = this;
        var watch = this.$options.watch;
        Object.keys(watch).forEach(key => {
            new Watcher(self, key, watch[key]);
        });
    }
};