<template>
  <div>
    <el-card class="box-card">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        :closable="false"
        show-icon
        style="margin-bottom: 15px"
      >
      </el-alert>

      <div class="block">
        选择商品分类：
        <el-cascader
          v-model="value"
          :options="options"
          :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_name',
          }"
          @change="handleChange"
        ></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 用户管理 -->
        <el-tab-pane label="动态参数" name="first">
          <el-button
            type="primary"
            size="small"
            :disabled="this.label < 3"
            @click="addVal"
            >添加参数</el-button
          >
          <el-table
            :data="tableData1"
            style="width: 100%; margin-top: 10px"
            border
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-tag
                    style="margin-left: 10px"
                    closable
                    type="primary"
                    v-for="(item, index) in props.row.attr_vals
                      .replace(/\s+/g, ',')
                      .split(',')"
                    :key="index"
                    v-show="item !== ''"
                    @close="handleClose(props.row, index)"
                    >{{ item }}</el-tag
                  >
                  <!-- --------------------------------- -->
                  <!-- 添加功能的实现 -->

                  <el-tag @click="addfun(props.row)">添加标签</el-tag>

                  <!-- 添加功能的实现 -->
                  <!-- --------------------------------- -->
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="分类名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  @click="editClick(scope.row)"
                  type="primary"
                  size="small"
                  icon="el-icon-edit"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="delClick(scope.row)"
                  icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 用户管理 -->
        <!-- --------------------------------------------------------------- -->
        <!-- 静态参数 -->
        <el-tab-pane label="静态属性" name="second">
          <el-button type="primary" size="small" :disabled="this.label < 3"
            >添加属性</el-button
          >
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 10px"
            border
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-tag
                    style="margin-left: 10px"
                    closable
                    @close="handleClose()"
                    type="primary"
                    v-for="(item, index) in props.row.attr_vals
                      .replace(/\s+/g, ',')
                      .split(' ')"
                    v-show="item !== ''"
                    :key="index"
                    >{{ item }}
                  </el-tag>
                  <!-- 添加功能的实现 -->

                  <!-- 添加功能的实现 -->
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  @click="editClick(scope.row)"
                  type="primary"
                  size="small"
                  icon="el-icon-edit"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="delClick(scope.row)"
                  icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态参数 -->
        <!-- --------------------------------------------------------------- -->
      </el-tabs>
    </el-card>
    <el-dialog title="修改参数名称" :visible.sync="editVisible" width="70%">
      <el-form :model="editVal" label-width="100px">
        <el-form-item
          label="参数名称"
          prop="value"
          :rules="[{ required: true, message: '年龄不能为空' }]"
        >
          <el-input
            type="age"
            v-model.number="editVal.value"
            autocomplete="off"
          ></el-input> </el-form-item
      ></el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加参数的设置 -->
    <!-- --------------------------------------------------------------- -->
    <el-dialog title="添加相关参数" :visible.sync="addValue" width="70%">
      <el-form :model="editVal" label-width="100px">
        <el-form-item
          label="动态参数"
          prop="value"
          :rules="[{ required: true, message: '参数内容不能为空' }]"
        >
          <el-input v-model.number="editVal.value"></el-input> </el-form-item
      ></el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { sort, editSubmits, editSubmit, delParameter, editParameter, delTags } from '@/api/mananger'
export default {
  created () {
    this.sort()
  },
  data () {
    return {
      attr_vals: [],
      activeName: 'first',
      value: [],
      options: [],
      label: [],
      tableData: [],
      tableData1: [],
      id: '',
      inputVisible: false,
      inputValue: '',
      // 编辑的功能相关数据
      editVisible: false,
      editVal: {
        id: '',
        attrid: '',
        attr_sel: '',
        value: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 添加属性相关参数
      addValue: false,
      addsVal: {}
    }
  },
  methods: {
    async handleChange (label) {
      if (label.length < 3) {
        this.$message.error('请选择三级分类')
      } else {
        this.label = label
        this.fn()
        const res = await editSubmits({ id: this.id })
        const res1 = await editSubmit({ id: this.id })
        this.tableData = res.data.data
        this.tableData1 = res1.data.data
      }
    },
    handleClick (tab, event) {
      if (this.label.length < 3) {
        this.$message.error('请选择三级分类')
      } else {
        console.log(tab)
      }
    },
    async sort () {
      try {
        const res = await sort()
        this.options = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    // 计算得到id值
    fn () {
      this.options.forEach(item => {
        if (item.children) {
          item.children.forEach(item1 => {
            if (item1.children) {
              item1.children.forEach(item2 => {
                if (item2.cat_name === this.label[2]) {
                  this.id = item2.cat_id
                }
              })
            }
          })
        }
        return item
      })
    },
    // 添加功能的实现
    handleInputConfirm (val) {
      console.log(val)
    },
    showInput (val) {
      // console.log(456)
      console.log(val)
      this.inputVisible = true
    },
    // 删除和编辑功能的实现
    async delClick (val) {
      try {
        await delParameter({ id: val.cat_id, attrid: val.attr_id })
        this.$message.success('删除成功')
        this.handleChange(3)
      } catch (err) {
        console.log(err)
        this.$message.error('删除失败')
      }
    },
    async editClick (val) {
      console.log(val)
      this.editVisible = true
      this.editVal.id = val.cat_id
      this.editVal.attrid = val.attr_id
      this.editVal.attr_sel = val.attr_sel
    },
    async editConfirm () {
      try {
        await editParameter({ id: this.editVal.id, attrid: this.editVal.attrid, attr_name: this.editVal.value, attr_sel: this.editVal.attr_sel })
        this.editVisible = false
        this.$message.success('设置成功')
        this.handleChange(3)
        this.editVal.value = ''
      } catch (err) {
        console.log(err)
      }
    },
    // 添加参数方法
    addVal () {
      this.addValue = true
    },
    addfun (val) {
      console.log(123)
    },
    // 删除标签
    async handleClose (val, index) {
      // console.log(val)
      this.attr_vals = val.attr_vals.replace(/\s+/g, ',').split(',')
      this.attr_vals.splice(index, 1)
      this.attr_vals = this.attr_vals.join(' ')
      const res = await delTags({ id: val.cat_id, attrid: val.attr_id, attr_name: val.attr_name, attr_sel: val.attr_sel, attr_vals: this.attr_vals })
      console.log(res)
      this.handleChange(3)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
  }
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
