
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
            :row-class-name="tableRowClassName"
            @row-click="handleClick"
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column
                label="编号"
                prop="id">
            </el-table-column>
            <el-table-column
                label="工程项目"
                prop="name">
            </el-table-column>
            <el-table-column
                label="项目地点"
                 prop="location">
            </el-table-column>
            <el-table-column label="Action">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    移除
                    </el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <a-row>
          <a-col :span="8" :offset="4">
            <a-button type="dashed" size="large" @click="showModal">新建工程</a-button>
            <modal v-show="isVisible" @close="closeModal">
              <div slot="header">
                <h3>新建工程</h3>
                <button type="button" class="btn-close" @click="closeModal">x</button>
              </div>
              <div class="content" slot="body">
              </div>
              <a-button type="dashed" size="large" slot="footer" @click="closeModal">确定</a-button>
            </modal>
          </a-col>
          <a-col :span="8">
            <a-button type="dashed" size="large" @click="showModal">加入工程</a-button>
            <modal v-show="isVisible" @close="closeModal">
              <div slot="header">
                <h3>加入工程</h3>
                <button type="button" class="btn-close" @click="closeModal">x</button>
              </div>
              <div class="content" slot="body">
                
              </div>
              <a-button type="dashed" size="large" slot="footer" @click="closeModal">确定</a-button>
            </modal>
          </a-col>
        </a-row>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import Modal from './components/modal.vue'
export default {
  name: 'Home',
  components: {
    Modal
  },
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: 'Alex',
        location: 'yes'
      }],
      isVisible: false
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex
    },
    handleClick (row, event, column) {
      console.log(row.index)
      this.$router.push({ path: `/project/:${row.index}` })
    },
    showModal () {
      this.isVisible = true
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    closeModal () {
      this.isVisible = false
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
  line-height: 80px;
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
  margin-top: auto;
  margin-left: 40px;
  margin-bottom: auto;
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
  margin-top: 10px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 10px;
}
</style>