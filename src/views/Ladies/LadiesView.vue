<template>
  <div class="ladies">
    <!-- 顶部固定背景 -->
    <header>
      <div class="words">
        <p>《古驰爱的进行曲》系列</p>
        <p>女士</p>
      </div>
    </header>
    <main>
      <!-- 女士服饰标题板块 -->
      <div class="clothes_title">
        <div class="content">
          <!-- 左边文字 -->
          <div class="left">
            <div class="title">
              <p>女士服饰系列</p>
            </div>
            <div class="words">
              <p>
                Gucci进一步探索量体裁衣的可能性，在《古驰爱的进行曲》全新时装系列中推出多款融合定制裁缝工艺的套装，尽显复古优雅风范。
              </p>
            </div>
          </div>
          <!-- 右边图片 -->
          <div class="right">
            <img src="@/assets/image/lady/clothes/title1.png" alt="加载失败" />
          </div>
        </div>
      </div>
      <!-- 女士服饰分类 -->
      <div class="clothes_classify">
        <div class="content">
          <!-- 列表 -->
          <div class="goods_list" v-if="allList.length">
            <!-- 商品 -->
            <div
              class="goods"
              v-for="item in clothesList.s_goods"
              :key="item.id"
            >
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
      <!-- 女士手袋标题板块 -->
      <div class="handbag_title">
        <div class="content">
          <!-- 左边文字 -->
          <div class="left">
            <div class="title">
              <p>女士手袋系列</p>
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
      <!-- 女士手袋分类 -->
      <div class="handbag_classify">
        <div class="content" v-if="allList.length">
          <!-- 列表 -->
          <div class="goods_list">
            <!-- 商品 -->
            <template v-for="item in handbagList">
              <div
                class="goods"
                v-for="product in item.s_goods"
                :key="product.id"
              >
                <div class="picture">
                  <img :src="product.s_goods_photos[0].path" alt="加载失败" />
                </div>
                <!-- 详情框 -->
                <router-link class="details" :to="`details/${product.id}`">
                  <img :src="product.s_goods_photos[0].path" alt="加载失败" />
                  <br />
                  <p>{{ product.name }}</p>
                  <p>浏览 ></p>
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- 女士鞋子标题板块 -->
      <div class="shoes_title">
        <div class="content">
          <!-- 左边文字 -->
          <div class="left">
            <div class="title">
              <p>女士鞋子系列</p>
            </div>
            <div class="words">
              <p>
                在《古驰爱的进行曲》全新时装系列中，GG
                Supreme帆布推出了经典隽永的蓝色和米色组合，传承材质的历史渊源。帆布材质对于环境的影响较低，因此十年如一日地出现在每个系列当中，已成为品牌的经典材质。
              </p>
            </div>
          </div>
          <!-- 右边图片 -->
          <div class="right">
            <img src="@/assets/image/lady/shoes/title1.png" alt="加载失败" />
          </div>
        </div>
      </div>
      <!-- 女士鞋子分类 -->
      <div class="shoes_classify">
        <div class="content">
          <!-- 列表 -->
          <div class="goods_list" v-if="allList.length">
            <!-- 商品 -->
            <div class="goods" v-for="item in shoesList.s_goods" :key="item.id">
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
    </main>
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
    // 女士服饰
    clothesList() {
      let obj = {};
      // console.log(this.allList);

      // 数据还没请求回来时 先不渲染
      if (!this.allList.length) return obj;

      this.allList.forEach((item) => {
        if (item.id === 1109) {
          // console.log(item);
          obj = item;
        }
      });
      return obj;
    },
    // 女士手袋
    handbagList() {
      let arr = [];
      if (!this.allList.length) return arr;
      this.allList.forEach((item) => {
        if (item.id === 1108 || item.id === 1107) {
          arr.push(item);
        }
      });
      // console.log(arr);
      return arr;
    },
    // 女士鞋子
    shoesList() {
      let obj = {};
      if (!this.allList.length) return obj;
      this.allList.forEach((item) => {
        if (item.id === 1185) {
          obj = item;
        }
      });
      return obj;
    },
  },
};
</script>

<style scoped lang='scss'>
@import "@/assets/style/Ladies.scss";
</style>