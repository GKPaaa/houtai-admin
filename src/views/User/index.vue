<template>
  <div class="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix content">
        <el-col :span="10">
          <div style="margin-top: 15px">
            <el-input
              placeholder="请输入内容"
              v-model="iptVal"
              class="input-with-select"
            >
              <i
                class="el-icon-circle-close el-input__icon"
                slot="suffix"
                v-if="iptVal"
                @click="delSearch"
              >
              </i>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
          </div>
        </el-col>

        <!-- ---------------------------------------------- -->
        <el-col :span="12" class="btn">
          <el-button
            style="float: left"
            type="primary"
            @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </div>
      <!-- 添加用户添加的信息 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="60%">
        <span>
          <!-- 用户名 -->
          <el-form
            :model="numberValidateForm"
            ref="numberValidateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="用户名"
              prop="username"
              :rules="[{ required: true, message: '用户名不能为空' }]"
            >
              <el-input
                type="username"
                v-model.number="numberValidateForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- 密码 -->
          <el-form
            :model="numberValidateForm"
            ref="numberValidateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="密码"
              prop="password"
              :rules="[{ required: true, message: '密码不能为空' }]"
            >
              <el-input
                type="password"
                v-model.number="numberValidateForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- 邮箱 -->
          <el-form
            :model="numberValidateForm"
            ref="numberValidateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="邮箱"
              prop="email"
              :rules="[{ required: true, message: '邮箱不能为空' }]"
            >
              <el-input
                type="email"
                v-model.number="numberValidateForm.email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- 手机号 -->
          <el-form
            :model="numberValidateForm"
            ref="numberValidateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="手机号"
              prop="mobile"
              :rules="[{ required: true, message: '手机号不能为空' }]"
            >
              <el-input
                type="mobile"
                v-model.number="numberValidateForm.mobile"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加用户添加的信息 -->

      <!-- 卡片表格 -->
      <Card :searchResult="searchResult"></Card>
      <!-- -------------------------------------------------- -->
    </el-card>
  </div>
</template>

<script>
// 引入卡片组件
import Card from './compoents/card.vue'
// 引入添加用户的api接口
import { addUser, searchUser } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      iptVal: '',
      searchResult: [],
      dialogVisible: false,
      numberValidateForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 点击确认添加按钮添加用户方法
    async addUser () {
      try {
        this.dialogVisible = false
        console.log(this.numberValidateForm)
        await addUser(this.numberValidateForm)
        location.reload()
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 根据id查询用户
    async search () {
      // console.log(1123)
      const res = await searchUser(this.iptVal)
      this.searchResult = res.data.data
      // console.log(this.searchResult)
    },
    delSearch () {
      location.reload()
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    Card
  }
}

</script>

<style scoped lang='less'>
.card {
  margin-top: 12px;
  margin-bottom: 12px;
  .content {
    display: flex;
    align-items: center;
    .btn {
      margin: 14px 0 0 12px;
    }
  }
}
</style>
