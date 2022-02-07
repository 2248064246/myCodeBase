/*
 * @Author: huangyingli
 * @Date: 2022-02-07 22:31:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-08 00:56:21
 * @Description: 
 */

#include <stdio.h>
#include <string.h>
#include <malloc.h>
#include <emscripten.h>

char EMSCRIPTEN_KEEPALIVE *strcat_1(char *str1, char *str2) {
  char *t = (char *)malloc(strlen(str1) + strlen(str2)), *p=t;
  while((*p=*str1)) {
    str1++;
    p++;
  }
  while((*p=*str2)) {
    str2++;
    p++;
  }
  return(t);
}

int main() {
  char *s, s1[]="Good",s2[]="Bye";
  s = strcat_1(s1, s2);
  printf("字符串连接:%s\n", s);
}