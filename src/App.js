import React, { useState } from 'react';
const api = {
  key: "3d35eb545d3794a5f89b2c5b97d14417",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  //Fetch Data
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }






  const dateBuilder = (d) => {
    let months = ['Jan', 'Feb', 'Mar,', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', "Dec"];
    let days = ['Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'];
    let day = days[d.getDay()];

    let month = months[d.getMonth()];

    let year = d.getFullYear()
    let date = d.getDate();
    return `${day} ${month} ${year}`
  }
  return (
    // <div className="app">
      <div className={(typeof weather.main!="undefined")
      ? ((weather.main.temp>16)
        ? 'app warm'
      : 'app')
    :'app'}>
      <section>
        <div className="search-box">
          
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {( typeof weather.main !="undefined") ? (
          <div>
            <div className="location-wrapper">
              <div className="location">
                {weather.name}, {weather.sys.country} 
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
              <div className="weather-wrapper">
                <div className="temp">
                  {Math.round(weather.main.temp)} °c
              </div>
                <div className="weather">
                  {weather.weather[0].description}
              </div>
              </div>
            </div>
          </div>
        ) : ('')}
        
      </section>
    </div>
  );
}
export default App;