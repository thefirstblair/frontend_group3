import Axios from "axios"
import History from '../store/History'

const auth_key = "authorization"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""
const api_endpoint = "http://localhost:1337"


export default {
    isAuthen() {
        return (user !== "") && (jwt !== "")
    },

    getUser() {
        return user
    },

    getApiHeader() {
        if (jwt !== "") {
            return {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            }
        }
        return {}

    },

    getJwt() {
        return jwt
    },

    async login({ username, password }) {
        try {
            let url = `${api_endpoint}/auth/local`
            let body = {
                identifier: username,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            } else {
                console.log("NOT 200", res)
            }
        } catch (e) {
            console.log("catch");
            if (e.response.status === 400) {
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message,
                }
            }
        }
    },

    async register({ username, email, password }) {
        try {
            let url = `${api_endpoint}/auth/local/register`
            let body = {
                username: username,
                email: email,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            } else {
                console.log("NOT 200", res)
            }
        } catch (e) {
            if (e.response.status === 400) {
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message,
                }
            } else {
                return {
                    success: false,
                    message: "Unknown error: " + e.response.data
                }
            }
        }
    },

    logout() {
        localStorage.removeItem(auth_key)
    },

    async fetchMyself() {
        let res = await Axios.get(api_endpoint + '/users/me', this.getApiHeader())
        return res.data
    },

    async setData(payload) {
        localStorage.setItem(auth_key, JSON.stringify(payload))
    },

    async saveScore(payload) {
        try {

            let me = await this.fetchMyself()
            payload = {
                adj_speed: payload.adj_speed > me.adj_speed ? payload.adj_speed : me.adj_speed,
                score: payload.score + me.score
            }
            let res = await Axios.put(api_endpoint + '/users/' + me.id, payload, this.getApiHeader())
            if (res.status === 200) {
                this.setData({ user: res.data, jwt: this.getJwt() })
                await History.dispatch('createHistories', { reward: 'From Typing', detail: 'EarnPoints', amount: payload.score, users: me.id })
            }
            return res
        } catch (error) {
            return error
        }

    },
    async minusScore(payload) {
        try {
            let me = await this.fetchMyself();
            let res = await Axios.put(api_endpoint + '/users/' + me.id, this.getApiHeader())
            await History.dispatch('createHistories', { reward: payload.id, detail: 'LossPoints', amount: payload.amount, users: me.id })
            return res
        } catch (error) {
            return error
        }
    }

}