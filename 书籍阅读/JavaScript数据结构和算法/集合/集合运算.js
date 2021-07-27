/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-07-26 18:47:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-27 22:17:44
 * @Description:
 */

// 超集: 如果一个集合S2中的每一个元素都在集合S1中，且集合S1中可能包含S2中没有的元素，则集合S1就是S2的一个超集
// 交集: 设A，B是两个集合，由所有属于集合A且属于集合B的元素所组成的集合，叫做集合A与集合B的交集
// 并集: 集合A，B，把他们所有的元素合并在一起组成的集合，叫做集合A与集合B的并集
// 补集
//     相对补集: 若A和B 是集合, 则A 在B 中的相对补集是这样一个集合：其元素属于B但不属于A (差集)
//     绝对补集: 若给定全集U，有A⊆U，则A在U中的相对补集称为A的绝对补集（或简称补集）
//              即一般地，设S是一个集合，A是S的一个子集，由S中所有不属于A的元素组成的集合，叫做子集A在S中的绝对补集    


// let Set = require('./集合.js')

/**
 * 判断set是否是subset的超集
 * @param {Set} set
 * @param {Set} subset
 * @return {Boolean}
 */
function isSuperset(set, subset) {
  for (let ele in subset) {
    if (!set.has(ele)) return false;
  }
  return true;
}

/**
 * 两个集合的并集
 * @param {Set} setA 
 * @param {Set} setB 
 * @return {Set}
 */
function union(setA, setB) {
  let _union = new Set(setA)
  for (let ele of setB) {
    _union.add(ele)
  }
  return _union
}

/**
 * 两个集合交集
 * @param {Set} setA 
 * @param {Set} setB 
 */
function intersection(setA, setB) {
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}


/**
 * B 在 A 中的相对补集, 属于A但不属于B
 * @param {Set} setA 
 * @param {Set} setB 
 * @returns {Set}
 */
function difference(setA, setB) {
  let _difference = new Set(setA)
  for (let elem of setB) {
    _difference.delete(elem)
  }
  return _difference
}

/**
 * 对称补集, A中没有B的元素和B中没有A的元素
 * @param {Set} setA 
 * @param {Set} setB 
 * @returns {Set}
 */
function symmetricDifference(setA, setB) {
  let _difference = new Set(setA)
  for (let elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem)
    } else {
      _difference.add(elem)
    }
  }
  return _difference
}
const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 3])
const setC = new Set([3, 4, 5, 6])

console.log(isSuperset(setA, setB)) // returns true)
console.log(union(setA, setC)) // returns Set {1, 2, 3, 4, 5, 6}
console.log(intersection(setA, setC)) // returns Set {3, 4}
console.log(symmetricDifference(setA, setC)) // returns Set {1, 2, 5, 6}
console.log(difference(setA, setC)) // returns Set {1, 2}symmetricDifference(setA, setC)