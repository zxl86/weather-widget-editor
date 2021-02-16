import { takeLatest, put, all, call } from 'redux-saga/effects';

import WeatherActionTypes from './weather.types';

import {
  getCurrCoordsSuccess,
  getCurrCoordsFailure,
  fetchCurrWeatherStart,
  fetchCurrWeatherSuccess,
  fetchCurrWeatherFailure,
} from './weather.actions';

export function* fetchCurrWeather({ payload: { lat, lon } }) {
  const apiKey = 'c525dc3c6d9b81df14c773ab526265ba';

  try {
    yield put(fetchCurrWeatherStart());

    const currWeatherRes = yield fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    const currWeatherData = yield currWeatherRes.json();
    yield put(fetchCurrWeatherSuccess(currWeatherData));
  } catch (error) {
    yield put(fetchCurrWeatherFailure(error.message));
  }
}

export function* getCurrCoords() {
  if (!navigator.geolocation) {
    yield put(
      getCurrCoordsFailure('Geolocation is not supported by your browser.')
    );
  } else {
    // with help of this post: https://stackoverflow.com/questions/47753318/redux-saga-behavior-pattern
    const getCurrentPosition = () =>
      new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

    try {
      const position = yield call(getCurrentPosition);
      const currentCoords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      yield put(getCurrCoordsSuccess(currentCoords));
    } catch (error) {
      yield put(getCurrCoordsFailure(error.message));
    }
  }
}

export function* onGetCurrCoordsSuccess() {
  yield takeLatest(
    WeatherActionTypes.GET_CURR_COORDS_SUCCESS,
    fetchCurrWeather
  );
}

export function* onGetCurrCoordsStart() {
  yield takeLatest(WeatherActionTypes.GET_CURR_COORDS_START, getCurrCoords);
}

export function* weatherSagas() {
  yield all([call(onGetCurrCoordsStart), call(onGetCurrCoordsSuccess)]);
}
