import { apiClient } from '../Components/Common/apiClient';
import { currentWeatherDataClass } from '../Components/Transformer/WeatherDataTransformer';

export const REQUEST_CITY_WEATHER = 'REQUEST_CITY_WEATHER';
export const RECEIVE_CITY_WEATHER = 'RECEIVE_CITY_WEATHER';
export const DELETE_CITY_WEATHER = 'DELETE_CITY_WEATHER';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';


export const deleteCityWeather = (city, country) => {
    return {
        type: DELETE_CITY_WEATHER,
        city,
        country
    }
}

const requestCityWeather = (city, country) => {
    return {
        type: REQUEST_CITY_WEATHER,
        city,
        country
    }
}
const receiveCityWeather = (cityWeather) => {
    return {
        type: RECEIVE_CITY_WEATHER,
        cityWeather
    }
}
export const getCityWeather = (cityName, cityCountry) => {
    return dispatch => {
        dispatch(requestCityWeather(cityName, cityCountry));
        apiClient(`q=${cityName},${cityCountry}`, (weatherDataResponse) => {
            var cityWeather =  new currentWeatherDataClass(cityName, cityCountry,weatherDataResponse);
            dispatch(receiveCityWeather(cityWeather));
        })
    }
}

export const updateMessage = (message, error) => {
    return {
        type: UPDATE_MESSAGE,
        message,
        error
    }
}
export const addCity = (city) => {
    return {
        type: 'ADD_CITY',
        payload: city
    }
}