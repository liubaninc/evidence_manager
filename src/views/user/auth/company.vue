<template>
  <div class="auth">
    <div class="recharge-title">企业认证</div>
    <div class="auth-main">
      <div class="auth-main-tip">
        温馨提示：通过认证后即可拥有区块链服务，一个账号只能认证一种用户类型，请妥善选择。
      </div>
      <!-- <div class="auth-main-steps">
        <el-steps :active="active" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="填写企业信息"></el-step>
          <el-step title="对公打款"></el-step>
          <el-step title="完成认证"></el-step>
        </el-steps>
      </div> -->
      <div class="auth-main-form">
        <div class="main-form-row">
          <div class="form-row-name">用户类型</div>
          <div class="form-row-input">
            <el-input placeholder="企业用户" :disabled="true"></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">企业名称</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入企业名称	"
              v-model="companyName"
              maxlength="50"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">企业社会信用代码</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入企业社会信用代码	"
              v-model="companyCard"
              maxlength="50"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">企业营业执照</div>
          <div class="form-row-input">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleUpSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">企业地址</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入企业地址"
              v-model="companyAddress"
              maxlength="50"
            ></el-input>
          </div>
        </div>

        <div class="main-form-row">
          <div class="form-row-name">法人姓名</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入法人姓名"
              v-model="legalName"
              maxlength="50"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">法人身份证号码</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入法人身份证号码	"
              v-model="legalCard"
              maxlength="50"
            ></el-input>
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
              @click="submitAuth"
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
export default {
  data() {
    return {
      authorityType: 2,
      companyName: '',
      companyPath: {},
      companyAddress: '',
      companyCard: '',
      personName: '',
      personCard: '',
      legalName: '',
      legalCard: '',
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  methods: {
    async submitAuth() {
      let {
        companyName,
        companyPath,
        companyAddress,
        companyCard,
        authorityType,
        personName,
        personCard,
        legalName,
        legalCard,
      } = this

      if (!companyName) {
        this.$message.error(`请输入公司名称`)
        return
      }
      if (!companyCard) {
        this.$message.error(`请输入公司信用代码`)
        return
      }
      if (!companyPath) {
        this.$message.error(`请输入营业执照`)
        return
      }
      if (!companyAddress) {
        this.$message.error(`请输入公司地址`)
        return
      }
      if (!legalName) {
        this.$message.error(`请输入法人姓名`)
        return
      }
      let cardCodeRex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

      if (!cardCodeRex.test(legalCard)) {
        this.$message.error(`请输入正确的身份证号码`)
        return
      }

      // if (!personCard) {
      //   this.$message.error(`请输入经办人身份证号`)
      //   return
      // }
      let authInfo = await addAuth.call(this, {
        companyName,
        companyPath,
        companyAddress,
        companyCard,
        authorityType,
        legalName,
        legalCard,
      })
      if (authInfo) {
        this.$message.success(`认证成功`)
        this.$router.push(`/user/auth?elTab=authInfo&finishAuthed=true`)
      }
    },
    handleUpSuccess(file) {
      // console.log(file)
      // var content = JSON.stringify(file)
      // var blob = new Blob([content], { type: 'text/plain;charset=utf-8' }) // 把数据转化成blob对象
      // let companyPath = new File([blob], 'cp_zhi.png', {
      //   lastModified: Date.now(),
      // })
      this.companyPath = file.raw
    },
    handleRemove(file, fileList) {
      this.dialogImageUrl = ''
      this.companyPath = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
.auth-main-steps {
  padding: 30px 0;
}
.auth-main-form {
  padding: 30px 0 30px;
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

.form-row-btns {
  display: flex;
}
.btn-reback {
  margin: 0 30px 0 0;
}
</style>