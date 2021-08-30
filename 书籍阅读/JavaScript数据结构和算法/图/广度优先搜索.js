/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-27 16:59:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 17:33:04
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
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()
  queue.addBack(startVertex)
  while (!queue.isEmpty()) {
    const u = queue.removeFront()
    const neighbors = adjList.get(u).value
    color[u] = Color.GREY
    for (const i in neighbors) {
      const w = neighbors[i]
      if (color[w] === Color.WHITE) {
        color[w] = Color.GREY
        queue.addBack(w)
      }
    }
    color[u] = Color.BLACK
    if (callback) {
      callback(u)
    }
  }
}

export default breadthFirstSearch