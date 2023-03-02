<script>
import axios from "axios";
import GameGrid from "@/components/GameGrid.vue";

Object.defineProperty(Array.prototype, 'shuffle', {
    value: function() {
      for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
      }
      return this;
    }
  });
  function initialState() {
    let gamegridRender = []
    for (let i = 0; i<16;i++) {
      gamegridRender.push({label: i+1, imagePosition: "-" + String((i*100)%400) + "px " + "-" + String(Math.floor(i/4)*100) + "px"})
    }
    while(true) {
      gamegridRender.shuffle()
      let richtig = 0
      for (let i =0;i < gamegridRender.length;i++) {
        if (gamegridRender[i].label === i+1) {
          richtig = richtig + 1
        }
      }
      console.log(richtig)
      if (richtig%2===0) {
        break
      }
    }
    return {
      isNoNums: true,
      gamegrid: gamegridRender,
      running: true,
      winningText: "Das Spiel läuft noch!",
      pictureUrl: '',
      scaling: '400px 400px'
    }
  }
  export default {
    components: {GameGrid},
    data() {
      return initialState()
    },
    mounted() {
      const makeScailingVaqlues = (height, width) => {
        if (height > width) {
          let scalingVal = height/width
          this.scaling = "400px " + String(400*scalingVal) + "px"
        } else {
          let scalingVal = width/height
          this.scaling = String(400*scalingVal) + "px 400px"
        }
      }
      console.log("Component mounted!")
      axios
          .get('https://api.thecatapi.com/v1/images/search')
          .then((response) => {
            console.log(response)
            console.log(response.data[0].url)
            this.pictureUrl = response.data[0].url
            makeScailingVaqlues(response.data[0].height, response.data[0].width)
          })
    },
    methods: {
      reset() {
        Object.assign(this.$data, initialState())
        const makeScailingVaqlues = (height, width) => {
          if (height > width) {
            let scalingVal = height/width
            this.scaling = "400px " + String(400*scalingVal) + "px"
          } else {
            let scalingVal = width/height
            this.scaling = String(400*scalingVal) + "px 400px"
          }
        }
        console.log("Component mounted!")
        axios
            .get('https://api.thecatapi.com/v1/images/search')
            .then((response) => {
              console.log(response)
              console.log(response.data[0].url)
              this.pictureUrl = response.data[0].url
              makeScailingVaqlues(response.data[0].height, response.data[0].width)
            })
      }
    },
  }
</script>

<template>
  <p class="winning-text">{{winningText}}</p>
  <GameGrid :scaling="this.scaling" :gamegrid="this.gamegrid" :is-no-nums="this.isNoNums" :picture-url="this.pictureUrl"></GameGrid>
  <input id="visible-numbers-checkbox" type="checkbox" @change="event => isNoNums = !event.target.checked">
  <label for="visible-numbers-checkbox">Zahlen sichtbar machen</label><br>
  <button class="reset-btn" @click="reset()">Reset</button>
</template>

<style>
  .reset-btn {
    width: 400px;
    height: 100px;
    font-size: 35px;
  }
  .winning-text {
    font-family: Arial;
    font-weight: bold;
    font-size: 35px;
  }
</style>
<style scoped>
</style>
