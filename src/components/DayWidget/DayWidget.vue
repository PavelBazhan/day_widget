<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import TimeClock from './components/TimeClock.vue';
import DateAndWeather from './components/DateAndWeather.vue';
import Dictionary from './components/Dictionary.vue';
import ActionPanel from './components/ActionPanel.vue';
import WEATHER_BLOCK_CONSTANTS from './components/WeatherBlock/constants.js';

const generalTimerData = reactive({
  jsDate: null,
  hours: null,
  minutes: null,
  seconds: null,
  todayString: null,
  forecast: null,
  weather: [ null, null, null, ],
  tickAmount: 0,
});

const getDayTimeCodeByHours = (sourceHours) => {
  let hours = sourceHours;
  if (hours < 0) {
    hours = 24 + hours;
  }
  if (hours > 23) {
    hours = hours - 24;
  }
  const foundDayTimeObject = WEATHER_BLOCK_CONSTANTS.DAY_TIME.find((dt) => {
    return ((hours >= dt.hours[0]) && (hours <= dt.hours[1]));
  });
  if (!foundDayTimeObject) {
    return null;
  }
  return foundDayTimeObject._code;
};

const refreshForecastInfo = async () => {
  try {
    const forecastResponse = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=55.7522&longitude=37.6156&hourly=temperature_2m,weather_code&past_days=1&forecast_days=2&timezone=auto');
    if (forecastResponse.status === 200) {
      generalTimerData.forecast = forecastResponse.data;

      console.log(JSON.parse(JSON.stringify(generalTimerData)));
      console.log(JSON.parse(JSON.stringify(generalTimerData.forecast)));

      const gmtYear = generalTimerData.jsDate.getFullYear();
      const gmtMonth = String(generalTimerData.jsDate.getMonth() + 1).padStart(2, '0');
      const gmtDate = String(generalTimerData.jsDate.getDate()).padStart(2, '0');

      const forecastDateTimeString = `${[ gmtYear, gmtMonth, gmtDate ].join('-')}T${generalTimerData.hours}:00`;
      
      const apiHourlyTime = generalTimerData.forecast.hourly?.time;
      if (!Array.isArray(apiHourlyTime)) {
        return;
      }
      const currentHourlyTimeIndex = apiHourlyTime.findIndex((ht) => ht === forecastDateTimeString);
      if (currentHourlyTimeIndex === -1) {
        return;
      }
      const apiHourlyTemperature = generalTimerData.forecast.hourly?.temperature_2m;
      const apiHourlyWeatherCode = generalTimerData.forecast.hourly?.weather_code;
      if (!Array.isArray(apiHourlyTemperature) || !Array.isArray(apiHourlyWeatherCode)) {
        return;
      }
      const currentHourlyTemperature = Math.round(apiHourlyTemperature[currentHourlyTimeIndex]);
      const currentHourlyWeatherCode = apiHourlyWeatherCode[currentHourlyTimeIndex];

      generalTimerData.weather.splice(1, 1, {
        temperature: currentHourlyTemperature,
        weatherCode: currentHourlyWeatherCode,
        dayTimeCode: getDayTimeCodeByHours(generalTimerData.hours),
      });

      // PREV block below
      const prevHourlyTimeIndex = currentHourlyTimeIndex - 6;
      if (prevHourlyTimeIndex < 0) {
        return;
      }
      const prevHourlyTemperature = Math.round(apiHourlyTemperature[prevHourlyTimeIndex]);
      const prevHourlyWeatherCode = apiHourlyWeatherCode[prevHourlyTimeIndex];
      generalTimerData.weather.splice(0, 1, {
        temperature: prevHourlyTemperature,
        weatherCode: prevHourlyWeatherCode,
        dayTimeCode: getDayTimeCodeByHours(generalTimerData.hours - 6),
      });

      // NEXT block below
      const nextHourlyTimeIndex = currentHourlyTimeIndex + 6;
      if (nextHourlyTimeIndex > 71) {
        return;
      }
      const nextHourlyTemperature = Math.round(apiHourlyTemperature[nextHourlyTimeIndex]);
      const nextHourlyWeatherCode = apiHourlyWeatherCode[nextHourlyTimeIndex];
      generalTimerData.weather.splice(2, 1, {
        temperature: nextHourlyTemperature,
        weatherCode: nextHourlyWeatherCode,
        dayTimeCode: getDayTimeCodeByHours(generalTimerData.hours + 6),
      });

      // TOMORROW block below
      const tomorrowHourlyTimeIndex = currentHourlyTimeIndex + 24;
      if (!apiHourlyTemperature[tomorrowHourlyTimeIndex]) {
        return;
      }
      const tomorrowHourlyTemperature = Math.round(apiHourlyTemperature[tomorrowHourlyTimeIndex]);
      const tomorrowHourlyWeatherCode = apiHourlyWeatherCode[tomorrowHourlyTimeIndex];
      generalTimerData.weather.splice(3, 1, {
        temperature: tomorrowHourlyTemperature,
        weatherCode: tomorrowHourlyWeatherCode,
        dayTimeCode: getDayTimeCodeByHours(generalTimerData.hours),
      });

      console.log('weather: ', generalTimerData.weather);

    }
  } catch (error) {
    throw error;
  }
};

const generalTimerTickHandler = async (log) => {
  const date = new Date();
  
  generalTimerData.jsDate = date;
  generalTimerData.hours = date.getHours();
  generalTimerData.minutes = date.getMinutes();
  generalTimerData.seconds = date.getSeconds();
  generalTimerData.todayString = date.toLocaleString('ru', {
    month: "long",
    day: "numeric",
  });

  // Getting forecast
  if (generalTimerData.tickAmount === 0 || (generalTimerData.tickAmount % (4 * 60)) === 0) { 
    // ticks every minute
    refreshForecastInfo();
  }

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
    generalTimerTickHandler();
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
      :weather="generalTimerData.weather"
    />
    <Dictionary />
    <ActionPanel />

    <!-- <button @click="generalTimerTickHandler(true)">tick</button> -->
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
}
</style>