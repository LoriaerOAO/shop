<template>
  <div class="cart">
    <!-- 顶部固定背景 -->
    <header>
      <div class="words">
        <p>MUCCI</p>
        <p>购物袋</p>
      </div>
    </header>
    <main>
      <div class="cart_content">
        <!-- 左边 -->
        <div class="left">
          <!-- 全选 -->
          <div class="all">
            <input type="checkbox" v-model="isAllChecked" />
            <p>全选</p>
          </div>
          <hr />
          <!-- 商品列表 -->
          <div class="goodsList">
            <!-- 商品 -->
            <div class="goods" v-for="(item, index) in cartList" :key="item.id">
              <!-- 选择框 -->
              <div class="inp">
                <!-- :checked='item.isChecked'为了保持用户勾选的状态 -->
                <input type="checkbox" :checked="item.isChecked" @change="updateChecked(item.id)" />
              </div>
              <!-- 图片 -->
              <div class="goods_img">
                <img :src="item.s_goods_photos[0].path" alt="加载失败" />
              </div>
              <!-- 细节 -->
              <div class="details">
                <p>{{ item.name }}</p>
                <p>{{ item.desc }}</p>
                <p>￥{{ item.price }}</p>
                <button @click="del(index)">删除</button>
              </div>
              <!-- 数量 -->
              <div class="counts">
                <select name="" id="" :value="item.count" @change="
                  updateCount({ id: item.id, count: $event.target.value })
                ">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <!-- 小计价格 -->
              <div class="price">
                <p>￥{{ item.totalPrice }}</p>
              </div>
            </div>
            <!-- <hr /> -->
          </div>
        </div>
        <!-- 右边 -->
        <div class="right">
          <div class="right_content">
            <!-- 标题 -->
            <div class="title">
              <p>订单小计</p>
              <p>已选{{ totalCount }}件商品</p>
            </div>
            <hr />
            <!-- 总价格 -->
            <div class="content">
              <div class="top">
                <p>商品总计</p>
                <p>￥{{ allPrice }}</p>
              </div>
              <div class="middle">
                <p>运费</p>
                <p>免费</p>
              </div>
              <div class="bottom">
                <p>总计</p>
                <p>￥{{ allPrice }}</p>
              </div>
            </div>
            <hr />
            <!-- 说明 -->
            <div class="explain">
              <p>说明</p>
              <p>
                在线支付订单提交之后15分钟内未付款，订单将被系统自动取消，请您尽快完成支付以确保商品能及时送达，有货商品和门店配货商品是分开寄出。
              </p>
            </div>
            <hr />
            <!-- 按钮 -->
            <div class="btnList">
              <router-link to="/payment"><button>立即结算</button></router-link>
              <router-link to="/"><button :disabled="isDisabled">继续购物</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  created() {
    console.log(this.cartList);
  },
  methods: {
    ...mapMutations([
      "updateCount",
      "updateChecked",
      "del",
      "updateAllChecked",
    ]),
  },
  computed: {
    ...mapState(["cartList"]),
    ...mapGetters(["totalCount", "allPrice"]),
    // 改变全选的状态
    isAllChecked: {
      get() {
        // 看一下所有商品是否都被选中
        return this.cartList.every((item) => item.isChecked);
      },
      set() {
        this.updateAllChecked(!this.isAllChecked);
      },
    },
    // 判断一下购物车是否有被勾选的商品 有才能跳转
    isDisabled() {
      return !this.cartList.some((item) => item.isChecked);
    },
  },
};
</script>

<style scoped lang='scss'>
@import "@/assets/style/Cart.scss";
</style>

