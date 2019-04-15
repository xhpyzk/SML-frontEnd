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
        sortable
        width="120"
        column-key="name"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
      >
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
      <!-- <el-table-column
        prop="safetyLevel"
        label="安全水平"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.tag}}
          </el-tag>
        </template>
      </el-table-column> -->
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
    <!-- <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import fs from 'fs'
import sql from 'sql.js'
export default {
  name: 'pointsList',
  data () {
    return {tableData: this.readData()}
  },
  methods: {
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    readData () {
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      let readRes = db.exec('SELECT * FROM monitorPoints')
      let keys = readRes[0].columns
      let values = readRes[0].values
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
      console.log(data)
      return data
    }
  }
}
</script>