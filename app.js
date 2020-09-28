const temperatureDescription = document.querySelector(
  ".temperature-description"
);
const temperatureDegree = document.querySelector(".temperature-degree");
const locationTimezone = document.querySelector(".location-timezone");
const tempIcon = document.getElementById("temp-icon");

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const key = "b5d7417508d1791376598d7c5619710b";

      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fb432b1c02b03d4b64d1edf087066a08`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { name } = data;
          const { feels_like, temp, temp_max, temp_min } = data.main;
          const { id, icon, main } = data.weather[0];

          // set dom elements from the api

          temperatureDescription.textContent = main;
          temperatureDegree.textContent = Math.round(feels_like - 273);
          if (name === "Nyakabanda") {
            const rw = "Kigali City";
            locationTimezone.textContent = rw;
          }

          //set Icons

          if (id < 250) {
            tempIcon.src = "./icons/storm.svg";
          } else if (id < 350) {
            tempIcon.src = "./icons/drizzle.svg";
          } else if (id < 550) {
            tempIcon.src = "./icons/rain.svg";
          } else if (id < 650) {
            tempIcon.src = "./icons/snow.svg";
          } else if (id < 800) {
            tempIcon.src = "./icons/atmosphere.svg";
          } else if (id === 800) {
            tempIcon.src = "./icons/sun.svg";
          } else if (id > 800) {
            tempIcon.src = "./icons/clouds.svg";
          }
        });
    });
  }
});
