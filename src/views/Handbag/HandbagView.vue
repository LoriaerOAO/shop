<template>
  <div class="handbag">
    <!-- 顶部固定背景 -->
    <header>
      <div class="words">
        <p>女士</p>
        <p>手袋</p>
      </div>
    </header>
    <!-- Ophidia标题板块 -->
    <div class="Ophidia_title">
      <div class="content">
        <!-- 左边文字 -->
        <div class="left">
          <div class="title">
            <p>Ophidia系列</p>
          </div>
          <div class="words">
            <p>
              在佛罗伦萨的皮蒂宫举行的2018早春时装秀上，Ophidia系列手袋首次惊艳亮相，包身上匠心点缀镶嵌的织带细节和闪亮的金色双G吊坠。
            </p>
          </div>
        </div>
        <!-- 右边图片 -->
        <div class="right">
          <img src="@/assets/image/bag/OphidiaGG/title1.jpg" alt="加载失败" />
        </div>
      </div>
    </div>
    <!-- Ophidia手袋分类 -->
    <div class="Ophidia_classify">
      <div class="content">
        <!-- 列表 -->
        <div class="goods_list" v-if="allList.length">
          <!-- 商品 -->
          <div class="goods" v-for="item in OphidiaList.s_goods" :key="item.id">
            <div class="picture">
              <img :src="item.s_goods_photos[0].path" alt="加载失败" />
            </div>
            <!-- 详情框 -->
            <router-link class="details" :to="`details/${item.id}`">
              <img :src="item.s_goods_photos[0].path" alt="加载失败" />
              <br />
              <p>{{ item.name }}</p>
              <p>浏览 ></p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Padlock标题板块 -->
    <div class="Padlock_title">
      <div class="content">
        <!-- 左边文字 -->
        <div class="left">
          <div class="title">
            <p>Padlock系列</p>
          </div>
          <div class="words">
            <p>
              该系列的特别之处在于从档案包造型中直接取用的钥匙锁扣设计，钥匙收纳在可拆卸的皮革钥匙包中。
            </p>
          </div>
        </div>
        <!-- 右边图片 -->
        <div class="right">
          <img src="@/assets/image/bag/Padlock/title2.jpg" alt="加载失败" />
        </div>
      </div>
    </div>
    <!-- Padlock手袋分类 -->
    <div class="Padlock_classify">
      <div class="content">
        <!-- 列表 -->
        <div class="goods_list" v-if="allList.length">
          <!-- 商品 -->
          <div class="goods" v-for="item in PadlockList.s_goods" :key="item.id">
            <div class="picture">
              <img :src="item.s_goods_photos[0].path" alt="加载失败" />
            </div>
            <!-- 详情框 -->
            <router-link class="details" :to="`details/${item.id}`">
              <img :src="item.s_goods_photos[0].path" alt="加载失败" />
              <br />
              <p>{{ item.name }}</p>
              <p>浏览 ></p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  created() {
    this.allGoods();
  },
  methods: {
    // 获取所有商品
    ...mapActions(["allGoods"]),
  },
  computed: {
    ...mapState(["allList"]),
    // Ophidia系列
    OphidiaList() {
      let obj = {};
      // console.log(this.allList);

      // 数据还没请求回来时 先不渲染
      if (!this.allList.length) return obj;

      this.allList.forEach((item) => {
        if (item.id === 1107) {
          // console.log(item);
          obj = item;
        }
      });
      return obj;
    },
    // Padlock系列
    PadlockList(){
      let obj = {}
      if(!this.allList.length) return obj;
      this.allList.forEach((item)=>{
        if(item.id === 1108){
          obj = item;
        }
      })
      return obj
    }
  },
};
</script>

<style scoped lang='scss'>
@import "@/assets/style/Handbag.scss";
</style>