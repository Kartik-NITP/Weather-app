import React, {useState} from 'react';
import './App.css';
import axios from "axios"
const key = process.env.REACT_APP_KEY;
const base = process.env.REACT_APP_BASE;



function App() {
  const [query , setQuery] = useState('');
  const [weather , setWeather] = useState({});
  const [error,setError] = useState('');
  
  const search = async evt => {
    if (evt.key === 'Enter')
    {
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${key}`
      ).then((res) => {setWeather(res.data);setQuery('');} 
      ).catch((err) => {setWeather({});setQuery('');setError("location not found")}); 
      
    }

  }
  
  return (
    <div className='app'>
      
        <input
          type="text"
          placeholder="Search Location"
          className="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={search}
        />
      
    <>
    {(typeof weather.main != 'undefined') ? (
    <>
    {/* Every things will come here*/}
    <div className="location">
      <p>{weather.name}, {weather.sys.country}</p>
    </div>
    <div className="temp-weather">
    <div className="temp">
      <div className="temp-value">{Math.round(weather.main.temp)}</div>
      <i className="fas fa-dot-circle"></i>
      <div className="celsius">C</div>
    </div>
    <div className="weather">
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
      <p>{weather.weather[0].main} {weather.weather[0].icon[2] === 'n' ? (<>Night</>):(<>Day</>) }</p>
    </div>
    
    </div>
    
    </>):(<div className="error">
    {error}
    </div>)}

    </>
    
    </div>
  );
}

export default App;
