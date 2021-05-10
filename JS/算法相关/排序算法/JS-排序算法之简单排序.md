# JS排序之简单排序
[Toc]

## 冒泡排序
+ 时间复杂度: O(n^2)
+ 稳定的排序算法
+ 特点: 从后向前找,有序区数字一定全部小于(或大于)无序区数字
+ 性能: 慢
+ 优化: 双向冒泡(鸡尾酒排序)
```JavaScript
    function bubbleSort(ary) {
        let exchange = 0, 
            temp = null,
             n = ary.length;
        // i<n-1 而不是 i<n, 当遍历到n-1次时已近排好序了 >, 
        for(let i=0; i<n-1; i++) {
            // 从后面向前遍历, 用前一项比后一项
            for(let j = n-2; j>=i; j--) {
                if(ary[j+1] < ary[j]) {
                    temp = ary[j];
                    ary[j] = ary[j+1];
                    ary[j+1] = temp;
                    exchange = 1;
                }
            }
            // 如果没有发生交换(表明排序完成),直接退出排序
            if(exchange) break;
        }
        return ary;
    }
```
> 效果示例:

![冒泡排序](https://i.loli.net/2020/03/20/XHGW2ut9OrTNLdC.gif)

## 直接插入排序
+ 时间复杂度: O(n^2)
+ 稳定的排序算法
+ 特点: 将单前元素插入前面有序区中排序, 有序区中元素不一定小于(大于)无序区元素
+ 性能: 在数组元素基本有序的情况下速度很快
+ 优化: 设置增量, 让数组基本有序,然后在不断缩减增强(希尔排序)

```JavaScript
    function straightInsertionSort(ary) {
        let n = ary.length,
            temp = null;
        for (let i = 1; i < n; i++) {
            // 如果后一项小于前一项,说明需要交换
            if (ary[i] < ary[i - 1]) {
                // temp = 需要交换的项
                temp = ary[i];
                let j = i - 1;
                do {
                    // 前面的向后面移动
                    ary[j + 1] = ary[j];
                    j--;
                } while (j >= 0 && temp < ary[j]); // 找到temp需要插入的位置
                // 插入temp
                ary[j + 1] = temp;
            }
        }
    return ary;
    }
```

> 效果显示:

![直接插入排序.gif](https://i.loli.net/2020/03/20/ydlRLKJD274iYeI.gif)

## 直接选择排序
+ 时间复杂度: O(n^2)
+ 不稳定的排序算法
+ 特点: 从前向后找到最小(最大)的, 然后和第一个交换, 有序区一定小于(大于)无序区
+ 性能: 比冒泡强
+ 不稳定原因: 元素的交换可能直接跨过多个元素,相等元素可能发生位置变化
  + 例如: 553 => 排序时 第一个5和3直接交换, 第一个5就到第二个5后面去了, 位置发生变化
优化: 
```JavaScript
    function straightSelectSort(ary) {
        let n = ary.length,
            temp = null;
        for(let i=0; i<n-1; i++) {
            let k = i;
            for(let j = i+1; j<n; j++) {
                // 找到最小值的位置
                if(ary[j]<ary[k]) k=j;
            }
            if(k!== i) {
                temp = ary[i];
                ary[i] = ary[k];
                ary[k] = temp;
            }
        }
        return ary;
    }
```

> 效果示例:

![直接选择排序.gif](https://i.loli.net/2020/03/20/8mzTdYtOAaUP4ij.gif)

>gif来源: [排序算法-散点可视化](https://www.bilibili.com/video/av49706352?t=34)