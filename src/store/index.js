import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rewards: [],

    },
    mutations: {
        addReward(state, payload) {
            state.rewards.push(payload)
        },
        editReward(state, payload) {
            state.rewards[payload.index] = payload.data
        },
        removeReward(state, index) {
            state.rewards.splice(index, 1)
        },
    },
    actions: {},
    modules: {}
})