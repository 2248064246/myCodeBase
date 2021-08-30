/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-27 15:54:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 17:30:27
 * @Description: 
 */

import HashTable from "../字典和散列/散列-分离链接.js";
import breadthFirstSearch from "./广度优先搜索.js";

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected // 表示是否是有向图
    this.vertices = [] // 存放顶点
    this.adjList = new HashTable() // 存放顶点的邻接点
  }

  /**
   * 增加顶点
   * @param {*} v 
   */
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, []) // 初始化该顶点的邻接表
    }
  }

  /**
   * 增加边, v, w 是两个节点
   * @param {*} v 
   * @param {*} w 
   */
  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v)
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w)
    }
    this.adjList.get(v).value.push(w) // v, w 相邻
    if (!this.isDirected) {
      this.adjList.get(w).value.push(v) // 无向, 双向都需要增加相邻点
    }
  }

  getVertices() {
    return this.vertices
  }

  getAdjList() {
    return this.adjList
  }

  toString() {
    let s = '',
      vertices = this.getVertices(),
      adjList = this.getAdjList()
    for (let i = 0; i < vertices.length; i++) {
      s += `${vertices[i]} ->  `
      const neighbors = adjList.get(vertices[i]).value
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]}  `
      }
      s += '\n'
    }
    return s
  }
}

const graph = new Graph();

const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph.toString())

breadthFirstSearch(graph, myVertices[0], value => console.log('Visited Vertex:', value))