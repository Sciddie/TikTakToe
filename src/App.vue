<script>
  let gridSize = 20
  let gamegrid = []
  for (let i = 0;i<gridSize*gridSize;i++) {
    gamegrid.push(false)
  }
  export default {
    data() {
      return {
        title: "Bereite das spiel vor!",
        gridSize: gridSize,
        gamegrid: gamegrid
      }
    },
    methods: {

    }
  }
</script>

<template>
  <h1 class="title">{{title}}</h1>
  <div class="gamegrid">
    <div v-for="field in gridSize*gridSize" class="inline-block">
      <button class="gamegrid-button" @click="gamegrid[field]=!gamegrid[field]" :style="{'background-color':gamegrid[field] ? 'black' : 'white'}"></button>
      <br v-if="field % gridSize === 0"/>
    </div>
  </div>
  <button class="reset-btn" @click="reset()">Reset</button>
</template>

<style>
.inline-block {
  display: inline;
  margin: 1px;
}
.gamegrid-button{
  height: 1rem;
  width: 1rem;
}
</style>
