<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import TimeClock from './components/TimeClock.vue';
import DateAndWeather from './components/DateAndWeather.vue';
import Dictionary from './components/Dictionary.vue';
import ActionPanel from './components/ActionPanel.vue';
import WEATHER_BLOCK_CONSTANTS from './components/WeatherBlock/constants.js';
import LOCAL_CONSTANTS from './constants.js';

const props = defineProps({
  theme: {
    type: String,
    default: LOCAL_CONSTANTS.THEME.DARK,
  },
});

const generalTimerData = reactive({
  jsDate: null,
  hours: null,
  minutes: null,
  seconds: null,
  todayString: null,
  forecast: null,
  weather: [ null, null, null, ],
  connectionPending: false,
  connectionFirstTime: true,
  connectionError: false,
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
  if (!navigator.geolocation) {
    return null;
  }

  const getDataFromApi = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    try {
      const forecastApiRequest = {
        params: {
          latitude,
          longitude,
          hourly: 'temperature_2m,weather_code',
          past_days: '1',
          forecast_days: '2',
          timezone: 'auto',
        },
      };
      const forecastResponse = await axios.get('https://api.open-meteo.com/v1/forecast', forecastApiRequest);
      if (forecastResponse.status === 200) {
        generalTimerData.connectionFirstTime = false;
        generalTimerData.connectionPending = false;
        generalTimerData.connectionError = false;
        generalTimerData.forecast = forecastResponse.data;

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

      }
    } catch (error) {
      generalTimerData.connectionPending = false;
      generalTimerData.connectionError = true;
      throw error;
    }
  };

  if (generalTimerData.connectionFirstTime) {
    generalTimerData.connectionPending = true;
  }
  navigator.geolocation.getCurrentPosition(getDataFromApi, ((error) => {
    generalTimerData.connectionError = true;
    generalTimerData.connectionPending = false;
    throw error;
  })); 
};

const generalTimerTickHandler = (log) => {
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
    <!-- <pre>theme: {{ theme }}</pre> -->
    <TimeClock
      class="day-widget__clock"
      :hours="generalTimerData.hours"
      :minutes="generalTimerData.minutes"
      :seconds="generalTimerData.seconds"
      :showSeconds="false"
    />
    <DateAndWeather
      class="day-widget__date-and-weather"
      :connectionPending="generalTimerData.connectionPending"
      :todayString="generalTimerData.todayString"
      :connectionError="generalTimerData.connectionError"
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
  border-radius: 16px;
  padding: 16px;
  background: linear-gradient(138deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.02) 100%);
  font-family: "SF Pro";
  color: var(--color_content);
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 8px;
}
</style>