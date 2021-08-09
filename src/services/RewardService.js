import Axios from "axios";
import Authen from '../store/Authen'
import AuthService from "./AuthService";
import HistoryService from "./HistoryService";

const api_endpoint = "http://localhost:1337";

const token = Authen.getters.jwt
const user = Authen.getters.user

export default {
    getApiHeader() {
        if (token !== "") {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }
    },
    async fetchRewards() {
        try {
            let res = await Axios.get(api_endpoint + "/rewards", this.getApiHeader());
            return res;
        } catch (error) {
            return error;
        }
    },
    async createRewards(payload) {
        try {
            let res = await Axios.post(
                api_endpoint + "/rewards",
                payload,
                this.getApiHeader()
            );
            return res;
        } catch (e) {
            return e.response;
        }
    },
    async updateRewards(payload) {
        console.log("payload in Service", payload);
        try {
            let res = await Axios.put(
                api_endpoint + "/rewards/" + payload.data.id,
                payload.data,
                this.getApiHeader()
            );
            return res;
        } catch (e) {
            return e.response;
        }
    },
    async deleteRewards(payload) {
        try {
            console.log("payload", payload);
            let res = await Axios.delete(
                api_endpoint + "/rewards/" + payload.id,
                this.getApiHeader()
            );
            return res;
        } catch (e) {
            return e.response;
        }
    },
    async redeemRewards(payload) {
        if (payload.amount) {
            if (Authen.getters.user.score < payload.points) {
                return "Sorry, You don't have enough point"
            }
            payload.amount--
                try {
                    let res = await Axios.put(
                        api_endpoint + '/rewards/' + payload.id,
                        payload, this.getApiHeader()
                    )
                    await AuthService.minusScore(payload)
                    return res
                } catch (error) {
                    return error.response.data.message[0]
                }
        }
    }
};