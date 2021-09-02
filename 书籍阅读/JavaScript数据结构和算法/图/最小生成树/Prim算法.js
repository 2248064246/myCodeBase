/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-02 10:48:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-02 16:51:31
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


const graph = new Graph()

let vertices = ['A', 'B', 'C', 'D', 'E', 'F']

graph.addVertices(vertices)

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

let path = prim(graph.graph)

function formatePath(path, vertices, graph) {
  let result = []
  for (const i in path) {
    let item = path[i]
    if (item == -1) continue
    result.push({
      Edge: `${vertices[item]} - ${vertices[i]}`,
      Weight: graph[item][i]
    })
  }
  return result
}
console.table(formatePath(path, vertices, graph.graph))

function prim(graph) {
  const INF = Infinity
  const parent = []
  const {
    length
  } = graph
  const key = new Array(length).fill(INF) // 初始化记录路径的数组
  const visited = new Array(length).fill(false) // 初始化已访问数组

  key[0] = 0
  parent[0] = -1
  for (let i = 0; i < length; i++) {
    const u = minKey(key, visited)
    visited[u] = true
    for (let v = 0; v < length; v++) {
      if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v]
      }
    }
  }
  return parent
}

function minKey(dist, visited) {
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