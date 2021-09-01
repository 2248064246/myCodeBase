/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-01 14:48:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-01 15:58:10
 * @Description: 
 */


import Graph from "../图-链接表.js";

import depth from '../深度优先搜索.js'

const {
  DFS
} = depth

const graph = new Graph(true) // 有向图

const myVertices = ['A', 'B', 'C', 'D', 'E', 'F']

for (const v of myVertices) {
  graph.addVertex(v)
}

graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'D')
graph.addEdge('B', 'E')
graph.addEdge('C', 'F')
graph.addEdge('F', 'E')

const result = DFS(graph)

console.log(result)

let fTimes = Object.entries(result.finished).sort((a, b) => b[1] - a[1]) // 这里需要完成时间的倒叙, 这便是这个图的拓扑排序

let s = fTimes.map(item => item[0]).join(' - ')
console.log(s) // => B - A - D - C - F - E 