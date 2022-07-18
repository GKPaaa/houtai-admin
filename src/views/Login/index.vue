<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-unlock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () {
  },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ]
      },
      userInfo: {}
    }
  },
  methods: {
    reset () {
      this.$refs.loginFormRef.resetFields()
    },

    async login () {
      try {
        await this.$refs.loginFormRef.validate()
        // console.log('校验成功')
        try {
          const res = await login(this.loginForm)
          this.userInfo = res.data.data
          console.log(res)
          this.$store.commit('setUser', res.data.data)
          this.$router.push('/home')
          this.$message({
            message: '恭喜您，登录成功',
            type: 'success'
          })
        } catch (err) { console.log(err) }
      } catch (err) {
        this.$message.error('登陆表单校验失败')
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
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 450px;
    height: 240px;
    background-color: #fff;
    height: 300px;
    padding: 30px 15px;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
