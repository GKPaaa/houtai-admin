<template>
  <el-card class="box-card">
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column label="#" width="60" type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="480">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="480"> </el-table-column>
      <el-table-column prop="level" label="权限等级" width="480">
        <template slot-scope="scope">
          <el-tag type="" v-if="scope.row.level === '0'">等级一</el-tag>
          <el-tag type="success" v-else-if="scope.row.level === '1'"
            >等级二</el-tag
          >
          <el-tag type="warning" v-else>等级三</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getAllPer } from '@/api/permission'
export default {
  created () {
    this.getAllPer()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getAllPer () {
      try {
        const res = await getAllPer()
        console.log(res)
        this.tableData = res.data.data
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
  width: 100%;
  margin-top: 20px;
}
</style>
