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
        @focus="startGame"
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
      word: "test cab equal curl quick quake manic quad reach quark chord quart pace quill sack equip track squid sick quack squat poach quota eject",
      wordArr: [],
      divWord: "click text field to type",
      datatest: "init",
      inputField: "",
      currCursor: 0,
    };
  },
  computed: {
    dataCom() {
      return this.word.split("");
    },
  },
  methods: {
    startGame() {
      console.log("focus");
      this.updateWord();
    },
    updateWord() {
      this.divWord = this.word;
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