import Axios from "axios";

const id = 4
const api_endpoint = "http://localhost:1337";
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI4MTgyODUxLCJleHAiOjE2MzA3NzQ4NTF9.SDI6vsEXyU3zNCYDyWJvCwtWb0J49JKAzy927vtzE5s'
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
            let res = await Axios.get(api_endpoint + "/histories" + '?users=' + id, this.getApiHeader());
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