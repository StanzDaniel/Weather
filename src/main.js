getLocation();

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => callAPI(position.coords.latitude, position.coords.longitude),
    (error) => alert(error.message)
  );
}

async function callAPI(latitude, longitude) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=936da3603d054ceabf414237230402&q=${latitude},${longitude}&aqi=no`);
    const data = await response.json();
    render(data);
    console.log(data);
  } catch (error) {
    alert(error.message);
  }
}

function render(data) {
  const day = data.forecast.forecastday[0];
  document.querySelector('#city').innerHTML = `${data.location.name}, ${data.location.country}`;
  document.querySelector('#icon-weather').src = `http:${data.current.condition.icon}`;
  document.querySelector('#description').innerHTML = data.current.condition.text;
  document.querySelector('#temp').innerHTML = `${data.current.temp_c}°c`;
  document.querySelector('#temp_min').innerHTML = `${day.day.mintemp_c}°`;
  document.querySelector('#temp_max').innerHTML = `${day.day.maxtemp_c}°`;
  document.querySelector('#feelslike').innerHTML = `${data.current.feelslike_c}°`;
  document.querySelector('#humidity').innerHTML = `${data.current.humidity}%`;
  document.querySelector('#UV').innerHTML = data.current.uv;
  document.querySelector('#wind').innerHTML = `${data.current.wind_dir} ${data.current.wind_kph}Km/h`;
  document.querySelector('#visibility').innerHTML = `${data.current.vis_km} Km`;
  document.querySelector('#update').innerHTML = `Actualizado a las ${data.current.last_updated.slice(11)}`;
}