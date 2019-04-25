<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <h1>你好，XXX</h1>
      </a-layout-header>
      <a-layout-content>
        <h2>当前所有工程：</h2>
        <div class="table-style">
          <el-table
            :data="tableData"
            style="width: 100%"
            @cell-click="handleCellClick">
            <el-table-column
              label="编号"
              prop="id">
            </el-table-column>
            <el-table-column
              label="名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="x 坐标"
              prop="xCoordinate">
            </el-table-column>
            <el-table-column
              label="y 坐标"
              prop="yCoordinate">
            </el-table-column>
            <el-table-column
              label="经度"
              prop="longitude">
            </el-table-column>
            <el-table-column
              label="纬度"
              prop="latitude">
            </el-table-column>
            <el-table-column
              label="备注"
              prop="description">
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header">
                删除
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-size="pageSize"
            :pager-count="11"
            layout="prev, pager, next"
            :total="totalItems"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <a-row>
          <a-col :span="8" :offset="8">
            <el-button type="primary" @click="dialogFormVisible = true">新建工程</el-button>
            <el-dialog title="新建工程" :visible.sync="dialogFormVisible">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" 
              label-width="120px" class="demo-ruleForm" size="large"
              >
                <el-form-item label="工程名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="控制点 x 坐标" prop="xCoordinate">
                  <el-input v-model="ruleForm.xCoordinate"></el-input>
                </el-form-item>
                <el-form-item label="控制点 y 坐标" prop="yCoordinate">
                  <el-input v-model="ruleForm.yCoordinate"></el-input>
                </el-form-item>
                <el-form-item label="控制点经度" prop="longitude">
                  <el-input v-model="ruleForm.longitude"></el-input>
                </el-form-item>
                <el-form-item label="控制点纬度" prop="latitude">
                  <el-input v-model="ruleForm.latitude"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                  <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')" size="medium">确认</el-button>
                  <el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </a-col>
        </a-row>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Modal from './components/modal.vue'
import fs from 'fs'
import sql from 'sql.js'
export default {
  name: 'Home',
  components: {
    Modal
  },
  data () {
    let allProjects = this.readAllProjects()
    let pageSize = 5
    return {
      pageSize,
      totalItems: allProjects.length,
      isVisible: false,
      tableData: allProjects.slice(0, pageSize),
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        xCoordinate: '',
        yCoordinate: '',
        longitude: '',
        latitude: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        xCoordinate: [
          { required: true, message: '请输入 x 坐标', trigger: 'blur' }
        ],
        yCoordinate: [
          { required: true, message: '请输入 y 坐标', trigger: 'blur' }
        ],
        longitude: [
          {required: true, message: '请输入经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请输入纬度', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleDelete (index, row) {
      let projectId = row.id
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      let queryMonitorPoints = `SELECT name FROM monitorPoints WHERE projectId = ${projectId};`
      let deleteMonitorPointTables = db.exec(queryMonitorPoints)
      let deleteProject = `DELETE FROM projects WHERE id = ${projectId};`
      let deleteMonitorPoints = `DELETE FROM monitorPoints WHERE projectId = ${projectId};`
      let deleteItems = deleteProject + deleteMonitorPoints
      if (deleteMonitorPointTables.length !== 0) {
        deleteMonitorPointTables = deleteMonitorPointTables[0].values
        for (let i = 0; i < deleteMonitorPointTables.length; i++) {
          deleteItems += `DROP TABLE "main"."${deleteMonitorPointTables[i]}";`
        }
      }
      db.run(deleteItems)
      let data = db.export()
      let buffer = Buffer.from(data)
      fs.writeFileSync('src/database/sml.sqlite', buffer)
      alert('success')
      location.reload()
    },
    handleCellClick (row, column, cell, event) {
      if (column.label === '名称') {
        let projectId = row.id
        this.$router.push({
          name: 'Project',
          params: {
            id: projectId
          }
        })
      }
    },
    handleCurrentChange (val) {
      let start = this.pageSize * (val - 1)
      let end = this.pageSize * val
      this.tableData = this.allData.slice(start, end)
    },
    readAllProjects () {
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      let queryAllProjects = `SELECT * FROM projects`
      let allProjects = db.exec(queryAllProjects)
      if (allProjects.length === 0) return []
      let values = allProjects[0].values
      let keys = allProjects[0].columns
      let items = []
      let item
      for (let i = 0; i < values.length; i++) {
        item = {}
        for (let j = 0; j < values[i].length; j++) {
          item[keys[j]] = values[i][j]
        }
        items.push(item)
      }
      return items
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert('saving')
          this.saveData()
          this.dialogFormVisible = false
          this.resetForm(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    saveData () {
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      debugger
      let insertSql = `INSERT INTO projects (
        name, xCoordinate, yCoordinate, longitude, latitude, description
      ) VALUES (
        "${this.ruleForm.name}", 
        ${this.ruleForm.xCoordinate},
        ${this.ruleForm.yCoordinate},
        ${this.ruleForm.longitude},
        ${this.ruleForm.latitude},
        "${this.ruleForm.desc}"
      )`
      db.run(insertSql)
      let data = db.export()
      let buffer = Buffer.from(data)
      fs.writeFileSync('src/database/sml.sqlite', buffer)
      alert('success')
    }
  }
}
</script>


<style>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-footer {
  height: 120px;
  line-height: 120px;
  background: white;
}
#components-layout-demo-basic .ant-layout-header {
  background: #001529;
  color: #fff;
  height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  /* background: rgba(16, 142, 233, 1); */
  /* color: #fff; */
  min-height: 120px;
  line-height: 120px;
  height: 500px;
  background: white;
  color: #001529;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
/* #components-layout-demo-basic > .ant-layout:last-child {
  margin: 50;
} */
.ant-layout-header h1 {
  color: white;
}
.ant-layout-content h2 {
  margin-top: 10px;
  margin-left: 40px;
  margin-bottom: 20px;
  float: left;
  color: black;
}
.ant-layout-footer h3 {
  color: black;
}
.button-style {
  background: rgb(190, 200, 200);
  padding: 26px 16px 16px;
}
.table-style {
  margin: 50px 200px 0 200px;
}
</style>