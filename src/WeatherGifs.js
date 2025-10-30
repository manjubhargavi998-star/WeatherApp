import React from "react";
import rainGif from "./images/rain.gif";
import SunGif from "./images/Sun.gif";
import cloudGif from "./images/cloud.gif";
import snowGif from "./images/snow.gif";
import windGif from "./images/wind.gif";
import clearGif from "./images/clear.gif";
import defaultGif from "./images/default.gif";


function WeatherGifs({ main }) {   // ✅ Capitalized component name
  const gifs = {
    Rain: rainGif,
    Sun: SunGif,
    Clouds: cloudGif,
    Snow: snowGif,
    Clear: clearGif,  // ✅ Capitalize 'Clear' to match API response
    Wind: windGif,
  };

  const selectedGif = gifs[main] || defaultGif;

  return (
    <div className="weather-gif">
      <img src={selectedGif} alt={main} className="gif-icon" />
    </div>
  );
}

export default WeatherGifs;  // ✅ Must match component name above
