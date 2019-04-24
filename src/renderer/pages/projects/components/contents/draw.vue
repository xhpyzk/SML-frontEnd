<template>
<div>
  <el-row>
    <el-col :span="10">
      <el-alert
        :title="errorInfo"
        type="error"
        center
        :show-icon="true"
        v-show="error"
        style="width: 350px">
      </el-alert>
      <br>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="监测点" prop="point">
          <el-select v-model="ruleForm.point" placeholder="请选择监测点">
            <el-option v-for="point in allPoints" :key="point[0]"
            :label="point[1]" :value="point[1]"           
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="施工天数">
          <el-col :span="6">
            <el-form-item prop="start">
              <el-input v-model="ruleForm.start"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="0.5">----</el-col>
          <el-col :span="6">
            <el-form-item prop="end">
              <el-input v-model="ruleForm.end"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12">
      <ve-line :data="chartData" :title="title"></ve-line>
    </el-col>
  </el-row>
  <div id="line"></div>
  </div>
</template>
<script>
import sql from 'sql.js'
import fs from 'fs'
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/title'
export default {
  name: 'Draw',
  components: {
    VeLine
  },
  data () {
    return {
      chartData: {},
      title: {},
      error: false,
      errorInfo: '',
      allPoints: this.readPoints(),
      drawData: '',
      ruleForm: {
        point: '',
        start: '',
        end: ''
      },
      rules: {
        point: [
          {required: true, message: '请选择监测点', trigger: 'change'}
        ],
        start: [
          {required: true, message: '请选择起始施工天数', trigger: 'change'}
        ],
        end: [
          {required: true, message: '请选择终止施工天数', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
          let db = new sql.Database(fileBuffer)
          let queryMonitorVals = `SELECT days, hours, monitorValues FROM "${this.ruleForm.point}" 
                                  WHERE days >= ${this.ruleForm.start} AND days <= ${this.ruleForm.end}`
          let monitorVals = db.exec(queryMonitorVals)
          if (monitorVals.length === 0) {
            this.error = true
            this.errorInfo = '当前监测点还没有上传过数据！或者查询时间范围有误，请确认后再输入'
            return false
          }
          monitorVals = monitorVals[0].values
          let keys = []
          let vals = []
          for (let i = 0; i < monitorVals.length; i++) {
            keys.push(`${monitorVals[i][0]}/${monitorVals[i][1]}`)
            vals.push(monitorVals[i][2])
          }
          this.draw(this.ruleForm.point, keys, vals)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.isShow = false
    },
    readPoints () {
      let fileBuffer = fs.readFileSync('src/database/sml.sqlite')
      let db = new sql.Database(fileBuffer)
      let queryAllMonitorPoints = `SELECT id, name FROM monitorPoints WHERE projectId = ${this.$route.params.id}`
      let allMonitorPoints = db.exec(queryAllMonitorPoints)
      if (allMonitorPoints.length === 0) {
        allMonitorPoints = []
      } else {
        allMonitorPoints = allMonitorPoints[0].values
      }
      return allMonitorPoints
    },
    draw (point, x, y) {
      debugger
      let columns = ['监测天数', '监测值']
      let rows = new Array(x.length)
      for (let i = 0; i < x.length; i++) {
        rows[i] = {'监测天数': x[i], '监测值': y[i]}
      }
      this.title = {
        left: 'cneter',
        text: `${point}监测数据走势图`
      }
      this.chartData = {
        columns,
        rows
      }
    }
  }
}
</script>