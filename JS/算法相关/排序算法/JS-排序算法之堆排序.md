# 排序算法之堆排序
[Toc]

## 什么是堆?
+ 堆是一颗完全二叉树
+ 堆分为 最大堆和最小堆
+ 最大堆父节点都大于子节点, 最小堆父节点都小于子节点
+ 左子节点: 2*i +1 (i: 父节点index)
+ 右子节点: 2*i+2

## 堆排序
> 利用最大堆实现升序, 最小堆实现降序. 因为最大堆的根父节点一定是最大的, 让它和队尾元素互换, 然后在从堆中排除最后一个元素, 并复原最大堆. 循环 n-1次.

**关键在于构建最大堆**

>最大堆的构建过程

![image.png](https://i.loli.net/2020/03/21/Mqn8abVcAim9GTu.png)

+ 时间复杂度: O(n*log(n))
+ 不稳定的排序
+ 特征: 找出最大的元素放在末尾(升序)

```JavaScript
    function heapSort(ary) {
        // 实现最大堆
        // start: 父节点, end: 循环深度
        function maxHeap(ary, start, end) {
            let parent = start, // 父节点
                son = parent*2 + 1, // 左子节点
                temp = null;
            // 规定循序最大深度
            while(son<=end) {
                // 如果存在右子节点, 并且判断右节点是否大于左节点
                if(son+1<=end && ary[son] < ary[son+1]) son++;
                if(ary[son] > ary[parent]) {
                    temp = ary[son];
                    ary[son] = ary[parent];
                    ary[parent] = temp;
                    parent = son;
                    son = parent*2 +1;
                }else {
                    return;
                }
            }
        }
        // 构建最大堆  ary.length/2-1: 表示最后一个父节点
        for(let i = ary.length/2-1; i>=0; i--) {
            maxHeap(ary, i, ary.length-1);
        }
        // 排序
        for(let i = ary.length-1; i>0; i--) {
            let temp = ary[0];
            ary[0] = ary[i];
            ary[i]= temp;
            // 剔除最后一个元素,并复原最大堆
            maxHeap(ary, 0, i-1);
        }
        return ary;
    }
```

> 效果演示:

![堆排序.gif](https://i.loli.net/2020/03/21/vydzWIEbCjXALs5.gif)





