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
    history: (state) => state.data,
  },
  mutations: {
    fetch(state, { res }) {
      state.data = res.data;
    },
    add(state, payload) {
      state.rewards.push(payload);
    },
  },
  actions: {
    async fetchHistories({ commit }, token) {
      let res = await axios.get(api_endpoint + "/histories", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("fetch", { res });
    },
  },
  modules: {},
});
