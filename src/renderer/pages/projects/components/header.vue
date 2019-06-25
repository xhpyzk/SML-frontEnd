<template>
  <a-row class="project-header">
    <a-col :span="6">
      <h2>{{ project }}</h2>
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
import fs from 'fs'
import sql from 'sql.js'
export default {
  name: 'ProjectHeader',
  data () {
    let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
    let db = new sql.Database(fileBuffer)
    let readProject = db.exec(`SELECT name FROM projects WHERE id = ${this.$route.params.id}`)
    let project
    if (readProject.length === 0) {
      project = ''
    } else {
      project = readProject[0].values[0][0]
    }
    return {
      project
    }
  },
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
.project-header > div:nth-child(3) h3:hover {
  cursor: pointer;
}
</style>