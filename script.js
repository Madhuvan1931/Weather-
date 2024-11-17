const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");

const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");
 async function checkWeather(city){
	const api_key = "141ed2ae0532c38b226d7dca0fbdcb33";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;


	try {
        const weather_data = await fetch(url).then(response => response.json());

        if (weather_data.cod === "404") {
			location_not_found.style.display = "flex";
			weather_body.style.display = "none";
            // alert("City not found! Please enter a valid city name.");
            return;
        }

		location_not_found.style.display = "none";
		weather_body.style.display = "flex";

		temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;

		description.innerHTML = `${weather_data.weather[0].description}`;
		console.log(weather_data);

		humidity.innerHTML = `${weather_data.main.humidity}%`;
		wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

		switch(weather_data.weather[0].main){
				case 'Clouds':
				weather_img.src = "source/cloud.png";
				break;
				case 'Clear':
				weather_img.src = "source/clear.png";
				break;
				case 'Rain':
				weather_img.src = "source/rain.png";
				break;
				case 'Mist':
				weather_img.src = "source/mist.png";
				break;
				case 'Snow':
				weather_img.src = "source/snow.png";
				default: 
				weather_img.src = "source/default.png";
		}

	}

	catch (error) {
	console.error("Error fetching weather data:", error);
	}
 }

 
searchBtn.addEventListener('click', () =>{
	const city = inputBox.value.trim();
		checkWeather(city);
});