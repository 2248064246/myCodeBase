/*
 * @Author: huangyingli
 * @Date: 2022-02-14 10:45:17
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-14 16:54:31
 * @Description:
 */

interface TreeNode {
  left: TreeNode | null;
  right: TreeNode | null;
  value: number;
}

class TreeNode {
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

interface BST {
  root: TreeNode | null;
  /**
   * 向树中插入值
   * @param value
   */
  insert(value: number): void;
  /**
   * 给对应节点插入值
   * @param node
   * @param value
   * @returns 返回一个节点
   */
  search(value: number): TreeNode | null;
  max(): TreeNode | null;
  min(): TreeNode | null;
  remove(value: number): Boolean;
  /**
   * 从左到右, 先访问父节点, 在访问子节点(从根节点开始)
   * @param cb
   */
  preOrderTraverse(cb: Function): void;
  /**
   * 从左到右, 从最小的左节点开始, 再父节点, 再右节点
   * @param cb
   */
  inOrderTraverse(cb: Function): void;
  /**
   * 从左节点, 在右节点, 最后父节点
   * @param cb
   */
  postOrderTraverse(cb: Function): void;
}

/* 左节点小于父节点, 父节点小于右节点 */
class BST {
  constructor() {
    this.root = null;
  }

  insert(value: number) {
    this.root = BST.insertNode(this.root, value);
  }

  static insertNode(node: TreeNode | null, value: number): TreeNode {
    if (node === null) {
      node = new TreeNode(value);
    } else if (value < node.value) {
      node.left = BST.insertNode(node.left, value);
    } else {
      node.right = BST.insertNode(node.right, value);
    }
    return node;
  }

  search(value: number): TreeNode | null {
    return BST.searchNode(this.root, value);
  }

  static searchNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null || value === node.value) {
      return node;
    } else if (value < node.value) {
      return BST.searchNode(node.left, value);
    } else {
      return BST.searchNode(node.right, value);
    }
  }

  max(): TreeNode | null {
    return BST.maxNode(this.root);
  }

  static maxNode(node: TreeNode | null): TreeNode | null {
    if (node === null || node.right === null) {
      return node;
    }
    return BST.maxNode(node.right);
  }

  min(): TreeNode | null {
    return BST.minNode(this.root);
  }

  static minNode(node: TreeNode | null): TreeNode | null {
    if (node === null || node.left === null) {
      return node;
    }
    return BST.minNode(node.left);
  }

  remove(value: number): Boolean {
    return BST.removeNode(this.root, value) ? true : false;
  }

  static removeNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) {
      return node;
    } else if (value < node.value) {
      node.left = BST.removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = BST.removeNode(node.right, value);
      return node;
    } else {
      // 第一种情况: 移除没有子节点的节点(叶节点)
      if (node.left === null && node.right === null) {
        // 直接干掉
        node = null;
        return node;
      }
      // 第二种情况: 移除有一个子节点的节点
      if (node.left === null) {
        // 交换子节点和单前节点
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // 第三种情况: 移除有两个子节点的节点
      let aux = BST.minNode(node.right) as TreeNode;

      // 有两个子节点
      node.value = aux.value;
      node.right = BST.removeNode(node.right, aux.value);

      return node;
    }
  }

  preOrderTraverse(cb: Function) {
    BST.preOrderTraverseNode(this.root, cb);
  }

  static preOrderTraverseNode(node: TreeNode | null, cb: Function) {
    if (node === null) {
      return null;
    }
    cb(node.value);
    BST.preOrderTraverseNode(node.left, cb);
    BST.preOrderTraverseNode(node.right, cb);
  }

  inOrderTraverse(cb: Function) {
    BST.inOrderTraverseNode(this.root, cb);
  }

  static inOrderTraverseNode(node: TreeNode | null, cb: Function) {
    if (node === null) return null;
    BST.inOrderTraverseNode(node.left, cb);
    cb(node.value);
    BST.inOrderTraverseNode(node.right, cb);
  }

  postOrderTraverse(cb: Function) {
    BST.postOrderTraverseNode(this.root, cb);
  }

  static postOrderTraverseNode(node: TreeNode | null, cb: Function) {
    if (node === null) return null;
    BST.postOrderTraverseNode(node.left, cb);
    BST.postOrderTraverseNode(node.right, cb);
    cb(node.value);
  }
}

let tree = new BST();

[1, 3, 6, 7, 8, 9, 0, 12, 45, 67, 23].forEach((el) => {
  tree.insert(el);
});
console.time('search');
console.log(tree.search(12));
console.timeEnd('search');

console.time('max');
console.log(tree.max());
console.timeEnd('max');

console.log(tree.min());

console.log(tree.remove(67));

console.log(tree.max());

console.log('先序遍历:');
tree.preOrderTraverse((v: number) => console.log(v));

console.log('中序遍历:');
tree.inOrderTraverse((v: number) => console.log(v));

console.log('后序遍历:');
tree.postOrderTraverse((v: number) => console.log(v));
