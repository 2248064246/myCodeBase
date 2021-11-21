function extend(dst, src) {
  for (var key in src) {
    dst[key] = src[key];
  }

  return dst;
}

const utils = {
  extend,
};
