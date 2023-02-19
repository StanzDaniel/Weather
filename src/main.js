import Render from './modules/Render.js';
import { getLocation, search } from './modules/utils.js';

export async function getInfoAPI(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=936da3603d054ceabf414237230402&q=${location}&aqi=no`
    );
    const data = await response.json();
    Render(data);
  } catch (error) {
    error => console.log(error);
  }
}

window.onload = () => {
  getLocation(getInfoAPI);

  document.querySelector('#search').addEventListener('keyup', e => search(e));
  document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    getInfoAPI(e.target[0].value);
  })

};
