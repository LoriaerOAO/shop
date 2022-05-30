import axios from "../utils/axios.js";

// 获取单个商品信息
const getDetails = function (id) {
  return axios({
    url: `/goods/${id}`,
    method: "GET",
  });
};

// 添加到购物车 把数据传给后台
const getadd= function (data){
  return axios({
    url:"/shoppingCart",
    method: "POST",
    data:data
  })
}

export { getDetails,getadd };
