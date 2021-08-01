<template>
  <div>
    <h1 class="white--text w-auto">Login</h1>
    <v-col cols="12" sm="6" md="4">
      <v-text-field v-model="username" label="Solo" solo dense></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        label="Password"
        hint="At least 8 characters"
        value=""
        class="input-group--focused text-white"
        @click:append="show3 = !show3"
        v-model="password"
      ></v-text-field>
      <v-text-field
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        label="Confirm Password"
        hint="At least 8 characters"
        value=""
        class="input-group--focused white--text"
        @click:append="show3 = !show3"
        v-model="confirmPassword"
      ></v-text-field>
      <div class="Login">
        <v-btn @click="loginClick" block> Login </v-btn>
      </div>
    </v-col>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      show3: false,
      username: "",
      password: "",
      confirmPassword: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    loginClick(e) {
      console.log("button clicked");

      Axios.post("http://localhost:1337/auth/local", {
        identifier: "user1",
        password: "11111111",
      })
        .then((response) => {
          console.log("User profile", response.data.user);
          console.log("User token", response.data.jwt);
        })
        .catch((error) => {
          console.log("An error occurred:", error.response);
        });
    },
  },
};
</script>

<style>
</style>