<script>

  function initialState() {
    return {
      GameFields: ["_","_","_","_","_","_","_","_","_"],
      playerOnTurn:1,
      winList: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
      winnerText: "Das Spiel läuft noch!",
      running: true,
      winningFields: []
    }
  }
  export default {
    data() {
      return initialState()
    },
    methods: {
      hasWon() {
        for (let i = 0;i<3;i++){
          console.log(this.GameFields[i*3] + "_" + this.GameFields[i*3+1] + "_" + this.GameFields[i*3+2])
        }
        for (let i of this.winList) {
          if (this.GameFields[i[0]] !== "_" && this.GameFields[i[0]] === this.GameFields[i[1]] && this.GameFields[i[0]] === this.GameFields[i[2]]) {
            this.running = false
            return [this.GameFields[i[0]], i]
          }
        }
        console.log("keiner")
        return ["_", []]
      },
      placeField(fieldid) {
        if (!(this.running)) {return}
        let field = this.GameFields[fieldid]
        if (field !== "_") {return}
        if (this.playerOnTurn === 1) {
          this.GameFields[fieldid] = "X"
        } else {
          this.GameFields[fieldid] = "O"
        }
        this.playerOnTurn = (this.playerOnTurn + 1) % 2
        let hasWonReturn = this.hasWon()
        let winner = hasWonReturn[0]
        this.winningFields = hasWonReturn[1]
        if (winner !== "_") {
          this.winnerText = winner + " hat Gewonnen!"

        } else {
          this.winnerText = "Das Spiel läuft noch!"
        }
        if (!(this.GameFields.some((field) => field === "_"))) {
          this.winnerText = "Unentschieden!"
          this.running = false
        }
      },
      isButtonWinning(field) {
        return this.winningFields.includes(field)
      },
      reset() {
        Object.assign(this.$data, initialState())
      }
    }
  }
</script>

<template>
  <p class="winning-text">{{winnerText}}</p>
  <div class="gamegrid">
    <div v-for="field in 9" class="inline-block">
      <button class="gamegrid-button" :class="{'winning-button' : isButtonWinning(field-1)}" @click="placeField(field-1)">{{GameFields[field-1]}}</button>
      <br v-if="field % 3 === 0"/>
    </div>
  </div>
  <button class="reset-btn" @click="reset()">Reset</button>
</template>

<style>
.inline-block {
  display: inline;
}

.gamegrid {
  margin-bottom: 20px;
}

.gamegrid-button {
  width: 100px;
  height: 100px;
  font-size: 70px;
}

.winning-text {
  font-size: 35px;
  font-weight: bold;
  font-family: Arial;
}

.winning-button {
  background: green;
}

.reset-btn {
  width: 300px;
  height: 100px;
  font-size: 35px;
}
</style>

<style scoped>
</style>
