import React from 'react';

var weatherRenderCounter = 0;
export default class WeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityWeatherList:this.porps.cityWeatherList?this.porps.cityWeatherList:[]
        }
    }
   
    cityWeatherInfoList = Array.from(this.props.cityWeatherList).map((cityInfo, index) => {
        return (<div className="row top-buffer">
            <div className="col-md-4 col-md-offset-4">
                <div className="weather">
                    <div className="current">
                        <div className="closeIcon"><span className="glyphicon glyphicon-remove-circle"></span></div>
                        <div className="info">
                            <div>&nbsp;</div>
                            <div className="city"><small><small>CITY:</small></small> {cityInfo.name}</div>
                            <div className="temp">67&deg; <small>F</small></div>
                            <div className="wind"><small><small>WIND:</small></small> 22 km/h</div>
                            <div>&nbsp;</div>
                        </div>
                        <div className="icon">
                            <span className="wi wi-day-haze"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }, this);

    render() {
        console.log(` WEATHER render counter ${weatherRenderCounter}`);
        return (
            <div className="container weather-widget-position">
                {this.cityWeatherInfoList}
            </div>);
    }
}