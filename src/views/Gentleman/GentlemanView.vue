<template>
  <div class="ladies">
    <!-- 顶部固定背景 -->
    <header>
      <div class="words">
        <p>《古驰爱的进行曲》系列</p>
        <p>男士</p>
      </div>
    </header>
    <main>
      <!-- 男士服饰标题板块 -->
      <div class="clothes_title">
        <div class="content">
          <!-- 左边文字 -->
          <div class="left">
            <div class="title">
              <p>男士服饰系列</p>
            </div>
            <div class="words">
              <p>
                《古驰爱的进行曲》全新时装系列用多种手法赞颂自由与爱。这款棉麻开衫运用纷繁多色的复古花朵、心形、星星和腾跃的小马，延续了这种欢悦的叙事理念。
              </p>
            </div>
          </div>
          <!-- 右边图片 -->
          <div class="right">
            <img src="@/assets/image/man/clothes/title1.png" alt="加载失败" />
          </div>
        </div>
      </div>
      <!-- 男士服饰分类 -->
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
      <!-- 男士手袋标题板块 -->
      <div class="handbag_title">
        <div class="content">
          <!-- 左边文字 -->
          <div class="left">
            <div class="title">
              <p>男士手袋系列</p>
            </div>
            <div class="words">
              <p>
                在佛罗伦萨的皮蒂宫举行的2018早春时装秀上，Ophidia系列手袋首次惊艳亮相，包身上匠心点缀镶嵌的织带细节和闪亮的金色双G吊坠。
              </p>
            </div>
          </div>
          <!-- 右边图片 -->
          <div class="right">
            <img src="@/assets/image/man/bagtitle1.png" alt="加载失败" />
          </div>
        </div>
      </div>
      <!-- 男士手袋分类 -->
      <div class="handbag_classify">
        <div class="content">
          <!-- 列表 -->
          <div class="goods_list" v-if="allList.length">
            <!-- 商品 -->
            <div
              class="goods"
              v-for="item in handbagList.s_goods"
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
      <!-- 男士鞋子标题板块 -->
      <div class="shoes_title">
        <div class="content">
          <!-- 左边文字 -->
          <div class="left">
            <div class="title">
              <p>男士鞋子系列</p>
            </div>
            <div class="words">
              <p>
                在《古驰爱的进行曲》全新时装系列中，GG Supreme帆布推出了经典隽永的蓝色和米色组合，传承材质的历史渊源。帆布材质对于环境的影响较低，因此十年如一日地出现在每个系列当中，已成为品牌的经典材质。
              </p>
            </div>
          </div>
          <!-- 右边图片 -->
          <div class="right">
            <img src="@/assets/image/man/shoes/title1.png" alt="加载失败" />
          </div>
        </div>
      </div>
      <!-- 男士鞋子分类 -->
      <div class="shoes_classify">
        <div class="content">
          <!-- 列表 -->
          <div class="goods_list" v-if="allList.length">
            <!-- 商品 -->
            <div
              class="goods"
              v-for="item in shoesList.s_goods"
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
    // 男士服饰
    clothesList() {
      let obj = {};
      // console.log(this.allList);

      // 数据还没请求回来时 先不渲染
      if (!this.allList.length) return obj;

      this.allList.forEach((item) => {
        if (item.id === 1186) {
          // console.log(item);
          obj = item;
        }
      });
      return obj;
    },
    // 男士手袋
    handbagList(){
      let obj = {}
      if(!this.allList.length) return obj;
      this.allList.forEach((item)=>{
        if(item.id === 1106){
          obj = item;
        }
      })
      return obj
    },
    // 男士鞋子
    shoesList(){
        let obj = {}
        if(!this.allList.length) return obj;
        this.allList.forEach((item)=>{
            if(item.id === 1187){
                obj = item;
            }
        })
        return obj
    }
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/style/Gentleman.scss'
</style>