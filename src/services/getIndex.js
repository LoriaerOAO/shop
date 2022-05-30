import axios from "../utils/axios.js";

// 轮播图
const CarouselTop = function (params) {
  return axios({
    url: "/carousel",
    method: "GET",
    params: params,
  });
};

// 新品轮播图
const getGoods = function (params) {
  return axios({
    url: "/classify/classifyGoods",
    method: "GET",
    params: params,
  });
};

export { CarouselTop, getGoods };
