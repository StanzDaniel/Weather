import Render from "./modules/Render.js";
import { getLocation } from "./modules/utils.js";

async function getInfoAPI(location) {
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
  // getInfoAPI('-33.582788872337595, -70.9070157759715');
};
