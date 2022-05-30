import axios from "../utils/axios.js";

// 获取城市
const getCity = function (params) {
  return axios({
    url: "/city",
    method: "GET",
    params,
  });
};

// 添加地址
const addAddress = function (data,token) {
  return axios({
    url: "/address",
    method: "POST",
    data,
    headers: {
      "x-token": token,
    },
  });
};

// 获取地址列表
const getAddress = function (token) {
  return axios({
    url: "/address",
    method: "GET",
    headers: {
      "x-token": token,
    },
  });
};

// 支付页
const getPay = function (data) {
  return axios({
    url: "http://1.12.37.248:3000/payment",
    method:"POST",
    data:data
  })
}

export { getCity, addAddress, getAddress, getPay };
