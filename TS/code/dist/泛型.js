/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-27 19:36:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-27 21:06:52
 * @Description:
 */
let ary1 = [1, '1'];
let utils = {
    createArray(length, value) {
        return new Array(length).fill(value);
    }
};
utils.createArray(3, '3');
class Demo {
    sayHello() {
        return this.name;
    }
}
let demo = new Demo();
function getData() {
    return Promise.resolve({
        data: {},
        code: 200,
        message: 'success'
    });
}
