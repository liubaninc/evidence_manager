<template>
  <div class="send">
    <div class="recharge-title">用户审核列表</div>
    <div class="send-warper">
      <div class="send-wp-row">
        <div class="send-wp-search">
          <span class="wp-search-name">认证状态</span>
          <div class="wp-search-input">
            <el-select v-model="authStatus" @change="changeStatus">
              <el-option
                v-for="item in authStatusList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="send-wp-search">
          <span class="wp-search-name">用户类型</span>
          <div class="wp-search-input">
            <el-select v-model="userType" @change="changeUserType">
              <el-option
                v-for="item in userTypes"
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
          :data="authLists"
          :header-cell-style="headerCellStyle"
          :lazy="lazy"
          style="width: 100%"
        >
          <el-table-column label="ID" width="60">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="用户账号">
            <template slot-scope="scope">{{
              scope.row.userName | desensitizationPhone
            }}</template>
          </el-table-column>
          <el-table-column label="真实姓名" show-overflow-tooltip>
            <template slot-scope="scope">{{
              scope.row.personName || scope.row.legalName
            }}</template>
          </el-table-column>
          <el-table-column label="认证状态" show-overflow-tooltip>
            <template slot-scope="scope">{{
              scope.row.authorityStatus | authStatus
            }}</template>
          </el-table-column>
          <el-table-column label="用户类型" show-overflow-tooltip>
            <template slot-scope="scope">{{
              scope.row.personName ? '个人' : '企业'
            }}</template>
          </el-table-column>
          <el-table-column label="提交审核时间" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.createDate }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template v-if="scope.row.authorityStatus == 0">
                <el-button
                  type="text"
                  size="small"
                  @click="toVerifyOrDetail(scope.row, 1)"
                >
                  立即审核
                </el-button>
              </template>
              <template v-else>
                <el-button
                  type="text"
                  size="small"
                  @click="toVerifyOrDetail(scope.row, 2)"
                >
                  详情
                </el-button>
              </template>
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
          class="el-dia"
          title="用户认证审核"
          :visible.sync="dialogFormVisible"
          :center="true"
          :lock-scroll="false"
        >
          <el-form :model="ruleForm" label-width="150px">
            <el-form-item label="用户类型">
              {{ curReviewInfo.authorityType | authType }}
            </el-form-item>
            <el-form-item label="用户名称"
              >{{ curReviewInfo.userName }}
            </el-form-item>
            <template v-if="curReviewInfo.authorityType == 2">
              <el-form-item label="企业名称">
                {{ curReviewInfo.companyName }}
              </el-form-item>
              <el-form-item label="企业地址">
                {{ curReviewInfo.companyAddress }}
              </el-form-item>
              <el-form-item label="企业社会信用代码">
                {{ curReviewInfo.companyCard }}
              </el-form-item>
              <el-form-item label="企业营业执照" prop="discount">
                <div class="prew-img">
                  <img
                    v-image-preview
                    style="width: 100%"
                    :src="`http://${curReviewInfo.companyPath}`"
                  />
                </div>
              </el-form-item>
              <el-form-item label="法定代表人">
                {{ curReviewInfo.legalName }}
              </el-form-item>
              <el-form-item label="法人证件号码">
                {{ curReviewInfo.legalCard }}
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="真实姓名">
                {{ curReviewInfo.personName }}
              </el-form-item>
              <el-form-item label="身份证号">
                {{ curReviewInfo.personCard }}
              </el-form-item>
              <el-form-item label="身份证正反面照" prop="discount">
                <div class="prew-img-row">
                  <div class="prew-img">
                    <img
                      v-image-preview
                      style="width: 100%"
                      :src="`http://${curReviewInfo.personFront}`"
                    />
                  </div>
                  <div class="prew-img">
                    <img
                      v-image-preview
                      style="width: 100%"
                      :src="`http://${curReviewInfo.personBack}`"
                    />
                  </div>
                </div>
              </el-form-item>
            </template>
            <el-form-item label="审核结果" prop="isShow">
              <el-radio-group v-model="ruleForm.radio">
                <el-radio label="1">通过</el-radio>
                <el-radio label="-1">拒绝</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="拒绝原因" prop="realPrice">
              <el-input
                v-model="ruleForm.rejectReason"
                placeholder="请输入拒绝原因"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="el-item-btns">
                <a
                  href="javascript:;"
                  class="cm-btn-72px cm-bg-d6dce4 cannel-btn"
                  @click="dialogFormVisible = false"
                  >取消</a
                >
                <a
                  href="javascript:;"
                  class="cm-btn-72px cm-bg-39841E"
                  @click="verifyComfirm"
                  >确定</a
                >
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog
          class="el-dia"
          title="审核详情"
          :visible.sync="dialogDetailVisible"
          :center="true"
          :lock-scroll="false"
        >
          <el-form :model="ruleForm" label-width="150px">
            <el-form-item label="用户类型">
              {{ curReviewInfo.authorityType | authType }}
            </el-form-item>
            <el-form-item label="用户名称"
              >{{ curReviewInfo.userName || '---' }}
            </el-form-item>
            <template v-if="curReviewInfo.authorityType == 2">
              <el-form-item label="企业名称">
                {{ curReviewInfo.companyName || '---' }}
              </el-form-item>
              <el-form-item label="企业地址">
                {{ curReviewInfo.companyAddress || '---' }}
              </el-form-item>
              <el-form-item label="企业社会信用代码">
                {{ curReviewInfo.companyCard || '---' }}
              </el-form-item>
              <el-form-item label="企业营业执照" prop="discount">
                <div class="prew-img">
                  <img
                    v-image-preview
                    style="width: 100%"
                    :src="`http://${curReviewInfo.companyPath}`"
                  />
                </div>
              </el-form-item>
              <el-form-item label="法定代表人">
                {{ curReviewInfo.legalName || '---' }}
              </el-form-item>
              <el-form-item label="法人证件号码">
                {{ curReviewInfo.legalCard || '---' }}
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="真实姓名">
                {{ curReviewInfo.personName || '---' }}
              </el-form-item>
              <el-form-item label="身份证号">
                {{ curReviewInfo.personCard || '---' }}
              </el-form-item>
              <el-form-item label="身份证正反面照" prop="discount">
                <div class="prew-img-row">
                  <div class="prew-img">
                    <img
                      v-image-preview
                      style="width: 100%"
                      :src="`http://${curReviewInfo.personBack}`"
                    />
                  </div>
                  <div class="prew-img">
                    <img
                      v-image-preview
                      style="width: 100%"
                      :src="`http://${curReviewInfo.personBack}`"
                    />
                  </div>
                </div>
              </el-form-item>
            </template>
            <el-form-item label="审核结果">
              {{ curReviewInfo.authorityStatus == 1 ? '审核通过' : '审核失败' }}
            </el-form-item>
            <el-form-item label="拒绝原因">
              {{ curReviewInfo.authorityReason || '---' }}
            </el-form-item>
            <el-form-item label="提交审核时间">
              {{ curReviewInfo.createDate || '---' }}
            </el-form-item>
            <el-form-item label="审核时间">
              {{ curReviewInfo.updateDate || '---' }}
            </el-form-item>
            <el-form-item>
              <div class="el-item-btns">
                <a
                  href="javascript:;"
                  class="cm-btn-72px cm-bg-d6dce4 cannel-btn"
                  @click="dialogDetailVisible = false"
                  >取消</a
                >
                <a
                  href="javascript:;"
                  class="cm-btn-72px cm-bg-39841E"
                  @click="dialogDetailVisible = false"
                  >确定</a
                >
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { queryAuthList, verify } from '@/server/verify'
export default {
  data() {
    return {
      lazy: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      authLists: [],
      loading: true,

      authStatusList: [
        {
          value: '999',
          label: '全部',
        },
        {
          value: '0',
          label: '待审核',
        },
        {
          value: '1',
          label: '审核通过',
        },
        {
          value: '-1',
          label: '审核拒绝',
        },
      ],
      authStatus: '999',
      userTypes: [
        {
          value: '999',
          label: '全部',
        },
        {
          value: '2',
          label: '企业用户',
        },
        {
          value: '1',
          label: '个人用户',
        },
      ],
      userType: '999',
      dialogFormVisible: false,
      dialogDetailVisible: false,
      ruleForm: {
        rejectReason: '',
        radio: '1',
      },
      curReviewInfo: {},
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
  },
  created() {
    this.getAuthtList({})
  },
  methods: {
    async verifyComfirm() {
      let { curReviewInfo, ruleForm } = this
      this.loading = this.$loading({
        lock: true,
        text: '保存中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      let res = await verify.call(this, {
        authorityStatus: ruleForm.radio,
        authorityReason: ruleForm.rejectReason,
        id: curReviewInfo.id,
      })
      if (res) {
        this.loading.close()
        this.$message.success(`保存成功`)
        this.dialogFormVisible = false
        // Object.keys(curReviewInfo).forEach((key) => {
        //   this.curReviewInfo[key] = ''
        // })
        this.getAuthtList({})
      } else {
        this.loading.close()
      }
    },
    changeStatus(val) {
      this.getAuthtList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        authorityStatus: val,
        authorityType: this.userType,
      })
      this.authStatus = val
    },

    changeUserType(val) {
      this.getAuthtList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        authorityStatus: this.authStatus,
        authorityType: val,
      })
      this.userType = val
    },

    toVerifyOrDetail(row, type) {
      if (type == 1) {
        this.dialogFormVisible = true
        this.dialogDetailVisible = false
      } else {
        this.dialogDetailVisible = true
        this.dialogFormVisible = false
      }
      this.curReviewInfo = row
    },
    handleSizeChange(pageSize) {
      this.getAuthtList({
        pageNum: this.pageNum,
        pageSize: pageSize,
        authorityStatus: this.authStatus,
        authorityType: this.userType,
      })
    },
    handleCurrentChange(pageNum) {
      this.getAuthtList({
        pageNum: pageNum,
        pageSize: this.pageSize,
        authorityStatus: this.authStatus,
        authorityType: this.userType,
      })
    },

    async getAuthtList({
      pageNum = 1,
      pageSize = 10,
      authorityStatus = 999,
      authorityType = 999,
    }) {
      let { currentPage, rowCount, totalCount, data } =
        await queryAuthList.call(this, {
          currentPage: pageNum,
          rowCount: pageSize,
          authorityStatus,
          authorityType,
        })
      this.pageNum = currentPage
      this.pageSize = rowCount
      this.total = totalCount
      this.authLists = data
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
.prew-img-row {
  display: flex;
}
.prew-img {
  width: 180px;
  height: 220px;
  margin-right: 20px;
}
.prew-img img {
  width: 100%;
  height: 100%;
}

.el-item-btns {
  display: flex;
}
.cannel-btn {
  margin-right: 28px;
}
</style>
