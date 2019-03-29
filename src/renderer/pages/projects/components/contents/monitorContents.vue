<template>
  <a-col :span="16">
    <h1>监测内容</h1>
    <el-form :inline='true' :model="ruleForm" :rules="rules" ref="ruleForm" 
             label-width="100px" class="demo-ruleForm more-space" size="large"
             :label-position="labelPosition"
    >
      <el-form-item label="监测类别" prop="monitorCategory">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <br>
    <div>
      <h1>您可以根据工程检测文件，参考以下样例添加：</h1>
      <p class="sub-title">某基坑项目的监测种类：</p>
      <span>
        维护墙顶垂直和水平位移、维护墙侧向水平位移（测斜）、坑外土体深层体侧向水平位移（测斜）、
        围护墙侧向土压力、支撑轴力、立柱沉降、坑底隆起（回弹）、坑外潜水水位、坑外地表沉降、周边
        建筑物垂直位移、周边地下管线垂直位移、周边地下管线水平位移
      </span>
      <br>
      <br>
      <p class="sub-title">某边坡项目的监测种类：</p>
      <span>降雨历时、降雨量、降雨强度、坡体内部（测斜）位移、裂缝长度、裂缝宽度、裂缝深度、坡面泉水出露位置、坡面位移</span>
    </div>
  </a-col>
</template>

<script>
  export default {
    name: 'monitorContents',
    data () {
      return {
        labelPosition: 'right',
        ruleForm: {
          monitorCategory: ''
        },
        rules: {
          monitorCategory: [
            { required: true, message: '请输入监测类别', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style>
h1 {
  color: black;
}
.sub-title {
  font-size: 20px;
}
</style>
