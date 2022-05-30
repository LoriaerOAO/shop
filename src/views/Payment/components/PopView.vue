<template>
  <div class="pop">
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
      <el-form-item label="收件地址" prop="area">
        <el-cascader
          v-model="ruleForm.area"
          :options="addressList"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="desc">
        <el-input v-model="ruleForm.desc"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { addAddress } from "@/services/getPayment.js";
import { mapState,mapMutations } from "vuex";

export default {
  name: "popAdd",
  props: ["addressList"],
  data() {
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
    return {
      ruleForm: {
        name: "",
        phone: "",
        area: [],
        desc: "",
      },
      //   表单验证规则
      rules: {
        phone: [{ validator: checkPhone, trigger: "change" }],
      },
    };
  },
  methods: {
    ...mapMutations(['updateAddress']),
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  // 监听填入的数据的变化
  watch: {
    ruleForm:{
      deep: true,
      handler(){
        this.updateAddress(this.ruleForm)
      }
    }
  }
};
</script>

<style>
</style>