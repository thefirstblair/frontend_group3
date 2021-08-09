import Axios from "axios";

const api_endpoint = "http://localhost:1337";
const auth_key = "authorization"
let auth = JSON.parse(localStorage.getItem(auth_key))
const token = auth.jwt

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
            let res = await Axios.get(api_endpoint + "/histories" + '?users=' + auth.user.id, this.getApiHeader());
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
            console.log("api history",res)
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