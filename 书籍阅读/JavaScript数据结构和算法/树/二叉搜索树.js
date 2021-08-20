/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-20 13:49:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-20 17:14:11
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
    return this.minNode(this.root)
  }

  minNode(node) {
    while (node !== null && node.left !== null) {
      node = node.left
    }
    return node.value || undefined
  }

  max() {
    return this.maxNode(this.root)
  }

  maxNode(node) {
    while (node !== null && node.right !== null) {
      node = node.right
    }
    return node.value || undefined
  }
  /**
   * 从树中移除一个值
   * @param {*} value 
   */
  remove(value) {
    this.removeNode(this.root, value)
  }

  removeNode(node, value) {
    if (node === null) {
      return null
    }
    if (node.value > value) {
      this.removeNode(node.left, value)
    } else if (node.value < value) {
      this.removeNode(node.right, value)
    } else {
      // 第一种情况: 移除没有子节点的节点(叶节点)
      if (node.left === null && node.right === null) {
        // 直接干掉
        node = null
        return node
      }
      // 第二种情况: 移除有一个子节点的节点
      else if (node.left || node.right) {
        // 交换子节点和单前节点
        node = node.left ? node.left : node.right
        return node
      } else {
        // 第三种情况: 移除有两个子节点的节点
        const aux = this.minNode(node.right)
        node.value = aux
        node.right = this.removeNode(node.right, aux)
        return node
      }
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
}


let tree = new BinarySearchTree()

tree.insert(11)
tree.insert(7)
tree.insert(5)
tree.insert(3)
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