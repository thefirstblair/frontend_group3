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
                Headers: {
                    Author: `Bearer ${jwt}`
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
            console.error(e)
            if (e.response.status === 400) {
                return {
                    success: false,
                    message: e.response.data.messages[0].messages[0].message,
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
                    message: e.response.data.messages[0].messages[0].message,
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


}