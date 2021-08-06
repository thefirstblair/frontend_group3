import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Typing from "@/views/Typing";
import Register from "@/views/Register"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: function() {
            return import ("../views/Home.vue");
        },
    },
    {
        path: "/reward",
        name: "Reward",
        component: function() {
            return import ("../views/Reward.vue");
        },
    }, {
        path: "/rewardManager",
        name: "RewardManager",
        component: function() {
            return import ("../views/RewardManager.vue");
        },
    },
    {
        path: "/leaderboard",
        name: "Leaderboard",
        component: function() {
            return import ("../views/Leaderboard.vue");
        },
    },

    {
        path: "/history",
        name: "History",
        component: function() {
            return import ("../views/History.vue");
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
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;