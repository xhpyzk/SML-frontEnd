<template>
  <div>
    <a-icon type="form" />
    <span class="notes">监测点列表</span>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="monitorContent"
        label="监测内容"
        width="60">
      </el-table-column>
      <el-table-column
        prop="xCoordinate"
        label="x 坐标">
      </el-table-column>
      <el-table-column
        prop="yCoordinate"
        label="y 坐标">
      </el-table-column>
      <el-table-column
        prop="zCoordinate"
        label="z 坐标">
      </el-table-column>
      <el-table-column
        prop="maxControlVal"
        label="最大控制值">
      </el-table-column>
      <el-table-column
        prop="minControlVal"
        label="最小控制值">
      </el-table-column>
      <el-table-column
        prop="maxDays"
        label="控制天数">
      </el-table-column>
      <el-table-column
        prop="displacement"
        label="控制值">
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      :total="values.length"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import fs from 'fs'
import sql from 'sql.js'
export default {
  name: 'pointsList',
  data () {
    let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
    let db = new sql.Database(fileBuffer)
    let readRes = db.exec(`SELECT * FROM monitorPoints WHERE projectId = ${this.$route.params.id}`)[0]
    let keys = readRes.columns
    let values = readRes.values
    let allData = this.readData(keys, values, db)
    let pageSize = 3
    return {
      db,
      keys,
      values,
      pageSize,
      allData,
      // tableHeight: 320,
      tableData: allData.slice(0, pageSize)
    }
  },
  methods: {
    readData (keys, values, db) {
      let data = new Array(values.length)
      let item
      for (var i = 0; i < data.length; i++) {
        item = {}
        for (var j = 1; j < values[0].length; j++) {
          if (keys[j] === 'monitorContentId') {
            let query = 'SELECT * FROM monitorContent where ' + `id = ${values[i][j]}`
            let monitorContent = db.exec(query)
            item['monitorContent'] = monitorContent[0].values[0][1]
          } else if (keys[j] !== 'projectId') {
            item[keys[j]] = values[i][j]
          }
        }
        data[i] = item
      }
      return data
    },
    handleCurrentChange (val) {
      let start = this.pageSize * (val - 1)
      let end = this.pageSize * val
      this.tableData = this.allData.slice(start, end)
    }
  }
}
</script>