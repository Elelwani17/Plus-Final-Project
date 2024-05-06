function updatetemp(response) {
    let temperatures = document.querySelector(".temp-detail");
    let cityElement = document.querySelector(".weather-city");
    let description = document.querySelector(".condition");
    let humid = document.querySelector(".humid");
    let windSpeed = document.querySelector(".speed");
    let dateTime = document.querySelector(".date");
    let icon = document.querySelector(".icon");
    let date = new Date(response.data.time * 1000);
    let output1 = response.data.temperature.humidity;
    let output2 = response.data.wind.speed;



    dateTime.innerHTML = formatDate(date)
    humid.innerHTML = `${output1}%`;
    windSpeed.innerHTML = `${output2}km/h`;
    cityElement.innerHTML = response.data.city;
    description.innerHTML = response.data.condition.description;
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-emoji" />`;
    temperatures.innerHTML = Math.round(response.data.temperature.current);

    getForecast(response.data.city);


}

function formatDate(date) {
    let minute = date.getMinutes();
    let hours = date.getHours();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thurday",
        "Friday",
        "Saturday",
    ];

    let day = days[date.getDay()];

    if (minute < 10) {
        minute = `0${minute}`;
    }



    return `${day} ${hours}:${minute}`;


}
function searchCity(city) {
    let apiKey = "f831500415adaof5bc93fd0tde1db8d4";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updatetemp);

}




function searchEngine(event) {
    event.preventDefault();
    let input = document.querySelector(".search-input1");
    let change_city = document.querySelector(".weather-city");

    change_city.innerHTML = input.value;
    searchCity(input.value);


}
function getForecast(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function displayForecast(response) {

    console.log(response.data);
    let forecastHTML = "";

    response.data.daily.forEach(function (day, index) {
        if (index <= 4) {
            forecastHTML = forecastHTML + ` 
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      
      <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°C</strong>
        </div>
        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°C</div>
      </div>
    </div>
    `;
        }
    });
    let forecast = document.querySelector("#forecast");
    forecast.innerHTML = forecastHTML;
}





let search_button = document.querySelector(".search-form");
search_button.addEventListener('submit', searchEngine);
