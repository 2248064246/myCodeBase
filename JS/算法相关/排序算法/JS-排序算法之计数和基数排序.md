# JS-排序算法之计数和基数排序
[Toc]

## 计数排序
> 利用数组的index是天然有序的特征来排序. 例如: 已知一个乱序数组的范围是0~10,长度未知, 我们只需要遍历一遍数组,点出每个值出现的次数,并用一个新数组来存储这个次数,就能做到排序. 假如数字1出现3次, 那么新数组newAry[1]=3, 在新数组遍历的时候输出3次"1"

+ 时间复杂度O(n~K)
+ 稳定的排序算法
+ 性能: 由于是非比较排序, 速度快于其他任何排序算法,
+ 缺点: 需要知道数组值的范围, 且不适用于范围波动很大但长度小的数组
  + 例如: 数组长度10, 但是值的范围在 0~1000000, 计数排序用来计数的数组将会很大
+ 特点: 先遍历数组计算数值出现次数, 然后就排序好了...
```JavaScript
    function countSort(ary) {
        let newAry = new Array(ary.length).fill(0);
        for (const value of ary) {
            newAry[value]++;
        }
        ary = [];
        // 给ary重新赋值
        for(var i =0; i<newAry.length; i++) {
            // 循环数字次数
            for(var k = newAry[i]; k>0; k--) {
                ary.push(i);
            }
        }
        newAry = null;
        return ary;
    }
```

> 效果演示:

![计数排序.gif](https://i.loli.net/2020/03/22/RcMr8k6WTfwe4sD.gif)

## 基数排序
> 从左到右按位排序, 先排个位, 再排十位,百位... 需要用到计数排序的方法-使用数组计数


```JavaScript
    function radixSort(ary) {
    // 获取最大值
    let maxNum = Math.max.apply(Math, ary);
    let t = 1,
        bucketAry = new Array(10), // 0~9的数组,用来计算数字出现次数
        temp = new Array(ary.length); // 交换数组, 用来临时存储排序的数
    // 这一步是计算最大数有多少位,这个位数就是要循环的次数
    while ((maxNum /= 10) >= 1) {
        t++;
    }
    let rate = 1,
        K= null;
    for (let i = 1; i <= t; i++) {
        // 计数数组归零
        bucketAry.fill(0);
        // 清点数字次数
        ary.forEach((item) => {
            // 求数字最后一位的值
            k = Math.floor(item / rate) % 10;
            bucketAry[k]++;
        });
        // 通过数字次数得到该数字应该在数组中的位置
        bucketAry.reduce((total, item, index) => {
            bucketAry[index] = total + item;
            return total + item
        });
        // 通过计算的顺序将ary中数存入temp数组中
        for (let j = ary.length - 1; j >= 0; j--) {
            k = Math.floor(ary[j] / rate) % 10;
            temp[bucketAry[k] - 1] = ary[j];
            bucketAry[k]--;
        }
        // 将temp相同位置的值负值给ary, 不能直接 ary = temp
        ary = ary.map((item, index)=>temp[index]);
        rate *= 10;
    }
    temp = null;
    bucketAry = null;
    return ary;
}
```

> 效果演示:

![基数排序.gif](https://i.loli.net/2020/03/22/rGhnED5SBM6mHWo.gif)



