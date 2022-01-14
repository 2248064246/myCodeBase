/*
 * @Author: huangyingli
 * @Date: 2022-01-14 17:07:01
 * @LastEditors:
 * @LastEditTime: 2022-01-14 17:07:19
 * @Description:
 */
(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = 'MODULE_NOT_FOUND'), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = 'function' == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        /*
         * @Author: huangyingli
         * @Date: 2022-01-14 17:04:18
         * @LastEditors: Please set LastEditors
         * @LastEditTime: 2022-01-14 17:04:18
         * @Description:
         */

        exports.say = () => {
          console.log('this is CommonJS module_one');
        };
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        /*
         * @Author: huangyingli
         * @Date: 2022-01-14 17:03:51
         * @LastEditors: Please set LastEditors
         * @LastEditTime: 2022-01-14 17:05:22
         * @Description:
         */

        let A = require('./module_one.js');

        A.say();
      },
      { './module_one.js': 1 },
    ],
  },
  {},
  [2]
);
