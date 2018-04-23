import React, { Component } from 'react';
import { deleteCityWeather, getCityWeather} from "./actions/index";
import './App.css';
import AppHeader from './Components/AppHeader/appHeader';
import WeatherInfoWidget from './Components/WeatherInfo/WeatherInfoWidget'
import AddCityComponent from './Components/AddCity/addCity';

var renderCounter = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;    
  }
  componentDidMount() {
    var cityWeatherList = this.store.getState().cityWeatherList;
    window.setInterval(() => {
      for (var city of cityWeatherList) {
        if (!city.isLoading) {
          this.store.dispatch(getCityWeather(city.name, city.country));
        }
      }
    }, 900000);
  }
  handleDeleteCity = (city, event)=>{
    this.store.dispatch(deleteCityWeather(city.name, city.country));
 }
render() {
    return (
      <div className="appUI">
        <AppHeader error={this.store.getState().addCityError} message={this.store.getState().addCityMessage} /> 
        <AddCityComponent store={this.store} handleAddCity={this.handleAddCity} />
        <WeatherInfoWidget cityWeatherList={this.store.getState().cityWeatherList} handleDeleteCity={this.handleDeleteCity}/>
     </div>
    );
  }
}

export default App;
