/*
 * @Author: huangyingli
 * @Date: 2022-05-01 22:00:51
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-05-03 21:04:03
 * @Description:
 */

import { TreeNode } from './二叉搜索树';

interface Tree {
  root: TreeNode | null;
  insert(value: number): void;
  search(value: number): TreeNode | null;
  remove(value: number): Boolean;
  min(): number;
  preOrder(cb: Function): void;
  inOrder(cb: Function): void;
  postOrder(cb: Function): void;
  levelOrder(cb: Function): void;
}

class Tree {
  constructor() {
    this.root = null;
  }

  insert(value: number): void {
    this.root = Tree.insertNode(this.root, value);
  }

  static insertNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) {
      node = new TreeNode(value);
    } else {
      if (node.value > value) {
        node.left = Tree.insertNode(node.left, value);
      } else {
        node.right = Tree.insertNode(node.right, value);
      }
    }
    return node;
  }

  search(value: number): TreeNode | null {
    return Tree.searchNode(this.root, value);
  }

  static searchNode(node: TreeNode | null, value: number): TreeNode | null {
    let result: TreeNode | null;
    if (node === null || node.value === value) {
      result = node;
    } else {
      if (node.value > value) {
        result = Tree.searchNode(node.left, value);
      } else {
        result = Tree.searchNode(node.right, value);
      }
    }
    return result;
  }

  remove(value: number): Boolean {
    return Tree.removeNode(this.root, value) ? true : false;
  }

  static removeNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) {
      return node;
    } else if (node.value > value) {
      node.left = Tree.removeNode(node.left, value);
      return node;
    } else if (node.value < value) {
      node.right = Tree.removeNode(node.right, value);
      return node;
    } else {
      if (node.right === null && node.left === null) {
        node = null;
        return node;
      }

      if (node.right === null) {
        node = node.left;
        return node;
      } else if (node.left === null) {
        node = node.right;
        return node;
      }

      let temp = Tree.minNode(node.right);
      node.value = temp.value;
      node.right = Tree.removeNode(node.right, temp.value);
      return node;
    }
  }

  min(): number {
    let min = Tree.minNode(this.root);
    return min.value;
  }

  static minNode(node: TreeNode | null): TreeNode {
    if (node === null) {
      throw Error('树没有初始化');
    }
    if (node.left === null) {
      return node;
    } else {
      return Tree.minNode(node.left);
    }
  }

  from(aryLike: Array<number>) {
    aryLike.forEach((value) => {
      this.insert(value);
    });
  }

  preOrder(cb: Function): void {
    Tree.preOrderNode(this.root, cb);
  }

  static preOrderNode(node: TreeNode | null, cb: Function): void {
    if (node === null) {
      return;
    }
    cb(node.value);
    Tree.preOrderNode(node.left, cb);
    Tree.preOrderNode(node.right, cb);
  }

  inOrder(cb: Function): void {
    Tree.inOrderNode(this.root, cb);
  }

  static inOrderNode(node: TreeNode | null, cb: Function): void {
    if (node === null) return;
    Tree.inOrderNode(node.left, cb);
    cb(node.value);
    Tree.inOrderNode(node.right, cb);
  }

  postOrder(cb: Function): void {
    Tree.postOrderNode(this.root, cb);
  }

  static postOrderNode(node: TreeNode | null, cb: Function): void {
    if (node === null) return;
    Tree.postOrderNode(node.left, cb);
    Tree.postOrderNode(node.right, cb);
    cb(node.value);
  }

  levelOrder(): Array<Array<any>> {
    let result: Array<Array<any>> = [];
    Tree.levelOrderNode(this.root, result, 0);
    return result;
  }

  static levelOrderNode(
    node: TreeNode | null,
    result: Array<Array<any>>,
    level: number
  ): void {
    if (node === null) return;
    if (!result[level]) result[level] = [];
    result[level].push(node.value);
    Tree.levelOrderNode(node.left, result, level + 1);
    Tree.levelOrderNode(node.right, result, level + 1);
  }

  get maxDep(): number {
    return Tree.maxDepNode(this.root);
  }

  static maxDepNode(node: TreeNode | null, level: number = 0): number {
    if (node === null) return level;
    let left = Tree.maxDepNode(node.left, level + 1);
    let right = Tree.maxDepNode(node.right, level + 1);
    return Math.max(left, right);
  }

  get height(): number {
    return Tree.heightNode(this.root);
  }

  static heightNode(node: TreeNode | null): number {
    let lh = 0;
    let rh = 0;
    if (node === null) return 0;

    lh = Tree.heightNode(node.left);
    rh = Tree.heightNode(node.right);
    return Math.max(lh, rh) + 1;
  }
}

let tree = new Tree();

tree.from([19, 39, 12, 3, 45, 7, 89, 100]);

console.log(tree.search(3));

console.log('先序遍历');
tree.preOrder((i: any) => console.log(i));

console.log('中序遍历');
tree.inOrder((i: any) => console.log(i));

console.log('后续遍历');
tree.postOrder((i: any) => console.log(i));

console.log('层序遍历');
console.log(tree.levelOrder());

console.log('最大深度', tree.maxDep);

console.log('树高度', tree.height);
