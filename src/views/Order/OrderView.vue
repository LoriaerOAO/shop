<template>
  <div class="cart">
    <!-- 顶部固定背景 -->
    <header>
      <div class="words">
        <p>MUCCI</p>
        <p>我的订单</p>
      </div>
    </header>
    <main>
      <div class="order_content">
        <!-- 标题 -->
        <div class="title">
          <p>订单信息</p>
          <hr />
        </div>
        <!-- 商品列表 -->
        <div class="goodsList" v-for="item in orderList" :key="item.id">
          <!-- <div class="goodsList"> -->
          <!-- 订单编号 -->
          <div class="goods_title">
            <p>创建时间：{{ item.order_time }}</p>
            <p>订单编号：{{ item.order_id }}</p>
          </div>
          <hr />
          <!-- 商品 -->
          <div class="goods" v-for="product in format(item.goods_info)" :key="product.id">
            <!-- <div class="goods"> -->
            <!-- 图片 -->
            <div class="goods_img">
              <img :src="product.s_goods_photos[0].path" alt="加载失败" />
              <!-- <img src="@/assets/image/bag/OphidiaGG/OphidiaGG1.png" alt="" /> -->
            </div>
            <!-- 细节 -->
            <p>{{ product.goods_name }}</p>
            <!-- <p>GUUCIshenshen系列</p> -->
            <!-- 单价 -->
            <!-- <p>￥9500</p> -->
            <p>￥{{ product.price }}</p>
            <!-- 数量 -->
            <p>{{ product.num }}</p>
            <!-- <p>3</p> -->
          </div>
          <hr />
          <!-- 总额 -->
          <div class="total_price">
            <!-- <p>￥30000</p> -->
            <p>￥{{ item.total_price }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getOrder, checkOrder } from "@/services/getOrder.js";

export default {
  data() {
    return {
      orderList: [],
    };
  },
  computed: {

    ...mapState(["userInfo"]),
  },
  created() {
    console.log(this.$route.query);

    this.orderInit()
    console.log(this.orderList);
  },
  methods: {
    async orderInit() {
      const { trade_no, out_trade_no } = this.$route.query
      checkOrder({ trade_no, out_trade_no })

      const res = await getOrder(this.userInfo.token);
      console.log(res);

      this.orderList = res.result.rows
    },
    format(data) {
      const res = JSON.parse(data);
      console.log(res);
      return res;
    }
  },
};
</script>

<style scoped lang='scss'>
@import "@/assets/style/Order.scss";
</style>