/*
 * @Author: huangyingli
 * @Date: 2022-05-08 10:01:20
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-05-08 12:09:19
 * @Description:
 */

import { write } from 'fs';

enum Color {
  /* 未访问 */
  WHITE,
  /* 正在探索 */
  GREY,
  /* 已探索 */
  BLACK,
}

class Graph {
  protected isDirected: Boolean;
  protected vertices: Array<any>;
  protected adjList: Map<any, Array<any>>;
  constructor() {
    /* 是否是有向图 */
    this.isDirected = false;
    this.vertices = [];
    this.adjList = new Map();
  }

  /**
   * 添加顶点
   * @param v 顶点
   */
  addVertex(v: string): void {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      /* 设置顶点的领接表 */
      this.adjList.set(v, []);
    }
  }

  addEdge(v: any, w: any) {
    this.addVertex(v);
    this.addVertex(w);
    /* v 添加相邻 节点 */
    this.adjList.get(v)?.push(w);

    if (!this.isDirected) {
      /* 无向图, 两边都需要绑定 */
      this.adjList.get(w)?.push(v);
    }
  }

  getVertices(): Array<any> {
    return this.vertices;
  }

  getAdjList(): Map<any, Array<any>> {
    return this.adjList;
  }

  toString(): string {
    let str = '';
    this.vertices.forEach((v: any) => {
      str += `${v} ->  `;
      let neighbors = this.adjList.get(v);
      neighbors?.forEach((w: any) => {
        str += `${w}  `;
      });
      str += '\n';
    });
    return str;
  }

  /**
   * 初始化顶点的颜色
   * @param vertices
   * @returns
   */
  static initializeColor(vertices: Array<any>) {
    let color: Array<Color> = [];
    vertices.forEach((v) => {
      color[v] = Color.WHITE;
    });
    return color;
  }

  static depthFirstSearch(
    v: any,
    colors: Array<Color>,
    adjList: Map<any, Array<any>>,
    callback: Function
  ) {
    callback(v);
    /* 正在探索 */
    colors[v] = Color.GREY;
    let neighbors = adjList.get(v);
    neighbors?.forEach((w) => {
      if (colors[w] === Color.WHITE) {
        Graph.depthFirstSearch(w, colors, adjList, callback);
      }
    });
    /* 全部探索完成 */
    colors[v] = Color.BLACK;
  }

  DFS(callback: Function): void {
    /* 这个颜色最主要的目的是防止重复探索 */
    let colors = Graph.initializeColor(this.vertices);

    console.log('colors', colors);
    this.vertices.forEach((v) => {
      /* 为白色, 表示没有探索 */
      if (colors[v] === Color.WHITE) {
        Graph.depthFirstSearch(v, colors, this.adjList, callback);
      }
    });
  }

  BFS(callback: Function): object {
    let colors = Graph.initializeColor(this.vertices);
    let queue = [];
    let distances: Array<any> = [];
    let preVertices: Array<any> = [];
    this.vertices.forEach((v) => {
      distances[v] = 0;
      preVertices[v] = null;
    });
    queue.push(this.vertices[0]);
    while (queue.length !== 0) {
      let v = queue.shift();

      callback(v);

      colors[v] = Color.GREY;
      let level = this.adjList.get(v);
      level?.forEach((w) => {
        if (colors[w] === Color.WHITE) {
          colors[w] = Color.GREY;
          queue.push(w);
          distances[w] = distances[v] + 1;
          preVertices[w] = v;
        }
      });
      colors[v] = Color.BLACK;
    }

    return {
      distances,
      preVertices,
    };
  }
}

const graph = new Graph();

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString());

graph.DFS((v: any) => console.log(v));
console.log('==============');
let result = graph.BFS((v: any) => console.log(v));

console.log(result);
