<script>
  export default {
    props: {
      scaling: String,
      isNoNums: Boolean,
      gamegrid: Array,
      pictureUrl: String
    },
    data () {
      return {
        running: true
      }
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
    }
  }
</script>

<template>
  <div class="gamegrid">
    <div v-for="field in 16" class="inline-block">
      <button class="gamegrid-button resize-image-400" :class="{'correct-button' : isNumberCorrect(field), 'empty-button' : gamegrid[field-1].label===16, 'no-font' : isNoNums}" :style="{'margin' : isRunning() ? '5px' : '0px','background-image': isEmpty(field-1) ? 'none' : 'url(' + this.pictureUrl + ')', 'background-position':  this.gamegrid[field-1].imagePosition}" @click="fieldPressed(field-1)" >{{gamegrid[field-1].label}}</button>
      <br v-if="field % 4 === 0"/>
    </div>
  </div>
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
.gamegrid {
}
.no-font {
  color: transparent;
}
.resize-image-400 {
  background-size: v-bind(scaling);
}
</style>