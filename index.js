const apiKey = "your_api_key";
const apiUrl = "your_api_url";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    } else {
        document.querySelector(".error").style.display = "none";
    }

    var data = await response.json();

    console.log(data);

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    if (data.weather[0].main == "Clouds") {
        document.querySelector(".weather-icon").src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        document.querySelector(".weather-icon").src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        document.querySelector(".weather-icon").src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        document.querySelector(".weather-icon").src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        document.querySelector(".weather-icon").src = "images/mist.png";
    } else {
        document.querySelector(".weather-icon").src = "images/snow.png";
    }

    document
        .querySelector(".search input")
        .addEventListener("keypress", (event) => {
            if (event.key == "Enter") {
                checkWeather(searchBox.value);
            }
        });

    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
checkWeather();
