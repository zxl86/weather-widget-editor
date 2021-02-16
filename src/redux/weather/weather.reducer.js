import WeatherActionTypes from './weather.types';

const INITIAL_STATE = {
  currentCoords: null,
  currentWeather: null,
  error: null,
  isFetching: false,
};

const weatherReducer = (reducerState, action) => {
  const state = reducerState ?? INITIAL_STATE;
  switch (action.type) {
    case WeatherActionTypes.GET_CURR_COORDS_SUCCESS:
      return {
        ...state,
        currentCoords: action.payload,
      };
    case WeatherActionTypes.GET_CURR_COORDS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case WeatherActionTypes.FETCH_CURR_WEATHER_START:
      return {
        ...state,
        isFetching: true,
      };
    case WeatherActionTypes.FETCH_CURR_WEATHER_SUCCESS:
      return {
        ...state,
        currentWeather: action.payload,
        error: null,
        isFetching: false,
      };
    case WeatherActionTypes.FETCH_CURR_WEATHER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default weatherReducer;
