/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-03 14:47:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-03 14:53:04
 * @Description: 
 */




function printSolution(solution, wordX, m, n) {
  let a = m;
  let b = n;
  let x = solution[a][b];
  let answer = '';
  while (x !== '0') {
    if (solution[a][b] === 'diagonal') {
      answer = wordX[a - 1] + answer;
      a--;
      b--;
    } else if (solution[a][b] === 'left') {
      b--;
    } else if (solution[a][b] === 'top') {
      a--;
    }
    x = solution[a][b];
  }
  return answer;
}

/**
 * 求最长公共子序列, (两个字符串序列中以相同顺序出现, 但不要求连续的字符串序列)
 * 动态规划
 * @param {*} wordX 
 * @param {*} wordY 
 * @returns 
 */
function lcs(wordX, wordY) {
  const m = wordX.length;
  const n = wordY.length;
  const l = [];
  const solution = [];
  for (let i = 0; i <= m; i++) {
    l[i] = [];
    solution[i] = [];
    for (let j = 0; j <= n; j++) {
      l[i][j] = 0;
      solution[i][j] = '0';
    }
  }
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0;
      } else if (wordX[i - 1] === wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
        solution[i][j] = 'diagonal';
      } else {
        const a = l[i - 1][j];
        const b = l[i][j - 1];
        l[i][j] = a > b ? a : b; // max(a,b)
        solution[i][j] = l[i][j] === l[i - 1][j] ? 'top' : 'left';
      }
    }
    // console.log(l[i].join());
    // console.log(solution[i].join());
  }
  return printSolution(solution, wordX, m, n);
}

/**
 * 贪心算法 
 * @param {*} wordX 
 * @param {*} wordY 
 * @param {*} m 
 * @param {*} n 
 * @returns 
 */
function lcs(wordX, wordY, m = wordX.length, n = wordY.length) {
  if (m === 0 || n === 0) {
    return 0;
  }
  if (wordX[m - 1] === wordY[n - 1]) {
    return 1 + lcs(wordX, wordY, m - 1, n - 1);
  }
  const a = lcs(wordX, wordY, m, n - 1);
  const b = lcs(wordX, wordY, m - 1, n);
  return a > b ? a : b;
}

console.log(lcs('acbaed', 'abcadf'))