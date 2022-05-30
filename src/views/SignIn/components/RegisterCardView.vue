<template>
  <div class="registerCard">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 注册按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLogin, getRegister } from "@/services/getSignIn.js";
import { mapMutations } from "vuex";

export default {
  data() {
    //   名字验证
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (!/^[a-z]+$/i.test(value)) {
          callback(new Error("请输入英文名"));
        } else {
          callback();
        }
      }, 500);
    };
    // 号码验证
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (
          !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
            value
          )
        ) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      }, 500);
    };
    // 密码验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        phone: "",
        password: "",
        checkPass: "",
      },
      //   表单验证规则
      rules: {
        name: [{ validator: checkName, trigger: "change" }],
        phone: [{ validator: checkPhone, trigger: "change" }],
        asswpord: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
      },
    };
  },
  methods: {
    ...mapMutations(["getUserInfo"]),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //   接收数据
          const registerRes = await getRegister({
            name: this.ruleForm.name,
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
          });
          //   当状态码不为200时 抛出错误信息
          if (registerRes.status !== 200) {
            return this.$message.error(registerRes.msg);
          }
          // 注册成功 自动登录
          this.$message.success("注册成功 两秒后自动登录");
          const loginRes = await getLogin({
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
          });
          //   当状态码不为200时 抛出错误信息
          if (loginRes.status !== 200) {
            return this.$message.error(loginRes.msg);
          }
          // 储存信息
          this.getUserInfo(registerRes.result)
          // 判断是否存在fullPath参数 决定跳转到哪里
          const fullPath = this.$route.query.fullPath;
          //   跳转
          setTimeout(() => {
            this.$router.push(fullPath || "/");
          }, 1500)
        } else {
          console.log("注册失败");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.el-button--primary {
  width: 140px;
  height: 40px;
  background-color: #1b1b1b;
  border: none;
  color: #e5dfd9;
  margin-top: 30px;
  margin-right: 80px;
  &:hover {
    color: #999999;
  }
}
.el-form--label-left {
  width: 360px;
}
</style>
