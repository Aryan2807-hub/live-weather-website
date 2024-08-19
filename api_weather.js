const searchbar = document.getElementById("searchbar");
const submitbutton = document.getElementById("submit");
// Background
const background = document.getElementById("background");
// Weather description
const type = document.getElementById("type");
const WeatherIcon = document.getElementById("WeatherIcon");
// Temperature
const temp = document.getElementById("temperature");
// Humidity
const humidity = document.getElementById("humidpercent");
const humidIcon = document.getElementById("humidIcon");
// Wind
const wind = document.getElementById("windspeed");
const windIcon = document.getElementById("windIcon");
// Place
const place = document.getElementById("place");
// Error
const errormsg = document.getElementById("errorMSG");

// Set default background
document.body.style.backgroundImage = 'url("/background/rain.jpg")';
document.body.style.backgroundSize = "cover"; 
document.body.style.backgroundPosition = "center"; 
document.body.style.backgroundRepeat = "no-repeat";

// Assigning function to search engine
submitbutton.addEventListener("click", async () => {
    const input = searchbar.value.toLowerCase();
    errormsg.innerText = "";
    if (input) {
        try {
            let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&lat=44.34&lon=10.99&appid=db289d648365ba8874222ac3122aca5a&units=metric`);
            let data = await api.json();
            console.log(data);
            temp.innerText = data.main.temp + "°C";
            place.innerText = data.name;
            humidity.innerText = data.main.humidity + "%";
            wind.innerText = data.wind.speed + "Km/h";
            type.innerText = data.weather[0].main;
            WeatherIcon.style.display = "inline-block";
            windIcon.style.display = "inline-block";
            humidIcon.style.display = "inline-block";
            weatherchange();
        } catch {
            console.log("error");
        }
    } else {
        emptyBar();
    }
});

function emptyBar() {
    errormsg.innerText = "Please enter a valid location.";
}

// Weather type and background change
function weatherchange() {
    const weatherType = type.innerText; 
    let backgroundUrl;

    if (weatherType === "Clear") {
        WeatherIcon.src = "/images/clear.png";
        backgroundUrl = "/background/clear.jpg";
    } else if (weatherType === "Clouds") {
        WeatherIcon.src = "/images/clouds.png";
        backgroundUrl = "/background/cloudy.jpg";
    } else if (weatherType === "Haze") {
        WeatherIcon.src = "/images/drizzle.png";
        backgroundUrl = "/background/haze.jpeg";
    } else if (weatherType === "Mist") {
        WeatherIcon.src = "/images/mist.png";
        backgroundUrl = "/background/mist.jpeg";
    } else if (weatherType === "Rain") {
        WeatherIcon.src = "/images/rain.png";
        backgroundUrl = "/background/rain.jpg";
    } else if (weatherType === "Snow") {
        WeatherIcon.src = "/images/snow.png";
        backgroundUrl = "/background/snow.jpg";
    } else {
        WeatherIcon.src = "/images/default.png"; 
        backgroundUrl = "/background/clear.jpg";
    }

    // Set the background image
    document.body.style.backgroundImage = `url(${backgroundUrl})`;
    document.body.style.backgroundSize = "cover"; 
    document.body.style.backgroundPosition = "center"; 
    document.body.style.backgroundRepeat = "no-repeat"; 
}
