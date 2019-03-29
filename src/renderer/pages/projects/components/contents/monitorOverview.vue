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
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
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
.more-space {
  margin-top: 20px;
}
</style>
