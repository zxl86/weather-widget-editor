import React from 'react';
import { connect } from 'react-redux';

import './weather-widget.styles.css';

const WeatherWidget = ({ title, unit, showWind, currentWeather }) => {
  const {
    weather,
    name,
    main: { temp },
    wind: { speed, deg },
  } = currentWeather;

  const degToDirection = (deg) => {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.ceil((deg - 11.25) / 22.5);

    return index > 15 ? directions[0] : directions[index];
  };

  return (
    <div className="weather-widget">
      <h1 className="widget-title">{title.toUpperCase()}</h1>
      <div className="widget-content">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />
        <div className="weather-details">
          <span className="city">{name}</span>
          <span className="temperature">
            {unit === 'metric'
              ? temp.toFixed(0)
              : (temp * (9 / 5) + 32).toFixed(0)}
            °
          </span>
          {showWind === 'on' ? (
            <div className="wind">
              <span className="wind-label">Wind</span>
              <span className="wind-content">
                {`${degToDirection(deg)} ${(speed * 3.6).toFixed(0)}km/h`}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ weather }) => ({
  currentWeather: weather.currentWeather,
});

export default connect(mapStateToProps)(WeatherWidget);
