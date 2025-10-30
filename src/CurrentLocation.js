import React from "react";
import apiKeys from "./apiKeys";
import Forcast from "./Forcast";
import loader from "./images/WeatherIcons.gif";
import WeatherGif from "./WeatherGifs";
import WeatherGifs from "./Weather";




// Simple live clock (replacement for react-live-clock)
function LiveClock() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <span>{time.toLocaleTimeString()}</span>;
}

// Local weather icon component (replacement for react-animated-weather)
function WeatherApp({ weatherData }) {
  return (
    <div className="weather-container">
      <div className="left-section">
        {/* Existing umbrella/rain image */}
      </div>

      <div className="right-section">
        <div className="location">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
        </div>

        {/* Add GIF Here */}
        <WeatherGif main={weatherData.weather[0].main} />

        <div className="details">
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} Km/h</p>
        </div>
      </div>
    </div>
  );
}

const dateBuilder = (d) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday",
  ];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    temperatureC: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    main: undefined,
    errorMsg: undefined,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch(() => {
         
          this.getWeather(28.67, 77.22);
          alert("Location access denied. Showing default (Delhi) weather.");
        });
    } else {
      alert("Geolocation not supported by your browser.");
    }

    // refresh every 10 minutes
    this.timerID = setInterval(() => {
      if (this.state.lat && this.state.lon) {
        this.getWeather(this.state.lat, this.state.lon);
      }
    }, 600000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather(lat, lon) {
  fetch(
    `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKeys.key}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Weather condition:", data.weather[0].main); // ✅ use here
      this.setState({
        temperatureC: data.main.temp,
        city: data.name,
        country: data.sys.country,
        main: data.weather[0].main,
      });
    });
}

  render() {
    const { temperatureC, city, country, main } = this.state;

    if (temperatureC) {
      return (
        <React.Fragment>
          <div className="city">
            <div className="title">
              <h2>{city}</h2>
              <h3>{country}</h3>
            </div>

            <div className="mb-icon">
              <WeatherGifs main={main} />
              <p>{main}</p>
            </div>

            <div className="date-time">
              <div className="dmy">
                <div className="current-time">
                  <LiveClock />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {temperatureC}°<span>C</span>
                </p>
              </div>
            </div>
          </div>
          <Forcast icon={main} weather={main} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <img
            src={loader}
            alt="Loading"
            style={{ width: "50%", WebkitUserDrag: "none" }}
          />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location...
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location will be used to show real-time weather.
          </h3>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
