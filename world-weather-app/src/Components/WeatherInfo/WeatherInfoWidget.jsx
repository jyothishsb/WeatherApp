import React from 'react';
import './WeatherInfoWidget.css'

var WeatherInfoWidget = (props) => {
  var cityWeatherInfoList = Array.from(props.cityWeatherList).map((cityInfo, index) => {
    if (cityInfo.error) {
      return null;
    } else if (cityInfo.isLoading) {
      return (<div className="row top-buffer">
        <div className="col-md-4 col-md-offset-4">
          <div className="weather">
            LOADING!!
        </div>
        </div>
      </div>);
    } else {
      return (<div className="row top-buffer">
        <div className="col-md-4 col-md-offset-4">
          <div className="weather">
            <div className="current">
              <div className="closeIcon" onClick={props.handleDeleteCity.bind(this, cityInfo)}><span className="glyphicon glyphicon-remove-circle"></span></div>
              <div className="info">
                <div>&nbsp;</div>
                <div className="city"><small><small>CITY:</small></small> {cityInfo.name}</div>
                <div className="temp">{cityInfo.temparature}&deg; <small>F</small></div>
                <div className="city">{cityInfo.description}</div>
                <div className="wind"><small><small>WIND:</small></small> {cityInfo.windSpeed}</div>
                <div className="humidity"><small><small>Humidity:</small></small> {cityInfo.humidity}</div>
                <div className="pressure"><small><small>Pressure:</small></small> {cityInfo.pressure}</div>
                <div>&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
  })

    return(
        <div className="container weather-widget-position">
        {cityWeatherInfoList}
      </div>
    );
};
export default WeatherInfoWidget;