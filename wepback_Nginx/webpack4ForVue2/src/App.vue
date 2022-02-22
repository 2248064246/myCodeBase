<!--
 * @Author: huangyingli
 * @Date: 2022-02-21 21:24:00
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-22 14:37:35
 * @Description: 
-->
<template>
  <div id="app">
    <h1>hello webpack and vue</h1>

    <el-button>hhh</el-button>

    <el-button type="warning">xxx</el-button>

    <el-button type="danger">xxx</el-button>
    <el-button type="danger"
               circle></el-button>

    <el-input></el-input>

    <!-- <el-input type="textarea"></el-input> -->

    <h2>{{msg}}</h2>

    <!-- hahh -->

  </div>
</template>
<script>
export default {
  data () {
     return {
       msg: 'hello Vue'
     }
  }
}
</script>
<style lang="less">
#app {
  color: tomato;
}

h2 {
  color: #eee;
}

</style>