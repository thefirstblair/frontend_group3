<template>
  <v-main>
    <v-row no-gutters>
      <v-img
        :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
        src="https://www.teahub.io/photos/full/96-966323_minimalist-wallpapers-minimal-background.jpg"
      >
      <v-container fill-height>
        <v-row
          align="center"
          class="white--text"
          justify="center"
        >
          <v-col
            class="white--text text-center"
            cols="12"
            tag="h1"
          >
            <span class="font-weight-black" style="font-size: 250%" >
              Typewriter Online
            </span>

            <br>

            <span class="font-weight-light" style="font-size: 100%">
              text text text
            </span>

          </v-col>

          <v-btn elevation="2" x-large to="/typing">
            Play now
          </v-btn>
        </v-row>
      </v-container>
      </v-img>
    </v-row>
  </v-main>
</template>

<script>
  export default {

  }
</script>
