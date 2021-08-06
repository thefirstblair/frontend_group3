<template>
  <div class="test">
    <div
      class="tw-flex tw-justify-center tw-mt-4 tw-h-24 tw-text-center tw-text-5xl tw-font-semibold"
    >
      <span class="timer">
        Time <br>
        {{ timer }}
      </span>

    </div>
    <div class="tw-font-mono tw-bg-gray-700 tw-text-red-50 tw-text-xl tw-h-18 tw-w-1/2 tw-mt-4 tw-mx-auto tw-p-4">
      <span v-for="data in dataCom" :key="data.id" ref="dataSpan">{{
        data
      }}</span>
    </div>
    <br/>
    <div class="tw-font-mono tw-text-red-50">
      <textarea
        type="text"
        class="tw-bg-blue-200 tw-text-black "
        @focus="startGame"
        @keypress="typing"
        @keydown.delete="pressDelete"
        @keydown.space="pressSpace"
        v-model="inputField"
        ref="typeField"
      />
    </div>



     
  <br/>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
   

      <v-card>
        <v-card-title class="text-h5 grey lighten-2" >
          Summary
        </v-card-title>

        <v-card-text> 
          <span>Raw WPM : {{ grossWPM }} </span>
          <br />
          <span>Adjust WPM : {{ netWPM }}</span>
          <br />
          <span>Errors : {{ incorrected }}</span>
          <br />
          <span>Score : {{ score }} </span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn class="ma-2" x-large to=/ >
              <v-icon left x>
                mdi-arrow-left
              </v-icon>Back
            </v-btn>

            <v-btn class="ma-2" x-large @click="reset">
              <v-icon left x>
                mdi-refresh
              </v-icon>
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      inputField: "",
      data_words: [
        "test cab equal curl quick quake manic quad reach quark chord quart pace quill sack equip track squid sick quack squat poach quota eject",
        "dabu dabe dabe dabo dake dadada i dont want u dont want me dont want",
        "cat come coke kid pool up tie ant rat zebra vee pop opposite paleto watch livin inter thai",
        "telephone pink teleport call comfort comfy regular coke french fried weed cocaine shark meth",
      ],
      randomed_number: 0,
      currCursor: 0,
      allTyped: 0,
      incorrected: 0,
      grossWPM: 0,
      netWPM: 0,
      timer: 0,
      limit: 10,
      typed: 0,
      score: 0,
      token: "",
      profile: [],
    };
  },
  beforeMount() {
    this.reset();
  },
  computed: {
    dataCom() {
      return this.data_words[this.randomed_number].split("");
    },
  },
  methods: {
    reset() {
      this.randomed_number = Math.floor(Math.random() * this.data_words.length);
      this.loaded = false;
      this.dialog = false;
      this.currCursor = 0;
      this.inputField = "";
      this.allTyped = 0;
      this.incorrected = 0;
      this.grossWPM = 0;
      this.netWPM = 0;
      this.timer = 0;
      this.score = 0;
      for (let i = 0; i < this.$refs.dataSpan.length; i++) {
        this.$refs.dataSpan[i].classList.remove(
          "text-black",
          "bg-white",
          "text-red-800",
          "bg-red-300",
          "text-green-800",
          "bg-green-300"
        );
      }
    },
    startGame() {
      this.divWord = this.data_words[this.randomed_number];
      this.updateWord();
    },
    updateWord() {
      if (this.$refs.dataSpan[this.currCursor]) {
        this.$refs.dataSpan[this.currCursor].classList.add(
          "text-black",
          "bg-white"
        );
      }
    },
    updateCursor() {
      if (this.$refs.dataSpan[this.currCursor]) {
        this.$refs.dataSpan[this.currCursor].classList.add(
          "text-black",
          "bg-white"
        );
      }
    },
    typing(event) {
      const spanTexts = this.$refs.dataSpan;

      if (this.currCursor === 0) {
        this.countUpTimer();
        console.log("start");
      }
      if (spanTexts[this.currCursor].innerText === "") {
        this.incorrected++;
        this.pressSpace();
      }
      if (this.$refs.dataSpan[this.currCursor]) {
        if (event.key === spanTexts[this.currCursor].innerText) {
          this.$refs.dataSpan[this.currCursor].classList.add(
            "text-green-800",
            "bg-green-300"
          );
          this.$refs.dataSpan[this.currCursor].classList.remove(
            "text-red-800",
            "bg-red-300"
          );
        } else {
          this.$refs.dataSpan[this.currCursor].classList.remove(
            "text-green-800",
            "bg-green-300"
          );
          this.$refs.dataSpan[this.currCursor].classList.add(
            "text-red-800",
            "bg-red-300"
          );
          this.incorrected++;
        }
      }
      this.typed++;
      this.currCursor++;
      this.allTyped++;
      this.updateCursor();
    },
    pressDelete() {
      this.startGame();
      if (this.currCursor > 0) {
        this.$refs.dataSpan[this.currCursor - 1].classList.remove(
          "text-green-800",
          "bg-green-300",
          "text-red-800",
          "bg-red-300"
        );
        this.$refs.dataSpan[this.currCursor].classList.remove(
          "text-black",
          "bg-white"
        );
        console.log("delete");
        this.currCursor--;
      }
    },
    pressSpace() {
      for (let i = 0; i <= this.typed; i++) {
        this.$refs.dataSpan[this.currCursor - i].remove();
      }
      if (this.$refs.dataSpan[this.currCursor].innerText !== " ") {
        for (let i = 0; i <= 10; i++) {
          if (this.$refs.dataSpan[this.currCursor].innerText === "") {
            break;
          }
          this.$refs.dataSpan[this.currCursor].remove();
          this.currCursor++;
        }
      }
      this.typed = 0;
      this.inputField = "";
    },
    calScore() {
      this.grossWPM = (this.allTyped / 5 / (this.limit / 60)).toFixed(3);
      this.netWPM = (
        (this.allTyped / 5 - this.incorrected) /
        (this.limit / 60)
      ).toFixed(3);
      this.score = (this.netWPM * 2.5).toFixed(3);
      console.log("Raw WPM", this.grossWPM);
      console.log("Raw WPM", this.netWPM);
      console.log("score >", this.score);
    },
    countUpTimer() {
      if (this.limit > this.timer) {
        setTimeout(() => {
          this.timer += 1;
          this.countUpTimer();
        }, 1000);
      } else {
        this.savedScore();
      }
    },
    savedScore() {
      console.log("saved");
      console.log("time", this.timer);
      console.log("type", this.allTyped);
      console.log("incorr", this.incorrected);
      this.calScore();
      this.callApi();
      this.dialog = true;

      // this.$router.push({ name: "Summary" });
    },
    async callApi() {
      let response = await Axios.post("http://localhost:1337/auth/local", {
        identifier: "admin",
        password: "admin1",
      });
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
      this.token = response.data.jwt;
      this.profile = response.data.user;
      let payload = {
        score: parseFloat(this.profile.score) + parseFloat(this.score),
      };
      if (this.netWPM > this.profile.adj_speed) {
        payload.adj_speed = this.netWPM;
      }
      let res = await Axios.put(
        "http://localhost:1337/users/" + this.profile.id,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      console.log(res);
    },
    passScore() {},
    value() {},
  },
};
</script>

<style>
textarea{
  height: 200px;
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
  justify-content: center;
}

</style>