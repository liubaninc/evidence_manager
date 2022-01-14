<template>
  <div class="commonHeader">
    <div class="com-logo">
      <img class="cm-logo-icon" src="../../assets/images/logo/p_logo.png" />
      <span class="cm-logo-text">唐泉电子存证</span>
    </div>
    <div class="cm-header-user">
      <div class="header-user-item">
        <i class="iconfont m0-denglu user-icon"></i>
        {{ userInfo.username }}
        <div class="header-options">
          <router-link href="javascript:;" class="options-item" to="/user/auth">
            <i class="iconfont m0-tuichu login-out-icon"></i>个人信息
          </router-link>
          <a href="javascript:;" class="options-item" @click="loginOut">
            <i class="iconfont m0-tuichu login-out-icon"></i>退出
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { layoutUser } from "@/server/user/login";
import { localCache } from '@/utils/utils'
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  created() {
    let userInfo = localCache.get('m_userInfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
  },
  methods: {
    async loginOut() {
      //   let outRes = await layoutUser({});
      localCache.remove('m_userInfo')
      localCache.remove('m_token_type')
      localCache.remove('m_access_token')
      this.$router.replace('/login')
    },
  },
}
</script>
<style scoped>
.commonHeader {
  padding: 0;
  /* width: 1200px; */
  /* width: 90%; */
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-items: center;
  align-items: center;
  height: 100%;
}
.cm-header-logo {
  width: 140px;
  height: 36px;
}
.cm-header-user {
  width: 92%;
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.header-user-item {
  width: 136px;
  height: 100%;
  position: relative;
  text-align: center;
  transition: all ease-in-out 0.6s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.user-name {
  height: 100%;
  display: block;
  /* height: 100%;
  display: flex;
  align-items: center; */
}
.header-options {
  width: 136px;
  position: absolute;
  /* top: 53px; */
  top: 37px;
  z-index: 299;
  /* background-color: rgba(247, 247, 247, 1); */
  background-color: #fff;
  /* box-shadow: 3px 4px 3px rgb(73 98 128); */
  font-size: 12px;
  display: none;
  transition: all ease-in-out 0.6s;
}

.options-item {
  display: block;
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #39841e;
  height: 40px;
  line-height: 40px;
}
.options-item:hover {
  background: #e5e5e5;
}
.header-user-item:hover .header-options {
  display: block;
  transition: all ease-in-out 0.6s;
}

.user-icon {
  margin: 0 10px 0 0;
}
.commonHeader .commonHeader-a {
  display: flex;
  align-items: center;
  width: 150px;
}

.login-out-icon {
  vertical-align: bottom;
  margin: 0 6px 0 0;
}

.com-logo {
  display: flex;
  align-items: center;
  width: 206px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0 0 0 6px;
}
.cm-logo-icon {
  width: 26px;
  height: 26px;
}
.cm-logo-text {
  font-family: 'ArialMT', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  margin-left: 8px;
}
</style>
