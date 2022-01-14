<template>
  <div class="auth">
    <div class="recharge-title">我的认证</div>
    <div class="auth-main">
      <div class="auth-type">
        <el-radio-group
          v-model="authType"
          size="medium"
          @change="changeAuthType"
        >
          <el-radio-button label="personal">个人认证</el-radio-button>
          <el-radio-button label="compony">企业认证</el-radio-button>
        </el-radio-group>
      </div>
      <div v-show="authType == 'personal'">
        <div class="auth-steps">
          <el-steps :active="1" align-center>
            <el-step title="银联认证"></el-step>
            <el-step title="认证结果"></el-step>
          </el-steps>
          <div class="auth-desc">
            <p>认证说明：</p>
            您提交的信息仅用于实名认证，存证云对您的信息予以严格保密！
          </div>
        </div>
        <div class="cm-line"></div>
        <div class="auth-content">
          <p class="auth-ct-title">个人信息认证</p>
          <div class="auth-form">
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">姓名：</div>
              <div class="form-row-input">
                <el-input
                  v-model="input"
                  placeholder="请输入真实姓名"
                  maxlength="50"
                ></el-input>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">证件类型：</div>
              <div class="form-row-input">
                <el-select v-model="value" placeholder="请选择证件">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">证件号码：</div>
              <div class="form-row-input">
                <el-input
                  v-model="input"
                  placeholder="请输入证件号码"
                ></el-input>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">银行卡号：</div>
              <div class="form-row-input">
                <el-input
                  v-model="input"
                  placeholder="请输入银行卡号"
                ></el-input>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">预留手机号码：</div>
              <div class="form-row-input">
                <el-input
                  v-model="input"
                  placeholder="请输入预留手机号码"
                ></el-input>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">短信验证码：</div>
              <div class="form-row-code">
                <el-input
                  class="row-code"
                  v-model="input"
                  placeholder="请输入预留验证码"
                ></el-input>
                <el-button type="primary" class="cm-bg-39841E row-btn"
                  >发送验证码</el-button
                >
              </div>
            </div>
            <div class="auth-form-row">
              <div class="form-row-name"></div>
              <div class="form-row-input">
                <a href="javascript:;" class="cm-btn-340px cm-bg-39841E"
                  >提交</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="authType == 'compony'">
        <div class="auth-steps">
          <el-steps :active="1" align-center>
            <el-step title="企业基本信息填写"></el-step>
            <el-step title="企业基本信息审核"></el-step>
            <el-step title="管理人认证"></el-step>
          </el-steps>
          <div class="auth-desc">
            <p>认证说明：</p>
            <div>
              您提交的企业个人信息仅用于实名认证，存证云对您的信息予以严格保密。
            </div>
            注：
            目前平台仅支持经过工商注册的企业打款认证，如您的单位为政府机关，律所，非营利性组织等其他单位机构或无法对公打款认证，您可点击“人工认证”（需1-3个工作日）进行操作！
          </div>
        </div>
        <div class="cm-line"></div>
        <div class="auth-content">
          <p class="auth-ct-title">基本信息填写</p>
          <div class="auth-form">
            <div class="">
              <div class="auth-form-row">
                <div class="form-row-name">企业名称：</div>
                <div class="form-row-input">
                  <el-input
                    v-model="input"
                    placeholder="请输入企业名称"
                  ></el-input>
                </div>
              </div>
              <div class="auth-form-row form-row-desc">
                <div class="form-row-name"></div>
                <span>注：如您的名称有带“括号”，请在半角状态下输入！</span>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">法人代表：</div>
              <div class="form-row-input">
                <el-input
                  v-model="input"
                  placeholder="请输入法人代表姓名"
                ></el-input>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">法人证件类型：</div>
              <div class="form-row-input">
                <el-select v-model="value" placeholder="请选择证件">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">法人证件号码：</div>
              <div class="form-row-input">
                <el-input
                  v-model="input"
                  placeholder="请输入证件号码"
                ></el-input>
              </div>
            </div>
            <div class="">
              <div class="auth-form-row">
                <div class="form-row-name">统一社会信用代码：</div>
                <div class="form-row-input">
                  <el-input
                    v-model="input"
                    placeholder="请输入统一社会信用代码"
                  ></el-input>
                </div>
              </div>
              <div class="auth-form-row form-row-desc">
                <div class="form-row-name"></div>
                注：上传的图片限jpg、jpeg格式，大小不超过2M。
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">企业账户卡号：</div>
              <div class="form-row-input">
                <el-input
                  v-model="input"
                  placeholder="请输入企业账户卡号"
                ></el-input>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">企业账户开户行：</div>
              <div class="form-row-input">
                <el-input v-model="input" placeholder="请输入开户行"></el-input>
              </div>
            </div>
            <div class="">
              <div class="auth-form-row">
                <div class="form-row-name">企业开户行所在省：</div>
                <div class="form-row-input">
                  <el-input
                    v-model="input"
                    placeholder="请输入开户行所在省"
                  ></el-input>
                </div>
              </div>
              <div class="auth-form-row form-row-desc">
                <div class="form-row-name"></div>
                注：如果开户行是支行或分行，例中国农业银行厦门支行，
                填写中国农业银行即可。
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name">企业开户行所在地区：</div>
              <div class="form-row-input">
                <el-input
                  v-model="input"
                  placeholder="请输入开户行所在地区"
                ></el-input>
              </div>
            </div>
            <div class="auth-form-row form-row-distince">
              <div class="form-row-name"></div>
              <div class="form-row-input">
                <a href="javascript:;" class="cm-btn-340px cm-bg-39841E"
                  >提交</a
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
export default {
  data() {
    return {
      authType: 'compony',
      options: [
        {
          value: '二代身份证',
          label: '二代身份证',
        },
        {
          value: '护照',
          label: '护照',
        },
        {
          value: '台胞证',
          label: '台胞证',
        },
        {
          value: '港澳通行证',
          label: '港澳通行证',
        },
      ],
      value: '',
      input: '',
    }
  },
  watch: {
    authType(newVal, oldVal) {
      if (newVal == 'personal') {
        this.showPerAuthConfirm()
      }
    },
  },
  methods: {
    changeAuthType(e) {
      console.log(e)
    },
    showPerAuthConfirm() {
      this.$confirm(
        `<div style='text-align:left'><div>1、如您是自然人，请申请个人实名认证；</div>
        2、如您是企业 / 单位机构等，请申请企业实名认证；
      请您务必保证您的主体类型与您的实名认证类型一致，认证成功后将以您申请个人或企业的名义进行存证、签约及公证办理。</div>`,
        '提示',
        {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          showCancelButton: false,
          center: true,
        }
      )
    },
  },
  created() {
    // if (this.authType == 'personal') this.showPerAuthConfirm()
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
  padding: 0 20px;
  margin: 20px;
  background: #fff;
}

.auth-type {
  text-align: center;
  padding: 20px 0 0;
}

.auth-steps {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0 0;
}

.auth-steps .el-step.is-horizontal.is-flex {
  text-align: center;
}

.auth-desc {
  color: #9e9e9e;
  line-height: 20px;
  margin: 20px auto 0;
  /* width: 60%; */
}

.auth-content {
  width: 70%;
  margin: 0 auto;
}
.auth-ct-title {
  color: #444;
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 30px;
}
.auth-form {
  padding: 0 0 30px;
}
.auth-form-row {
  display: flex;
  align-items: center;
  /* margin: 0 0 20px 0; */
}
.form-row-name {
  width: 160px;
  text-align: right;
  font-size: 14px;
}
.form-row-input {
  width: 80%;
}
.el-select {
  width: 100%;
}

.form-row-code {
  display: flex;
  width: 80%;
}
.row-code {
  width: 80%;
  margin-right: 10px;
}
.row-btn {
  width: 20%;
}

.form-row-desc {
  color: #999;
  line-height: 30px;
}
.form-row-distince {
  margin: 0 0 18px;
}
</style>