/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-01 16:46:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-02 10:30:04
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
  const dist = new Array(length).fill(INF) // 初始化记录路径的数组
  const visited = new Array(length).fill(false) // 初始化已访问数组

  dist[src] = 0 // 自己到自己设置为0
  for (let i = 0; i < length; i++) {
    const u = minDistance(dist, visited) // 找到dist中未访问中的最小的值的下标
    visited[u] = true // 该顶点被访问
    for (let v = 0; v < length; v++) { // 
      if (!visited[v] && // 未访问
        graph[u][v] !== 0 && // u, v 两点可以访问
        dist[u] !== INF && // 到u点存在路径
        dist[u] + graph[u][v] < dist[v]) { // 到u点的距离 + u到v点的距离 小于 直接到 v点的距离
        dist[v] = dist[u] + graph[u][v] // 更新到 v 点的距离
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