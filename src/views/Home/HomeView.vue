<template>
  <div class="home">
    <!-- 头部 -->
    <headerView></headerView>
    <!-- 主体部分 -->
    <main>
      <router-view></router-view>
    </main>
    <!-- 尾部 -->
    <footerView></footerView>
  </div>
</template>

<script>
import headerView from "@/components/HeaderView.vue";
import footerView from "@/components/FooterView.vue";

export default {
  components: {
    headerView,
    footerView,
  },
};
</script>

<style scoped lang='scss'>
// @import "@/assets/style/Home.scss";
</style>