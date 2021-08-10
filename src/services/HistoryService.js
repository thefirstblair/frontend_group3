import Axios from "axios";
import AuthService from '../services/AuthService'

const api_endpoint = "http://localhost:1337";


export default {

    getApiHeader() {
        return AuthService.getApiHeader()
    },
    async fetchHistories() {
        try {
            let res = await Axios.get(api_endpoint + "/histories" + '?users=' + AuthService.getUser().id, this.getApiHeader());
            return res
        } catch (error) {
            return error
        }
    },
    async createHistories(payload) {
        try {
            let body = {
                reward: payload.reward,
                detail: payload.detail,
                amount: payload.amount,
                users: payload.users
            }
            let res = await Axios.post(api_endpoint + '/histories', body, this.getApiHeader())
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

};