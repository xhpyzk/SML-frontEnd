<template>
  <a-col :span="18">
    <h1 @click="handleClick">模拟边坡工程</h1>
  </a-col>
</template>

<script>
import fs from 'fs'
import sql from 'sql.js'
export default {
  name: 'ProjectOverview',
  data () {
    return {
      mysql: 'SELECT * FROM projects'
    }
  },
  methods: {
    handleClick () {
      var fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      var db = new sql.Database(fileBuffer)
      var ret = db.exec(this.mysql)
      console.log(ret)
    }
  }
}
</script>

<style>
h1 {
  color: black;
}
</style>


