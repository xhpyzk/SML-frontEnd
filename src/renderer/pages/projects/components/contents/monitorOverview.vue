<template>
  <a-col :span="18">
    <div>
      <p class="notes">说明</p>
      <ul>
        <li>
          “安全”是指测量值小于设计值的百分之六十
        </li>
        <li>
          “注意”是指测量值在设计值百分之六十到八十之内
        <li>
          “警告”是指测量值在设计值百分之八十到百分之百之内
        </li>
        <li>
          “危险”是指测量值大于设计值
        </li>
      </ul>
      <br>
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <div class="more-space small-size">
      <a href="javascript:;" class="file">上传文件
        <input type="file" name="" id="" @change="onChange($event)">
      </a>
    </div>
  </a-col>
</template>

<script>
import XLSX from 'xlsx'
import sql from 'sql.js'
import fs from 'fs'
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' }
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' }
  ],
  width: '20%'
}, {
  title: 'Email',
  dataIndex: 'email'
}]
export default {
  name: 'monitorOverview',
  data () {
    return {
      tableData: this.readData(),
      data: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
    },
    onChange (event) {
      let file = event.target.files[0]
      let reader = new FileReader()
      reader.onload = function (evt) {
        try {
          let data = evt.target.result
          let workbook = XLSX.read(data, {
            type: 'binary'
          })
          let buildings = []
          for (let sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              // let fromTo = workbook.Sheets[sheet]['!ref']
              buildings = buildings.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
              // break; // 如果只取第一张sheet表，就取消注释这行
            }
          }
          // let fileRows = buildings.length - 1
          // 读取已经存在的所有监测点
          let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
          let db = new sql.Database(fileBuffer)
          let uploadData
          let hours
          let day
          let insertSql = ``
          for (let i = 0; i < buildings.length; i++) {
            uploadData = Object.values(buildings[i])
            hours = Object.keys(buildings[i]).slice(2)
            day = uploadData[0]
            for (let i = 0; i < 24; i++) {
              insertSql += `INSERT INTO "${uploadData[1]}" (
              "days", "hours", "monitorValues"
              ) VALUES (
                ${day}, "${hours[i]}", ${uploadData[i + 2]}
              );`
            }
            db.run(insertSql)
            let data = db.export()
            let buffer = Buffer.from(data)
            fs.writeFileSync('src/database/sml.sqlite', buffer)
            alert('success')
          }
        } catch (e) {
          console.log('文件类型不正确', e)
        }
      }
      reader.readAsBinaryString(file)
    },
    readData () {
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      let queryAllMonitorPoints = `SELECT name, maxControlval, monitorContentId FROM monitorPoints WHERE projectId = ${this.$route.params.id}`
      let allMonitorPoints = db.exec(queryAllMonitorPoints)
      let keys = allMonitorPoints[0].columns
      let values = allMonitorPoints[0].values
    }
  }
}
</script>

<style>
.notes {
  font-size: 20px;
}
.more-space {
  margin-top: 20px;
  margin-right: 40px;
}
.small-size {
  width: 30%;
  height: 30%;
}
.dropbox {
  height: 180px;
  line-height: 1.5;
}
.file {
  position: relative;
  display: inline-block;
  background: #D0EEFF;
  border: 1px solid #99D3F5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1E88C7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
</style>
