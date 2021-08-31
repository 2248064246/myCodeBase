/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-27 16:59:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-31 17:54:28
 * @Description: 
 */


/**
 * 白色: 表示该顶点还没有被访问
 * 灰色: 表示该顶点被访问过, 但并未被探索过
 * 黑色: 表示该顶点被访问过且被完全探索过
 */
import Queue from "../队列/双端队列.js"

const Color = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}

/**
 * 初始化顶点颜色
 * @param {Array} vertices 
 * @returns 
 */
function initializeColor(vertices) {
  const color = []
  for (const key in vertices) {
    color[vertices[key]] = Color.WHITE
  }
  return color
}

function breadthFirstSearch(graph, startVertex, callback) {
  const vertices = graph.getVertices(); // 获取所有顶点
  const adjList = graph.getAdjList() // 获取顶点对应的邻接点
  const color = initializeColor(vertices) // 初始化顶点颜色
  const queue = new Queue()
  queue.addBack(startVertex)
  while (!queue.isEmpty()) {
    const u = queue.removeFront() // 获取队列第一个顶点
    const neighbors = adjList.get(u).value // 获取该顶点的邻接点
    color[u] = Color.GREY // 设置该顶点为灰色, 表示被访问, 但是没有探索邻接点
    for (const i in neighbors) { // 遍历邻接点
      const w = neighbors[i]
      if (color[w] === Color.WHITE) { // 如果该点没有被访问
        color[w] = Color.GREY // 设置为灰色
        queue.addBack(w) //  并且推入待探索队列中
      }
    }
    color[u] = Color.BLACK // 顶点被探索, 设置为黑色
    if (callback) {
      callback(u)
    }
  }
}


// 使用BFS寻找最短路径
// 1. 找出每个顶点和源点之间的最短路径的距离(已边数计量)
// 2. 前溯点 predecessors[] 用来推导出从其他顶点到源点的最短路径

const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()
  const distance = []
  const predecessors = []
  queue.addBack(startVertex)

  for (const value of vertices) {
    distance[value] = 0
    predecessors[value] = null
  }

  while (!queue.isEmpty()) {
    const u = queue.removeFront()
    const neighbors = adjList.get(u).value
    color[u] = Color.GREY
    for (const i in neighbors) {
      const w = neighbors[i]
      if (color[w] === Color.WHITE) {
        color[w] = Color.GREY
        distance[w] = distance[u] + 1
        predecessors[w] = u
        queue.addBack(w)
      }
    }
    color[u] = Color.BLACK
  }


  computedPath(vertices, startVertex, predecessors)
  return {
    distance,
    predecessors
  }
}

function computedPath(vertices, startVertex, predecessors) {
  for (const value of vertices) {
    if (value == startVertex) continue;
    const toVertex = value
    const path = []
    for (let v = toVertex; v !== startVertex; v = predecessors[v]) {
      path.push(v)
    }
    path.push(startVertex)
    let s = path.pop()
    while (!(path.length == 0)) {
      s += ' - ' + path.pop()
    }
    console.log(s)
  }
}




export default {
  breadthFirstSearch,
  BFS
}