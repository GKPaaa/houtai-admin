<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix" style="display: flex">
      <span
        ><div style="margin-top: 15px; width: 460px">
          <el-input
            placeholder="请输入内容"
            v-model="ipt"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </div>
      </span>
      <el-button
        type="primary"
        size="small"
        style="margin-left: 15px; height: 35px; margin-top: 16px"
        @click="$router.push('/manager/add')"
        >添加商品</el-button
      >
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="600">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）" width="120">
        </el-table-column>
        <el-table-column prop="goods_number" label="商品重量" width="120">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="120">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="small"
              >编辑</el-button
            ><el-button type="danger" icon="el-icon-delete" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[1, 5, 10, 15]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import { goods, usersSearch } from '@/api/mananger'
export default {
  created () {
    this.getGoods()
  },
  data () {
    return {
      total: null,
      goods: {
        pagenum: 1,
        pagesize: 5
      },
      ipt: '',
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.goods.pagesize = val
      this.getGoods()
    },
    handleCurrentChange (val) {
      this.goods.pagenum = val
      this.getGoods()
    },
    async getGoods () {
      try {
        const res = await goods(this.goods)
        this.tableData = res.data.data.goods
        this.total = res.data.data.total
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 根据商品的名字查询并渲染到表格中
    async search () {
      // console.log(this.ipt)
      try {
        this.tableData = []
        const res = await usersSearch({ query: this.ipt, pagenum: this.goods.pagenum, pagesize: this.goods.pagesize })
        // console.log(res)
        this.tableData = res.data.data.goods
        this.total = res.data.data.total
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-top: 20px;
  width: 100%;
}
</style>
