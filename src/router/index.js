import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Typing from "@/views/Typing";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: function() {
      return import("../views/Home.vue");
    },
  },
  {
    path: "/reward",
    name: "Reward",
    component: function() {
      return import("../views/Reward.vue");
    },
  },  {
    path: "/rewardManager",
    name: "RewardManager",
    component: function() {
      return import("../views/RewardManager.vue");
    },
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: function() {
      return import("../views/Leaderboard.vue");
    },
  },

  {
    path: "/summary",
    name: "Summary",
    component: function() {
      return import("../views/SummaryScore.vue");
    },
  },

  {
    path: "/history",
    name: "History",
    component: function() {
      return import("../views/History.vue");
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/typing",
    name: "Typing",
    component: Typing,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
