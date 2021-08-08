import Axios from "axios"

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
            console.error(e)
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

    async updateScore(payload) {
        try {
            console.log("before score", payload.score);
            let res = ''
            let me = await this.fetchMyself()
            if (me.adj_speed > payload.wpm) {
                payload.wpm = me.adj_speed
            }
            payload.score += me.score
            console.log("before score", payload.score);
            res = await Axios.put(api_endpoint + '/users/' + me.id, { score: payload.score, adj_speed: payload.wpm }, this.getApiHeader())
            console.log("after score", res.data.score);
            return res
        } catch (error) {
            return error
        }

    }

}