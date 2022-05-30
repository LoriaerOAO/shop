<template>
  <div class="details">
    <!-- 商品详情图 -->
    <div class="imgList" v-if="goodsList.name">
      <img v-for="item in detailsImg()" :key="item.id" :src="item.path" alt="" />
    </div>
    <!-- 购物内容 -->
    <div class="goods_details">
      <div class="details_content">
        <!-- 标题 -->
        <div class="title">
          <p>{{ goodsList.name }}</p>
          <p :class="goodsList.sale_price ? 'del' : ''">
            ￥{{ goodsList.price }}
          </p>
          <p v-if="goodsList.sale_price">￥{{ goodsList.sale_price }}</p>
          <p>此商品支持花呗分期</p>
        </div>
        <hr />
        <!-- 简介 -->
        <div class="introduction" :v-html="goodsList.rich_text">
          <p>{{ goodsList.desc }}</p>
        </div>
        <!-- 按钮 -->
        <div class="btn">
          <button @click="add">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetails } from "@/services/getDetails.js";
import { mapMutations } from "vuex";
// import { mapActions } from "vuex";

export default {
  data() {
    return {
      goodsList: {},
      count: 1,
    };
  },
  created() {
    console.log(this.$route);
    this.goodsDetails();
  },
  methods: {
    // 添加到购物车
    ...mapMutations(["addtoCart"]),
    // ...mapActions(["addToBackstage"]),
    // 获取单个商品信息
    async goodsDetails() {
      const detailsRes = await getDetails(this.$route.params.id);
      if (detailsRes.status !== 200) return this.$message.error(detailsRes.msg);
      this.goodsList = detailsRes.result;
      // console.log(this.goodsList);
    },
    // 处理后的详细图
    detailsImg() {
      return this.goodsList.s_goods_photos.slice(1);
    },
    add() {
      this.addtoCart({ ...this.goodsList, count: this.count });
      // this.addToBackstage(item)
      this.$message.success('商品添加成功')
    },
  },
  computed: {},
};
</script>

<style scoped lang='scss'>
@import "@/assets/style/Details.scss";
</style>