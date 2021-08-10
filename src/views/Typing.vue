<template>
  <div>
    <div
      class="tw-flex tw-justify-center tw-mt-4 tw-h-24 tw-text-center tw-text-5xl tw-font-semibold tw-p-20"
    >
    
      <span class="timer" style="color:white;">
        Time <br>
        {{displayTimer > limit ? limit : displayTimer }}
      </span>
    </div>
    <br/>
    <div class=" tw-whitespace-nowrap tw-overflow-hidden  tw-bg-gray-700 tw-text-red-50 tw-text-xl tw-mt-4 tw-mx-auto tw-p-20 tw-pt-10 tw-pb-12" 
      style="width: 765px; height: 100px; text-align: center; "
    >
      <div class="tw-whitespace-nowrap tw-overflow-hidden">

        <span class="tw-font-mono" v-for="data in dataCom" :key="data.id" ref="dataSpan">{{
        data
      }}</span>
    </div>
    </div>
    
    <v-row class="d-flex justify-center" style="margin-top:20px;">
      <v-col cols="5">

        <div class="tw-font-mono tw-text-red-50">
          <textarea
            type="text"
            class="tw-bg-blue-200 tw-text-black "
            style="padding-left:77px; padding-top:20px;"
            @focus="startGame"
            @keypress="typing"
            @keydown.delete="pressDelete"
            @keydown.space="pressSpace"
            v-model="inputField"
            ref="typeField"
          />
        </div>

      </v-col>
    </v-row>
     
  <br/>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
  
      <v-card>
        <v-card-title class="tw-bg-gray-100 tw-justify-center" >
          หมดเวลา!
          <audio autoplay>
              <source src="@/assets/end-sound.wav" type="audio/ogg">
          </audio>
        </v-card-title>

      <br/>
        <v-card-text align="center"> 
          <span>ค่า Raw WPM ของคุณ คือ: {{ grossWPM }} </span>
          <br />
          <span>ค่า Adjust WPM ของคุณ คือ: {{ netWPM }}</span>
          <br />
          <span>Errors จำนวนคำที่พิมพ์ผิด: {{ incorrected }} คำ</span>
          <br />
          <span>Score คะแนนทั้งหมด: {{ score }} คะแนน</span>
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
import Authen from "../store/Authen";
import ParagraphService from "../services/Paragraph";
import HistoryStore from "../store/History";

export default {
  data() {
    return {
      dialog: false,
      inputField: "",
      randomed_number: 0,
      currCursor: 0,
      allTyped: 0,
      incorrected: 0,
      grossWPM: 0,
      netWPM: 0,
      timer: 0,
      limit: 30,
      typed: 0,
      score: 0,
      token: "",
      profile: [],
      word_api: [],
      word_set: new Set(),
      newArr: [],
    };
  },
  async created() {
    await this.wordConcat()
  },
  async beforeMount() {
    await this.wordConcat();
  },
  computed: {
    dataCom() {
      return this.newArr.join(" ").split("");
    },
    displayTimer() {
      return Number(this.timer.toFixed(2));
    },
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    async wordConcat() {
      let res = await ParagraphService.fetchParagraph();
      for (let i = 0; i < res.data.length; i++) {
        this.word_api.push(res.data[this.getRandomInt(res.data.length)].word);
      }
      this.word_set = new Set(this.word_api.join(" ").split(" "));
      this.newArr = Array.from(this.word_set.values());
    },
    async reset() {
      location.reload();
      // this.loaded = false;
      // this.dialog = false;
      // this.currCursor = 0;
      // this.inputField = "";
      // this.allTyped = 0;
      // this.incorrected = 0;
      // this.grossWPM = 0;
      // this.netWPM = 0;
      // this.timer = 0;
      // this.score = 0;
      // this.word_api= [],
      // this.word_set= new Set(),
      // this.newArr= []

      // for (let i = 0; i < this.$refs.dataSpan.length; i++) {
      //   this.$refs.dataSpan[i].classList.remove(
      //     "tw-text-black",
      //     "tw-bg-white",
      //     "tw-tw-text-red-800",
      //     "tw-tw-bg-red-300",
      //     "tw-tw-text-green-800",
      //     "tw-tw-bg-green-300"
      //   );
      // }

      // await this.wordConcat()
    },
    startGame() {
      this.divWord = this.data_words[this.randomed_number];
      this.updateWord();
    },
    updateWord() {
      if (this.$refs.dataSpan[this.currCursor]) {
        this.$refs.dataSpan[this.currCursor].classList.add(
          "tw-text-black",
          "tw-bg-white"
        );
      }
    },
    updateCursor() {
      if (this.$refs.dataSpan[this.currCursor]) {
        this.$refs.dataSpan[this.currCursor].classList.add(
          "tw-text-black",
          "tw-bg-white"
        );
      }
    },
    typing(event) {
      const spanTexts = this.$refs.dataSpan;

      if (this.currCursor === 0) {
        this.countUpTimer();
      }
      if (spanTexts[this.currCursor].innerText === "") {
        this.incorrected++;
        this.pressSpace();
      }
      if (this.$refs.dataSpan[this.currCursor]) {
        if (event.key === spanTexts[this.currCursor].innerText) {
          this.$refs.dataSpan[this.currCursor].classList.add(
            "tw-text-green-800",
            "tw-bg-green-300"
          );
          this.$refs.dataSpan[this.currCursor].classList.remove(
            "tw-text-red-800",
            "tw-bg-red-300"
          );
        } else {
          this.$refs.dataSpan[this.currCursor].classList.remove(
            "tw-text-green-800",
            "tw-bg-green-300"
          );
          this.$refs.dataSpan[this.currCursor].classList.add(
            "tw-text-red-800",
            "tw-bg-red-300"
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
          "tw-text-green-800",
          "tw-bg-green-300",
          "tw-text-red-800",
          "tw-bg-red-300"
        );
        this.$refs.dataSpan[this.currCursor].classList.remove(
          "tw-text-black",
          "tw-bg-white"
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
      if(this.netWPM < 0) {
        this.netWPM = 0
      }
      this.score = (this.netWPM * 2.5).toFixed(3);
     ;
    },
    countUpTimer() {
      if (this.limit > this.timer) {
        setTimeout(() => {
          this.timer += 0.1;

          this.countUpTimer();
        }, 100);
      } else {
        this.savedScore();
      }
    },
    savedScore() {
      console.log("saved");
      this.calScore();
      this.callApi();
      this.dialog = true;

    },
    async callApi() {
      let payload = {
        score: parseFloat(this.score),
        adj_speed: this.netWPM,
      };
      let res = await Authen.dispatch("saveScore", payload);
      console.log("callApi", res);
    },
  },
};
</script>
<style>
textarea {
  width: 100%;
  height: 200px;
}

.divFont {
  font-family: 'IBM Plex Mono', monospace;
}

</style>