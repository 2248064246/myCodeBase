/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-26 16:56:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 11:49:29
 * @Description: 
 */

class MinHeap {
  constructor() {
    this.heap = []

  }

  compareFn(a, b) {
    return a > b
  }

  getLeftIndex(index) {
    return 2 * index + 1
  }
  getRightIndex(index) {
    return 2 * index + 2
  }
  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  /**
   * 插入一个值, 成功返回true, 失败返回false
   * @param {*} value 
   */
  insert(value) {
    if (value !== null || value !== undefined) {
      this.heap.push(value) // 将值插入
      this.siftUp(this.heap.length - 1) // 需要上移比较, 将值放入合适位置
    }
    return false
  }

  /**
   * 上移操作
   * @param {*} index 
   */
  siftUp(index) {
    let parent = this.getLeftIndex(index)
    while (index > 0 && this.compareFn(this.heap[parent], this.heap[index])) {
      this.swap(parent, index)
      index = parent
      parent = this.getParentIndex(index)
    }
  }

  size() {
    return this.heap.length
  }

  isEmpty() {
    return this.size() === 0
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }

  /**
   * 移除堆顶的值, 并返回这个值
   */
  extract() {
    if (this.isEmpty()) {
      return undefined
    }
    if (this.size() === 1) {
      return this.heap[0]
    }
    const removedValue = this.heap.shift()
    this.heap[0] = this.heap.pop()
    this.siftDown(0)
    return removedValue
  }
  siftDown(index) {
    let element = index
    const left = this.getLeftIndex(index)
    const right = this.getRightIndex(index)
    const size = this.size()
    if (left < size && this.compareFn(this.heap[element], this.heap[left])) {
      element = left
    }
    if (right < size && this.compareFn(this.heap[element], this.heap[right])) {
      element = right
    }
    if (index !== element) {
      this.swap(index, element)
      this.siftDown(element)
    }
  }
}