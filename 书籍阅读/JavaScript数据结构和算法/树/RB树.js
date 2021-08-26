/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-26 15:26:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 16:42:14
 * @Description: 
 */

import treeObj from './二叉搜索树.js'

const {
  BinarySearchTree,
  Node
} = treeObj

const Colors = {
  RED: 'red',
  BLACK: 'black'
}

class RedBackNode extends Node {
  constructor(value) {
    super(value)
    this.color = Colors.RED
    this.parent = null
  }
  isRed() {
    return this.color === Colors.RED
  }
}


class ReadBlackTree extends BinarySearchTree {
  constructor() {
    super()
  }

}