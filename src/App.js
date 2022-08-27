import React, { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  // State
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState('');
  // Event
  const searchInput = (e) => {
    setInput(e.target.value);
    // console.log(e.target.value);
  };
  const weatherSearch = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}&aqi=no`
      )
      .then((data) => {
        setWeather(data.data);
        // console.log(data.data);
      })
      .catch((error) => error.message);
  };
  // Use Effect
  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=London&aqi=no`
      )
      .then((data) => {
        setWeather(data.data);
        // console.log(data.data);
      })
      .catch((error) => error.message);
  }, []);

  return (
    <div className='App'>
      {weather && (
        <div className='weather-info'>
          <div className='search-weather'>
            <input onChange={searchInput} type='text' />
            <button onClick={weatherSearch}>Search</button>
          </div>
          <h1>Country: {weather.location.country}</h1>
          <h2>Region: {weather.location.region}</h2>
          <h2>City: {weather.location.name}</h2>
          <h2>Date: {weather.location.localtime}</h2>
          <h2>Condition: {weather.current.condition.text}</h2>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <span>{weather.current.temp_c}</span>
        </div>
      )}
    </div>
  );
}

export default App;
