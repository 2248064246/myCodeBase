/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-01 10:21:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-01 11:36:52
 * @Description: 
 */


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

const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)

  for (const value of vertices) {
    if (color[value] === Color.WHITE) {
      depthFirstSearchVisit(value, color, adjList, callback)
    }
  }
}

const depthFirstSearchVisit = (u, color, adjList, callback) => {
  color[u] = Color.GREY
  if (callback) {
    callback(u)
  }
  const neighbors = adjList.get(u).value
  for (const value of neighbors) {
    if (color[value] === Color.WHITE) {
      depthFirstSearchVisit(value, color, adjList, callback)
    }
  }
  color[u] = Color.BLACK
}

const DFS = graph => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const d = {} // 发现时间
  const f = {} // 探索时间
  const p = {} // 前溯点
  const time = { // 记录每次执行时间(使用次数代替)
    count: 0 // 使用对象的原因是, 需要count全局使用 // 记录每次执行时间
  }
  for (const value of vertices) {
    f[value] = 0
    d[value] = 0
    p[value] = null
  }
  for (const value of vertices) {
    if (color[value] === Color.WHITE) {
      DFSVisit(value, color, d, f, p, time, adjList)
    }
  }
  return {
    discovery: d,
    finished: f,
    predecessors: p
  }
}

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = Color.GREY
  d[u] = ++time.count // 发现时间
  const neighbors = adjList.get(u).value
  for (const value of neighbors) {
    if (color[value] === Color.WHITE) {
      p[value] = u
      DFSVisit(value, color, d, f, p, time, adjList)
    }
  }
  color[u] = Color.BLACK
  f[u] = ++time.count // 完成时间
}

export default {
  depthFirstSearch,
  DFS
}