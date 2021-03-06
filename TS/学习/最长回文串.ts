/*
 * @Author: huangyingli
 * @Date: 2022-03-30 14:59:08
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-02 11:40:00
 * @Description: 
 */
/**
 * @param {string} s
 * @return {string}
 * @see https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode-solution/
 */
// 采用动态规划
var longestPalindrome = function(s) {
  if(s.length === 0) {
      return s;
  }
  // 定义二维数组, 辅助找出最长回文串
  let dp = new Array(s.length);
  for(let m=0; m<dp.length; m++) {
      dp[m] = new Array(s.length);
  }
  let begin = 0;//定义最长回文串的截取初始位置
  let maxLength = 1;//回文串最长子串长度
  /* 
      第一次双重循环的目的: 是为了将指向同一元素的i,j, 标记为回文子串,
      (理由:只有一个元素肯定是回文串)
   */
  for(let i=0; i<s.length; i++) {
      for(let j=0; j<s.length; j++) {
          if(i === j) {
              dp[i][j] = 1;//1表示是回文串
          }else {
              dp[i][j] = 0;//其他i和j指向的不是一个元素,暂时标记为不是回文串
          }
      }
  }
  /*
      第二次双重循环的核心思想: 
          如果i和j指向的数相等,且i+1到j-1的位置原本就是一个回文子串(即dp[i+1][j-1] === 1)时,
          那么i到j的位置的字符串一定是一个回文子串,即dp[i][j] === 1
   */
  for(let j=0; j<s.length; j++) {
      for(let i=0; i<j; i++) {
          if((s[i] == s[j]) && ((i + 1 == j) || dp[i+1][j-1])) {
              dp[i][j] = 1;
          }
          if(dp[i][j] && ((j - i + 1) > maxLength)) {
              maxLength = j - i + 1;
              begin = i;
          }
      }
  }
  return s.substr(begin, maxLength);
};