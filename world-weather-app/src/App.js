import React, { Component } from 'react';
import { deleteCityWeather} from "./actions/index";
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
  handleDeleteCity = (city, event)=>{
    this.store.dispatch(deleteCityWeather(city.name, city.country));
 }
render() {
    console.log(` APP render counter ${renderCounter}`);
    console.log(this.store.getState().cityWeatherList);
    renderCounter++;
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
