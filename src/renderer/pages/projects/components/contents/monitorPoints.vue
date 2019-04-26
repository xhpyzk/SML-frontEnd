<template>
  <a-col :span="17">
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
      :total="allData.length"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <br>
    <a-icon type="form" />
    <span class="notes">新建监测点</span>
    <el-form :inline='true' :model="ruleForm" :rules="rules" ref="ruleForm" 
            label-width="100px" class="demo-ruleForm more-space" size="large"
            :label-position="labelPosition"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="监测内容" prop="monitorContent">
        <el-select v-model="ruleForm.monitorContent" placeholder="请选择监测内容">
          <el-option v-for="content in monitorContents" :key="content[0]"
                    :label="content[1]" :value="content[0]"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="x 坐标" prop="xCoordinate">
        <el-input v-model="ruleForm.xCoordinate"></el-input>
      </el-form-item>
      <el-form-item label="y 坐标" prop="yCoordinate">
        <el-input v-model="ruleForm.yCoordinate"></el-input>
      </el-form-item>
      <el-form-item label="z 坐标" prop="zCoordinate">
        <el-input v-model="ruleForm.zCoordinate"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="最大控制值" prop="maxControlVal">
        <el-input v-model="ruleForm.maxControlVal"></el-input>
      </el-form-item>
      <el-form-item label="最小控制值" prop="minControlVal">
        <el-input v-model="ruleForm.minControlVal"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="增长速度控制值：连续" prop="day" label-width="170px">
        <el-input v-model="ruleForm.day"></el-input>
      </el-form-item>
      <el-form-item label="天，测量值不得超过" prop="shift" label-width="160px">
        <el-input v-model="ruleForm.shift"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="medium">确认</el-button>
        <el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>
      </el-form-item>
    </el-form>
  </a-col>
</template>

<script>
import fs from 'fs'
import sql from 'sql.js'
export default {
  name: 'monitorPoints',
  data () {
    let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
    let db = new sql.Database(fileBuffer)
    let allData
    let pageSize = 3
    allData = this.readData()
    let queryMonitorContent = 'SELECT * FROM monitorContent'
    let monitorContents = db.exec(queryMonitorContent)
    if (monitorContents.length === 0) {
      monitorContents = []
    } else {
      monitorContents = monitorContents[0].values
    }
    return {
      pageSize,
      allData,
      tableData: allData.slice(0, pageSize),
      labelPosition: 'right',
      monitorContents,
      ruleForm: {
        name: '',
        monitorContent: '',
        xCoordinate: '',
        yCoordinate: '',
        zCoordinate: '',
        maxControlVal: '',
        minControlVal: '',
        day: '',
        shift: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        monitorContent: [
          { required: true, message: '请选择监测内容', trigger: 'change' }
        ],
        xCoordinate: [
          { required: true, message: '请输入 x 坐标', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        yCoordinate: [
          { required: true, message: '请输入 y 坐标', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        zCoordinate: [
          { required: true, message: '请输入 z 坐标', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        maxControlVal: [
          { required: true, message: '请输入最大控制值', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        minControlVal: [
          { required: true, message: '请输入最小控制值', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        day: [
          { required: true, message: '请输入天数', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        shift: [
          { required: true, message: '请输入控制测量值', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    readData () {
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      let readRes = db.exec(`SELECT * FROM monitorPoints WHERE projectId = ${this.$route.params.id}`)
      if (readRes.length === 0) return []
      readRes = readRes[0]
      let keys = readRes.columns
      let values = readRes.values
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
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('saving')
          this.saveData()
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
      let insertSql = `INSERT INTO monitorPoints 
      ("name", "projectId", "monitorContentId", "xCoordinate", "yCoordinate", "zCoordinate", "maxControlVal", "minControlVal", "maxDays", "displacement") 
      VALUES `
      let values = `("${this.ruleForm.name}",
        ${this.$route.params.id},
        ${this.ruleForm.monitorContent},
        ${this.ruleForm.xCoordinate},
        ${this.ruleForm.yCoordinate},
        ${this.ruleForm.zCoordinate},
        ${this.ruleForm.maxControlVal},
        ${this.ruleForm.minControlVal},
        ${this.ruleForm.day},
        ${this.ruleForm.shift}
      );`
      insertSql += values
      // db.run(insertSql)
      // 创建该监测点的监测数据表
      let createTable = `
      CREATE TABLE "main"."${this.ruleForm.name}" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "days" integer NOT NULL,
        "hours" char NOT NULL,
        "monitorValues" float NOT NULL
      );

      CREATE UNIQUE INDEX "main"."${this.ruleForm.name}-monitorDataId"
      ON "${this.ruleForm.name}" (
        "id" COLLATE BINARY ASC
      );

      CREATE INDEX "main"."${this.ruleForm.name}-monitorDays"
      ON "${this.ruleForm.name}" (
        "days" COLLATE BINARY ASC
      );

      CREATE INDEX "main"."${this.ruleForm.name}-monitorHours"
      ON "${this.ruleForm.name}" (
        "hours" COLLATE BINARY ASC
      );

      CREATE INDEX "main"."${this.ruleForm.name}-monitorValues"
      ON "${this.ruleForm.name}" (
        "monitorValues" COLLATE BINARY ASC
      );
      `
      db.run(insertSql + createTable)
      let data = db.export()
      let buffer = Buffer.from(data)
      fs.writeFileSync('src/database/sml.sqlite', buffer)
      alert('success')
      this.allData = this.readData()
      this.tableData = this.allData.slice(0, this.pageSize)
    }
  }
}
</script>