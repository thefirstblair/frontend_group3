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
    async postMedia(payload) {
        let res = await Axios.post(api_endpoint + "/upload", payload, {
            getApiHeader()
        });
        return res;
    },
};