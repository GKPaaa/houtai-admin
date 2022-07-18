<template>
  <el-container class="container">
    <el-header>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="23"
          ><div
            class="grid-content bg-purple"
            style="display: flex; align-item: center"
          >
            <img
              src="@/assets/1.jpg"
              alt=""
              style="height: 60px; width: 60px"
            />
            <h1 style="line-height: 60px; color: #fff; margin-left: 10px">
              苍天已死，黄天当立
            </h1>
          </div></el-col
        >

        <el-col :span="1"
          ><div class="grid-content bg-purple" style="line-height: 60px">
            <el-button @click="back">退出</el-button>
          </div></el-col
        >
      </el-row>
    </el-header>
    <!-- 头部区域制作完毕 -->
    <!-- ----------------------------------------------------------------------------------------------- -->
    <!-- 侧边区域开始制作 -->
    <el-container class="el-menu-vertical-demo">
      <el-aside :style="isCollapse ? 'width:60px' : 'width:200px'">
        <el-radio-group v-model="isCollapse">
          <el-button
            @click="changeWidth"
            v-if="isCollapse"
            icon="el-icon-s-unfold"
            square
            class="closeBtn"
            type="danger"
            style="border-radius: 0"
          ></el-button>
          <el-button
            @click="isCollapse = !isCollapse"
            v-else
            type="danger"
            icon="el-icon-s-fold"
            class="btn"
            style="border-radius: 0"
          ></el-button>
        </el-radio-group>
        <el-menu
          :collapse-transition="false"
          :collapse="isCollapse"
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          background-color="#373d41"
          text-color="#fff"
          unique-opened
        >
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">用户管理</span>
            </template>

            <el-menu-item index="1-1" @click="userList">
              <i class="el-icon-menu" style="margin-bottom: 4px"></i>
              用户列表</el-menu-item
            >
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item
              index="1-1"
              @click="$router.replace('/permission').catch((err) => err)"
            >
              <i class="el-icon-menu" style="margin-bottom: 4px"></i
              >角色列表</el-menu-item
            >
            <el-menu-item
              index="1-2"
              @click="$router.replace('/rights').catch((err) => err)"
            >
              <i class="el-icon-menu" style="margin-bottom: 4px"></i
              >权限列表</el-menu-item
            >
          </el-submenu>
          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
            </template>

            <el-menu-item
              index="1-1"
              @click="$router.replace('/manager/list').catch((err) => err)"
            >
              <i class="el-icon-menu" style="margin-bottom: 4px"></i
              >商品列表</el-menu-item
            >
            <el-menu-item
              index="1-2"
              @click="$router.replace('/manager/value').catch((err) => err)"
            >
              <i class="el-icon-menu" style="margin-bottom: 4px"></i
              >商品参数</el-menu-item
            >
            <el-menu-item
              index="1-3"
              @click="$router.replace('/manager/sort').catch((err) => err)"
            >
              <i class="el-icon-menu" style="margin-bottom: 4px"></i
              >商品分类</el-menu-item
            >
          </el-submenu>
          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理 </span>
            </template>
            <el-menu-item
              index="1-1"
              @click="$router.replace('/orders').catch((err) => err)"
            >
              <i class="el-icon-menu" style="margin-bottom: 4px"></i
              >订单列表</el-menu-item
            >
          </el-submenu>
          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- ----------------------------------------------------------------------------------------------- -->
      <!-- 侧边区域结束制作 -->

      <!-- 主体区域开始制作 -->
      <el-main>
        <p v-if="isHello">欢迎登陆</p>
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          v-show="isHello === false"
          ref="bread"
        >
          <el-breadcrumb-item :to="{ path: '/home' }" :replace="true"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item ref="tit">{{ titVal }}</el-breadcrumb-item>
          <el-breadcrumb-item ref="txt">{{ txtVal }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    // console.log(this.$route)
    this.avoid()
  },
  data () {
    return {
      isCollapse: true,
      isHello: '',
      titVal: '',
      txtVal: ''
    }
  },
  methods: {
    // 账户退出并且删除当前存储在本地的token值 -- 开始
    back () {
      this.$router.push('/login')
      this.$store.commit('removeUser')
    },
    // 账户退出并且删除当前存储在本地的token值 -- 结束
    changeWidth () {
      this.isCollapse = !this.isCollapse
    },
    // 获取用户列表的信息放在卡片里面
    userList () {
      this.$router.replace('/users').catch((err) => err)
      this.isHello = false
      // 跳转到用户卡片信息那里之后还要渲染面包片 将面包片渲染成点击之后的完整写法
    },
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // 写一个方法，再页面刷新的时候和 上方路径的path发生变化的时候，去判断是否将欢迎登录隐藏还是出现，（注：欢迎登录与卡片显示和面包屑是相斥的，不能同时出现，出现这个问题就可以采用下面封装的方法简单避免-----有更好的方法，去搜索！！）
    avoid () {
      if (this.$route.path === '/home') {
        this.isHello = true
      } else if (this.$route.path === '/users') {
        this.titVal = '用户管理'
        this.txtVal = '用户列表'
        this.isHello = false
      } else if (this.$route.path === '/permission') {
        this.titVal = '权限管理'
        this.txtVal = '角色列表'
        this.isHello = false
      } else if (this.$route.path === '/rights') {
        this.titVal = '权限管理'
        this.txtVal = '权限列表'
        this.isHello = false
      } else if (this.$route.path === '/orders') {
        this.titVal = '订单管理'
        this.txtVal = '订单列表'
        this.isHello = false
      } else {
        this.isHello = false
      }
    }
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

  },
  computed: {},
  watch: {
    $route: {
      handler () {
        this.avoid()
      },
      deep: true
    }
  },
  filters: {},
  components: {},
  mounted () { }
}
</script>

<style scoped lang="less">
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    overflow: hidden;
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu-vertical-demo {
  overflow: hidden;
  background-color: #373d41;
}
.el-menu {
  border-right: none;
}
.btn {
  width: 200px;
}
.closeBtn {
  width: 60px;
}
</style>
