<template>
  <div class="index">
    <!-- 顶部轮播图 -->
    <div class="block">
      <el-carousel trigger="click" height="650px" :interval="5000">
        <!-- 字体 -->
        <div class="word">
          <p>《MUCCI爱的进行曲》系列</p>
          <div class="buttonList">
            <button><router-link to="/ladies">女士系列</router-link></button>
            <button><router-link to="/gentleman">男士系列</router-link></button>
          </div>
        </div>
        <!-- 图片 -->
        <el-carousel-item v-for="item in CarouselList" :key="item.id">
          <img :src="item.s_photos[0].path" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 新品轮播图 -->
    <div class="block-new">
      <el-carousel trigger="click" height="860px" :interval="7000" v-if="allList.length">
        <el-carousel-item v-for="item in newList.s_goods" :key="item.id">
          <img :src="item.s_goods_photos[0].path" alt="" />
          <p>{{ item.name }}</p>
          <p>◈</p>
          <button><router-link :to="`details/${item.id}`">点击购买</router-link></button>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 男士箱包 -->
    <div class="manbag">
      <img src="@/assets/image/new/index1.png" alt="" />
      <p>《古驰爱的进行曲》系列</p>
      <p>男士箱包</p>
      <p>◈</p>
      <button><router-link to="/gentleman">点击购买</router-link></button>
    </div>
    <!-- 手袋类型 -->
    <div class="handbag_classify">
      <p>GUCCI CIRCULAR LINE系列</p>
      <p>手袋</p>
      <button><router-link to="/handbag">点击选购</router-link></button>
    </div>
    <!-- 女士 -->
    <div class="lady_classify">
      <p>《Aria-时尚咏叹调》系列</p>
      <p>女士</p>
      <button><router-link to="/ladies">点击选购</router-link></button>
    </div>
    <!-- 男士类型 -->
    <div class="man_classify">
      <p>《Aria-时尚咏叹调》系列</p>
      <p>男士</p>
      <button><router-link to="/gentleman">点击选购</router-link></button>
    </div>
  </div>
</template>

<script>
import { CarouselTop } from "@/services/getIndex.js";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      CarouselList: [],
    };
  },
  created() {
    this.CarouselInit();
    this.allGoods();
  },
  methods: {
    // 顶部轮播图
    async CarouselInit() {
      const CarouselRes = await CarouselTop({
        project_id: 169,
      });
      //   console.log(CarouselRes);
      this.CarouselList = CarouselRes.result;
    },
    // 获取所有商品
    ...mapActions(["allGoods"]),
  },
  computed: {
    // 所有商品
    ...mapState(["allList"]),
    // 新品系列
    newList() {
      let obj = {};
      // 数据还没请求回来时 先不渲染
      if(!this.allList.length) return obj

      this.allList.forEach((item) => {
        if (item.id === 1106) {
          obj = item;
        }
      });
      console.log(obj);
      return obj;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/Index.scss";
</style>