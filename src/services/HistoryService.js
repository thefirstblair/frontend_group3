import Axios from "axios";
import Authen from '../store/Authen'

const api_endpoint = "http://localhost:1337";

const token = Authen.getters.jwt
const user = Authen.getters.user
console.log("token his", token);

export default {

    getApiHeader() {
        if (token !== '') {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        }
    },
    async fetchHistories() {
        try {
            let res = await Axios.get(api_endpoint + "/histories" + '?users=' + user.id, this.getApiHeader());
            console.log("fetch service", res);
            return res
        } catch (error) {
            return error
        }
    },
    async createHistories(payload) {
        try {
            let body = {
                detail: payload.detail,
                amount: payload.amount,
                users: payload.id
            }
            let res = await Axios.post(api_endpoint + '/histories', body, this.getApiHeader())
            console.log("api history", res)
            return res
        } catch (error) {
            return error.response
        }
    },
    async getLeaderBoard(headtext) {
        try {
            let res = await Axios.get(
                `http://localhost:1337/histories?detail=${headtext}`, this.getApiHeader()
            );
            return res
        } catch (error) {
            return error
        }
    },
    async postMedia(payload) {
        let res = await Axios.post(api_endpoint + "/upload", payload,
            this.getApiHeader()
        );
        return res;
    },
};