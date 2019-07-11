<template>
  <div id="app">
    <schedule/>
  </div>
</template>

<script>
import Schedule from './components/schedule.vue'

export default {
  name: 'app',
  components: {
      Schedule
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
</style>
