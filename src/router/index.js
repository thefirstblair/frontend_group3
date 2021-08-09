import Vue from "vue";
import VueRouter from "vue-router";
import Authen from '../store/Authen'

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
        component: function() {
            return import ("../views/Login.vue")
        }
    },
    {
        path: "/typing",
        name: "Typing",
        component: function() {
            return import ("../views/Typing.vue")
        }

    },
    {
        path: "/register",
        name: "Register",
        component: function() {
            return import ("../views/Register.vue")
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;

router.beforeEach((to, from, next) => {
    if (to.name !== 'Home' && !Authen.getters.isAuthen) {
        next('/')
    } else {
        next()
    }
});