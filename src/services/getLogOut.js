import axios from "../utils/axios.js";

// 退出登录
const getLogOut = function (token) {
  return axios({
    url: "/logout",
    method: "POST",
    headers: {
      "x-token": token,
    },
  });
};

export { getLogOut };
