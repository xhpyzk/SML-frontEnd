<template>
  <div>
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
  </div>
</template>

<script>
import fs from 'fs'
import sql from 'sql.js'
export default {
  name: 'newPoints',
  data () {
    let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
    let db = new sql.Database(fileBuffer)
    let queryMonitorContent = 'SELECT * FROM monitorContent'
    let monitorContents = db.exec(queryMonitorContent)[0].values
    return {
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
      db.run(insertSql)
      // 创建该监测点的监测数据表
      let createTable = `
      CREATE TABLE "main"."${this.ruleForm.name}" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "days" integer NOT NULL,
        "hours" char NOT NULL,
        "monitorValues" float NOT NULL
      );

      CREATE UNIQUE INDEX "main"."monitorPointsDataId"
      ON "${this.ruleForm.name}" (
        "id" COLLATE BINARY ASC,
        "monitorPointsName" COLLATE BINARY ASC
      );
      `
      db.run(createTable)
      let data = db.export()
      let buffer = Buffer.from(data)
      fs.writeFileSync('src/database/sml.sqlite', buffer)
      alert('success')
    }
  }
}
</script>