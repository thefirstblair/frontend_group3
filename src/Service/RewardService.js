import Axios from "axios";

const api_endpoint = "http://localhost:1337";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjI4MDIwMjM0LCJleHAiOjE2MzA2MTIyMzR9.tFOftty9yKFTY06Z61x93NlTI72IfRYQuBM1XBqt8f4";

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
            let res = await Axios.delete(
                api_endpoint + "/rewards/" + payload.id,
                this.getApiHeader()
            );
            return res;
        } catch (e) {
            return e.response;
        }
    },
};