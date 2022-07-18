<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="big" @click="addVisible"
        >添加分类</el-button
      >
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px; margin-top: 15px"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="#" width="60" type="index">
          <template v-slot="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column label="是否有效" width="180">
          <template v-slot="scope">{{ scope.row.cat_deleted }}</template>
        </el-table-column>

        <el-table-column label="排序" width="180">
          <template v-slot="scope">
            <el-tag
              :type="
                scope.row.cat_level === 0
                  ? 'primary'
                  : scope.row.cat_level === 1
                  ? 'success'
                  : 'warning'
              "
              >{{
                scope.row.cat_level === 0
                  ? "一级"
                  : scope.row.cat_level === 1
                  ? "二级"
                  : "三级"
              }}</el-tag
            ></template
          >
        </el-table-column>
        <!-- 删除和编辑操作 -->
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" size="small"
            >搜索</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="small"
            >搜索</el-button
          >
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 4, 6, 10]"
          :page-size="sortVal.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加商品分类弹出框 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="80px" :model="addList" :rules="rules" ref="addSort">
        <el-form-item label="分类名称" prop="name">
          <el-input autocomplete="off" v-model="addList.name"></el-input>
        </el-form-item>
        父级分类：
        <el-cascader
          :options="options"
          :props="{
            expandTrigger: 'hover',
            checkStrictly: true,
            label: 'cat_name',
            value: 'cat_name',
          }"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { sort, fatherSort } from '@/api/sort'
export default {
  created () {
    this.sort()
  },
  data () {
    return {
      value: '',
      addList: {
        name: '',
        fatherSort: []
      },
      rules: {
        name: [
          { required: true, message: '请输入分类称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      id: 0,
      tableData: [],
      // 获取分类数据的相关参数
      sortVal: {
        pagenum: 1,
        pagesize: 10
      },
      dialogVisible: false,
      options: [],
      addInfo: {},

      currentPage: 1,
      total: null
    }
  },
  methods: {
    async sort () {
      let id = 0
      const res = await sort(this.sortVal)
      console.log(res)
      this.total = res.data.data.total
      this.tableData = res.data.data.result
      this.tableData.forEach(item => { item.id = id + 1; id = id + 1 })
    },
    async addVisible () {
      this.dialogVisible = true
      const res = await sort({ type: 2 })
      this.options = res.data.data
      console.log(this.options)
    },
    cancel () {
      this.dialogVisible = false
    },

    handleChange (value) {
      // 添加有两层 而获取到的value值只是里面的字符串并不包含id等参数
      // 如果选择是第一层就简单foreach一下第一层，然后获取到参数
      // 第二层就foreach里的对children进行foreach获取到相关参数
      if (value.length === 1) {
        this.options.forEach(item => { if (item.cat_name === value[0]) this.addInfo.cat_pid = item.cat_id })
        this.addInfo.cat_level = 1
        this.addInfo.cat_name = this.addList.name
      } else if (value.length === 2) {
        this.options.forEach(item => {
          if (item.children) {
            item.children.forEach(item1 => {
              if (item1.cat_name === value[1]) {
                this.addInfo.cat_pid = item.cat_id
              }
            })
          }
        })
        this.addInfo.cat_level = 2
        this.addInfo.cat_name = this.addList.name
      }
    },
    async confirm () {
      try {
        await fatherSort(this.addInfo)
        this.$message.success('创建成功')
        this.dialogVisible = false
        this.addInfo = ''
      } catch (err) { this.$message.error(err) }
    },
    handleSizeChange (val) {
      this.sortVal.pagesize = val
      this.sort()
    },
    handleCurrentChange (val) {
      this.sortVal.pagenum = val
      this.sort()
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
  padding: 18px 0;
}

.box-card {
  width: 100%;
  margin-top: 20px;
}
</style>
