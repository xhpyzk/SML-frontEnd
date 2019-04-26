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
        :data="tableData"
        :fit="true"
        style="width: 90%">
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="monitorContent"
          label="监测内容">
        </el-table-column>
        <el-table-column
          prop="sum"
          label="总数量">
        </el-table-column>
        <el-table-column
          prop="safety"
          label="安全">
        </el-table-column>
        <el-table-column
          prop="attention"
          label="注意">
        </el-table-column>
        <el-table-column
          prop="warning"
          label="警告">
        </el-table-column>
        <el-table-column
          prop="danger"
          label="危险">
        </el-table-column>
      </el-table>
      <el-pagination
      :page-size="pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      :total="allData.length"
      @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <div class="more-space small-size">
      <a href="javascript:;" class="file">上传文件
        <input type="file" name="" id="" @change="onChange($event)">
      </a>
    </div>
    <Draw></Draw>
  </a-col>
</template>

<script>
import XLSX from 'xlsx'
import sql from 'sql.js'
import fs from 'fs'
import Draw from './draw'
export default {
  name: 'monitorOverview',
  components: {
    Draw
  },
  data () {
    let allData = this.readData()
    let pageSize = 3
    return {
      pageSize,
      allData,
      tableData: allData.slice(0, pageSize)
    }
  },
  methods: {
    onChange (event) {
      let file = event.target.files[0]
      let reader = new FileReader()
      reader.onload = evt => {
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
          }
        } catch (e) {
          console.log('文件类型不正确', e)
        }
        this.allData = this.readData()
        this.tableData = this.allData.slice(0, this.pageSize)
      }
      reader.readAsBinaryString(file)
    },
    readData () {
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      let queryAllMonitorPoints = `SELECT name, maxControlval, monitorContentId FROM monitorPoints WHERE projectId = ${this.$route.params.id}`
      let allMonitorPoints = db.exec(queryAllMonitorPoints)
      if (allMonitorPoints.length === 0) {
        return []
      }
      let values = allMonitorPoints[0].values
      let queryAllMonitorContent = `SELECT * FROM monitorContent`
      let allMonitorContent = db.exec(queryAllMonitorContent)
      if (allMonitorContent.length === 0) return []
      allMonitorContent = allMonitorContent[0].values
      // 构造监测内容 id 哈希表
      let monitorContentMap = {}
      for (let j = 0; j < allMonitorContent.length; j++) {
        monitorContentMap[allMonitorContent[j][0]] = allMonitorContent[j][1]
      }
      let uniqueMonitorContent = []
      for (let k = 0; k < values.length; k++) {
        if (uniqueMonitorContent.indexOf(monitorContentMap[values[k][2]]) === -1) {
          uniqueMonitorContent.push(monitorContentMap[values[k][2]])
        }
      }
      // 获取当前所有监测内容
      let items = new Array(uniqueMonitorContent.length)
      for (let m = 0; m < uniqueMonitorContent.length; m++) {
        let total = 0
        let safety = 0
        let attention = 0
        let warning = 0
        let danger = 0
        for (let n = 0; n < values.length; n++) {
          if (uniqueMonitorContent[m] === monitorContentMap[values[n][2]]) {
            let queryMonitorVal = `SELECT monitorValues FROM "${values[n][0]}"`
            let monitorVals = db.exec(queryMonitorVal)
            if (monitorVals.length === 0) continue
            total++
            let lastMonitorVal = monitorVals[0].values.slice(-1)[0][0]
            let percentage = lastMonitorVal / values[n][1]
            if (percentage < 0.6) {
              safety++
            } else if (percentage < 0.8) {
              attention++
            } else if (percentage < 1.0) {
              warning++
            } else {
              danger++
            }
          }
        }
        if (total === 0) continue
        items[m] = {
          id: m,
          monitorContent: uniqueMonitorContent[m],
          sum: total,
          safety,
          attention,
          warning,
          danger
        }
      }
      return items
    },
    handleCurrentChange (val) {
      let start = this.pageSize * (val - 1)
      let end = this.pageSize * val
      this.tableData = this.allData.slice(start, end)
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
