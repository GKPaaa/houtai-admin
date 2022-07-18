<template>
  <el-container class="container">
    <el-header>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="10"
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
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="1"
          ><div class="grid-content bg-purple" style="line-height: 60px">
            <el-button @click="back">退出</el-button>
          </div></el-col
        >
      </el-row>
    </el-header>
    <!-- 头部区域制作完毕 -->

    <el-container class="el-menu-vertical-demo">
      <el-aside width="200px" ref="aside">
        <el-radio-group>
          <el-button
            @click="changeWidth"
            v-if="isCollapse"
            icon="el-icon-edit"
            square
            class="closeBtn"
          ></el-button>
          <el-button
            @click="isCollapse = !isCollapse"
            v-else
            type="danger"
            icon="el-icon-edit"
            class="btn"
          ></el-button>
        </el-radio-group>
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          :collapse-transition="false"
        >
          <el-submenu index="1">
            <template #title>我的工作台</template>
            <el-menu-item index="1-1">111</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>我的工作台</template>
            <el-menu-item index="2-1">111</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template #title>我的工作台</template>
            <el-menu-item index="3-1">111</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {

  },
  data () {
    return {
      isCollapse: false
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
      // this.$refs.aside.style = 'width:100px'
    }
  },
  computed: {},
  watch: {
    isCollapse: {
      handler () {

      },
      deep: true
    }
  },
  filters: {},
  components: {},
  mounted () {

  }
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  min-height: 200px;
}
.el-menu {
  border-right: none;
}
.btn {
  width: 200px;
}
.closeBtn {
  width: 100px;
}
</style>
