import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

let api_endpoint = "http://localhost:1337";
const ttoken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjI4MDk1MTQyLCJleHAiOjE2MzA2ODcxNDJ9.dMvosN1DryfCgOmJvyDFvR-Y8obCg0Jz8Z-dozuuT8Y";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},

    actions: {
        async createMedia({ commit }, payload, token) {
            console.log("payload", payload);
            let res = await Axios.post(api_endpoint + "/upload", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res);
            return res;
        },
    },
    modules: {},
});