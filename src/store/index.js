import Vue from "vue";
import Vuex from "vuex";
import { getGoods } from "@/services/getIndex.js";
// import {getadd} from "@/services/getDetails.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // 获取所有商品
    allList: [],
    // 购物车的商品
    cartList: JSON.parse(localStorage.getItem("cartList")) || [],
    // 地址信息
    addressInfo: {},
  },
  getters: {
    // 勾选的总商品数量
    totalCount(state) {
      let totalCount = 0;
      state.cartList.forEach((item) => {
        if (item.isChecked) {
          totalCount += Number(item.count);
        }
      });
      return totalCount;
    },
    // 勾选的商品总价格
    allPrice(state) {
      let allPrice = 0;
      state.cartList.forEach((item) => {
        if (item.isChecked) {
          allPrice += item.totalPrice;
        }
      });
      return allPrice;
    },
    // 过滤购物车中勾选的商品
    checkedProduct(state) {
      return state.cartList.filter((item) => item.isChecked);
    },
  },
  mutations: {
    // 储存用户信息
    getUserInfo(state, payload) {
      state.userInfo = payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    // 所有商品的数据
    getAllRes(state, payload) {
      state.allList = payload;
    },
    // 添加到购物车
    addtoCart(state, payload) {
      // 判断购物袋中是否有该商品
      const index = state.cartList.findIndex((item) => item.id === payload.id);

      if (index === -1) {
        // 不存在 推进去
        state.cartList.push({
          ...payload,
          isChecked: false,
          totalPrice: payload.sale_price
            ? payload.sale_price * payload.count
            : payload.price * payload.count,
        });
      } else {
        // 存在
        const prod = state.cartList[index];
        prod.count += payload.count;
        prod.totalPrice = payload.sale_price
          ? payload.sale_price * prod.count
          : payload.price * prod.count;
      }

      localStorage.setItem("cartList", JSON.stringify(state.cartList));

    },
    // 删除购物车中的商品
    del(state, payload) {
      console.log(payload);
      state.cartList.splice(payload, 1);
    },
    // 购物车数量改变更新
    updateCount(state, payload) {
      const { id, count } = payload;
      const prod = state.cartList.find((item) => item.id === id);
      prod.count = count;
      prod.totalPrice = prod.sale_price
        ? prod.sale_price * prod.count
        : prod.price * prod.count;
    },
    // isChecked的状态改变
    updateChecked(state, payload) {
      const prod = state.cartList.find((item) => item.id === payload);
      prod.isChecked = !prod.isChecked;
    },
    // 全选框的状态改变
    updateAllChecked(state, payload) {
      state.cartList.forEach((item) => {
        item.isChecked = payload;
      });
    },
    // 将填写的地址信息传到vuex里面
    updateAddress(state, payload) {
      state.addressInfo = {
        ...payload,
        area: payload.area.toString(),
      };
    },
    // 清空购物车已下单的商品
    delcheckedProduct(state) {
      for (let i = 0; i < state.length; i++) {
        if (state.cartList[i].isChecked) {
          state.cartList.splice(i, 1);
          i--;
        }
      }
    },
    // 退出登录时清空vuex的个人信息数据
    clearState(state) {
      state.userInfo = {};
      localStorage.clear();
    },
  },
  actions: {
    // 获取所有商品
    async allGoods(context) {
      const goodsRes = await getGoods({
        project_id: 169,
      });
      // console.log(goodsRes);
      context.commit("getAllRes", goodsRes.result);
    },
    // 添加到后台
    // async addToBackstage(context, item) {
    //   console.log(arguments);
    //   const addRes = await getadd({
    //     goods_id: item.id,
    //     num: item.count,
    //     project_id: 169
    //   })
    //   console.log(addRes);
    //   context.dispatch('addCart', item)
    // },
  },
  modules: {},
});
