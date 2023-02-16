import conditions from './conditions.js';
import { toSpanish, isDay } from './utils.js';

export default function Render({ location, current, forecast }) {
  document.querySelector('#img_weather').src = isDay(current.is_day);
  document.querySelector(
    '#city'
  ).innerHTML = `${location.name}, ${location.country}`;
  document.querySelector(
    '#icon-weather'
  ).src = `http:${current.condition.icon}`;
  document.querySelector('#description').innerHTML = toSpanish(
    current.condition,
    conditions,
    current.is_day
  );
  document.querySelector('#temp').innerHTML = `${current.temp_c}°c`;
  document.querySelector(
    '#temp_min'
  ).innerHTML = `${forecast.forecastday[0].day.mintemp_c}°`;
  document.querySelector(
    '#temp_max'
  ).innerHTML = `${forecast.forecastday[0].day.maxtemp_c}°`;
  document.querySelector('#feelslike').innerHTML = `${current.feelslike_c}°`;
  document.querySelector('#humidity').innerHTML = `${current.humidity}%`;
  document.querySelector('#UV').innerHTML = current.uv;
  document.querySelector(
    '#wind'
  ).innerHTML = `${current.wind_dir} ${current.wind_kph}Km/h`;
  document.querySelector('#visibility').innerHTML = `${current.vis_km} Km`;
  document.querySelector(
    '#update'
  ).innerHTML = `Actualizado a las ${current.last_updated.slice(11)}`;
}