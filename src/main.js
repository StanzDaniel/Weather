import conditions from '../conditions.js';

function getLocation(callback) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const latAndLng =
        position.coords.latitude + ',' + position.coords.longitude;
      callback(latAndLng);
    },
    error => console.log(error)
  );
}

async function getInfoAPI(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=936da3603d054ceabf414237230402&q=${location}&aqi=no`
    );
    const data = await response.json();
    console.log(data);
    render(data);
  } catch (error) {
    error => console.log(error);
  }
}

function render({ location, current, forecast }) {
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

function isDay(isDay) {
  if (!isDay) return '../img/night.jpg';
  return '../img/day.jpg';
}

function toSpanish(data, template, isDay) {
  const code = template.filter(element => element.code == data.code);
  const text = code[0].languages.filter(
    element => element.lang_name == 'Spanish'
  );

  return isDay ? text[0].day_text : text[0].night_text;
}

window.onload = () => {
  getLocation(getInfoAPI);
  // getInfoAPI('-33.582788872337595, -70.9070157759715');
};
