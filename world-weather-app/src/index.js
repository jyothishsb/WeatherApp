import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';    
import stateReducer from './reducers/index';
import { getCityWeather } from './actions';
import thunkMiddleware from "redux-thunk";

let store = createStore(stateReducer,applyMiddleware(thunkMiddleware));
function render(){
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
store.subscribe(render);
store.dispatch(getCityWeather('Seattle', 'US'));
store.dispatch(getCityWeather('Minneapolis', 'US'));
render();
