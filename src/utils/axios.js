import Axios from "axios";
import router from '@/router/index.js'

//  创建 axios 实例，并进行初始化配置
const axios = Axios.create({
  timeout: 15000,
  baseURL: "http://shop.bluej.cn/api",
  validateStatus: function () {
    return true;
  },
});

// 拦截器
axios.interceptors.response.use((res) => {
  res.data.status = res.status;

  if(res.status === 401){
    router.push({ name: "Login", query: { fullpath: router.app.$route.fullPath } });
  }

  return res.data;
});

axios.interceptors.request.use(function (config) {
  // const token = localStorage.getItem("token");
  // config.headers["x-token"] = token;
  // console.log(config);

  return config;
});

export default axios;
