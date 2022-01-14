<template>
  <div class="forget">
    <div class="header-bg forget-header">
      <div class="header-warpper">
        <router-link to="/login" class="logo-icon">
          <img src="../../assets/images/logo/logo.png" alt="" srcset="" />
          <div class="logo-text">磁云数字</div>
        </router-link>
        <!-- <router-link to="/login" class="back-login"> 返回登录 </router-link> -->
      </div>
    </div>
    <div class="forget-main">
      <div class="main-content">
        <div>
          <div class="step___Ozx0H">
            <ul>
              <li class="current___3c_Ls" style="width: 33.33%">
                帐号验证<span class="arrow___1sC1_"
                  ><span class="arrowFst___1Bypw"></span
                  ><span
                    class="arrowSnd___2DgS8"
                    :class="active > 1 ? 'cur-arrow' : ''"
                  ></span
                ></span>
              </li>
              <li
                class="next___10Z18"
                :class="active >= 2 ? 'current___3c_Ls' : ''"
                style="width: 33.33%"
              >
                重置密码<span class="arrow___1sC1_"
                  ><span class="arrowFst___1Bypw"></span
                  ><span
                    class="arrowSnd___2DgS8"
                    :class="active > 2 ? 'cur-arrow' : ''"
                  ></span
                ></span>
              </li>
              <li
                class="next___10Z18"
                :class="active > 2 ? 'current___3c_Ls' : ''"
                style="width: 33.33%"
              >
                完成
              </li>
            </ul>
          </div>
        </div>
        <div class="main-form">
          <div class="form-title" v-if="active != 3">重置密码</div>
          <template v-if="active == 1">
            <div class="form-input">
              <el-input
                placeholder="请输入手机号"
                maxlength="11"
                v-model="phone"
              >
                <template slot="prepend">+86</template>
              </el-input>
              <div class="yz-code">
                <el-input
                  placeholder="请输入验证码"
                  v-model="code"
                  class="input-with-select"
                >
                </el-input>
                <el-button
                  v-show="show"
                  class="el-btn-send wait-send"
                  @click="getCode"
                  >发送验证码</el-button
                >
                <el-button
                  class="el-btn-send"
                  :class="count <= 0 ? 'wait-send' : 'send-after'"
                  v-show="!show"
                  >{{ count }} s 后重新发送</el-button
                >
              </div>

              <a
                href="javascript:;"
                class="cm-bg-39841E cm-btn-340px next-step"
                @click="nextChange"
                >下一步</a
              >
            </div>
          </template>
          <template v-else-if="active == 2">
            <div class="form-input">
              <el-input placeholder="新密码" v-model="password" show-password>
              </el-input>
              <el-input
                placeholder="确认密码"
                v-model="repassword"
                show-password
                class="input-with-select"
              >
              </el-input>
              <a
                href="javascript:;"
                class="cm-bg-39841E cm-btn-340px next-step"
                @click="setNewPwd"
                >设置新密码</a
              >
            </div>
          </template>
          <template v-else-if="active == 3">
            <div class="form-input">
              <div class="input-text">恭喜，重置密码成功！</div>
              <a
                href="javascript:;"
                class="cm-bg-39841E cm-btn-340px next-step"
                @click="toLogin"
                >马上登录</a
              >
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { rpwdSendMobMes, rePasswd } from '@/server/user/login'
import { localCache } from '@/utils/utils'
export default {
  data() {
    return {
      active: 1,
      phone: '',
      repassword: '',
      password: '',
      code: '',
      show: true,
      count: '',
      timer: null,
    }
  },
  methods: {
    async getCode() {
      const TIME_COUNT = 60
      let { phone } = this
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(phone)) {
        this.$message.error(`请输入正确的手机号`)
        return
      }
      if (!this.timer) {
        let sendRes = await this.sendMesCode(phone)
        if (sendRes) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }
    },
    toLogin() {
      this.$router.push('/login')
    },
    nextChange() {
      let { phone, code } = this
      if (!phone || !code) {
        this.$message.error(`请输入验证码`)
        return
      }
      this.active = 2
    },
    async setNewPwd() {
      let { repassword, password, phone, code } = this

      if (!password || !repassword) {
        this.$message.error(`请输入密码`)
        return
      }
      if (repassword != password) {
        this.$message.error(`密码不一致`)
        return
      }

      let rePwdInfo = await rePasswd.call(this, {
        code,
        newpassword1: repassword,
        phone,
      })
      if (rePwdInfo) {
        localCache.remove('m_userInfo')
        localCache.remove('m_token_type')
        localCache.remove('m_access_token')
        this.active = 3
      }
    },
    async sendMesCode(phone) {
      return await rpwdSendMobMes.call(this, { phone })
    },
  },
}
</script>
<style scoped>
.forget {
  background: #f5f5f5;
}
.header-bg {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  background: #fff;
}
.header-warpper {
  width: 90%;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-icon {
  display: flex;
  align-items: center;
  width: 200px;
  font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC',
    sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 16px;
  color: #1d3f8b;
  user-select: none;
}
.logo-text {
  margin: 0 0 0 10px;
}

.back-login {
  /* color: #3c6df0; */
  color: #449727;
}
.forget-main {
  height: calc(100vh - 60px);
  overflow: hidden;
}

.main-content {
  width: 80%;
  margin: 62px auto 0;
}
.main-form {
  width: 600px;
  height: 400px;
  background: #fff;
  margin: 44px auto;
  padding: 36px 130px;
}

.next-step {
  color: #fff;
  margin: 23px auto 0;
}
.form-input {
  margin: 0 auto;
}
.form-input .el-input {
  margin: 0 0 20px;
}
.form-title {
  font-size: 20px;
  text-align: center;
  color: #39841e;
  margin-bottom: 55px;
  font-weight: 600;
}
.el-btn-send {
  background: #fff !important;
  width: 170px;
  height: 40px;
  /* border: 0; */
  margin: 0 0 0 10px;
  border: 1px solid #d6d6d6;
  padding: 0 !important;
}

.wait-send {
  color: #39841e !important;
}
.send-after {
  color: #ccc !important;
}

.input-text {
  text-align: center;
  font-size: 18px;
  min-height: 200px;
  line-height: 200px;
}
.yz-code {
  display: flex;
}
</style>
  