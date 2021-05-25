import React, {useState, useEffect} from 'react';
import {City, CityRequests} from "../../interfaces/weather-list-interfaces";
import {weatherLoaderEffect} from "../../hooks/weather-loader-effect";

const WeatherWidget = (props: {cities: City[]}) => {

    const INITIAL_CITIES : CityRequests[] = [];

    const [citiesToRequest, setCitiesToRequest] = useState(INITIAL_CITIES);

    useEffect(()=>{
        const currentDateMs = new Date().getTime();

        setCitiesToRequest(props.cities.map(({id,lat,lon,label})=>(
            {
                id,
                lat,
                lon,
                label,
                processing: false,
                error: false,
                lastSync: currentDateMs,
                success: false
            })));
    },[props.cities])

    console.log('citiesToRequest: ', citiesToRequest)

    const handleProcessing = ({cities}: { cities: CityRequests[] }) => {

    }

    const handleSuccess = ({cities}: { cities: CityRequests[] }) => {

    }

    const handleFailure = ({cities}: { cities: CityRequests[] }) => {

    }

    weatherLoaderEffect(citiesToRequest, handleProcessing, handleSuccess, handleFailure )

    return <div className='weatherWrapper'>
        {
            props.cities.map(
                ({label},cityIndex)=>
                    <div key={`cityIndex_${cityIndex}`} className={'cityCardWrapper'}>
                        <span>{label}</span>
                    </div>)
        }
    </div>
}

export default WeatherWidget;
