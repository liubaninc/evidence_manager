<template>
  <div class="auth">
    <div class="recharge-title">个人信息</div>
    <div class="auth-main">
      <div class="auth-info">
        <el-tabs type="border-card" v-model="elTab">
          <el-tab-pane name="baseInfo" label="基本信息">
            <div class="auth-row cm-auth-row">
              <div class="auth-row-left">
                <div class="row-left-name">用户名</div>
                <div>{{ userInfo.realName || '----' }}</div>
              </div>
              <a href="javascript:;" class="auth-row-edit" @click="changeUser"
                >修改</a
              >
            </div>
            <div class="auth-row cm-auth-row">
              <div class="auth-row-left">
                <div class="row-left-name">密码</div>
                <div>{{ userInfo.password || '*************' }}</div>
              </div>
              <a
                href="javascript:;"
                class="auth-row-edit"
                @click="$router.push('/forget')"
                >修改</a
              >
            </div>
            <div class="auth-row cm-auth-row">
              <div class="auth-row-left">
                <div class="row-left-name">邮箱</div>
                <div>{{ userInfo.email || '----' }}</div>
              </div>
              <template v-if="!userInfo.email">
                <a href="javascript:;" class="auth-row-edit" @click="bindEmail">
                  绑定</a
                >
              </template>
            </div>
            <div class="auth-row cm-auth-row">
              <div class="auth-row-left">
                <div class="row-left-name">手机号</div>
                <div>{{ userInfo.phone || '----' }}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { queryAuthInfo } from '@/server/user/auth'
import { updateUserInfo } from '@/server/user'
import { localCache } from '@/utils/utils'
// import { upLoadFile } from '@/server/upload'
export default {
  data() {
    return {
      elTab: 'baseInfo',
      finishAuthed: false,
      authDetail: {},
      userInfo: {},
    }
  },
  created() {
    let { elTab, finishAuthed } = this.$route.query
    let userInfo = localCache.get('m_userInfo')
    if (elTab) {
      this.elTab = elTab
      this.finishAuthed = finishAuthed
    }
    if (userInfo) {
      this.userInfo = userInfo
    }
    this.getAuthInfo()
  },
  methods: {
    async handleAvator(file) {
      let imgUrl = await upLoadFile({
        file: file.raw,
      })
      this.updateUser({
        avatar: imgUrl.url,
      })
    },
    async getAuthInfo() {
      let authDetail = await queryAuthInfo.call(this)
      if (authDetail) {
        this.authDetail = authDetail
        this.finishAuthed = true
      }
    },
    changeUser() {
      this.$prompt('', '修改用户名', {
        message: '2-12个字符，推荐使用中文',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cm-bg-fff',
        confirmButtonClass: 'cm-bg-39841E',
        inputPlaceholder: '请输入用户名',
        inputValue: this.userInfo.realName,
      }).then(async ({ value }) => {
        try {
          let res = await this.updateUser({ realName: value })
          if (res) {
            this.$message.success(`修改成功`)
          }
        } catch (error) {
          console.log(error)
        }
      })
    },
    bindEmail() {
      this.$prompt('', '绑定邮箱', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cm-bg-d6dce4',
        confirmButtonClass: 'cm-bg-39841E',
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确',
        inputPlaceholder: '请输入邮箱',
      })
        .then(async ({ value }) => {
          let res = await this.updateUser({
            email: value,
          })
          console.log(res)
          // this.$message({
          //   type: 'success',
          //   message: '你的邮箱是: ' + value,
          // })
        })
        .catch(() => {})
    },
    async updateUser(params) {
      let userInfo = localCache.get('m_userInfo')
      let res = await updateUserInfo.call(this, { ...params })
      if (res) {
        userInfo[Object.keys(params)[0]] = params[Object.keys(params)[0]]
        this.userInfo = userInfo
        localCache.set('m_userInfo', userInfo)
        return !0
      }
    },
  },
}
</script>

<style scoped>
.recharge-title {
  height: 42px;
  line-height: 42px;
  background-color: #fff;
  color: #333437;
  padding: 0px 20px 0;
  font-size: 14px;
  font-weight: 500;
}

.auth-main {
  margin: 20px;
}

.auth-tip {
  background-color: #dfebdb;
  border: 1px solid #39841e;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 0 0 37px;
  border-radius: 0;
  color: #39841e !important;
}
.auth-info {
  margin: 16px 0 0;
}

.auth-row {
  display: flex;
  align-items: center;

  font-size: 14px;
  font-weight: 400;
  color: #333437;

  border-bottom: 1px solid #e7ebf0;
  padding: 8px 0 18px 8px;
}
.auth-avator {
  width: 76px;
  text-align: center;
  /* color: #2d7feb; */
  color: #39841e;
  cursor: pointer;
}
.auth-avator img {
  width: 100%;
  height: 76px;
  border-radius: 50%;
  display: block;
  margin: 0 0 10px;
}
.auth-desc {
  margin: 0 0 0 20px;
}
.auth-user-name {
  margin: 0 0 12px;
  display: flex;
  align-items: center;
}

.auth-icon {
  width: 66px;
  height: 24px;
  margin: 0 0 0 18px;
}

.auth-row-left {
  display: flex;
  flex: 1;
}
.row-left-name {
  width: 158px;
  font-size: 14px;
  font-weight: 500;
  color: #333437;
}
.auth-row-edit {
  /* color: #2d7feb; */
  color: #39841e;
}

.cm-auth-row {
  padding: 32px 30px;
}

.auth-types {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 40px 0;
}
.auth-personal {
  /* width: 50%; */
  margin: 0 30% 0 0;
}
.auth-personal:last-child {
  margin-right: 0;
}
.auth-personal-img {
  text-align: center;
}
.auth-personal-img img {
  width: 58px;
  height: 42px;
}
.auth-personal-title {
  font-weight: 500;
  color: #333333;
  line-height: 20px;
  font-size: 14px;
  margin: 20px 0;
}
.auth-personal-desc {
  font-size: 12px;
  font-weight: 400;
  color: #888888;
  line-height: 20px;
  margin: 0 0 30px;
}

.tz-icon {
  /* color: rgb(45, 127, 235); */
  color: #39841e;
  vertical-align: bottom;
  margin: 0 10px 0 0;
}
.auth-btn {
  margin: 0 auto;
}

.to-auth {
  text-decoration: underline;
  margin: 0 0 0 6px;
}

.add-auth-info {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #39841e;
  margin: 0 0 0 10px;
}

.auth-after {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 82px 0;
}
.auth-after-icon {
  margin: 0 20px 0 0;
}
.auth-after-icon img {
  width: 129px;
  height: 100px;
}

.auth-after-title {
  font-size: 18px;
  font-weight: 500;
  color: #333437;
  line-height: 25px;
  display: flex;
  align-items: center;
}
.auth-icon {
  font-size: 40px;
  /* color: #23c3b2; */
  color: #39841e;
}

.auth-after-info {
  padding-left: 88px;
  font-size: 14px;
  font-weight: 400;
  color: #666769;
  line-height: 30px;
  margin: 38px 0 0;
}
.yyzh-img {
  width: 200px;
  height: 150px;
  margin: 0 0 0 10px;
}
.zyzz-row {
  display: flex;
  align-items: flex-start;
}
</style>