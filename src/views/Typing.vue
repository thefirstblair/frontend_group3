<template>
  <div>
    <div class="bg-white text-xl h-18 w-1/2 mt-4 mx-auto p-4">
      <span v-for="data in dataCom" :key="data.id" ref="dataSpan">{{
        data
      }}</span>
    </div>
    <div class="bg-blue-200 h-20 w-1/2 mt-4 mx-auto text-red-50">
      <textarea
        type="text"
        class="bg-blue-200 text-black w-full h-full"
        @keypress="typing"
        v-model="inputField"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wordArr: [],
      divWord: "click text field to type",
      datatest: "init",
      inputField: "",
      currCursor: 0,
      data_words: [
        "test cab equal curl quick quake manic quad reach quark chord quart pace quill sack equip track squid sick quack squat poach quota eject",
        "dabu dabe dabe dabo dake dadada i dont want u dont want me dont want",
        "cat come coke kid pool up tie ant rat zebra vee pop opposite paleto watch livin inter thai",
        "telephone pink teleport call comfort comfy regular coke french fried weed cocaine shark meth"
      ],
      randomed_number: 0
    };
  },
  beforeMount(){
    this.loaded = false
    this.startGame()
  },
  computed: {
    dataCom() {
      return this.data_words[this.randomed_number].split("");
    },
  },
  methods: {
    startGame() {
      this.randomed_number = Math.floor(Math.random() * this.data_words.length)
      this.updateWord();
    },
    updateWord() {
      this.divWord = this.data_words[this.randomed_number];
    },
    typing(event) {
      //   this.$refs.dataSpan.forEach((char, index) => {
      const spanTexts = this.$refs.dataSpan;
      if (this.inputField == null) {
        this.$refs.dataSpan[this.currCursor].classList.remove("text-green-500");
        this.$refs.dataSpan[this.currCursor].classList.remove("text-red-500");
        // if (this.$refs.dataSpan[index].innerText === " ") {
        //   this.$refs.dataSpan[index].classList.add("text-green-500");
        // }
      } else if (event.key === spanTexts[this.currCursor].innerText) {
        this.$refs.dataSpan[this.currCursor].classList.add("text-green-500");
        this.$refs.dataSpan[this.currCursor].classList.remove("text-red-500");
      } else {
        this.$refs.dataSpan[this.currCursor].classList.remove("text-green-500");
        this.$refs.dataSpan[this.currCursor].classList.add("text-red-500");
      }
      //   console.log(this.$refs.dataSpan[index]);
      this.currCursor++;
      //   });
      //   this.dataCom.forEach((char, index) => {
      //     if (typedChar == null) {
      //       console.log("null");
      //     } else if (typedChar === char) {
      //       char = "1";
      //       console.log("true");
      //     }
      //   });
    },
    toggle() {
      this.correct = !this.correct;
    },
  },
};
</script>

<style>
</style>