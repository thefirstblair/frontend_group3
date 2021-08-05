<template>
  <div>
    <div
      class="flex justify-center mt-4 h-24 text-center text-5xl font-semibold"
    >
      <span class="timer">
        Time <br>
        {{ timer }}
      </span>

    </div>
    <div class="font-mono bg-gray-700 text-red-50 text-xl h-18 w-1/2 mt-4 mx-auto p-4">
      <span v-for="data in dataCom" :key="data.id" ref="dataSpan">{{
        data
      }}</span>
    </div>
    <div class="font-mono h-20 w-1/2 mt-4 mx-auto text-red-50">
      <textarea
        type="text"
        class="bg-blue-200 text-black w-full h-full"
        @focus="startGame"
        @keypress="typing"
        @keydown.delete="pressDelete"
        @keydown.space="pressSpace"
        v-model="inputField"
        ref="typeField"
      />
    </div>

    <div
     class="
        flex
        justify-center
        space-x-16
        w-1/2
        text-center text-4xl
        mx-auto
        my-8
      "
    >

          
      <v-bottom-navigation
        :value="value"
        color="primary"
        horizontal
      >
      
    <v-btn>
      <span>Raw WPM : {{ grossWPM }} </span>

    </v-btn>

    <v-btn>
      <span>Adjust WPM : {{ netWPM }}</span>

   
    </v-btn>

    <v-btn>
      <span>Errors : {{ incorrected }}</span>
    </v-btn>

    <v-btn>
      <span>Score : {{ score }}</span>
    </v-btn>

  </v-bottom-navigation>

    </div> 
      <v-card-actions class="justify-center">
        <v-btn to=/summary x-large color="success">
          Finish
        </v-btn>
      </v-card-actions>  
    </div>

  
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      divWord: "click text field to type",
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
      isTimeRunning: true,
      limit: 10,
      typed: 0,
      score: 0,
      token: "",
      profile: [],
    };
  },
  beforeMount() {
    this.randomed_number = Math.floor(Math.random() * this.data_words.length);
    this.loaded = false;
  },
  computed: {
    dataCom() {
      return this.data_words[this.randomed_number].split("");
    },
  },
  methods: {
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
</style>