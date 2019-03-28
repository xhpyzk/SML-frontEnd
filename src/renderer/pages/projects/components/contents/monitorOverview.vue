<template>
  <a-col :span="18">
    <div>
      <p class="notes">说明</p>
      <ul>
        <li>
          “安全”是指测量值小于设计值的百分之六十
        </li>
        <li>
          “注意”是指测量值在设计值百分之六十到八十之内
        <li>
          “警告”是指测量值在设计值百分之八十到百分之百之内
        </li>
        <li>
          “危险”是指测量值大于设计值
        </li>
      </ul>
      <br>
      <a-table :columns="columns"
        :rowKey="record => record.login.uuid"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="name" slot-scope="name">
          {{name.first}} {{name.last}}
        </template>
      </a-table>
    </div>
  </a-col>
</template>

<script>
// import reqwest from 'reqwest'
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' }
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' }
  ],
  width: '20%'
}, {
  title: 'Email',
  dataIndex: 'email'
}]

export default {
  name: 'monitorOverview',
  data () {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
    }
  }
}
</script>

<style>
.notes {
  font-size: 20px;
}
</style>
