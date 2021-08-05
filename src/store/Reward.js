import Vue from "vue";
import Vuex from "vuex";
import RewardService from "@/service/RewardService";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [],
    },
    getters: {
        rewards: (state) => state.data,
    },
    mutations: {
        fetch(state, { res }) {
            state.data = res.data;
        },
        add(state, payload) {
            state.data.push(payload);
        },
        edit(state, payload) {
            state.data[payload.index] = payload.data;
        },
        delete(state, index) {
            state.rewards.splice(index, 1);
        },
    },
    actions: {
        async fetchRewards({ commit }) {
            let res = await RewardService.fetchRewards();
            commit("fetch", { res });
        },
        async createRewards({ commit }, payload) {
            let res = await RewardService.createRewards(payload);
            commit("add", res);
        },
        async updateRewards({ commit }, payload) {
            let res = await RewardService.updateRewards(payload);
            commit("edit", res);
        },
        async deleteRewards({ commit }, payload) {
            let res = await RewardService.deleteRewards(payload);
            commit("delete", payload.index);
            return res
        },
        async redeemRewards({ commit }, payload) {
            let res = await RewardService.redeemRewards(payload)
            return res
        }
    },
    modules: {},
});