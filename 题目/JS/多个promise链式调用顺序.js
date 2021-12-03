// Promise.resolve().then(() => {
//   console.log(0);
//   return Promise.resolve(4);
// }).then((res) => {
//   console.log(res)
// })

// Promise.resolve().then(() => {
//   console.log(1);
// }).then(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// }).then(() => {
//   console.log(5);
// }).then(() =>{
//   console.log(6);
// })

new Promise((resolve, reject) => {
  console.log(0);
  new Promise((res, rej) => {
    res(4);
  }).then(() => {
    resolve(4);
  });
}).then((res) => console.log(res));

new Promise((resolve, reject) => {
  console.log(1);
  resolve();
})
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

  // 0, 1, 2, 3, 4, 5, 6 

  // 代码换一种方式就很明显, 关键是then 里面的回调被推入微任务的时机是在什么时候