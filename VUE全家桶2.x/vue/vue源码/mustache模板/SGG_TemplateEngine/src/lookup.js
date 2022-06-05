/* 
    功能是可以在dataObj对象中，寻找用连续点符号的keyName属性
    比如，dataObj是
    {
        a: {
            b: {
                c: 100
            }
        }
    }
    那么lookup(dataObj, 'a.b.c')结果就是100
    不忽悠大家，这个函数是某个大厂的面试题
*/
export default function lookup(dataObj, keyName) {
    // 看看keyName中有没有点符号，但是不能是.本身
    if (keyName.indexOf('.') != -1 && keyName != '.') {
        // 如果有点符号，那么拆开
        var keys = keyName.split('.');
        // 设置一个临时变量，这个临时变量用于周转，一层一层找下去。
        var temp = dataObj;
        // 每找一层，就把它设置为新的临时变量
        for (let i = 0; i < keys.length; i++) {
            temp = temp[keys[i]];
        }
        return temp;
    }
    // 如果这里面没有点符号
    return dataObj[keyName];
};