import React from 'react';
import { CityInfo } from '../../../interfaces/weather-list-interfaces';
import WeatherIconView from '../weather-icon-view/weather-icon-view';

const LocationCard = ({location,handleUpdate}: {location:CityInfo, handleUpdate: Function}) => {


    return <div className={'cityCard'}>
        <WeatherIconView iconLink={location.weatherIcon} />
        <div className={'locationLabel'}><span>{location.label}</span></div>
        <div className={'weatherDataRow locationTemperature'}><span>{location.tempC}</span></div>
        <div className={'weatherDataRow locationWind'}><span>{location.windMs}</span></div>
        <div className={'weatherDataRow locationPressure'}><span>{location.pressure}</span></div>

        <div className={'weatherDataRowLabels locationTemperature'}><span>{'Temp, C'}</span></div>
        <div className={'weatherDataRowLabels locationWind'}><span>{'Wind, m/s'}</span></div>
        <div className={'weatherDataRowLabels locationPressure'}><span>{'Pressure, hPa'}</span></div>
    </div>
}

export default LocationCard;
