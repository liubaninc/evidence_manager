<template>
  <div class="register">
    <div class="login-top">
      <router-link to="/login" class="logo-icon">
        <img src="../../assets/images/logo/logo.png" alt="" srcset="" />
        <div class="logo-text">磁云数字 | 注册</div>
      </router-link>
    </div>
    <div class="cm-login-view login-main">
      <div class="login-main-left">
        <div class="cm-text-overflow main-left-title">
          磁云唐泉电子存证服务平台
        </div>
        <div class="main-left-desc">存证守护，放心签署</div>
        <div class="main-left-bg">
          <img
            class="mian-left-icon"
            src="../../assets/images/login/login_img.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div class="login-main-right">
        <div class="main-right-warpper">
          <div class="main-right-row">
            <div class="right-title-space"></div>
            <div class="cm-font-size24px right-title">注册</div>
          </div>
          <div class="main-right-row main-right-account">
            <div class="right-title-space">手机号</div>
            <div class="right-title-input">
              <input type="text" v-model="phone" placeholder="请输入账号" />
            </div>
          </div>
          <div class="main-right-row main-right-code">
            <div class="right-title-space">验证码</div>
            <div class="right-title-input right-send-code">
              <input type="text" v-model="code" placeholder="请输入验证码" />
              <a href="javascript:;" class="send-code-btn" @click="sendMesCode"
                >发送验证码</a
              >
            </div>
          </div>
          <div class="main-right-row main-right-pwd">
            <div class="right-title-space">设置密码</div>
            <div class="right-title-input">
              <input
                type="password"
                v-model="password"
                placeholder="请输入密码"
              />
            </div>
          </div>
          <div class="main-right-row main-right-pwd">
            <div class="right-title-space"></div>

            <label class="checkbox-input"
              ><input type="checkbox" checked /><router-link to="/agreement"
                >我已阅读并同意《飞洛用户协议》
              </router-link></label
            >
          </div>
          <div class="main-right-row main-right-btn">
            <div class="right-title-space"></div>
            <a
              href="javascript:;"
              class="cm-btn-wauto cm-bg-0131AC btn-login"
              @click="toReg"
              >注册</a
            >
          </div>
          <div class="main-right-row">
            <div class="right-title-space"></div>
            <div class="right-row-tips">
              <div></div>
              <div>
                已有帐号？
                <router-link to="/login" class="cm-link-color"
                  >登录已有帐号 >></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { registerUser, sendSmsCode } from '@/server/user/login'
export default {
  data() {
    return {
      phone: '',
      password: '',
      code: '',
    }
  },
  methods: {
    async toReg() {
      let { phone, password, code } = this
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(phone)) {
        this.$message.error(`请输入正确的手机号`)
        return
      }
      if (!code) {
        this.$message.error(`请输入验证码`)
        return
      }
      if (!password) {
        this.$message.error(`请设置密码`)
        return
      }
      let regInfo = await registerUser.call(this, {
        phone,
        password,
        code,
      })
      if (regInfo) {
        setTimeout(() => {
          this.$router.push('/login')
        }, 600)
      }
    },
    async sendMesCode() {
      let { phone } = this
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(phone)) {
        this.$message.error(`请输入正确的手机号`)
        return
      }
      sendSmsCode.call(this, { phone })
    },
  },
}
</script>
<style scoped>
@import url('../../assets/style/login/login.css');
.register {
  width: 100vw;
  height: 100vh;
  background: url('../../assets/images/login/lg_reg_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.right-send-code {
  display: flex;
  align-items: center;
}
.right-send-code input {
  width: 80%;
}
.send-code-btn {
  width: 20%;
  text-align: center;
  color: #0131ac;
}
.main-right-code {
  margin: 0 0 20px;
}
.checkbox-input {
  display: flex;
  align-items: center;
  color: #0131ac;
  margin: 16px 0 0;
}
.checkbox-input input {
  margin: 0 8px 0 0;
}
</style>