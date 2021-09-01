/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-01 16:46:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-01 17:47:20
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

console.log(dijkstra(graph.graph, 0))

function dijkstra(graph, src) {
  const INF = Infinity 

  const {
    length
  } = graph
  const dist = new Array(length).fill(INF)
  const visited = new Array(length).fill(false)

  dist[src] = 0
  for (let i = 0; i < length; i++) {
    const u = minDistance(dist, visited)
    visited[u] = true
    for (let v = 0; v < length; v++) {
      if (!visited[v] &&
        graph[u][v] !== 0 &&
        dist[u] !== INF &&
        dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v]
      }
    }
  }
  return dist
}

function minDistance(dist, visited) {
  let min = Infinity
  let minIndex = -1
  for (const index in dist) {
    if (visited[index] === false && dist[index] <= min) {
      min = dist[index]
      minIndex = index
    }
  }
  return minIndex
}