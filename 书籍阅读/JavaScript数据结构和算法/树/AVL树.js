/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-23 10:58:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-23 15:21:57
 * @Description: 自平衡二叉树
 */

import treeObj from './二叉搜索树.js'

const {
  BinarySearchTree,
  Node
} = treeObj

const BalanceFactor = { // 平衡因子
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  UNBALANCED_LEFT: 4,
  SLIGHTLY_UNBALANCED_LEFT: 5
}

class AVL extends BinarySearchTree {
  constructor() {
    super()
  }
  getBalanceFactor(node) {
    const hightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch (hightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  rotationLL(node) {
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }

  rotationRR(node) {
    const tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }

  rotationLR(node) {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }

  rotationRL(node) {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }

  insert(value) {
    this.root = this.insertNode(this.root, value)
  }

  insertNode(node, value) {
    if (node == null) {
      return new Node(value)
    } else if (value < node.value) {
      node.left = this.insertNode(node.left, value)
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value)
    } else {
      return node
    }

    // 如果需要, 进行平衡操作
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (node.left.value > value) {
        node = this.rotationLL(node)
      } else {
        return this.rotationLR(node)
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (node.right.value < value) {
        node = this.rotationRR(node)
      } else {
        return this.rotationRL(node)
      }
    }
    return node
  }

  removeNode(node, value) {
    node = super.removeNode(node, value)
    if (node == null) {
      return node
    }
    // 检测是否平衡
    const balanceFactor = this.getBalanceFactor(node)
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left)
      if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationLL(node)
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left)
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationRR(node)
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right)
      }

    }
    return node
  }
}

let avlTree = new AVL()

avlTree.insert(6)
avlTree.insert(7)
avlTree.insert(3)
avlTree.insert(5)
avlTree.insert(8)
avlTree.insert(9)
avlTree.insert(10)
avlTree.insert(15)
avlTree.insert(20)
avlTree.insert(22)

console.log(avlTree, avlTree.height())

console.log(avlTree.inOrderTraverse(value => console.log('value', value)))
avlTree.remove(10)
console.log(avlTree, avlTree.height())

console.log(avlTree.inOrderTraverse(value => console.log('value', value)))