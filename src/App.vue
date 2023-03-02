<script>
import axios from "axios";

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
      isNumberCorrect(field) {
        if (field === 16) {return false}
        return field === this.gamegrid.findIndex(e => e.label === field) +1
      },
      fieldPressed(field) {
        if (!(this.running)) return
        if (this.gamegrid[field].label === 16) return
        let emptyIndex = this.gamegrid.findIndex(e => e.label === 16)
        if (!(Math.abs(emptyIndex - field) === 1 || Math.abs(emptyIndex - field) === 4)) return
        this.gamegrid[emptyIndex] = this.gamegrid[field]
        this.gamegrid[field] = {label: 16, imagePosition: "300px 300px"}
        if (this.hasWon()) {
          this.running = false
          this.winningText = "Du hast gewonnen!"
        }
      },
      hasWon() {
        for (let i = 0; i < 16; ++i) {
          if (this.gamegrid[i].label !== [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16][i]) return false;
        }
        return true;
      },
      isEmpty(field) {
        return this.gamegrid[field].label === 16
      },
      isRunning() {
        return this.running
      },
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
  <div class="gamegrid">
    <div v-for="field in 16" class="inline-block">
      <button class="gamegrid-button resize-image-400" :class="{'correct-button' : isNumberCorrect(field), 'empty-button' : gamegrid[field-1].label===16, 'no-font' : isNoNums}" :style="{'margin' : isRunning() ? '5px' : '0px','background-image': isEmpty(field-1) ? 'none' : 'url(' + this.pictureUrl + ')', 'background-position':  this.gamegrid[field-1].imagePosition}" @click="fieldPressed(field-1)" >{{gamegrid[field-1].label}}</button>
      <br v-if="field % 4 === 0"/>
    </div>
  </div>
  <input id="visible-numbers-checkbox" type="checkbox" @change="event => isNoNums = !event.target.checked">
  <label for="visible-numbers-checkbox">Zahlen sichtbar machen</label><br>
  <button class="reset-btn" @click="reset()">Reset</button>
</template>

<style>
  .inline-block {
    display: inline;
  }
  .gamegrid-button {
    height: 100px;
    width: 100px;
    font-size: 35px;
    font-weight: bold;
    color: white;
  }

  .empty-button {
    background-color: transparent;
    border: none;
    color: transparent;
  }
  .correct-button {
    color: #2cc507;
  }
  .reset-btn {
    width: 400px;
    height: 100px;
    font-size: 35px;
  }
  .gamegrid {
  }
  .winning-text {
    font-family: Arial;
    font-weight: bold;
    font-size: 35px;
  }
  .no-font {
    color: transparent;
  }
  #visible-numbers-checkbox {
    margin: 10px 10px 10px 10px;
  }
  .resize-image-400 {
    background-size: v-bind(scaling);
  }
</style>
<style scoped>
</style>
