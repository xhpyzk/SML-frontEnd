<template>
  <el-dialog :title="VisibleType" :visible.sync="isVisible" :show-close="false">
  <el-form :model="form">
    <el-form-item label="工程名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="控制点坐标" :label-width="formLabelWidth">
      <el-input v-model="form.coordinate" placeholder="输入控制点坐标"></el-input>
    </el-form-item>
    <el-form-item label="控制点" :label-width="formLabelWidth">
        <el-input v-model="form.long_la_titude" placeholder="输入控制点经纬度"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible">取消</el-button>
    <el-button type="primary" @click="dialogFormVisible">提交</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'Edialog',
  props: ['isVisible', 'VisibleType'],
  data () {
    return {
      form: {
        name: '',
        coordinate: '',
        long_la_titude: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    dialogFormVisible: function () {
      this.$emit('edialogEvent', false)
    }
  }
}
</script>

