import WeatherActionTypes from './weather.types';

export const getCurrCoordsStart = () => ({
  type: WeatherActionTypes.GET_CURR_COORDS_START,
});

export const getCurrCoordsSuccess = (currentCoords) => ({
  type: WeatherActionTypes.GET_CURR_COORDS_SUCCESS,
  payload: currentCoords,
});

export const getCurrCoordsFailure = (errorMessage) => ({
  type: WeatherActionTypes.GET_CURR_COORDS_FAILURE,
  payload: errorMessage,
});

export const fetchCurrWeatherStart = () => ({
  type: WeatherActionTypes.FETCH_CURR_WEATHER_START,
});

export const fetchCurrWeatherSuccess = (currentWeather) => ({
  type: WeatherActionTypes.FETCH_CURR_WEATHER_SUCCESS,
  payload: currentWeather,
});

export const fetchCurrWeatherFailure = (errorMessage) => ({
  type: WeatherActionTypes.FETCH_CURR_WEATHER_FAILURE,
  payload: errorMessage,
});
