<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <h1>你好，XXX</h1>
      </a-layout-header>
      <a-layout-content>
        <h2>当前所有工程：</h2>
        <div class="table-style">
          <a-table :columns="columns" :dataSource="data" :customRow="handleClick">
            <a slot="action" href="javascript:;">删除</a>
            <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.description}}</p>
          </a-table>
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

<script>
import Modal from './components/modal.vue'
const columns = [
  { title: '编号', dataIndex: '编号', key: '编号' },
  { title: '工程项目', dataIndex: '工程项目', key: '工程项目' },
  { title: '项目地点', dataIndex: '项目地点', key: '项目地点' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    scopedSlots: { customRender: 'action' }
  }
]
const data = [
  {
    key: 1,
    工程项目: 'John Brown',
    编号: 1,
    项目地点: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    工程项目: 'Jim Green',
    编号: 2,
    项目地点: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    工程项目: 'Joe Black',
    编号: 3,
    项目地点: 'Sidney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  }
]
export default {
  name: 'Home',
  components: {
    Modal
  },
  data () {
    return {
      data,
      columns,
      isVisible: false
    }
  },
  methods: {
    handleClick (record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              name: '/project',
              params: {
                id: index
              }
            })
          }
        }
      }
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
  margin: 40px;
}
</style>