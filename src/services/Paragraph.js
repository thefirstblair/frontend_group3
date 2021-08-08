import Axios from "axios"
import AuthService from "./AuthService";
import Authen from "../store/Authen";
const api_endpoint = "http://localhost:1337";
const token = Authen.getters.jwt

console.log("para", AuthService.getApiHeader());

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

    async fetchParagraph() {
        try {
            let res = await Axios.get(api_endpoint + "/paragraphs", this.getApiHeader());
            return res;
        } catch (error) {
            return error;
        }
    }
}