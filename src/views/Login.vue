<template>
  <div class="">
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="deep-purple accent-4"
          icons-and-text
          dark
          grow
        >
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i.id">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginUsername"
                        label="Username or E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginPassword"
                        :append-icon="show1 ? 'eye' : 'eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 6 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="login"
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="username"
                        :rules="[rules.required]"
                        label="Username"
                        maxlength="20"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 6 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="register"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import Authen from "@/store/Authen";
export default {
  data() {
    return {
      dialog: true,
      tab: 0,
      tabs: [
        { name: "Login", icon: "mdi-account" },
        { name: "Register", icon: "mdi-account-outline" },
      ],
      valid: true,
      username: "",
      email: "",
      password: "",
      verify: "",
      loginPassword: "",
      loginUsername: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 6) || "Min 6 characters",
      },
      tokenData: "",
      profile: "",
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    async login() {
      this.$swal.showLoading();
      let res = await Authen.dispatch("login", {
        username: this.loginUsername,
        password: this.loginPassword,
      });
      const Toase = this.$swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2300,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
      if (res.success) {
        Toase.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
        });
        this.$emit("logon");
      } else if (!res.success) {
        Toase.fire({
          icon: "error",
          text: res.message,
        });
      }
    },

    async register() {
      const data_access = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      let res = await Authen.dispatch("register", data_access);
      const Toase = this.$swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2300,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
      if (res.success) {
        Toase.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
        });
        this.$emit("logon");
      } else {
        Toase.fire({
          icon: "error",
          title: "ผิดพลาดในการสมัครสมาชิก",
        });
      }
    },
    isAuthen() {
      return Authen.getters.isAuthen;
    },
  },
};
</script>

<style>
.swal2-popup.swal2-toast {
  box-shadow: 0 0 0 #9dc3ca !important;
}
</style>
