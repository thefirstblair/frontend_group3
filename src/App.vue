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
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item >
              <v-list-item-icon >
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
              
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-crown</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Leaderboard</v-list-item-title>
            </v-list-item>
            
            <v-list-item :to="{path: 'reward'}"> 
              <v-list-item-icon>
                <v-icon>mdi-gift</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Reward</v-list-item-title>
            </v-list-item>

            <v-list-item>
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
      <v-container grid-list-xs>
        <router-view/>
      </v-container>
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
