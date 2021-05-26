import React, {useState, useEffect} from 'react';
import {City, CityRequests} from "../../interfaces/weather-list-interfaces";
import {weatherLoaderEffect} from "../../hooks/weather-loader-effect";
import CityCard from './location-card/location-card';
import {crossingLocationFilter} from '../../helpers/weather-location-utils'
import { requestStates } from '../../constants/request-constants';

const WeatherWidget = ({cities}: {cities: City[]}) => {

    const INITIAL_CITIES : CityRequests[] = [];

    const [citiesToRequest, setCitiesToRequest] = useState(INITIAL_CITIES);

    useEffect(()=>{
        const currentDateMs = new Date().getTime();

        setCitiesToRequest(cities.map(({id,lat,lon,label})=>(
            {
                id,
                lat,
                lon,
                label,
                processing: false,
                error: false,
                lastSync: -1,
                success: false
            })));
    },[cities])

    const handleProcessing = ({cities}: { cities: CityRequests[] }) => {
        setCitiesToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...citiesToRequest], requestState: requestStates.processing}))
    }

    const handleSuccess = ({cities}: { cities: CityRequests[] }) => {
        setCitiesToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...citiesToRequest], requestState: requestStates.success}))
    }

    const handleFailure = ({cities}: { cities: CityRequests[] }) => {
        setCitiesToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...citiesToRequest], requestState: requestStates.success}))
    }

    const handleUpdate = ({cities}: { cities: CityRequests[] }) => {
        setCitiesToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...citiesToRequest], requestState: requestStates.update}))
    }

    const handleLocationWeatherInfo = () => {

    }

    weatherLoaderEffect(citiesToRequest, handleProcessing, handleSuccess, handleFailure, handleLocationWeatherInfo )

    return <div className='weatherWrapper'>
        {
            cities.map(
                ({id, label, lat, lon},cityIndex)=>
                    <div key={`cityIndex_${cityIndex}`} className={'cityCardWrapper'}>
                        <CityCard location={{id, label, lat, lon, tempC: 0, weatherIcon: '', windMs: 0,  pressure: 0}} handleUpdate={handleUpdate} />
                    </div>)
        }
    </div>
}

export default WeatherWidget;
