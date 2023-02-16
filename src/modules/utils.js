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
  if (!isDay) return '../img/night.jpg';
  return '../img/day.jpg';
}

export function toSpanish(data, template, isDay) {
  const code = template.filter(element => element.code == data.code);
  const text = code[0].languages.filter(
    element => element.lang_name == 'Spanish'
  );

  return isDay ? text[0].day_text : text[0].night_text;
}