<template>
  <el-card class="box-card">
    <el-button type="primary" @click="fn">添加角色</el-button>
    <Table></Table>
  </el-card>
</template>

<script>
import Table from './components/table.vue'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    fn () {
      console.log(123)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    Table
  }
}
</script>

<style scoped >
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.box-card {
  width: 100%;
  overflow: auto;
  margin-top: 15px;
}
.el-button {
  margin-bottom: 5px;
}
</style>
