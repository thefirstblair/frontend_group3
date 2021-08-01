<template>
  <v-app>
    <v-main>
      <v-app-bar
        color="deep-purple accent-4"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true" ></v-app-bar-nav-icon>
        <v-toolbar-title>TypeWriter</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon x-large>
          Login
        </v-btn>
        
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
            v-model="group"
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

            <v-list-item to="/history">
              <v-list-item-icon>
                <v-icon>mdi-table</v-icon>
              </v-list-item-icon>
              <v-list-item-title>History</v-list-item-title>
            </v-list-item>
            
          </v-list-item-group>
        </v-list>

        <div 
          class="Login"
        >
          <v-btn 
              block
          >
          Login
          </v-btn>
        </div>
      </v-navigation-drawer>
      <v-img
        :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
        src="https://www.teahub.io/photos/full/96-966323_minimalist-wallpapers-minimal-background.jpg"
      >
      <v-content>
        <router-view/>
      </v-content>
      </v-img>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer : false
  }),
};
</script>

<style>

</style>
