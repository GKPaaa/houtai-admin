<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-bottom: 12px"
      :stripe="true"
    >
      <el-table-column label="#" width="180" type="index"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="180"> </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.open"
            active-color="#409eff"
            @change="changeState(scope.$index, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
          ></el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleSet(scope.$index, scope.row)"
            icon="el-icon-setting"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页的页码的显示 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allUser"
      >
      </el-pagination>
    </div>
    <!-- 编辑用户，对用户进行设置 -->
    <el-dialog title="分配角色" :visible.sync="editVisible" width="60%">
      <span>
        <!-- 用户名称 -->
        <el-form
          :model="editForm"
          ref="editForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名称" prop="username">
            <el-input
              v-model.number="editForm.username"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 邮箱 -->
        <el-form
          :model="editForm"
          ref="editForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model.number="editForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 手机号 -->
        <el-form :model="editForm" ref=" editForm" label-width="100px">
          <el-form-item label="手机号" prop="mobile">
            <el-input
              type="mobile"
              v-model.number="editForm.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 用户设置 -->
    <el-dialog title="分配角色" :visible.sync="setVisible">
      <p>当前的用户：{{ user }}</p>
      <p>当前的角色：{{ userRol }}</p>
      <el-form>
        <el-form-item label="分配新角色">
          <el-select v-model="NewRole" placeholder="请选择">
            <el-option
              :label="item.roleName"
              :value="item.roleDesc"
              v-for="item in setNewRole"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setVisible = false">取 消</el-button>
        <el-button type="primary" @click="setVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { usersAPI, delUser, editUser, rolesManage, roleState } from '@/api/user'
export default {
  props: {
    searchResult: {
      type: [Object, Array]
    }
  },
  async created () {
    this.getUserInfo()
  },
  data () {
    return {
      setVisible: false,
      editVisible: false,
      dialogVisible: false,
      allUser: 0,
      user: null,
      userRol: null,
      tableData: [{
        name: '',
        phone: '',
        role: '',
        id: '',
        open: false
      }],
      page: {
        pagenum: 1,
        pagesize: 5
      },
      // 编辑用户的变量
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      setForm: {
        name: '',
        role: ''
      },
      // 编辑用户的新角色
      setNewRole: [],
      NewRole: ''

    }
  },
  methods: {
    async changeState (index, row) {
      // this.tableData.open = !val
      // console.log(index, row)
      try {
        await roleState({ uId: row.id, type: row.open })
        this.$message({
          message: '修改用户信息成功',
          type: 'success'
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 获取用户的信息渲染到列表里面
    async getUserInfo () {
      const res = await usersAPI(this.page)
      // console.log(res)
      this.tableData = res.data.data.users
      // console.log(this.tableData)
      this.tableData = this.tableData.map(item => ({ id: item.id, name: item.username, role: item.role_name, phone: item.mobile, open: item.mg_state, email: item.email }))
      // console.log(this.tableData)
      this.allUser = res.data.data.total
    },
    handleSizeChange (val) {
      this.page.pagesize = val
      this.getUserInfo()
    },
    handleCurrentChange (val) {
      this.page.pagenum = val
      this.getUserInfo()
    },
    // 根据ID删除该用户
    async handleDelete (index, row) {
      // console.log(typeof (row.id))
      await delUser(row.id)
      location.reload()
    },
    // 编辑用户
    async handleEdit (index, row) {
      console.log(row)
      this.editForm = {
        id: row.id,
        username: row.name,
        email: row.email,
        mobile: row.phone
      }
      this.editVisible = true
      // 确认编辑用户
    },
    async confirmEdit () {
      const res = await editUser(this.editForm)
      console.log(this.editForm.id)
      location.reload()
      console.log(res)
      this.editVisible = false
    },
    // 设置用户
    async handleSet (index, row) {
      console.log(row)
      this.user = row.name
      this.userRol = row.role
      this.setVisible = true

      const res = await rolesManage()
      console.log(res)
      this.setNewRole = res.data.data
      // setUser()
    }

  },
  computed: {},
  watch: {
    searchResult: {
      handler () {
        console.log(this.searchResult)
        this.tableData = [this.searchResult]
        this.tableData = this.tableData.map(item => ({ email: item.email, id: item.id, mobile: item.mobile, rid: item.rid, name: item.username }))
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
