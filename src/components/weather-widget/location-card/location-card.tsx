import React from 'react';
import { CityInfo } from '../../../interfaces/weather-list-interfaces';
import WeatherIconView from '../weather-icon-view/weather-icon-view';

const LocationCard = ({location,handleUpdate}: {location:CityInfo, handleUpdate: Function}) => {


    return <div className={'cityCard'}>
        <WeatherIconView iconLink={''} />
        <div className={'locationLabel'}><span>{location.label}</span></div>
        <div className={'locationTemperature'}><span>{location.tempC}</span></div>
    </div>
}

export default LocationCard;