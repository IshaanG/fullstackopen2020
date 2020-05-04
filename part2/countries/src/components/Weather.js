import React, { useState, useEffect } from "react";
import axios from "axios";
const Weather = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${encodeURIComponent(
    city
  )}`;
  const [weather, setWeather] = useState("");
  useEffect(() => {
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, [url]);

  if (!weather) {
    return <div></div>;
  } else {
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p>
          <strong>temperature: </strong>
          {weather.current.temperature} Celcius
          <br />
          <img
            src={weather.current.weather_icons}
            alt={weather.current.weather_descriptions}
          />
        </p>
        <p>
          <strong>wind: </strong> {weather.current.wind_speed} km/h, direction{" "}
          {weather.current.wind_dir}
        </p>
      </div>
    );
  }
};
export default Weather;
