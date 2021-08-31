// 数组去重

// 方案一
// 1. 先循环数组,将每一项存入另一个数组中, 使用includes判断
// 2. 存入的时候判断另外数组是否有这个数,有就不存入. 最后新数组中就是去重的

function unique_one(ary = []) {
    let newAry = [];
    // for(let i = 0; i<ary.length; i++) {
    //     let item = ary[i];
    //     if(newAry.includes(item)) {
    //         continue;
    //     }
    //     newAry.push(item);
    // }

    // ES6箭头函数简写
    ary.forEach(item => {
        // forEach( ) 是没遇到一项就执行一次函数, 要用return 直接返回函数,而不是 continue
        // 这里使用 includes() /indexOf() 原理都是一样的
        if (newAry.includes(item)) return;
        newAry.push(item);
    });
    return newAry;
}

// 方案二
// 1. 从第一开始一次向后面对比, 遇到相同就删除

function unique_two(ary = []) {
    for (let i = 0; i < ary.length; i++) {
        let item = ary[i];
        for (let j = i + 1; j < ary.length; j++) {
            if (item === ary[j]) {
                // 使用splice() 删除数组元素后, 数组会向前移动, 此时j++会跳过一个数
                // 这也叫数组塌陷, 解决方式是: j先 --,再++, 使j的位置保持不动
                ary.splice(j, 1);
                j--;
            }
        }
    }
    return ary;
}

// 方案三(效率最高)
// 1. 循环数组, 使用对象接收每一项数据, 数据值作为对象的 属性名和属性值 ( item: item)
// 2. 赋值对象的时候, 要检查对象中是否有相同的 数据, 有就说明这个数据是重复的, 需要删除

function unique_three(ary = []) {
    let recvObject = {};
    // for (let i = 0; i < ary.length; i++) {
    //     let item = ary[i];
    //     if (recvObject[item] === undefined) {
    //         recvObject[item] = item;
    //         continue;
    //     };
    //     // 不推荐使用 splice() 方法, splice会使数组向前移动, 遇到很长的数组这个过程会很影响速度
    //     // ary.splice(i, 1);

    //     // 将找到的这项和数组最后一项互换, 在删除最后一项
    //     // 其实都不用互换,只要将最后一个替换找到的就行, 最后一项都是要删除的,没必要替换了(但是这样会改变原有顺序)
    //     ary[i] = ary[ary.length-1];
    //     // 只有换最后一项才好删除,所以尽管会改变原有顺序,但也没办法)
    //     // 如果要保持原有循序不变, 就需使用新的数组,而不是在原数组上操作
    //     ary.length--;
    //     i--;
    // }
    let newAry = [];
    for (let i = 0; i < ary.length; i++) {
        let item = ary[i];
        if (recvObject[item] === undefined) {
            recvObject[item] = item;
            newAry.push(item);
        }
    }
    return newAry;
}

// 方案四(这个效率也很不错)
// 1. 使用ES6的 set( ) 方法去重

function unique_four(ary = []) {
    // 使用 ... 展开运算符, 将set集合中的数据写入数组中
    return [...new Set(ary)];
}

// 方案五
// 1. 先排序,在逐一比较
// 2. 因为已经排好序,比较只要一次循环就可以了

function unique_five(ary = []) {
    let newAry = [];
    ary.sort((a, b)=>a-b);
    for(let i=0; i< ary.length; i++) {
        let item = ary[i];
        if(item !== ary[i+1]) newAry.push(item);
    }
    return newAry;
}

// 方案6
// 1. 先排序, 在使用 join字符串化
// 2. 使用正则表达式 ,和字符串方法

function unique_six(ary=[]) {
    ary.sort((a,b) => a-b);
    // 使用 @ 为分隔符, 最后再加一个@, 让一个数字跟着一个分隔符
    let str = ary.join("@") + '@';
    // 正则表达式, 找到所有以数字开头, @结尾的字符, \1 出现一模一样的内容(不会被捕获)
    let reg = /(\d+@)\1*/g;
    let newAry = [];
    str.replace(reg, (n,m)=>{
        m = Number(m.slice(0, m.length-1));
        newAry.push(m);
    });
    return newAry;
}

// 方案7
// 基于 indexOf() 查找, 如果当前值的位置 === 第一次出现的位置, 那么存入
function unique_seven(arry=[]){
    let newAry = [];
    arry.forEach((item, index)=>{
        if(arry.indexOf(item) === index) newAry.push(item);
    });
    return newAry;
}




console.log(unique_one([1, 2, 3, 2, 2, 3, 3, 4, 1, 1, 7, 2, 4, 7]));
console.log(unique_two([1, 2, 3, 2, 2, 3, 3, 4, 1, 1, 7, 2, 4, 7]));
console.log(unique_three([1, 2, 3, 2, 2, 3, 3, 4, 1, 1, 7, 2, 4, 7]));
console.log(unique_four([1, 2, 3, 2, 2, 3, 3, 4, 1, 1, 7, 2, 4, 7]));
console.log(unique_five([1, 2, 3, 2, 2, 3, 3, 4, 1, 1, 7, 2, 4, 7]));
console.log(unique_six([1, 2, 3, 2, 2, 3, 3, 4, 1, 1, 7, 2, 4, 7]));
console.log(unique_seven([1, 2, 3, 2, 2, 3, 3, 4, 1, 1, 7, 2, 4, 7]));