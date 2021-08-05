import Vue from "vue";
import Vuex from "vuex";
import HistoryService from "@/service/HistoryService";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [],
    },
    getters: {
        histories: (state) => state.data,
    },
    mutations: {
        fetch(state, { res }) {
            state.data = res.data;
        },
        add(state, payload) {
            state.data.push(payload);
        },
    },
    actions: {
        async fetchHistories({ commit }) {
            let res = await HistoryService.fetchhistories();
            commit("fetch", { res });
        },
        async createHistories({ commit }, payload) {
            let res = await HistoryService.fetchhistories(payload);
            commit("add", res);
        },
    },
    modules: {},
})