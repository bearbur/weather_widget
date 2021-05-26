import React from 'react';
import { CityInfo } from '../../../interfaces/weather-list-interfaces';
import WeatherIconView from '../weather-icon-view/weather-icon-view';
import {getWindLabelByDeg} from "../../../helpers/weather-location-utils";

const LocationCard = ({location,handleUpdate}: {location:CityInfo, handleUpdate: Function}) => {

    const {weatherIcon, label,weatherMain, tempC, windMs, windDeg, pressure} = location;

    return <div className={'cityCard'}>
        <WeatherIconView iconLink={weatherIcon} />
        <div className={'locationLabel'}><span>{label}</span> <span className={'locationLabelMain'}>{weatherMain}</span></div>
        <div className={'weatherDataRow locationTemperature'}><span>{tempC}</span></div>
        <div className={'weatherDataRow locationWind'}>
            <span>
                {`${windMs}`}
            </span>
            <span className={'windDirection'}>
                {getWindLabelByDeg(windDeg)}
            </span>
        </div>
        <div className={'weatherDataRow locationPressure'}><span>{pressure}</span></div>

        <div className={'weatherDataRowLabels locationTemperature'}><span>{'Temp, C'}</span></div>
        <div className={'weatherDataRowLabels locationWind'}><span>{'Wind, m/s'}</span></div>
        <div className={'weatherDataRowLabels locationPressure'}><span>{'Pressure, hPa'}</span></div>
    </div>
}

export default LocationCard;
