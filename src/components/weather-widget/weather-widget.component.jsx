import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCurrCoordsStart } from '../../redux/weather/weather.actions';

import windDegToDirection from '../../utils/windDegToDirection';

import './weather-widget.styles.css';

const WeatherWidget = ({
  title,
  unit,
  showWind,
  currentWeather,
  error,
  getCurrCoordsStart,
}) => {
  useEffect(() => {
    getCurrCoordsStart();
  }, [getCurrCoordsStart]);

  // A spinner may be better for loading. Need to confirm with the designer.
  if (!currentWeather) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const {
    weather,
    name,
    main: { temp },
    wind: { speed, deg },
  } = currentWeather;

  return (
    <div className="weather-widget">
      <h1 className="widget-title">{title?.toUpperCase()}</h1>
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
                {`${windDegToDirection(deg)} ${(speed * 3.6).toFixed(0)}km/h`}
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
  error: weather.error,
});

export default connect(mapStateToProps, { getCurrCoordsStart })(WeatherWidget);
