<template>
  <div class="login" :style="style">
    <div class="login-top">
      <router-link to="/login" class="logo-icon">
        <img src="../../assets/images/logo/logo.png" alt="" srcset="" />
        <div class="logo-text">磁云数字 | 登录</div>
      </router-link>
    </div>
    <div class="cm-login-view login-main">
      <div class="login-main-left">
        <div class="cm-text-overflow main-left-title">
          磁云唐泉电子存证 后台管理系统
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
            <div class="cm-font-size24px right-title">登录</div>
          </div>
          <el-form ref="lgForm" :model="lgForm" label-width="80px">
            <div class="main-right-row main-right-account">
              <div class="right-title-space">账号</div>
              <div class="right-title-input">
                <input
                  type="text"
                  v-model="lgForm.username"
                  placeholder="请输入账号"
                />
              </div>
            </div>
            <div class="main-right-row main-right-pwd">
              <div class="right-title-space">密码</div>
              <div class="right-title-input">
                <input
                  type="password"
                  v-model="lgForm.password"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            <div class="main-right-row main-right-btn">
              <div class="right-title-space"></div>
              <a
                href="javascript:;"
                class="cm-btn-wauto cm-bg-39841E btn-login"
                @click="handleLogin"
                >登录</a
              >
            </div>
          </el-form>
          <div class="main-right-row">
            <div class="right-title-space"></div>
            <!-- <div class="right-row-tips">
              <div>
                新用户？<router-link to="/register" class="cm-link-color"
                  >立即注册</router-link
                >
              </div>
              <div>
                <router-link to="/forget" class="cm-link-color"
                  >忘记密码</router-link
                >
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <Verify
      @success="verifySuccess"
      :mode="'pop'"
      :captchaType="'blockPuzzle'"
      :imgSize="{ width: '330px', height: '155px' }"
      ref="verify"
    />
  </div>
</template>
<script>
import { getImgCode } from '@/server/user/login'
import Verify from '@/components/verifition/Verify'
import { loginUser } from '@/server/user/login'
import { encryption, localCache } from '@/utils/utils'

export default {
  data() {
    return {
      lgForm: {
        username: '18601010202',
        password: '12345678',
      },
    }
  },
  components: {
    Verify,
  },
  computed: {
    style() {
      return {
        background: `url(${require('../../assets/images/login/lg_reg_bg.png')})`,
        backgroundSize: '100% 100%',
        backgroundrepeat: 'no-repeat',
      }
    },
  },
  methods: {
    handleLogin() {
      let { lgForm } = this
      if (!lgForm.username) {
        return
      }
      if (!lgForm.password) {
        return
      }
      this.$refs.verify.show()
    },
    async verifySuccess(res) {
      let { captchaVerification } = res
      let { username, password } = this.lgForm
      const user = encryption({
        data: { username, password },
        key: 'baasbaasbaasbaas',
        param: ['password'],
      })
      let userInfo = await loginUser.call(this, {
        username: user.username,
        password: user.password,
        code: captchaVerification,
      })
      if (userInfo) {
        localCache.set('m_access_token', userInfo.access_token)
        localCache.set('m_token_type', userInfo.token_type)
        localCache.set('m_userInfo', userInfo.user_info)
        this.$router.push(`/`)
      }
    },
  },
}
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  /* background: url('../../assets/images/login/lg_reg_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat; */
}
@import url('../../assets/style/login/login.css');
</style>