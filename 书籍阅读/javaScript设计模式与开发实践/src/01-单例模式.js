const SingleMode = (function () {
  let instance;
  const S = function () {
    if (instance) {
      return instance;
    }
    instance = this.init();
  };

  S.prototype.init = function () {
    return this;
  };

  return S;
})();


let a = new SingleMode()
let b = new SingleMode()

console.log(a===b) // true