const weatherCodeLookup = {
  0: "clear sky",
  1: "mainly clear",
  2: "partially cloudy",
  45: "Fog",
  48: "depositing rime fog",
  51: "Drizzle: Light",
  53: "Drizzle: moderate",
  55: "Drizzle: dense intensity",
  56: "Freezing Drizzle: Light",
  57: "Freezing Drizzle: dense intensity",
  61: "Rain: Slight",
  63: "Rain: moderate",
  65: "Rain: heavy intensity",
  66: "Freezing Rain: Light",
  67: "Freezing Rain: heavy intensity",
  71: "Snow fall: Slight",
  73: "Snow fall: moderate",
  75: "Snow fall: heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight",
  81: "Rain showers: moderate",
  82: "Rain showers: violent",
  85: "Snow showers slight",
  86: "Snow showers heavy",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error("error in fetching");
    }
    return responseJson;
  } catch (error) {
    return Promise.reject("error");
  }
}

function updateWeather(url, city) {
  const temperatureElement = document.getElementById("temperature");
  const windSpeedElement = document.getElementById("wind-speed");
  const descriptionElement = document.getElementById("weatherDescription");
  fetchData(url).then(
    (response) => {
      let temp, windSpeed, weatherDescription;
      if (sessionStorage.getItem(city) !== null) {
        let sessionObject = JSON.parse(sessionStorage.getItem(city));
        if (sessionObject.expiresAt - Date.now() > 0) {
          temp = sessionObject.body.temperature;
          windSpeed = sessionObject.body.windSpeed;
          weatherDescription = sessionObject.body.description;
        } else {
          sessionStorage.removeItem("sessionObject");
          temp = response.current.temperature_2m;
          windSpeed = response.current.wind_speed_10m;
          weatherDescription = weatherCodeLookup[response.current.weather_code];
        }
      } else {
        temp = response.current.temperature_2m;
        windSpeed = response.current.wind_speed_10m;
        weatherDescription = weatherCodeLookup[response.current.weather_code];
      }
      temperatureElement.textContent = temp;
      windSpeedElement.textContent = windSpeed;
      descriptionElement.textContent = weatherDescription;
      const ttl = 10000;
      let expires = Date.now() + ttl;
      let sessionObject = {
        expiresAt: expires,
        body: {
          temperature: temp,
          windSpeed: windSpeed,
          description: weatherDescription,
        },
      };
      sessionStorage.setItem(city, JSON.stringify(sessionObject));
    },
    (error) => {
      temperatureElement.textContent = "error:failed to fetch";
      windSpeedElement.textContent = "error:failed to fetch";
      descriptionElement.textContent = "error:failed to fetch";
    },
  );
}

const weatherDiv = document.querySelector(".weather");

function fetchCity(city) {
  let url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
  fetchData(url).then(
    (response) => {
      try {
        if (!response.results) {
          throw new Error("failed in  finding city");
        }
        let latitude = response.results[0].latitude;
        let longitude = response.results[0].longitude;
        let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`;
        weatherDiv.classList.add("skelton");
        setTimeout(() => {
          updateWeather(weatherUrl, city);
          weatherDiv.classList.remove("skelton");
        }, 300);
      } catch (error) {
        alert(error);
      }
    },
    (error) => {
      temperatureElement.textContent = "error:failed to fetch";
      windSpeedElement.textContent = "error:failed to fetch";
      descriptionElement.textContent = "error:failed to fetch";
    },
  );
}
const search = document.querySelector(".search button");
search.addEventListener("click", (event) => {
  let value = event.target.previousElementSibling.value;
  fetchCity(value);
});
