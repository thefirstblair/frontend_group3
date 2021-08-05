import Axios from "axios";

const api_endpoint = "http://localhost:1337";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjI4MDIwMjM0LCJleHAiOjE2MzA2MTIyMzR9.tFOftty9yKFTY06Z61x93NlTI72IfRYQuBM1XBqt8f4";

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
            let res = await Axios.get(api_endpoint + "/histories", this.getApiHeader());
            return res
        } catch (error) {
            return error
        }
    },
    async createLossHistory(payload) {
        try {
            let body = {
                detail: 'loss',
                amount: payload.amount,
                users: payload.id
            }
            let res = await Axios.post(api_endpoint + 'history', body, this.getApiHeader())
            return res
        } catch (error) {
            return error.response
        }
    },
    async getLeaderBoard(headtext) {
        try {
            let res = await axios.get(
                `http://localhost:1337/leaderboards?Content=${headtext}`, this.getApiHeader()
            );
            return res
        } catch (error) {
            return error.response
        }
    },
    async postMedia(payload) {
        let res = await Axios.post(api_endpoint + "/upload", payload,
            this.getApiHeader()
        );
        return res;
    },
};