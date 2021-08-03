import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
      state.rewards.push(payload);
    },
    edit(state, payload) {
      state.rewards[payload.index] = payload.data;
    },
    delete(state, index) {
      state.rewards.splice(index, 1);
    },
  },
  actions: {
    async fetchRewards({ commit }, token) {
      let res = await axios.get(api_endpoint + "/rewards", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("fetch", { res });
    },
    addReward({ commit }, payload) {
      commit("add", { payload });
    },
  },
  modules: {},
});
