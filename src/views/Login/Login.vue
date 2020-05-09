<template>
  <div class="login" style="padding-top: 40px">
    <!-- <div class="login-form"> -->
    <el-form :label-position="labelPosition" label-width="80px" :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center" label-width="0px">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$http.post("api/permission/getMenu", this.form).then(res => {
        res = res.data;
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
          this.$store.commit("setToken", res.data.token);
        } else {
          this.$message.warning(res.data.message);
        }
        console.log(res);
      });
    }
  },
  data() {
    return {
      labelPosition: "left",
      form: {
        username: "",
        password: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
// .login {
//   display: flex;
//   align-content: center;
//   align-items: center;
//   justify-content: center;
// }
// .login-form {
//   padding: 100px 30px;
//   margin-top: 50px;
//   background-color: #fff;
//   height: 550px;
//   width: 500px;
// }
.el-form {
  margin: auto;
  width: 50%;
  height: 450px;
  background-color: #fff;
  padding: 45px;
}
</style>
