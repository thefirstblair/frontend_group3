import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/service/AuthService'
//import Axios from "axios"

Vue.use(Vuex)

const auth_key = "authorization"
let auth = JSON.parse(localStorage.getItem(auth_key))
    // const user = auth ? auth.user : ""
    // const jwt = auth ? auth.jwt : ""

const initialstate = {
    user: auth ? auth.user : "",
    jwt: auth ? auth.jwt : "",
    isAuthen: auth ? true : false
}

export default new Vuex.Store({
    state: {
        initialstate,
    },
    getters: {
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen
    },
    mutations: {
        loginSuccess(state, user, jwt) {
            state.user = user
            state.jwt = jwt
            state.isAuthen = true
            console.log("loginsuccccccc", state.isAuthen);
        },
        logoutSuccess(state) {
            state.user = ""
            state.jwt = ""
            state.isAuthen = false
        },
    },
    actions: {
        async login({ commit }, { username, password }) {
            let res = await AuthService.login({ username, password })
            if (res.success) {
                console.log(res.user, res.jwt);
                console.log("login suc", res);
                commit("loginSuccess", res.user, res.jwt)
            }
            return res
        },
        async logout({ commit }) {
            AuthService.logout()
            commit('logoutSuccess')
        },
        async register({ commit }, { username, password }) {
            let res = await AuthService.register({ username, password })
            if (res.success) {
                commit("loginSuccess", res.user, res.jwt)
            }
            return res
        }
    },

    modules: {

    }
})