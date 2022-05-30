<template>
  <div class="signIn">
    <!-- 头部 -->
    <signHeader></signHeader>
    <!-- 内容 -->
    <div class="content">
      <!-- 登录/注册卡 -->
      <div class="card">
          <!-- 标题 -->
        <div class="title">
          <router-link to="/signin">登录</router-link> |
          <router-link to="/signin/register">注册</router-link>
        </div>
        <!-- 信息 -->
        <div class="info">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- 页尾 -->
    <footerView></footerView>
  </div>
</template>

<script>
import signHeader from "./components/HeaderView.vue";
import footerView from '@/components/FooterView.vue';

export default {
  components: {
    signHeader,
    footerView
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/style/SignIn.scss';
</style>