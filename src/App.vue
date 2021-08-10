<template>
  <v-app>
    <div
      v-if="display"
      style="z-index: 201"
      class="justify-center items-center flex tw-bg-opacity-95 tw-fixed"
    >
      <Login @logon="logedin" />

      <button
        @click="display = false"
        class="
          tw-bg-opacity-40 tw-h-screen tw-w-screen tw-cursor-default tw-absolute
        "
        style="z-index: 201"
      ></button>
    </div>
    <v-main>
      <v-app-bar color="deep-purple accent-4" dark v-if="show">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>TypeWriter </v-toolbar-title>
        <v-spacer></v-spacer>
        <h1 v-if="isAuthen()" class="tw-mr-6 tw-text-xl">
          <span class="tw-mx-4">Username :</span>
          <span> {{ nameDisplay }} </span>
          <span v-if="!isAdmin()" class="tw-mx-4"
            >Total Points : {{ scoreDisplay ? scoreDisplay : 0 }}</span
          >
        </h1>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="isAuthen() && isAdmin()" to="/leaderboard">
              <v-list-item-icon>
                <v-icon>mdi-crown</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Leaderboard</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="isAuthen() && !isAdmin()" to="/reward">
              <v-list-item-icon>
                <v-icon>mdi-gift</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Reward</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="isAuthen() && isAdmin()" to="/rewardManager">
              <v-list-item-icon>
                <v-icon>mdi-cog </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Reward Manager</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="isAuthen() && !isAdmin()" to="/history">
              <v-list-item-icon>
                <v-icon>mdi-table</v-icon>
              </v-list-item-icon>
              <v-list-item-title>History</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <div class="Logout">
          <v-btn block @click="toggleLoginButton"> {{ isLogin }} </v-btn>
        </div>
      </v-navigation-drawer>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Login from "@/views/Login";
import Authen from "../src/store/Authen";
export default {
  name: "App",
  components: { Login },
  data: () => ({
    drawer: false,
    show: false,
    display: false,
  }),

  created() {
    if (this.$route.name == "Login" || this.$route.name == "Register") {
      this.show = false;
    } else {
      this.show = true;
    }
  },
  computed: {
    isLogin() {
      return Authen.getters.isAuthen ? "Logout" : "Login";
    },
    scoreDisplay() {
      return Authen.getters.user.score;
    },
    nameDisplay() {
      return Authen.getters.user.username;
    },
  },
  methods: {
    logedin() {
      this.toggle();
      location.reload();
    },
    isAuthen() {
      return Authen.getters.isAuthen;
    },
    isAdmin() {
      if (Authen.getters.isAuthen) {
        return Authen.getters.user.role.id === 3;
      }
      return false;
    },
    toggle() {
      this.display = !this.display;
    },
    async toggleLoginButton() {
      if (!Authen.getters.isAuthen) {
        this.toggle();
      } else {
        Authen.dispatch("logout");
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
        Toase.fire({
          icon: "success",
          title: "ออกจากระบบสำเร็จ",
        });
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");

* {
  font-family: "Kanit", sans-serif;
}

#app {
  background: url(https://www.teahub.io/photos/full/96-966323_minimalist-wallpapers-minimal-background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

body {
  width: 100vw;
  height: 100%;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  transition: 0.5s;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f5deff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(177, 118, 255);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(133, 27, 175);
}
</style>
