<script setup>
import Clock from './components/Clock.vue';
console.log('DayWidget is Here!');

const generalTimerTickhandler = () => {

}
</script>

<template>
  <div class="day-widget">
    <Clock :hours="12" :minutes="39" />
  </div>
</template>

<style scoped lang="scss">
.day-widget {
  backdrop-filter: blur(5px);
  width: 200px;
  height: 400px;
}
</style>