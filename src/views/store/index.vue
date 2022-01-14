<template>
  <div class="send">
    <div class="recharge-title">套餐列表</div>
    <div class="send-warper">
      <div class="send-wp-row">
        <div class="send-wp-btns">
          <a
            href="javascript:;"
            class="cm-btn-154px cm-bg-39841E"
            @click="toAdd(1)"
          >
            新增存证套餐</a
          >         
        </div>
        <div class="send-wp-search">
          <span class="wp-search-name">显示隐藏 </span>
          <div class="wp-search-input">
            <el-select v-model="showType" @change="changeAuttion">
              <el-option
                v-for="item in showTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="send-wp-list">
        <el-table
          v-loading="loading"
          :data="menuLists"
          :header-cell-style="headerCellStyle"
          :lazy="lazy"
          :show-message="true"
          :inline-message="true"
          style="width: 100%"
        >
          <el-table-column label="ID" width="80">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="套餐名称" width="200" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="签署份数(份)">
            <template slot-scope="scope">{{ scope.row.num }}</template>
          </el-table-column>
          <el-table-column label="原价(元)">
            <template slot-scope="scope">{{
              scope.row.originalPrice
            }}</template>
          </el-table-column>
          <el-table-column label="折扣">
            <template slot-scope="scope">{{
              scope.row.discount || '---'
            }}</template>
          </el-table-column>
          <el-table-column label="售价(元)" show-overflow-tooltip>
            <template slot-scope="scope">{{
              scope.row.discountPrice
            }}</template>
          </el-table-column>
          <el-table-column label="显示隐藏">
            <template slot-scope="scope">{{
              scope.row.packageShow | showHide
            }}</template>
          </el-table-column>
          <el-table-column label="排序">
            <template slot-scope="scope">{{ scope.row.packageOrder }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toEdit(3, scope)">
                详情
              </el-button>
              <el-button type="text" size="small" @click="toEdit(2, scope)">
                编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="removeMenu(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <template v-if="total > 0">
          <div class="page-pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </template>
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogFormVisible"
          :center="true"
        >
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="addMenu"
            label-width="100px"
            class="dialog-form"
          >
            <el-form-item label="套餐名称" prop="name">
              <el-input
                :readonly="opType == 3"
                v-model="ruleForm.name"
                placeholder="请输入套餐名称+套餐次数"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item label="签署份数" prop="num">
              <el-input
                :readonly="opType == 3"
                v-model="ruleForm.num"
                oninput="value=value.replace(/[^\d+]/g,'')"
                placeholder="请输入签署份数"
                maxlength="50"
              ></el-input>
              份
            </el-form-item>
            <el-form-item label="单价" prop="originPrice">
              <el-input
                :readonly="opType == 3"
                v-model="ruleForm.originPrice"
                oninput="value=value.replace(/[^\d.+]/g,'')"
                placeholder="请输入单价"
                maxlength="50"
              ></el-input>
              元
            </el-form-item>
            <el-form-item label="折扣" prop="discount">
              <el-input
                :readonly="opType == 3"
                v-model="ruleForm.discount"
                oninput="value=value.replace(/[^\d.+]/g,'')"
                placeholder="请输入折扣"
                maxlength="50"
              ></el-input>
              折
            </el-form-item>
            <el-form-item label="实际单价" prop="realPrice">
              <!-- <el-input v-model="ruleForm.realPrice"></el-input> -->
              {{ realPrice || '---' }} 元
            </el-form-item>
            <el-form-item label="排序" prop="orderBy">
              <el-input
                :readonly="opType == 3"
                v-model="ruleForm.orderBy"
                oninput="value=value.replace(/[^\d+]/g,'')"
                placeholder="请输入排序"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item label="显示/隐藏" prop="isShow">
              <el-radio-group v-model="ruleForm.isShow" :disabled="opType == 3">
                <el-radio label="1">显示</el-radio>
                <el-radio label="0">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <div class="el-item-btns">
                <a
                  href="javascript:;"
                  class="cm-btn-72px cm-bg-d6dce4 cannel-btn"
                  @click="dialogFormVisible = false"
                  >取消</a
                >
                <template v-if="opType == 1">
                  <a
                    href="javascript:;"
                    class="cm-btn-72px cm-bg-39841E"
                    @click="toAddMenu"
                    >保存</a
                  >
                </template>
                <template v-if="opType == 2">
                  <a
                    href="javascript:;"
                    class="cm-btn-72px cm-bg-39841E"
                    @click="toupdateMenu"
                    >保存</a
                  >
                </template>
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import {
  addMenu,
  queryMenuList,
  delMenu,
  queryMenuById,
  updateMenu,
} from '@/server/menu'
import { computeNumber } from '@/utils/utils'
const TYPEID = 1;
export default {
  data() {
    let validateDiscount = (rule, value, callback) => {
      if (value && value > 10) {
        return callback(new Error('请输入正确的折扣'))
      }
      if (!/^([1-9][0-9]*)$/.test(value)) {
        return callback(new Error('请输入正确的折扣'))
      }
      callback()
    }
    let validateOriginPrice = (rule, value, callback) => {
      if (value && value < 1) {
        return callback(new Error('单价必须大于1元'))
      }
      callback()
    }
    return {
      lazy: true,
      loading: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      menuLists: [],
      showTypes: [
        {
          value: '999',
          label: '全部',
        },
        {
          value: '1',
          label: '显示',
        },
        {
          value: '0',
          label: '隐藏',
        },
      ],
      showType: '999',
      dialogFormVisible: false,
      dialogDetailVisible: false,
      ruleForm: {
        id: '',
        name: '',
        num: '',
        originPrice: '',
        discount: 10,
        realPrice: '',
        orderBy: '',
        isShow: '1',
        typeId: TYPEID, // 套餐类型(1为可信存证套餐, 2为司法取证套餐)
      },
      rules: {
        name: [{ required: true, message: '请输入套餐名称', trigger: 'blur' }],
        num: [{ required: true, message: '请输入签署份数', trigger: 'blur' }],
        originPrice: [
          { required: true, message: '请输入单价', trigger: 'blur' },
          { validator: validateOriginPrice, trigger: 'blur' },
        ],
        // realPrice: [
        //   { required: true, message: '请输入实际售价', trigger: 'blur' },
        // ],
        orderBy: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        discount: [{ validator: validateDiscount, trigger: 'blur' }],
      },
      opType: '1',
      dialogTitle: '添加/编辑存证套餐',
    }
  },
  computed: {
    headerCellStyle() {
      return {
        background: 'rgba(245, 245, 245, 1)',
        color: '#333333',
        fontSize: '13px',
      }
    },
    realPrice() {
      let { ruleForm } = this
      if (ruleForm.discount) {
        return computeNumber(
          (ruleForm.originPrice * ruleForm.discount) / 10
        ).toFixed(2)
      } else {
        return ruleForm.originPrice
      }
    },
  },
  created() {
    this.getMenuList({})
  },
  methods: {
    toAdd(val, typeId) {
      this.opType = val;
      this.dialogTitle = '添加存证套餐';
      this.dialogFormVisible = true
      Object.keys(this.ruleForm).forEach((key) => {
        this.ruleForm[key] = key != 'isShow' ? '' : this.ruleForm[key]
      })
    },
    toEdit(val, scope) {
      this.opType = val
      this.dialogTitle = val == 2 ? '编辑存证套餐' : "查看存证套餐";
      this.dialogFormVisible = true

      let { ruleForm } = this
      this.ruleForm['name'] = scope.row.name
      this.ruleForm['num'] = scope.row.num
      this.ruleForm['originPrice'] = scope.row.originalPrice
      this.ruleForm['discount'] = scope.row.discount
      this.ruleForm['realPrice'] = scope.row.discountPrice
      this.ruleForm['orderBy'] = scope.row.packageOrder
      this.ruleForm['isShow'] = '' + scope.row.packageShow
      this.ruleForm['id'] = '' + scope.row.id

      this.$refs.addMenu && this.$refs.addMenu.clearValidate()
    },
    changeAuttion(e) {
      this.getMenuList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        packageShow: this.showType,
      })
    },
    removeMenu(row) {
      this.$confirm('是否确定删除当前套餐？删除后前端套餐配置将不再显示', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'cm-bg-39841E',
        cancelButtonClass: 'cm-bg-d6dce4',
        type: 'warning',
      }).then(async () => {
        let res = await delMenu.call(this, {
          id: row.id,
        })
        if (res) {
          this.$message.success(`删除成功`)
          this.getMenuList({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            packageShow: this.showType,
          })
        }
      })
    },

    toAddMenu() {
      let { ruleForm, realPrice } = this
      let mark = this.$refs['addMenu'].validate(async (valid) => {
        if (valid) {
          if (ruleForm.originPrice == 0) {
            this.$message.error(`单价不能为0`)
            return
          }

          if (ruleForm.num == 0) {
            this.$message.error(`套餐数量不能为0`)
            return
          }

          this.loading = this.$loading({
            lock: true,
            text: '添加中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          let menu = await addMenu.call(this, {
            discountPrice: realPrice,
            name: ruleForm.name,
            num: ruleForm.num,
            originalPrice: ruleForm.originPrice,
            packageOrder: ruleForm.orderBy,
            packageShow: ruleForm.isShow,
            discount: ruleForm.discount,
            typeId: TYPEID,
          })
          if (menu) {
            this.dialogFormVisible = false
            this.loading.close()
            this.getMenuList({
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              packageShow: this.showType,
            })
            Object.keys(ruleForm).forEach((key) => {
              this.ruleForm[key] = key != 'isShow' ? '' : ruleForm[key]
            })
          } else {
            this.loading.close()
          }
        } else {
          this.loading && this.loading.close()
          return false
        }
      })
    },
    async toupdateMenu() {
      let { ruleForm, realPrice } = this
      let mark = this.$refs['addMenu'].validate(async (valid) => {
        if (valid) {
          if (ruleForm.originPrice == 0) {
            this.$message.error(`单价不能为0`)
            return
          }

          if (ruleForm.num == 0) {
            this.$message.error(`套餐数量不能为0`)
            return
          }
          this.loading = this.$loading({
            lock: true,
            text: '更新中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          let res = await updateMenu.call(this, {
            id: ruleForm.id,
            discountPrice: realPrice,
            name: ruleForm.name,
            num: ruleForm.num,
            originalPrice: ruleForm.originPrice,
            packageOrder: ruleForm.orderBy,
            packageShow: ruleForm.isShow,
            discount: ruleForm.discount ? ruleForm.discount : '',
            typeId: TYPEID,
          })
          if (res) {
            this.loading.close()
            this.$message.success(`更新成功`)
            this.dialogFormVisible = false
            this.getMenuList({
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              packageShow: this.showType,
            })
            Object.keys(ruleForm).forEach((key) => {
              this.ruleForm[key] = key != 'isShow' ? '' : ruleForm[key]
            })
          } else {
            this.loading.close()
          }
        } else {
          return false
        }
      })
    },
    handleSizeChange(pageSize) {
      this.getMenuList({
        pageNum: this.pageNum,
        pageSize,
        packageShow: this.showType,
      })
    },
    handleCurrentChange(pageNum) {
      this.getMenuList({
        pageNum,
        pageSize: this.pageSize,
        packageShow: this.showType,
      })
    },
    async getMenuList({ pageNum = 1, pageSize = 10, packageShow = 999 }) {
      let { currentPage, rowCount, totalCount, data } =
        await queryMenuList.call(this, {
          currentPage: pageNum,
          rowCount: pageSize,
          packageShow,
          typeId: TYPEID,
        })
      this.pageNum = currentPage
      this.pageSize = rowCount
      this.total = totalCount
      this.menuLists = data
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
  },
}
</script>
<style scoped>
.send-warper {
  margin: 20px;
  background: #fff;
  padding: 20px 18px;
}
.send-wp-row {
  display: flex;
  justify-content: space-between;
}
.send-wp-btns {
  display: flex;
}
.send-wp-btns a {
  margin: 0 20px 0 0;
}
.send-wp-btns a:last-child {
  margin-right: 0;
}
.send-wp-search {
  display: flex;
  align-items: center;
}
.wp-search-name {
  display: inline-block;
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #4d4d4d;
}
.wp-search-input {
  margin: 0 20px;
}
.search-btn {
  height: 40px;
  line-height: 40px;
}
.send-wp-status {
  display: flex;
  margin: 30px 0 0;
}
.wp-status-button {
  width: 84px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  display: block;
  background-color: rgba(247, 247, 247, 1);
  border: 1px solid rgba(208, 208, 208, 1);
  border-radius: 42px;
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #666666;
  margin: 0 20px 0 0;
}
.wp-status-button:last-child {
  margin-right: 0;
}

.send-wp-list {
  padding: 30px 0;
}

.send-wp-list .el-button--text {
  color: #39841e;
}

.cur-selected {
  color: #39841e;
  border: 1px solid #39841e;
}

.page-pagination {
  padding: 30px 0 0;
  text-align: right;
}

.dialog-form .el-input {
  width: 87%;
  margin: 0 10px 0 0;
}

.el-item-btns {
  display: flex;
}
.cannel-btn {
  margin-right: 28px;
}
</style>
