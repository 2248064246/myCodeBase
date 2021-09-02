/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-02 09:40:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-02 09:48:06
 * @Description: 
 */

// 需要先声明一个图的邻接矩阵

class Graph {
  constructor(direction = false) {
    this.graph = []
    this.vertices = [] // 顶点
    this.isDirected = direction // 表示是否是有向图
  }
  /**
   * 增加顶点
   * @param {Array} v 
   */
  addVertices(v) {
    // 先去重
    v = [...new Set(v)]
    for (const value of v) {
      this.vertices.push(value)
      this.graph.push(new Array(v.length).fill(0))
    }
  }
  /**
   * 增加边, v, w 是两个节点, len 边长度
   * @param {*} v 
   * @param {*} w 
   * @param {Number} len
   */
  addEdge(v, w, len) {
    let vIndex = this.vertices.indexOf(v)
    let wIndex = this.vertices.indexOf(w)
    if (vIndex !== -1 && wIndex !== -1) {
      this.graph[vIndex][wIndex] = len
    }
    if (!this.isDirected) {
      this.graph[wIndex][vIndex] = len
    }
  }

  toString() {
    let s = '',
      vertices = this.vertices,
      graph = this.graph;

    vertices.forEach((v, i) => {
      s += `${vertices[i]} ->  `
      const neighbors = graph[i]
      neighbors.forEach((n, j) => {
        if (n !== 0) {
          s += `${vertices[j]}  `
        }
      })
      s += '\n'
    })
    return s
  }
}


const graph = new Graph(true)

graph.addVertices(['A', 'B', 'C', 'D', 'E', 'F'])

graph.addEdge('A', 'B', 2)
graph.addEdge('A', 'C', 4)
graph.addEdge('B', 'C', 2)
graph.addEdge('B', 'E', 2)
graph.addEdge('B', 'D', 4)
graph.addEdge('C', 'E', 3)
graph.addEdge('E', 'D', 3)
graph.addEdge('E', 'F', 2)
graph.addEdge('D', 'F', 2)

console.log(graph.toString())

console.table(floydWarshall(graph.graph))

function floydWarshall(graph) {
  const dist = []
  const {
    length
  } = graph
  for (let i = 0; i < length; i++) {
    dist[i] = []
    for (let j = 0; j < length; j++) {
      if (i === j) {
        dist[i][j] = 0
      } else if (graph[i][j] === 0) {
        dist[i][j] = Infinity
      } else {
        dist[i][j] = graph[i][j]
      }
    }
  }
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }
  return dist
}