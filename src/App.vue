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
    return {
      gamegrid: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"_"].shuffle(),
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
        return field === this.gamegrid.indexOf(field) +1
      },
      fieldPressed(field) {
        if (!(this.running)) return
        if (this.gamegrid[field] === "_") return
        let emptyIndex = this.gamegrid.indexOf("_")
        if (!(Math.abs(emptyIndex - field) === 1 || Math.abs(emptyIndex - field) === 4)) return
        this.gamegrid[emptyIndex] = this.gamegrid[field]
        this.gamegrid[field] = "_"
        if (this.hasWon()) {
          this.running = false
          this.winningText = "Du hast gewonnen!"
        }
      },
      hasWon() {
        for (let i = 0; i < 16; ++i) {
          if (this.gamegrid[i] !== [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"_"][i]) return false;
        }
        return true;
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
      <button class="gamegrid-button" :class="{'correct-button' : isNumberCorrect(field), 'empty-button' : gamegrid[field-1]==='_'}" @click="fieldPressed(field-1)">{{gamegrid[field-1]}}</button>
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
</style>
<style scoped>
</style>
