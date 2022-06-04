class Deferred {
  constructor(auto = false, interval = 10) {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      if (auto) {
        let t = setTimeout(() => {
          clearTimeout(t);
          this.resolve(); // 定时10秒
        }, interval * 1000);
      }
    });
  }
}

let deferred = new Deferred(true, 5)
async function test() {
  console.log('开始')
  await deferred.promise
  console.log('结束')
}

test()


