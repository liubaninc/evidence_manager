<template>
  <div class="auth">
    <div class="recharge-title">个人认证</div>
    <div class="auth-main">
      <div class="auth-main-tip">
        温馨提示：通过认证后即可拥有区块链服务，一个账号只能认证一种用户类型，请妥善选择。
      </div>
      <div class="auth-main-form">
        <div class="main-form-row">
          <div class="form-row-name">用户类型</div>
          <div class="form-row-input">
            <el-input
              placeholder="个人用户"
              v-model="userType"
              :disabled="true"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">姓名</div>
          <div class="form-row-input">
            <el-input
              maxlength="50"
              placeholder="请输入姓名"
              v-model="personName"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">身份证</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入身份证"
              v-model="personCard"
              maxlength="50"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">身份证正面</div>
          <div class="form-row-card">
            <div class="row-card-default" v-if="!previewPerFront">
              <img
                src="../../../assets/images/user/card_zm.png"
                alt=""
                srcset=""
              />
              <input
                @change="upLoadPerFront"
                class="card-default-btn"
                type="file"
                accept="image/*"
              />
            </div>
            <div class="row-card-default" v-else>
              <img :src="previewPerFront" alt="" srcset="" />
            </div>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">身份证反面</div>
          <div class="form-row-card">
            <div class="row-card-default" v-if="!previewPerBack">
              <img
                src="../../../assets/images/user/card_fm.png"
                alt=""
                srcset=""
              />
              <input
                @change="upLoadPerBack"
                class="card-default-btn"
                type="file"
                accept="image/*"
              />
            </div>
            <div class="row-card-default" v-else>
              <img :src="previewPerBack" alt="" srcset="" />
            </div>
          </div>
        </div>

        <div class="main-form-row">
          <div class="form-row-name"></div>
          <div class="form-row-btns">
            <a
              href="javascript:;"
              class="cm-btn-72px cm-bg-d6dce4 btn-reback"
              @click="$router.go(-1)"
              >返回</a
            >
            <a
              href="javascript:;"
              class="cm-btn-72px cm-bg-39841E"
              @click="submitPerAuth"
              >提交</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addAuth } from '@/server/user/auth'
import { getObjectURL } from '@/utils/utils'
export default {
  data() {
    return {
      userType: '个人认证',
      personName: '',
      personCard: '',
      personFront: '',
      personBack: '',
      previewPerFront: '',
      previewPerBack: '',
    }
  },
  methods: {
    upLoadPerFront(e) {
      let file = e.target.files[0] || e.srcElement.files[0]
      this.personFront = file
      this.previewPerFront = getObjectURL(file)
    },
    upLoadPerBack(e) {
      let file = e.target.files[0] || e.srcElement.files[0]
      this.personBack = file
      this.previewPerBack = getObjectURL(file)
    },
    async submitPerAuth() {
      let { userType, personName, personCard, personFront, personBack } = this

      if (!personName) {
        this.$message.error(`请输入姓名`)
        return
      }

      let cardCodeRex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

      if (!cardCodeRex.test(personCard)) {
        this.$message.error(`请输入正确的身份证号码`)
        return
      }
      if (!personFront) {
        this.$message.error(`请输入上传正面身份证照片`)
        return
      }

      if (!personBack) {
        this.$message.error(`请输入上传反面身份证照片`)
        return
      }

      let authInfo = await addAuth({
        authorityType: 1,
        personName,
        personCard,
        personFront,
        personBack,
      })
      if (authInfo) {
        this.$message.success(`认证成功`)
        this.$router.push(`/user/auth?elTab=authInfo&finishAuthed=true`)
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
  padding: 20px 20px 0;
  margin: 20px;
  background: #fff;
}
.auth-main-tip {
  /* background-color: rgba(24, 112, 213, 0.08);
  border: 1px solid rgba(45, 127, 235, 0.65); */
  font-size: 14px;
  line-height: 40px;
  /* color: #2d7feb !important; */
  padding: 0 0 0 20px;

  color: #39841e;
  background: #dfebdb;
  border: 1px solid #85b275;
}

.auth-main-form {
  padding: 30px 0;
  /* width: 50%; */
}
.main-form-row {
  display: flex;
  align-items: center;
  margin: 0 0 26px;
}
.form-row-name {
  width: 130px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}
.form-row-input {
  width: 50%;
}
.form-row-card {
  width: 276px;
  height: 186px;
  background: transparent;
  text-align: center;
  line-height: 186px;
}
.row-card-default {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}
.row-card-default img {
  width: 100%;
  height: 100%;
}
.card-default-btn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.form-row-btns {
  display: flex;
}
.btn-reback {
  margin: 0 30px 0 0;
}
</style>