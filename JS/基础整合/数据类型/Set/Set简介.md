# Set 简介

> 允许存储任何类型的唯一值, 无论是原始类型还是对象引用

Set 中判断值的相等大体和 `===` 相同, 但是有一点细微区别

> Set 中使用 [零值相等算法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E9%9B%B6%E5%80%BC%E7%9B%B8%E7%AD%89)

在 Set 中 `NaN` 被认为和自身相等, 而 `NaN === NaN` 是 false

此外 Set 中 `0` `-0` `+0` 被认为是相等, 这点和 `===` 相同

实践中: 集合组重要的不是添加和删除元素, 而是检查某一个值是不是集合的成员

数组的 includes 也可以执行成员检测, 但是它的速度和数组大小成反比. 因此, 使用数组作为集合比使用真正的 Set 对象要慢的多
