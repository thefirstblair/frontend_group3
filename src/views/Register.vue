<template>
  <div>
    <h1 class="white--text w-auto">Register</h1>
    <v-col cols="12" sm="6" md="4">
        <v-text-field 
        type="text"
        v-model="username" 
        label="username" solo dense></v-text-field>
        <v-text-field 
        type="text"
        v-model="email" 
        label="email" solo dense></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
        <v-text-field
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show3 ? 'text' : 'password'"
        label="Password"
        hint="At least 8 characters"
        value=""
        class="input-group--focused white--text"
        @click:append="show3 = !show3"
        v-model="password"
        ></v-text-field>
        <div class="Login">
            <v-btn @click="register" block>Register</v-btn>
        </div>
    </v-col>
  </div>
</template>


<script>
import Axios from 'axios'
import Authen from '@/store/Authen'
export default {
    data() {
        return {   
            show3: false,        
            username: "",
            email: "",
            password: "",
            rules: {
                required: (value) => !!value || "Required.",
                min: (v) => v.length >= 8 || "Min 8 characters",
                emailMatch: () => `The email and password you entered don't match`,
            },
            tokenData: "",
            profile: "",
        }
    },
    methods: {
        getAllData() {
            const token = this.tokenData;
            console.log(token);
            Axios.get("http://localhost:1337/users", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
        },
        async register() {
            const data_access = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            let res = await Authen.dispatch("register", data_access)
            if (res.success) {
               this.$swal("Register Success", `Welcome, ${res.user.username}`, "success")
            } else {
               this.$swal("Register Failed", res.message, "error")
            }
        },
        isAuthen() {
            return Authen.getters.isAuthen
        }

    }
}
</script>

<style>

</style>
