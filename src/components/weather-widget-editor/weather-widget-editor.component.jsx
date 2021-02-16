import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getCurrCoordsStart } from '../../redux/weather/weather.actions';

import RadioInput from '../radio-input/radio-input.component';
import WeatherWidget from '../weather-widget/weather-widget.component';

import './weather-widget-editor.styles.css';

const WeatherWidgetEditor = ({ currentWeather, getCurrCoordsStart }) => {
  const [settings, setSettings] = useState({
    title: 'Title of widget',
    unit: 'metric',
    showWind: 'on',
  });

  useEffect(() => {
    getCurrCoordsStart();
  }, [getCurrCoordsStart]);

  /* If a Submit or Save button was present in the design, the settings data could be saved to localStorage
  OR be sent to backend and saved into database if API is provided. Need to discuss and confirm with team 
  members like PO, BA, UI/UX designer, senior devs. */
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(settings);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings({ ...settings, [name]: value });
  };

  return (
    <div className="weather-widget-editor">
      <div className="decoration-line"></div>
      <div className="editor-container">
        <div className="editing-area">
          <form className="editing-form" onSubmit={handleSubmit}>
            <div className="setting title">
              <label className="setting-name" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                value={settings.title}
                id="title"
                name="title"
                placeholder="Title of widget"
                required
                onChange={handleChange}
              />
            </div>
            <div className="setting temperature">
              <h5 className="setting-name">Temperature</h5>
              <div className="options" onChange={handleChange}>
                <RadioInput
                  id="metric"
                  name="unit"
                  value="metric"
                  defaultChecked={true}
                  label="°C"
                />
                <RadioInput
                  id="imperial"
                  name="unit"
                  value="imperial"
                  defaultChecked={false}
                  label="°F"
                />
              </div>
            </div>
            <div className="setting wind">
              <h5 className="setting-name">Wind</h5>
              <div className="options" onChange={handleChange}>
                <RadioInput
                  id="wind-on"
                  name="showWind"
                  value="on"
                  defaultChecked={true}
                  label="On"
                />
                <RadioInput
                  id="wind-off"
                  name="showWind"
                  value="off"
                  defaultChecked={false}
                  label="Off"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="vertical-line"></div>
        <div className="preview-area">
          {!currentWeather ? (
            <div className="loading">Loading...</div>
          ) : (
            <WeatherWidget {...settings} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ weather }) => ({
  currentWeather: weather.currentWeather,
});

export default connect(mapStateToProps, { getCurrCoordsStart })(
  WeatherWidgetEditor
);
