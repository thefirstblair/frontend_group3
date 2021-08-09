<template>
  <v-container style="padding-top: 30vh">
    <v-row class="white--text" justify="center">
      <v-col class="white--text text-center" cols="12" tag="h1">
        <span class="font-weight-black" style="font-size: 350%">
          Typewriter Online
        </span>

        <br />

        <span class="font-weight-light" style="font-size: 150%">
          เกมฝึกทักษะการพิมพ์ดีด
          เหมาะสำหรับผู้เพิ่งเริ่มต้นและผู้ที่สนใจการพิมพ์ดีด <br />
          เพียงคุณพิมพ์ดีดตัวอักษรตามตัวอย่างในเวลาภายใน 60 วินาที
          ก็สามารถสะสมคะแนนจากการพิมพ์ดีด<br />เพื่อนำแต้มไปแลกของรางวัลสุดพิเศษได้
          ลองเล่นดูเลย!
        </span>
      </v-col>

      <v-btn to="/typing" elevation="2" x-large size="200" @click="checkLogin">
        Play now
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import Authen from "../store/Authen";
export default {
  methods: {
    checkLogin() {
      if (!Authen.getters.isAuthen) {
        this.$swal("Please Login First", "", "info");
      }
    },
  },
};
</script>

<style scoped></style>
