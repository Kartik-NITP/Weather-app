import React, {useState} from 'react';
import './App.css';
const key = process.env.REACT_APP_KEY;
const base = process.env.REACT_APP_BASE;



function App() {
  const [query , setQuery] = useState('');
  const [weather , setWeather] = useState({});
  const search = evt => {
    if (evt.key === 'Enter')
    {
      fetch(`${base}weather?q=${query}&units=metric&APPID=${key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
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
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>{weather.weather[0].main} {weather.weather[0].icon[2] === 'n' ? (<>Night</>):(<>Day</>) }</p>
    </div>
    
    </div>
    
    </>):(<div className="error">
    {weather.message}
    </div>)}

    </>
    
    </div>
  );
}

export default App;
