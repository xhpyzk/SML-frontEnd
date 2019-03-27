<template>
  <a-row class="project-header">
    <a-col :span="6">
      <h2>xxx工程</h2>
    </a-col>
    <a-col :span="12">
      <p class="overview-style">工程概况</p>
    </a-col>
    <a-col :span="6">
      <h3 @click="backHome">首页</h3>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'ProjectHeader',
  methods: {
    backHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.project-header {
  height: 50px;
  background: #001529;
}
h3 {
  float: right;
  line-height: 50px;
  margin-right: 30px;
}
h2 {
  float: left;
  line-height: 50px;
  margin-left: 30px;
}
h2, h3 {
  color: white;
}
.overview-style {
  color: white;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
}
</style>