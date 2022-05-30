import axios from "../utils/axios.js";

// 获取订单列表
const getOrder = function (token) {
  return axios({
    url: "/order",
    method: "GET",
    params: {
      project_id: 169,
    },
    headers: {
      "x-token": token,
    },
  });
};

// 提交订单时 添加订单
const addOrder = function (data, token) {
  return axios({
    url: "/order",
    method: "POST",
    data: {
      goods_info: data.goods_info,
      addr_id: data.addr_id,
      project_id: 169,
    },
    headers: {
      "x-token": token,
    },
  });
};

const checkOrder = function(data) {
  return axios({
    url: 'http://1.12.37.248:3000/payment/check',
    method: "POST",
    data
  })
}

export { getOrder, addOrder, checkOrder };
