export class currentWeatherDataClass {
    constructor(cityName, cityCountry, weatherData) {
        if (weatherData&&weatherData.cod === 200) {
            this.error = false;
            this.name = weatherData.name;
            this.country = weatherData.sys.country;
            this.isLoading = false;
            this.icon = weatherData.weather[0].main;
            this.description = weatherData.weather[0].description;
            this.temparature = Math.round(weatherData.main.temp);
            this.unit = 'F';
            this.windSpeed = Math.round(weatherData.wind.speed) + ' Miles/hour';
            this.pressure = Math.round(weatherData.main.pressure);
            this.humidity = Math.round(weatherData.main.humidity);
        } else {
            this.name = cityName;
            this.country = cityCountry;
            this.isLoading=false;
            this.error = true;
            this.message=weatherData.message
        }    
    }
}
