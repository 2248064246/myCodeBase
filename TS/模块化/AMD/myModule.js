/*
 * @Author: huangyingli
 * @Date: 2022-01-14 14:01:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-14 14:19:48
 * @Description:
 */
define('myModule', ['exports'], function (exports) {
  console.log('myModule is ready');
  // 可以通过 export 导出
  // exports.say = () => {
  //   console.log('hello AMD Module')
  // }

  // 也可以直接通过 return 导出
  return {
    say: () => {
      console.log('hello AMD Module');
    },
  };
});
