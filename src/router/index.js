import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import('../views/Home.vue')
    }
  },
  {
    path: '/reward',
    name: 'Reward',
    component: function () {
      return import('../views/Reward.vue')
    }
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: function () {
      return import('../views/Leaderboard.vue')
    }
  },
  {
    path: '/history',
    name: 'History',
    component: function () {
      return import('../views/History.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
