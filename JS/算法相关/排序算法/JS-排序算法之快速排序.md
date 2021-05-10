# JS排序算法之快排和归并
[Toc]
## 快速排序
> 原理: 选择一个key(一般是第一个元素), 将数组划分为两个区域. 左边全部区域小于等于key, 右边全部大于key. 然后在通过这种方法将每个区域划分为两个区域. 整个过程可以递归实现,以此实现整个数据有序

+ 时间复杂度: O(n*log(n)) 
+ 最坏时间复杂度: O(n^2)
  + 最坏情况: 原数组是升序(降序), 需要排成降序(升序)
+ 不稳定的排序
+ 特性: 数组分块,且左边区域小于右边(升序)
+ 不稳定原因: 元素交换是跨元素直接交换, 相邻相同元素可能发生位置交换
+ 性能: 最好的的快速排序方法

> 示例过程:

![image.png](https://i.loli.net/2020/03/20/yAiNfegYcVmQHSr.png)


```JavaScript
function quickSort(ary) {
    let n = ary.length;
        function sort(ary, start, end) {
            if(end <= start) return;
            let i = start,
                j = end,
                key = ary[start]; // 设置第一个元素为key
            while(true) {
                // 从左向右找到大于key的元素位置(大于key循环停止, i就是该元素位置)
                while(ary[++i] < key) {
                    // 到达末尾退出循环
                    if(i === end) break;
                }
                // 从右向左找到小于key的元素位置
                while(ary[--j] > key) {
                    // 到达头部退出循环
                    if(j === start) break;
                }
                // 如果 i和j相交, 直接退出循环
                if(i>=j) break;
                // 交换左右两边元素
                let temp = ary[i];
                ary[i] = ary[j];
                ary[j] = temp;
            }
            // 交换key和最后一个小于key值的元素(就是arr[j])
            let temp = ary[start];
            ary[start] = ary[j];
            ary[j] = temp;
            sort(ary, start, j);
            sort(ary, j+1, end);
        }
    sort(ary, 0, n);
    return ary;
}
```
> 效果演示:

![快速排序.gif](https://i.loli.net/2020/03/20/tL4K3kwR6qW9z2U.gif)


## 归并排序
> 原理: 先将数组不断折分为左右两个小数组, 然后再对小数组排序并合并起来

+ 时间复杂度: O(n*log(n))
+ 稳定的排序算法
  + 稳定原因: 排序是两两元素值之间的互换, 相邻相同元素位置不会被改变
+ 性能: 速度仅次与快排(如果使用递归方法,在处理庞大数据时可能出现内存不足情况), 比快排稳定,任何时候时间复杂度都是O(n*long(n));
+ 特点: 数组会不断对半平分, 然后再排序合并. 先小区间有序,再大区间, 区间间隔相等.
+ 优化: TimeSort排序

**示例过程:**
![示例过程图](https://images2015.cnblogs.com/blog/1024555/201612/1024555-20161218163120151-452283750.png)

```JavaScript
    function mergeSort(items) {
        if (items.length == 1) {
            return items;
        }
        //将数组对半平分为左右两个数组
        var middle = Math.floor(items.length / 2),
            left = items.slice(0, middle),
            right = items.slice(middle);

        function merge(left, right) {
            var result = [];
            // 通过这个循环来排序
            while (left.length > 0 && right.length > 0) {
                if (left[0] < right[0]) {
                    /*shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。*/
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }
            //合并两个数组
            return result.concat(left).concat(right);
        }

    // 递归调用
    return merge(mergeSort(left), mergeSort(right));
}
```

> 效果示例

![归并排序.gif](https://i.loli.net/2020/03/21/axNiVM2KBw7gUFl.gif)

>gif来源: [排序算法-散点可视化](https://www.bilibili.com/video/av49706352?t=34)