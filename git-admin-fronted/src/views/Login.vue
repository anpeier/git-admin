<template>
  <div class="login">
    <el-form :model="loginForm" ref="loginForm" :rules="rules" label-width="100px" class="form">
      <div class="title">
        <h1>旅梦GitHub后台</h1>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名">
          <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input v-model="loginForm.pwd" show-password placeholder="请输入密码">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
        <i slot="append" class="el-input__icon el-icon-lock"></i>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        pwd: "",
        redirect: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    resetForm(formName) {
      this.loginForm = {};
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.login {
  .form {
    background-color: #fff;
    position: absolute;
    width: 500px;
    height: 300px;
    border: 1px solid #e3e4e5;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
    text-align: center;
    margin: auto auto;
    .title {
      font-size: 14px;
      padding: 20px 0 20px 0;
    }
    .el-form-item {
      padding-right: 50px;
      .el-input {
        display: inline-block;
        width: 95%;
      }
    }
  }
}
</style>