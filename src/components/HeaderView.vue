<template>
  <!-- 头部 -->
  <div class="header">
    <!-- logo -->
    <div class="logo">
      <img src="../assets/image/logo.png" alt="" />
    </div>
    <!-- 导航栏 -->
    <div class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/handbag">手袋</router-link>
      <router-link to="/ladies">女士系列</router-link>
      <router-link to="/gentleman">男士系列</router-link>
    </div>
    <!-- 操作 -->
    <div class="operation">
      <!-- <p v-if="$store.state.userInfo">{{ $store.state.userInfo.name }}</p> -->
      <button class="logout" @click='LogOut' v-if="$store.state.userInfo">退出登录</button>
      <router-link v-else to="/signin">登录</router-link>
      
      <!-- 购物车 -->
      <el-popover placement="top-start" width="350" trigger="hover">
        <!-- 导航 -->
        <router-link to="/cart" slot="reference"
          ><i class="el-icon-goods"></i> 购物车
        </router-link>
        <!-- 弹窗 -->
        <div class="pop_cart">
          <!-- 标题 -->
          <div class="title">
            <p>购物袋</p>
          </div>
          <hr />
          <!-- 商品列表 -->
          <div class="goodsList">
            <!-- 商品 -->
            <div class="goods" v-for="item in cartList" :key="item.id">
              <!-- 图片 -->
              <div class="goods_img">
                <img :src="item.s_goods_photos[0].path" alt="加载失败" />
              </div>
              <!-- 细节 -->
              <div class="details">
                <p>{{ item.name }}</p>
                <p>{{ item.desc }}</p>
                <p>数量：{{ item.count }}</p>
                <p>￥{{ item.totalPrice }}</p>
              </div>
            </div>
            <!-- <hr /> -->
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import { getLogOut } from "@/services/getLogOut.js";

export default {
  computed: {
    ...mapState(["cartList"]),
  },
  methods: {
    ...mapMutations(['clearState']),
    async LogOut(){
      await getLogOut(this.$store.state.userInfo.token);
      this.clearState()
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/style/Hearder.scss";
</style>