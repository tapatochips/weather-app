//let weather connects to the api
let weather = {
  "apiKey": "7879540023988757c983f86d8a0e5540",
  fetchWeather: async function(city) {
      try {
          const response = await fetch(
              "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=imperial&appid=" +
                this.apiKey
          );
          if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
          }
          const data = await response.json();
          this.displayWeather(data);
      } catch (error) {
          console.error(error);
      }
  },
  //display weather pulls specific data from api and displays it to the user based on their search
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, temp_min, temp_max } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText ="Current Temp: " + temp + "°F";
        document.querySelector(".temp_min").innerText = "Minimum Temp: " + temp_min + "°F ";
        document.querySelector(".temp_max").innerText = "Maximum Temp: " + temp_max + "°F";
        document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed " + speed + "MPH"
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
      },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });