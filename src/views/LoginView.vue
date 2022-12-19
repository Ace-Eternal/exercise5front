<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">学生登录</div>
      <!-- 登录表单 -->
      <el-form
          status-icon
          :model="loginForm"
          :rules="rules"
          ref="ruleForm"
          class="login-form"
      >
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.id"
              prefix-icon="el-icon-user-solid"
              placeholder="id"
              @keyup.enter.native="login('ruleForm')"
          />
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              prefix-icon="iconfont el-icon-mymima"
              show-password
              placeholder="密码"
              @keyup.enter.native="login('ruleForm')"
          />
        </el-form-item>
      </el-form>
      <!-- 登录按钮 -->
      <el-button type="primary" @click="login('ruleForm')">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: function() {
    return {
      loginForm: {
        id: "",
        password: ""
      },
      rules: {
        id: [
          { required: true, message: "id不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginsuccess() {
      this.$message({
        showClose: true,
        message: '恭喜你，登录成功',
        type: 'success'
      });
    },
    loginfail() {
      this.$message({
        showClose: true,
        message: '错了哦，登录失败',
        type: 'error'
      });
    },
    login(formName){
      const _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/student/login",_this.loginForm).then(function (resp) {
            console.log(resp.data)
            if(resp.data=='success'){
              //把json转换成字符串存到localstorage里面
              //键值对
              localStorage.setItem('permit',JSON.stringify(resp.data));
              _this.loginsuccess();
              _this.$router.push('/index');
            }else{
              _this.loginfail();
            }
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: url(https://static.talkxj.com/config/0w3pdr.jpg) center center /
    cover no-repeat;
}
.login-card {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  padding: 170px 60px 180px;
  width: 350px;
}
.login-title {
  color: #303133;
  font-weight: bold;
  font-size: 1rem;
}
.login-form {
  margin-top: 1.2rem;
}
.login-card button {
  margin-top: 1rem;
  width: 100%;
}
</style>
