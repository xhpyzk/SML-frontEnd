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
            <a slot="action" slot-scope="text" href="javascript:;">删除</a>
            <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.description}}</p>
          </a-table>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <button></button>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
const columns = [
  { title: '编号', dataIndex: '编号', key: '编号' },
  { title: '工程项目', dataIndex: '工程项目', key: '工程项目' },
  { title: '项目地点', dataIndex: '项目地点', key: '项目地点' },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
]

const data = [
  { key: 1, 工程项目: 'John Brown', 编号: 1, 项目地点: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 2, 工程项目: 'Jim Green', 编号: 2, 项目地点: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
  { key: 3, 工程项目: 'Joe Black', 编号: 3, 项目地点: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' }
]

export default {
  name: 'Home',
  data () {
    return {
      data,
      columns
    }
  },
  methods: {
    handleClick (record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({path: `/project/${index}`})
          }
        }
      }
    }
  }
}
</script>


<style>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-footer {
  color: #fff;
  height: 120px;
  line-height: 120px;
  /* background:tomato; */

}
#components-layout-demo-basic .ant-layout-header {
  background: #7dbcea;
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
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
/* #components-layout-demo-basic > .ant-layout:last-child {
  margin: 50;
} */

h1 {
  color: white;
}
h2 {
  margin-left: 40px;
  margin-bottom: 0px;
  float: left;
}
.button-style {
  background: rgb(190, 200, 200);
  padding: 26px 16px 16px;
}

.table-style {
  margin: 40px;
}
</style>
