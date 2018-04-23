import React from 'react';
import { addCity, getCityWeather, updateMessage } from "../../actions/index";
import { currentWeatherDataClass } from "../Transformer/WeatherDataTransformer";
import './addCity.css'
import { getCountryCode } from "../Common/CountryCodes";


const MAX_CITY_COUNT = 5;

export default class AddCityComponent extends React.Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.state = {
            country: '',
            city: '',
            disableAddCityButton:true
        };
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }
    handleCountryChange(event) {
        this.setState({
            country: event.target.value,
            disableAddCityButton:!(event.target.value&&this.state.city)
        })
    }
    handleCityChange(event) {
        this.setState({
            city: event.target.value,
            disableAddCityButton:!(event.target.value&&this.state.country)
        })
    }
    clearInput = (event) => {
        if (event.target.id === 'clearCountry') {
            this.setState({
                country: ''
            })
        }
        else if (event.target.id === 'clearCity') {
            this.setState({
                city: ''
            })
        }
    }
    handleCityWeather = (weatherData) => {
        var cityWeather = currentWeatherDataClass(weatherData);
        this.store.dispatch(addCity(cityWeather));
    }

    handleAddCity = (event) => {
        event.preventDefault();
        if (this.state.country && this.state.city) {
            var countryCode = getCountryCode(this.state.country);
            var cityDetails = {
                name: this.state.city,
                country: countryCode
            };
            this.setState({
                city: '',
                country: '',
                disableAddCityButton:true
            })
            if (!countryCode) {
                this.store.dispatch(updateMessage('Invalid Country', true))
            }else if (this.store.getState().cityWeatherList.length >= MAX_CITY_COUNT) {
                this.store.dispatch(updateMessage('Maximum City Count Reached', true));
            } else if (this.store.getState().cityWeatherList.find((ele) => { return ele.name === cityDetails.name && ele.country === cityDetails.country })) {
                this.store.dispatch(updateMessage('City Already Added', true));
            } else {
                this.store.dispatch(getCityWeather(cityDetails.name, cityDetails.country))
            }
        }
    }

    render() {
        return (
            <div className="addCity">
                <form className="form-inline">
                    <div className="btn-group">
                        <input type="text" placeholder="Country" className="form-control" id="country" onChange={this.handleCountryChange} value={this.state.country} />
                        <button id="clearCountry" type="reset" htmlFor="country" className="glyphicon glyphicon-remove-circle clearIcon" onClick={this.clearInput}></button>
                        <input type="text" placeholder="City" className="form-control" id="city" onChange={this.handleCityChange} value={this.state.city} />
                        <button id="clearCity" type="reset" htmlFor="city" className="glyphicon glyphicon-remove-circle clearIcon" onClick={this.clearInput}></button>
                        <button className="addCityButton" disabled={this.state.disableAddCityButton}><span className="glyphicon glyphicon-plus-sign" onClick={this.handleAddCity}></span></button>
                    </div>
                </form>
            </div>
        );
    }
}