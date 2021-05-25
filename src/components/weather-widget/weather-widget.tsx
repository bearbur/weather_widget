import React, {useState, useEffect} from 'react';
import {City} from "../../interfaces/weather-list-interfaces";

const WeatherWidget = (props: {cities: City[]}) => {

    const {cities} = props;

    return <div className='weatherWrapper'>
        {
            cities.map(
                ({label},cityIndex)=>
                    <div key={`cityIndex_${cityIndex}`} className={'cityCardWrapper'}>
                        <span>{label}</span>
                    </div>)
        }
    </div>
}

export default WeatherWidget;
