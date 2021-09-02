/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-02 15:26:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-02 16:51:07
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

const initializeCost = graph => {
  const cost = [];
  const INF = Infinity
  const {
    length
  } = graph;
  for (let i = 0; i < length; i++) {
    cost[i] = [];
    for (let j = 0; j < length; j++) {
      if (graph[i][j] === 0) {
        cost[i][j] = INF;
      } else {
        cost[i][j] = graph[i][j];
      }
    }
  }
  return cost;
}


let path = Kruskal(graph.graph)
console.log(path)

function formatePath(path, vertices, graph) {
  let result = []
  for (const i in path) {
    let item = path[i]
    if (item == -1 || item == null) continue
    result.push({
      Edge: `${vertices[item]} - ${vertices[i]}`,
      Weight: graph[item][i]
    })
  }
  return result
}
console.table(formatePath(path, vertices, graph.graph))


function Kruskal(graph) {
  const INF = Infinity
  const {
    length
  } = graph
  const parent = []
  let ne = 0
  let a, b, u, v
  const cost = initializeCost(graph)
  while (ne < length - 1) {
    for (let i = 0, min = INF; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (cost[i][j] < min) {
          min = cost[i][j]
          a = u = i;
          b = v = j;
        }
      }
    }
    u = find(u, parent)
    v = find(v, parent)
    if (union(u, v, parent)) {
      ne++
    }
    cost[a][b] = cost[b][a] = INF
  }
  return parent
}

function find(i, parent) {
  while (parent[i]) {
    i = parent[i]
  }
  return i
}

function union(i, j, parent) {
  if (i !== j) {
    parent[j] = i
    return true
  }
  return false
}