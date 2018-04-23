import { DELETE_CITY_WEATHER, REQUEST_CITY_WEATHER, RECEIVE_CITY_WEATHER, UPDATE_MESSAGE } from '../actions';

export default (state = {}, action) => {
    let cityWeatherList = [];
    let cityIndex;
    switch (action.type) {
        case DELETE_CITY_WEATHER:
            cityWeatherList = state.cityWeatherList;
            let deleteIndex = cityWeatherList.findIndex(city => city.name === action.city &&
                city.country === action.country);
            if (cityWeatherList.findIndex(city => city.name === action.city &&
                city.country === action.country) >= 0) {
                cityWeatherList.splice(deleteIndex, 1);
            }
            return Object.assign({}, state, {
                cityWeatherList: cityWeatherList
            });
        case REQUEST_CITY_WEATHER:
            cityWeatherList = state.cityWeatherList ? state.cityWeatherList : [];
            cityIndex = cityWeatherList.findIndex(city => city.name === action.city &&
                city.country === action.country);
            if (cityIndex >= 0) {
                cityWeatherList[cityIndex].isLoading = true;
            } else {
                var cityWeather = {
                    name: action.city,
                    country: action.country,
                    isLoading: true
                }
                cityWeatherList.unshift(cityWeather)
            }
            return Object.assign({}, state, {
                cityWeatherList: cityWeatherList
            })
        case RECEIVE_CITY_WEATHER:
            cityWeatherList = state.cityWeatherList ? state.cityWeatherList : [];
            if (!action.cityWeather.error) {
                cityIndex = Array.from(cityWeatherList).findIndex((city) => {
                    return (city.name === action.cityWeather.name && city.country === action.cityWeather.country)
                });
                if (cityWeatherList.findIndex((city) => city.name === action.cityWeather.name && city.country === action.cityWeather.country) >= 0) {
                    cityWeatherList[cityIndex] = action.cityWeather
                }
            } else {
                if (cityWeatherList.findIndex((city) => city.name === action.cityWeather.name && city.country === action.cityWeather.country) >= 0) {
                    cityWeatherList.splice(cityWeatherList.findIndex((city) => city.name === action.cityWeather.name && city.country === action.cityWeather.country), 1);
                }
                return Object.assign({}, state, {
                    cityWeatherList: cityWeatherList,
                    addCityError: true,
                    addCityMessage: 'Unable to get Weather Info'
                })
            }
            return Object.assign({}, state, {
                cityWeatherList: cityWeatherList,
                addCityError: false,
                addCityMessage: 'Add City'
            })
        case UPDATE_MESSAGE:
            return Object.assign({}, state, {
                addCityError: action.error,
                addCityMessage: action.message
            })
        default:
            return state;
    }

}