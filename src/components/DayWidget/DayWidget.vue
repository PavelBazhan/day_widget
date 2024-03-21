<script setup>
import { reactive } from 'vue';
import TimeClock from './components/TimeClock.vue';
import DateAndWeather from './components/DateAndWeather.vue';
import Dictionary from './components/Dictionary.vue';
import ActionPanel from './components/ActionPanel.vue';

const generalTimerData = reactive({
  hours: null,
  minutes: null,
  seconds: null,
  todayString: null,
  tickAmount: 0,
});

const generalTimerTickhandler = (log) => {
  const date = new Date();
  
  generalTimerData.hours = date.getHours();
  generalTimerData.minutes = date.getMinutes();
  generalTimerData.seconds = date.getSeconds();
  generalTimerData.todayString = date.toLocaleString('ru', {
    month: "long",
    day: "numeric",
  });

  if (log) {
    console.log(date.toLocaleString('ru', {
      month: "long",
      day: "numeric",
    }));
    console.log(date.toLocaleString('en-US', {
      month: "long",
      day: "numeric",
    }));
  }
};

const runGeneralTimer = () => {
  setInterval(() => {
    generalTimerTickhandler();
    generalTimerData.tickAmount++;
  }, 250);
};

runGeneralTimer();
</script>

<template>
  <div class="day-widget">
    <TimeClock
      class="day-widget__clock"
      :hours="generalTimerData.hours"
      :minutes="generalTimerData.minutes"
      :seconds="generalTimerData.seconds"
      :showSeconds="false"
    />
    <DateAndWeather
      class="day-widget__date-and-weather"
      :todayString="generalTimerData.todayString"
    />
    <Dictionary />
    <ActionPanel />

    <!-- <button @click="generalTimerTickhandler(true)">tick</button> -->
  </div>
</template>

<style scoped lang="scss">
.day-widget {
  backdrop-filter: blur(8px);
  width: 360px;
  // height: 535px;
  border-radius: 16px;
  padding: 16px;
  background: rgb(255,255,255);
  background: linear-gradient(138deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.02) 100%);
  font-family: "SF Pro";
  color: #ECFEFF;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 8px;
  // &__clock,
  // &__date-and-weather {
  //   margin-bottom: 8px;
  // }
}
</style>