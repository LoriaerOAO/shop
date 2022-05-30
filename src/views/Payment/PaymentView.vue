<template>
  <div class="payment">
    <!-- 头部 -->
    <signHeader></signHeader>
    <!-- 内容 -->
    <main>
      <div class="payment_content">
        <!-- 左边 -->
        <div class="left">
          <!-- 标题 -->
          <div class="title">
            <p>配送地址</p>
          </div>
          <!-- 内容 -->
          <div class="address_content">
            <!-- 地址栏 -->
            <ul class="addressList">
              <!-- 地址 -->
              <li class="address" v-for="(item, index) in addressList" :key="item.id"
                :class="{ active: activeIndex === index }" @click="activeIndex = index">
                <p>{{ item.name }}</p>
                <p>{{ item.phone }}</p>
                <p>{{ formatAddress(item.area) }}</p>
                <p>{{ item.post_code }}</p>
                <!-- <p v-if="activeIndex === 0">默认地址</p> -->
              </li>
              <li class="add" @click="dialogFormVisible = true">
                + 新增收货地址
              </li>
            </ul>
            <!-- 新建地址 -->
            <div class="set"></div>
          </div>
        </div>
        <!-- 右边 -->
        <div class="right">
          <div class="right_content">
            <!-- 标题 -->
            <div class="title">
              <p><i class="el-icon-goods"></i>{{ totalCount }}件商品</p>
            </div>
            <hr />
            <!-- 商品列表 -->
            <div class="goodsList">
              <div class="goods" v-for="item in checkedProduct" :key="item.id">
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
            </div>
            <!-- <hr> -->
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
              <button @click="order">提交订单</button>
              <router-link to="/cart"><button>返回购物车</button></router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- 新建地址弹窗 -->
      <div class="pop_address">
        <el-dialog title="新建地址" :visible.sync="dialogFormVisible">
          <popAdd :address-list="cityList"></popAdd>
          <div>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="setInit"> 确 定 </el-button>
          </div>
        </el-dialog>
      </div>
    </main>
    <!-- 页尾 -->
    <footerView></footerView>
  </div>
</template>

<script>
import signHeader from "./components/HeaderView.vue";
import footerView from "@/components/FooterView.vue";
import popAdd from "./components/PopView.vue";
import { addOrder } from "@/services/getOrder.js";
import { mapState, mapGetters, mapMutations } from "vuex";
import { getCity, addAddress, getAddress, getPay } from "@/services/getPayment.js";

export default {
  components: {
    signHeader,
    footerView,
    popAdd,
  },
  data() {
    return {
      cityList: [],
      addressList: [],
      dialogFormVisible: false,
      activeIndex: 0,
    };
  },
  created() {
    this.cityInit();
    this.addressInit();
  },
  methods: {
    ...mapMutations(["delcheckedProduct", "updateAddress"]),
    // 获取城市
    async cityInit() {
      const cityRes = await getCity();
      this.cityList = cityRes.result;
    },
    // 接收地址信息
    async addressInit() {
      const addressRes = await getAddress(this.userInfo.token);
      this.addressList = addressRes.result;
      // console.log(this.addressList);
    },
    // 新建地址
    async setInit() {
      this.dialogFormVisible = false
      const setRes = await addAddress(this.addressInfo, this.userInfo.token);
      console.log(setRes);
      this.addressInit()
    },
    // 把地址转换出来
    formatAddress(area) {
      if (!area || !this.cityList.length) return;

      area = area.split(",");

      const province = this.cityList.find((item) => +item.id === +area[0]);
      const city = province.children.find((item) => +item.id === +area[1]);
      const district = city.children.find((item) => +item.id === +area[2]);

      return province.cityname + city.cityname + district.cityname;
    },
    // 点击下单时
    async order() {
      const addrId = this.addressList[this.activeIndex].id;
      const orderArr = [];

      this.checkedProduct.forEach((item) => {
        orderArr.push({
          id: item.id,
          num: item.count,
        });
      });

      const res = await addOrder(
        {
          addr_id: addrId,
          goods_info: orderArr,
        },
        this.userInfo.token
      );

      this.delcheckedProduct();

      // 支付接口
      const payRes = await getPay({
        orderId: res.result.order_id,
        name: "asda",
        price: res.result.total_price,
        returnUrl: location.origin + '/#/order'
      })

      console.log(payRes);
      if(payRes.code !== 200) return this.$message.error(payRes.msg);

      location.href = payRes.data.paymentUrl
    },
  },
  computed: {
    ...mapState(["cartList", "userInfo", "addressInfo"]),
    ...mapGetters(["totalCount", "allPrice", "checkedProduct"]),
  },
};
</script>

<style scoped lang='scss'>
@import "@/assets/style/Payment.scss";
</style>