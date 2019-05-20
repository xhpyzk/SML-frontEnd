<template>
  <a-col :span="18">
    <h1>模拟边坡工程</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm margin-right">
        <el-form-item label="请输入描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <p class="bigger-font">概况：</p>
      <p v-html="projectDesc"></p>
  </a-col>
</template>

<script>
import fs from 'fs'
import sql from 'sql.js'
export default {
  name: 'ProjectOverview',
  data () {
    let projectDesc = this.readData()
    return {
      projectDesc,
      ruleForm: {
        desc: ''
      },
      rules: {
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
    readData () {
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      let queryProjectDesc = `select desc from projectOverview where projectId = ${this.$route.params.id}`
      let queryRes = db.exec(queryProjectDesc)
      let descs
      if (queryRes.length === 0) {
        descs = ''
      } else {
        let projectDesc = queryRes[0].values
        let descArray = []
        for (let i = 0; i < projectDesc.length; i++) {
          descArray.push(projectDesc[i][0])
        }
        descs = descArray.join('<br>')
      }
      return descs
    },
    saveData () {
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      let insertSql = `insert into projectOverview (projectId, desc) values (${this.$route.params.id}, "${this.ruleForm.desc}")`
      db.run(insertSql)
      let data = db.export()
      let buffer = Buffer.from(data)
      fs.writeFileSync('src/database/sml.sqlite', buffer)
      this.projectDesc = this.readData()
    }
  }
}
</script>

<style>
h1 {
  color: black;
}
.margin-right {
  margin-right: 90px;
}
.bigger-font {
  font-size: 20px;
}
</style>


