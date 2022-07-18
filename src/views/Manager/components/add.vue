<template>
  <el-card class="box-card">
    <el-alert
      title="添加商品的信息"
      type="info"
      show-icon
      center
      :closable="false"
    >
    </el-alert>
    <el-steps
      :active="active"
      finish-status="success"
      style="margin-top: 20px; width: 80%; margin-left: 110px"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <el-tabs tab-position="left" @tab-click="handleClick">
      <!-- 基本参数开始 -->
      <el-tab-pane label="基本参数">
        <el-form
          label-position="top"
          label-width="80px"
          :model="formLabelAlign"
          :rules="rules"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="formLabelAlign.price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="weight">
            <el-input v-model="formLabelAlign.weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="formLabelAlign.num"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="sort">
            <el-cascader
              v-model="value"
              :options="formLabelAlign.sort"
              :props="{ expandTrigger: 'hover', label: 'cat_name' }"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 基本参数结束 -->
      <!-- -------------------------- -->

      <!-- 配置管理 -->
      <el-tab-pane label="商品参数">
        <div v-for="item in shopInfo" :key="item.attr_id">
          <p>{{ item.attr_name }}</p>
          <el-checkbox
            checked
            :label="item1"
            border
            v-for="(item1, index) in item.attr_vals
              .replace(/\s+/g, ',')
              .split(',')"
            :key="index"
          ></el-checkbox>
        </div>
      </el-tab-pane>
      <!-- 配置管理 -->
      <!-- -------------------------- -->
      <!-- 商品属性 -->
      <el-tab-pane label="商品属性">
        <div v-for="item in shopSelf" :key="item.attr_id">
          <p>{{ item.attr_name }}</p>
          <el-input :placeholder="item.attr_vals" v-model="ipt"></el-input>
        </div>
      </el-tab-pane>
      <!-- 商品属性 -->
      <!-- -------------------------- -->
      <!-- 上传图片 -->
      <el-tab-pane label="商品图片">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-tab-pane>
      <!-- 上传图片 -->
      <!-- -------------------------- -->

      <el-tab-pane label="商品内容">
        <el-button type="primary">添加商品</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { sort, editSubmit, editSubmits } from '@/api/mananger'
export default {
  created () {
    this.sort()
  },
  data () {
    return {
      value: [],
      active: 0,
      formLabelAlign: {
        name: '',
        price: '',
        weight: '',
        num: '',
        sort: []
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 商品参数，相关参数
      shopInfo: [],
      // 商品属性 相关属性
      shopSelf: [],
      ipt: '',
      // 上传图片相关属性
      fileList: []
    }
  },
  methods: {
    handleClick (tab, event) {
      this.active = Number(tab.index)
    },
    async sort () {
      try {
        const res = await sort()
        // console.log(res)
        this.formLabelAlign.sort = res.data.data
      } catch (err) { console.log(err) }
    },
    handleChange (value) {
      console.log(value)
    },
    // 上传图片相关操作
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }

  },
  computed: {

  },
  watch: {
    active: {
      async handler () {
        if (this.active === 1) {
          try {
            const res = await editSubmit({ id: 6 })
            // console.log(res)
            this.shopInfo = res.data.data
          } catch (err) {
            console.log(err)
          }
        } else if (this.active === 2) {
          try {
            const res = await editSubmits({ id: 6 })
            console.log(res)
            this.shopSelf = res.data.data
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  },
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
