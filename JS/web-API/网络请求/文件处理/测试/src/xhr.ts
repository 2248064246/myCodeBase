/*
 * @Author: huangyingli
 * @Date: 2022-07-20 16:02:13
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-20 17:59:53
 * @Description:
 */

import AsyncQueue from './异步请求队列';

import IndexDB from './indexDB函数式封装';

import { xhrPromise } from './utils';

type xhrMethod = 'GET' | 'POST' | 'HEAD';

interface xhrOptions {
  method?: xhrMethod;
  responseType?: XMLHttpRequestResponseType;
}

class xhrBreakpoint extends EventTarget {
  method: xhrMethod;
  responseType: XMLHttpRequestResponseType;
  url: string;
  fileSize: number;
  fileType: string;
  fileName: string;
  chunkSize: number;
  progress: number;
  chunks: Array<number[]>;
  chunksObj: any;
  constructor(url: string, options?: xhrOptions) {
    super();
    this.method = options?.method || 'GET';
    this.responseType = options?.responseType || 'json';
    this.url = url;
    this.chunkSize = 1024 * 100; // 100k
    this.chunksObj = {};
  }

  start() {
    this.getHeaders()
      .then((headers) => {
        console.log(headers);
        this.fileSize = Number(headers['content-length']);
        this.fileType = headers['content-type'] || '';
        this.fileName = headers['filename'] || '';

        this.chunks = xhrBreakpoint.cutChunk(this.fileSize, this.chunkSize);
        this.chunks.forEach((c) => {
          this.chunksObj[c.join('-')] = {
            progress: 0,
            range: c.join('-'),
          };
        });
      })
      .then(async () => {
        let dbHandle = await IndexDB('fileDB', this.fileName, 'range');

        let cache = await dbHandle.getAll();
        console.log(cache);
        let needGet = this.chunks.filter(
          (c) => cache.findIndex((m: any) => m?.range === c.join('-')) === -1
        );

        console.log(needGet);
        let asyncQueue = new AsyncQueue(2, this.downloadFileByRange.bind(this));

        needGet.forEach((range) => {
          asyncQueue.enqueue(range);
        });

        for await (const value of asyncQueue) {
          console.log(value);
          dbHandle.add(
            Object.assign({}, this.chunksObj[value.range], {
              response: value.response,
            })
          );
        }
        cache = await dbHandle.getAll();
        // this.storeToFile(cache);
      });
  }

  stop() {

  }

  abort() {

  }

  restart() {
    
  }

  getHeaders(): Promise<any> {
    return xhrPromise(
      this.url,
      'HEAD',
      {},
      this.responseType,
      (xhr: XMLHttpRequest) => {
        let headersAry = xhr
          .getAllResponseHeaders()
          .split(/\r\n/g)
          .filter((h) => !!h);
        let headers = headersAry.reduce((cur, next) => {
          let obj = {};
          let hs = next.split(': ');
          if (hs.length === 2) {
            cur = Object.assign({}, cur, { [hs[0]]: hs[1] });
          }
          return cur;
        }, {});
        return headers;
      }
    );
  }

  downloadFileByRange(ranges: Array<number>) {
    let range = ranges.join('-');
    return xhrPromise(
      this.url,
      'GET',
      { Range: range },
      'arraybuffer',
      (xhr: XMLHttpRequest) => {
        return {
          range,
          response: xhr.response,
        };
      },
      (res: any) => {
        this.chunksObj[range].progress = res.loaded / res.total;
        let total = 0;
        for (let key in this.chunksObj) {
          total += this.chunksObj[key].progress;
        }
        this.progress = total / this.chunks.length;
        this.dispatch('progress', this.progress);
      }
    );
  }

  storeToFile(dbCache: Array<any>) {
    let buf: ArrayBuffer = new ArrayBuffer(this.fileSize);
    let unt8 = new Int8Array(buf);
    for (const range of this.chunks) {
      let item = dbCache.find((c: any) => c.range === range.join('-')) as any;
      unt8.set(new Int8Array(item.response), range[0]);
    }
    console.log('buf', unt8);

    let fileReader = new FileReader();

    fileReader.onload = () => {
      // window.open(fileReader.result)
      // console.log(fileReader.result)
      // window.open(URL.createObjectURL(new Blob([fileReader.result])))

      let a = document.createElement('a');
      a.download = 'test.txt';
      a.href = fileReader.result as string;
      a.click();

      // dbHandle.clear();
    };

    fileReader.readAsDataURL(new Blob([unt8.buffer]));
  }

  dispatch(eventname: string, value: any) {
    let event = new CustomEvent(eventname, { detail: value });
    /* 通过自定义事件触发监听事件 */
    this.dispatchEvent(event);
  }

  static cutChunk(totalSize: number, chunkSize: number) {
    let start = 0;
    let end = chunkSize;
    let ary = [];
    while (end < totalSize) {
      ary.push([start, end]);
      start = end;
      end += chunkSize;
    }
    ary.push([start, totalSize]);
    return ary;
  }
}

export default xhrBreakpoint;
