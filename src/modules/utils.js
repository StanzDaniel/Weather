export function getLocation(callback) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const latAndLng =
        position.coords.latitude + ',' + position.coords.longitude;
      callback(latAndLng);
    },
    error => console.log(error)
  );
}

export function isDay(isDay) {
  if (!isDay) return './img/night.jpg';
  return './img/day.jpg';
}

export function toSpanish(data, template, isDay) {
  const code = template.filter(element => element.code == data.code);
  const text = code[0].languages.filter(
    element => element.lang_name == 'Spanish'
  );

  return isDay ? text[0].day_text : text[0].night_text;
}

export async function search(e) {
  // consultar si posee un value para evitar error en fetching
  if (e.target.value.trim()) {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=936da3603d054ceabf414237230402&q=${e.target.value}`
    );
    const data = await response.json();
    const list = data
      .map(
        element =>`<li class="list-group-item-action">${element.name}, ${element.region}, ${element.country}</li>`
      )
      .join('');
    
    document.querySelector('#list_search').innerHTML = list;
  }
}
