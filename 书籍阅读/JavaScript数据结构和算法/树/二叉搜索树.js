/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-20 13:49:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-23 15:21:48
 * @Description: 
 */


class Node {
  /**
   * 初始化节点值
   * @param {*} value 
   */
  constructor(value) {
    this.value = value
    this.left = null // 左节点
    this.right = null // 右节点
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null // 根节点
  }

  /**
   * 向树中插入一个新的值
   * @param {*} value 
   */
  insert(value) {
    if (this.root === null) {
      this.root = new Node(value)
    } else {
      this.insertNode(this.root, value)
    }
  }

  /**
   * 在单前节点下插入节点
   * @param {Node} node 
   * @param {*} value 
   */
  insertNode(node, value) {
    // 需要判断要插入的值是否小于点前节点
    if (value <= node.value) {
      if (node.left == null) {
        node.left = new Node(value)
      } else {
        this.insertNode(node.left, value)
      }
    } else {
      // 比单前节点大, 放入右边
      if (node.right == null) {
        node.right = new Node(value)
      } else {
        this.insertNode(node.right, value)
      }
    }
  }

  /**
   * 在树中查找一个键, 存在返回true, 不存在返回false
   * @param {*} value 
   */
  search(value) {
    return this.searchNode(this.root, value)
  }

  searchNode(node, value) {
    if (node === null) {
      return undefined
    }
    if (node.value < value) {
      return this.searchNode(node.right, value)
    } else if (node.value > value) {
      return this.searchNode(node.left, value)
    } else {
      return node
    }
  }

  min() {
    let minNode = this.minNode(this.root)
    return minNode ? minNode.value : undefined
  }

  minNode(node) {
    while (node !== null && node.left !== null) {
      node = node.left
    }
    return node
  }

  max() {
    let maxNode = this.maxNode(this.root)
    return maxNode ? maxNode.value : undefined
  }

  maxNode(node) {
    while (node !== null && node.right !== null) {
      node = node.right
    }
    return node
  }
  /**
   * 从树中移除一个值
   * @param {*} value 
   */
  remove(value) {
    this.root = this.removeNode(this.root, value)
  }

  removeNode(node, value) {
    if (node === null) {
      return node
    }
    if (node.value > value) {
      node.left = this.removeNode(node.left, value)
      return node // 这边需要一直向上返回, 以更新树中数据
    } else if (node.value < value) {
      node.right = this.removeNode(node.right, value)
      return node
    } else {
      // 第一种情况: 移除没有子节点的节点(叶节点)
      if (node.left === null && node.right === null) {
        // 直接干掉
        node = null
        return node
      }
      // 第二种情况: 移除有一个子节点的节点
      if (node.left === null) {
        // 交换子节点和单前节点
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }
      // 第三种情况: 移除有两个子节点的节点
      const aux = this.minNode(node.right)
      node.value = aux.value
      node.right = this.removeNode(node.right, aux.value)
      return node
    }
  }

  /**
   * 中序遍历
   */
  inOrderTraverse(cb) {
    this.inOrderTraverseNode(this.root, cb)
  }

  inOrderTraverseNode(node, cb) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, cb)
      cb(node.value)
      this.inOrderTraverseNode(node.right, cb)
    }
  }

  /**
   * 先序遍历
   */
  preOrderTraverse(cb) {
    this.preOrderTraverseNode(this.root, cb)
  }

  preOrderTraverseNode(node, cb) {
    if (node !== null) {
      cb(node.value)
      this.preOrderTraverseNode(node.left, cb)
      this.preOrderTraverseNode(node.right, cb)
    }
  }

  /**
   * 后续遍历
   */
  postOrderTraverse(cb) {
    this.postOrderTraverseNode(this.root, cb)
  }

  postOrderTraverseNode(node, cb) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, cb)
      this.preOrderTraverseNode(node.right, cb)
      cb(node.value)
    }
  }
  height() {
    return this.getNodeHeight(this.root)
  }
  getNodeHeight(node) {
    let hl = 0,
      hr = 0;
    if (node === null) return 0
    else {
      if (node.left !== null) {
        hl = this.getNodeHeight(node.left)
      }
      if (node.right !== null) {
        hr = this.getNodeHeight(node.right)
      }
      return (hl > hr ? hl : hr) + 1;
    }

    // if (node === null) return -1
    // return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
  }
}


let tree = new BinarySearchTree()

tree.insert(11)
tree.insert(7)
tree.insert(5)
tree.insert(3)
tree.insert(6)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(14)
tree.insert(20)

console.group('中序遍历')
tree.inOrderTraverse(value => {
  console.info(value)
})
console.groupEnd('中序遍历')

console.group('先序遍历')
tree.preOrderTraverse(value => {
  console.log(value)
})
console.groupEnd('先序遍历')

console.group('后续遍历')
tree.postOrderTraverse(value => console.log(value))
console.groupEnd('后续遍历')

console.log('min', tree.min())
console.log('max', tree.max())
console.log('search', tree.search(7))

console.log('remove', tree.remove(3))


export default {
  BinarySearchTree,
  Node
}