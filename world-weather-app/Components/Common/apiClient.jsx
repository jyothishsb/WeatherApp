import $ from 'jquery';

export function apiClient(queryParam, handleCityWeather ) {

   const unit='&units=imperial' 
    const API_KEY = '86f4bdc3df6948a67cff5a7ab72b38cc';
    var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?appid='+API_KEY+unit+'&';
    var callbackQueryString = '&callback=?';
   
    $.getJSON(baseUrl + queryParam + callbackQueryString, handleCityWeather)
        .fail(handleCityWeather);
};