<script>
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
      gamegridRender.push({label: i+1, imagePosition: String(Math.floor(i/4)*100) + "px " + String((i*100)%400) + "px"})
    }
    console.log(gamegridRender)
    return {
      gamegrid: gamegridRender.shuffle(),
      running: true,
      winningText: "Das Spiel läuft noch!"
    }
  }
  export default {
    data() {
      return initialState()
    },
    methods: {
      isNumberCorrect(field) {
        if (field == 16) {return false}
        return field === this.gamegrid.findIndex(e => e.label === field) +1
      },
      fieldPressed(field) {
        if (!(this.running)) return
        if (this.gamegrid[field].label === 16) return
        let emptyIndex = this.gamegrid.findIndex(e => e.label === 16)
        if (!(Math.abs(emptyIndex - field) === 1 || Math.abs(emptyIndex - field) === 4)) return
        this.gamegrid[emptyIndex]['label'] = this.gamegrid[field].label
        this.gamegrid[field]['label'] = 16
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
      reset() {
        Object.assign(this.$data, initialState())
      }
    }
  }
</script>

<template>
  <p class="winning-text">{{winningText}}</p>
  <div class="gamegrid">
    <div v-for="field in 16" class="inline-block">
      <button :id="'field' + String(field-1)" class="gamegrid-button" :class="{'correct-button' : isNumberCorrect(field), 'empty-button' : gamegrid[field-1].label===16}" :style="{'background-image': isEmpty(field-1) ? 'none' : 'url(\'https://cdn2.thecatapi.com/images/3tv.jpg\')'}" @click="fieldPressed(field-1)" >{{gamegrid[field-1].label}}</button>
      <br v-if="field % 4 === 0"/>
    </div>
  </div>
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
  }
  .empty-button {
    background-color: transparent;
    border: none;
    color: transparent;
  }
  .correct-button {
    background-color: #2cc507;
  }
  .reset-btn {
    width: 400px;
    height: 100px;
    font-size: 35px;
  }
  .gamegrid {
    margin-bottom: 10px;
  }
  .winning-text {
    font-family: Arial;
    font-weight: bold;
    font-size: 35px;
  }

  #field0 {
    background-position: v-bind(gamegrid[0][imagePosition]);
  }
  #field1 {
    background-position: v-bind(gamegrid[1][imagePosition]);
  }
  #field2 {
    background-position: v-bind("gamegrid[2][imagePosition]");
  }
  #field3 {
    background-position: v-bind("gamegrid[3][imagePosition]");
  }
  #field4 {
    background-position: v-bind(gamegrid[4][imagePosition]);
  }
  #field5 {
    background-position: v-bind(gamegrid[5][imagePosition]);
  }
  #field6 {
    background-position: v-bind(gamegrid[6][imagePosition]);
  }
  #field7 {
    background-position: v-bind(gamegrid[7][imagePosition]);
  }
  #field8 {
    background-position: v-bind(gamegrid[8][imagePosition]);
  }
  #field9 {
    background-position: v-bind(gamegrid[9][imagePosition]);
  }
  #field10 {
    background-position: v-bind(gamegrid[10][imagePosition]);
  }
  #field11 {
    background-position: v-bind(gamegrid[11][imagePosition]);
  }
  #field12 {
    background-position: v-bind(gamegrid[12][imagePosition]);
  }
  #field13 {
    background-position: v-bind(gamegrid[13][imagePosition]);
  }
  #field14 {
    background-position: v-bind(gamegrid[14][imagePosition]);
  }
  #field15 {
    background-position: v-bind(gamegrid[15][imagePosition]);
  }
</style>
<style scoped>
</style>
