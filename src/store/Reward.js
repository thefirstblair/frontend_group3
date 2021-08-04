import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import RewardService from "@/Service/RewardService";

Vue.use(Vuex);

let api_endpoint = "http://localhost:1337";

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
            let res = await axios.get(
                api_endpoint + "/rewards",
                RewardService.getApiHeader()
            );
            commit("fetch", { res });
        },
        async createRewards({ commit }, payload) {
            let res = await RewardService.createRewards(payload);
            commit("add", res);
        },
        async updateRewards({ commit }, payload) {
            let res = await RewardService.updateRewards(payload);
            console.log("store", res);
            commit("edit", payload);
        },
        async deleteRewards({ commit }, payload) {
            await RewardService.deleteRewards(payload);
            commit("delete", payload.index);
        },
    },
    modules: {},
});