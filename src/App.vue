<template>
  <v-app>
    <v-main>
      <v-app-bar
        color="deep-purple accent-4"
        dark
        v-if="show"
      >
        <v-app-bar-nav-icon @click="drawer = true" ></v-app-bar-nav-icon>
        <v-toolbar-title>TypeWriter</v-toolbar-title>
        
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list nav
          dense
        >
          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item to="/" >
              <v-list-item-icon >
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
              
            </v-list-item>

            <v-list-item to="/leaderboard">
              <v-list-item-icon>
                <v-icon>mdi-crown</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Leaderboard</v-list-item-title>
            </v-list-item>
            
            <v-list-item to="/reward"> 
              <v-list-item-icon>
                <v-icon>mdi-gift</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Reward</v-list-item-title>
            </v-list-item>

            <v-list-item to="/rewardManager"> 
              <v-list-item-icon>
                <v-icon>mdi-cog </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Reward Manager</v-list-item-title>
            </v-list-item>

            <v-list-item to="/history">
              <v-list-item-icon>
                <v-icon>mdi-table</v-icon>
              </v-list-item-icon>
              <v-list-item-title>History</v-list-item-title>
            </v-list-item>
            
          </v-list-item-group>
        </v-list>

        <div 
          class="Logout"
        >
          <v-btn 
              block to=/Login
          >
          Logout
          </v-btn>
        </div>
      </v-navigation-drawer>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer : false,
    show:false
  }),

  created(){
    if(this.$route.name == 'Login' || this.$route.name == 'Register'){
      this.show = false
    }else{
      this.show = true
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

*{
  font-family: 'Kanit', sans-serif;
}

#app{
  background:url(https://www.teahub.io/photos/full/96-966323_minimalist-wallpapers-minimal-background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

body{
  width:100vw;
  height:100%;
}

</style>
