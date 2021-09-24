const sum = (x, y) => x + y;

function add(...args) {
  return function (...innerArgs) {
    let resultArgs = args.concat(innerArgs);
    if (innerArgs.length == 0) {
      return resultArgs.reduce(sum);
    } else {
      return add(...resultArgs);
    }
  };
}

{
  /* 参数在左侧 */
  function partialLeft(f, ...outerArgs) {
    return function (...innerArgs) {
      let args = [...outerArgs, ...innerArgs];
      return f.apply(this, args);
    };
  }

  /* 参数在右侧 */
  function partialRight(f, ...outerArgs) {
    return function (...innerArgs) {
      let args = [...innerArgs, ...outerArgs];
      return f.apply(this, args);
    };
  }

  /* 参数列表充当一个模板， 列表中的 undefined 会被内部参数列表替换 */
  function partial(f, ...outerArgs) {
    return function (...innerArgs) {
      let args = [...outerArgs];
      let innerIndex = 0;
      args = args.map((item) => item ?? innerArgs[innerIndex++]);
      args.push(...innerArgs.slice(innerIndex));
      return f.apply(this, args);
    };
  }

  const f = (x, y, z) => x * (y - z);
  partialLeft(f, 2)(3, 4);
  partialRight(f, 2)(3, 4);
  partial(f, undefined, 2)(3, 4);

  /* 这些部分应用函数允许在已经定义的函数基础上轻松定义有意思的函数 */

  /* 与其他高级函数结合, 可以更有意思 */
  function compose(f, g) {
    return function (...arg) {
      return f.call(this, g.apply(this, arg));
    };
  }
  const not = partialLeft(compose, (x) => !x);
  const even = (x) => x % 2 == 0;
  const odd = not(even)
  const isNumber = not(isNaN)
  odd(3) && isNumber(2) // true
}
