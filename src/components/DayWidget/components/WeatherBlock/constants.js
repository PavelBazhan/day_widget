import weatherCloudyLowUrl from '@/assets/weather_cloudy-low.svg';
import weatherCloudyUrl from '@/assets/weather_cloudy.svg';
import weatherRainyUrl from '@/assets/weather_rainy.svg';
import weatherSnowyUrl from '@/assets/weather_snowy.svg';
import weatherSunnyUrl from '@/assets/weather_sunny.svg';

export default {
  TEMPERATURE_UNIT: {
    CELSIUS: '°C',
    FAHRENHEIT: '°F',
  },
  DAY_TIME: [
    {
      _code: 'MORNING',
      localeValues: [ 'morning', 'утро', ],
      hours: [ 6, 11  ],
    },
    {
      _code: 'AFTERNOON',
      localeValues: [ 'afternoon', 'день', ],
      hours: [ 12, 17, ],
    },
    {
      _code: 'EVENING',
      localeValues: [ 'evening', 'вечер', ],
      hours: [ 18, 23, ],
    },
    {
      _code: 'NIGHT',
      localeValues: [ 'night', 'ночь', ],
      hours: [ 0, 5, ],
    },
  ],
  WEATHER_TYPE: [
    {
      _code: 'SUNNY',
      url: weatherSunnyUrl,
      appropriateWeatherTypeCodeList: [ 0 ], // in accordance with public API Open-Meteo - https://open-meteo.com/en/docs
    },
    {
      _code: 'CLOUDY_LOW',
      url: weatherCloudyLowUrl,
      appropriateWeatherTypeCodeList: [ 1, 2, 3, ],
    },
    {
      _code: 'CLOUDY',
      url: weatherCloudyUrl,
      appropriateWeatherTypeCodeList: [ 45, 48, 51, 53, 55, 56, 57, ],
    },
    {
      _code: 'RAINY',
      url: weatherRainyUrl,
      appropriateWeatherTypeCodeList: [ 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99, ],
    },
    {
      _code: 'SNOWY',
      url: weatherSnowyUrl,
      appropriateWeatherTypeCodeList: [ 71, 73, 75, 77, 85, 86, ],
    },
  ]
};