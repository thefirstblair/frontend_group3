import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from 'vue-sweetalert2';


import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/css/tailwind.css";
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: function(h) {
        return h(App);
    },
}).$mount("#app");