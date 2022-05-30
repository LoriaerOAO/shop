import axios from "../utils/axios.js";

// 请求登录数据
const getLogin = function (data) {
  return axios({
    url: "/login",
    method: "POST",
    data: data,
  });
};

// 请求注册数据
const getRegister = function (data) {
  return axios({
    url: "/register",
    method: "POST",
    data: data,
  });
};

export { getLogin, getRegister };
