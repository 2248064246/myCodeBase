


## 1

```javaScript
function mutationCallback(mutationRecords, observer) {
  console.log('mt1')
}

const observer = new MutationObserver(mutationCallback)
observer.observe(document.body, {
  attributes: true
})


Promise.resolve().then(() => {
  console.log('mt2')
  setTimeout(() => {
    console.log('t1')
  }, 0)
  document.body.setAttribute('test', "a")
}).then(() => {
  console.log('mt3')
})

setTimeout(() => {
  console.log('t2')
}, 0)

console.log('mt3')

// mt3
// mt2
// mt1
// mt3
// t2
// t1

```

## 2

```javaScript
const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
})
promise.then(() => {
    console.log(3)
})
console.log(4)

// 1
// 2
// 4
// 3
```

## 3
```javaScript
const promise = new Promise((resolve, reject) => {
  resolve('success1'); // 这里 resolve 或者 reject 之后， 后面的就无效了
  reject('error');
  resolve('success2');
});

promise
.then((res) => {
  console.log('then: ', res);
})
.catch((err) => {
  console.log('catch: ', err);
});
// then: success1

```

## 4

```javaScript

const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
    reject('error');
})
promise.then(() => {
    console.log(3);
}).catch(e => console.log(e))
console.log(4);
```