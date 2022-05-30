import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/HomeView.vue";
import Index from "../views/Index/IndexView.vue";
import store from "../store/index.js";
// import { message } from 'element-ui'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "Index",
        component: Index,
      },
      {
        path: "handbag",
        name: "Handbag",
        component: () => import("../views/Handbag/HandbagView.vue"),
      },
      {
        path: "ladies",
        name: "Ladies",
        component: () => import("../views/Ladies/LadiesView.vue"),
      },
      {
        path: "gentleman",
        name: "Gentleman",
        component: () => import("../views/Gentleman/GentlemanView.vue"),
      },
      {
        path: "details/:id",
        name: "Details",
        component: () => import("../views/Details/DetailsView.vue"),
      },
      {
        path: "cart",
        name: "Cart",
        component: () => import("../views/Cart/CartView.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "/order",
        name: "Order",
        component: () => import("../views/Order/OrderView.vue"),
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignIn/SignInView.vue"),
    children: [
      {
        path: "/",
        name: "Login",
        component: () => import("../views/SignIn/components/LoginCardView.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import("../views/SignIn/components/RegisterCardView.vue"),
      },
    ],
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("../views/Payment/PaymentView.vue"),
    meta: { requireAuth: true },
  },
];

const router = new VueRouter({
  routes,
  // return 期望滚动到哪个的位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((item) => item.meta.requireAuth);

  if (requireAuth) {
    const userInfo = store.state.userInfo;

    if (!userInfo.token) {
      // message.error("请登陆后再操作 两秒后将自动跳转到登录页");
      // 两秒后跳转且保留用户跳转前的路径
      setTimeout(() => {
        router.push({ name: "Login", query: { fullpath: to.fullPath } });
      }, 2000);
    } else if (+new Date() > userInfo.token_out_of_date) {
      // 登陆失效
      // message.error("登陆失效 请重新登陆");
      setTimeout(() => {
        router.push({ name: "Login", query: { fullpath: to.fullPath } });
      }, 2000);
    } else {
      next();
    }
  }
  next();
});

export default router;
