import React from 'react';
import './css/App.css';
import './css/WeatherWidget.css';
import WeatherWidget from './components/weather-widget/weather-widget';
import citiesList from './constants/cities-list.js';

export const App = () => {
    return (
        <div className="containerWeatherWidget">
            <WeatherWidget locations={citiesList} />
            <div>❤️</div>
        </div>
    );
}
