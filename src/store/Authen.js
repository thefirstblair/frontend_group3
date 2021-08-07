import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/service/AuthService'


Vue.use(Vuex)

const auth_key = "auth-user"
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialstate = {
    user: auth ? auth.user : "",
    jwt: auth ? auth.jwt : "",
    isAuthen: auth ? true : false
}

export default new Vuex.Store({
    state: {
        initialstate,
    },
    mutations: {
        loginSuccess(state, user, jwt) {
            state.user = user
            state.jwt = jwt
            state.isAuthen = true
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
                commit('loginSuccess', res.user, res.jwt)
            }
            return res
        },
        async logout({ commit }) {
            AuthService.logout()
            commit('logoutSuccess')
        },
        async register({ commit }, { username, email, password }) {
            let res = await AuthService.register({ username, email, password })
            if (res.success) {
                commit("LoginSuccess", res.user, res.jwt)
            }
            return res
        }
    },
    getters: {
        user: (state) => status.user,
        jwt: (state) => state.jwt,
        isAuthen: (status) => status.isAuthen
    },
    modules: {

    }
})
