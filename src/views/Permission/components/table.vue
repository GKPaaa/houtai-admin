<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand" label="#">
        <!-- ------------------------------------------ -->
        <template slot-scope="props">
          <el-row v-for="item in props.row.children" :key="item.id">
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-tag class="one">
                  {{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i></div
            ></el-col>

            <el-col :span="18"
              ><div
                class="grid-content bg-purple-light"
                v-for="item1 in item.children"
                :key="item1.id"
                style="display: flex"
              >
                <el-tag type="success">
                  {{ item1.authName }}
                </el-tag>
                <i
                  class="el-icon-caret-right"
                  style="
                    margin-right: 60px;
                    margin-top: 9px;
                    text-align: center;
                  "
                ></i>
                <div
                  class="grid-content bg-purple-light"
                  v-for="item2 in item1.children"
                  :key="item2.id"
                >
                  <el-tag
                    closable
                    @close="fn(props.row, item2)"
                    style="margin-right: 10px; margin-bottom: 10px"
                  >
                    {{ item2.authName }}
                  </el-tag>
                </div>
              </div></el-col
            >
          </el-row>
        </template>
        <!-- ------------------------------------------ -->
      </el-table-column>
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作" prop="id">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-plus" size="small"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-upload2" size="small"
            >删除</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-check"
            size="small"
            @click="assign(scope.$index, scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="checkedId"
          :props="defaultProps"
          ref="tree"
        >
        </el-tree>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { rolesManage } from '@/api/user'
import { tree, dele, roleGive } from '@/api/permission'
export default {
  created () {
    this.rolesManage()
    // console.log(this.$router.options)
  },
  data () {
    return {
      roleId: null,
      checkedId: [],
      dialogVisible: false,
      tableData: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      assignInfo: '',
      assignID: null
    }
  },
  methods: {
    async rolesManage () {
      try {
        const res = await rolesManage()
        // console.log(res)
        this.tableData = res.data.data
        // console.log(this.tableData)
      } catch (err) {
        console.log(err)
      }
    },
    async assign (index, row) {
      console.log(row)
      this.assignID = row.id
      this.checkedId = []
      // this.roleId = row.id
      this.dialogVisible = true
      const checked = this.tableData[index]
      // console.log(checked)
      checked.children.forEach(item => {
        if (item.children) {
          item.children.forEach(item1 => {
            if (item1.children) {
              item1.children.forEach(item2 => {
                this.checkedId.push(item2.id)
              })
            }
          })
        }
      })
      try {
        const res = await tree()
        this.data = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    async fn (row, id) {
      try {
        // console.log(row.id, id.id)
        await dele({ roleId: row.id, rightId: id.id })
        // console.log(res)
        this.$message.success('取消权限成功')
        this.rolesManage()
      } catch (err) {
        console.log(err)
      }
    },
    async assignment () {
      this.dialogVisible = false
      // console.log(this.$refs.tree.getCheckedKeys().join(','))
      this.assignInfo = this.$refs.tree.getCheckedKeys().join(',')
      console.log(this.assignInfo)
      console.log(this.assignID)
      const res = await roleGive({ roleId: this.assignID, rids: this.assignInfo })
      console.log(res)
      // console.log(this.roleId)
      // console.log(this.data)
      this.$message.success('更新成功')
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}

}

</script>

<style scoped lang='less'>
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
.el-row {
  padding: 0 25px;
}
</style>
