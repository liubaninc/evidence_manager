<template>
  <div class="auth">
    <div class="recharge-title">企业认证</div>
    <div class="auth-main">
      <div class="auth-main-tip">
        温馨提示：通过认证后即可拥有区块链服务，一个账号只能认证一种用户类型，请妥善选择。
      </div>
      <div class="auth-main-steps">
        <el-steps :active="active" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="填写企业信息"></el-step>
          <el-step title="对公打款"></el-step>
          <el-step title="完成认证"></el-step>
        </el-steps>
      </div>
      <div class="auth-main-form">
        <div class="main-form-title">组织机构信息</div>
        <div class="main-form-row">
          <div class="form-row-name">企业名称</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入企业名称"
              v-model="input"
              maxlength="50"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">企业证件号</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入企业证件号"
              maxlength="50"
              v-model="input"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">企业开户行</div>
          <div class="form-row-input">
            <el-input
              maxlength="50"
              placeholder="请输入企业开户行"
              v-model="input"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">企业开户行卡号</div>
          <div class="form-row-input">
            <el-input
              placeholder="请核实企业开户行账号/卡号"
              v-model="input"
              maxlength="50"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="auth-main-form">
        <div class="main-form-title">法定代表人信息</div>
        <div class="main-form-row">
          <div class="form-row-name">法定代表人名称</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入法定代表人名称"
              v-model="input"
              maxlength="50"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name">法人所在国籍/地区</div>
          <div class="form-row-input">
            <el-input
              placeholder="请输入法人所在国籍/地区"
              v-model="input"
              maxlength="50"
            ></el-input>
          </div>
        </div>
        <div class="main-form-row">
          <div class="form-row-name"></div>
          <div class="form-row-btns">
            <a href="javascript:;" class="cm-btn-72px cm-bg-d6dce4 btn-reback"
              >上一步</a
            >
            <a href="javascript:;" class="cm-btn-72px cm-bg-2D7FEB">下一步</a>
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
      input: '',
      active: 2,
    }
  },
  methods: {},
  created() {},
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
  padding: 20px 20px 30px;
  margin: 20px;
  background: #fff;
}
.auth-main-tip {
  background-color: rgba(24, 112, 213, 0.08);
  border: 1px solid rgba(45, 127, 235, 0.65);
  font-size: 14px;
  line-height: 40px;
  color: #2d7feb !important;
  padding: 0 0 0 20px;
}
.auth-main-steps {
  padding: 30px 0;
}
.auth-main-form {
  /* padding: 30px 0; */
  /* width: 50%; */
}

.main-form-title {
  font-weight: 500;
  color: #333333;
  line-height: 20px;
  font-size: 16px;
  margin: 0 0 24px;
  border-left: 4px solid #2d7feb;
  padding-left: 15px;
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