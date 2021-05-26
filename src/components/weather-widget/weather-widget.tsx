import React, {useState, useEffect} from 'react';
import {City, CityRequests, WeatherInfoResponse} from "../../interfaces/weather-list-interfaces";
import {weatherLoaderEffect} from "../../hooks/weather-loader-effect";
import CityCard from './location-card/location-card';
import {crossingLocationFilter} from '../../helpers/weather-location-utils'
import { requestStates } from '../../constants/request-constants';

const WeatherWidget = ({cities}: {cities: City[]}) => {
    const INITIAL_CITIES : CityRequests[] = [];
    const INITIAL_LOCATION_MAP : {[key: string]:WeatherInfoResponse} = {};
    const [locationsToRequest, setLocationsToRequest] = useState(INITIAL_CITIES);
    const [locationMapByCityId, setLocationMapByCityId] = useState(INITIAL_LOCATION_MAP);

    const handleProcessing = ({cities}: { cities: CityRequests[] }) => {
        setLocationsToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...locationsToRequest], requestState: requestStates.processing}))
    }

    const handleSuccess = ({cities}: { cities: CityRequests[] }) => {
        setLocationsToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...locationsToRequest], requestState: requestStates.success}))
    }

    const handleFailure = ({cities}: { cities: CityRequests[] }) => {
        setLocationsToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...locationsToRequest], requestState: requestStates.success}))
    }

    const handleUpdate = ({cities}: { cities: CityRequests[] }) => {

        //todo check before update on last time sync and make filtration

        setLocationsToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...locationsToRequest], requestState: requestStates.update}))
    }

    const handleLocationWeatherInfo = ({weatherInfoAsArray}:{weatherInfoAsArray: {[key: string]:WeatherInfoResponse}[]}) => {

        const updatedLocationData : {[locationKey: string]:WeatherInfoResponse} = {};

        for(let locationDataAsObject of weatherInfoAsArray){
            if(!Object.values(locationDataAsObject)[0]){
                continue;
            }
            updatedLocationData[Object.keys(locationDataAsObject)[0]] =Object.values(locationDataAsObject)[0];
        }

        setLocationMapByCityId({...locationMapByCityId, ...updatedLocationData})

    }

    weatherLoaderEffect(locationsToRequest, handleProcessing, handleSuccess, handleFailure, handleLocationWeatherInfo );

    //todo add auto updater effect with intervals

    useEffect(()=>{

        setLocationsToRequest(cities.map(({id,lat,lon,label})=>(
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
    },[cities]);

    return <div className='weatherWrapper'>
        {
            cities.map(
                ({id, label, lat, lon},cityIndex)=>
                    <div key={`cityIndex_${cityIndex}`} className={'cityCardWrapper'}>
                        <CityCard
                            location={{
                                id,
                                label,
                                lat,
                                lon,
                                tempC: !!locationMapByCityId[id] ? locationMapByCityId[id]['main']['temp'] : 0,
                                weatherIcon: (!!locationMapByCityId[id] && !!locationMapByCityId[id]['weather'][0]) ? locationMapByCityId[id]['weather'][0]['icon'] : '',
                                windMs: !!locationMapByCityId[id] ? locationMapByCityId[id]['wind']["speed"] : 0,
                                windDeg: !!locationMapByCityId[id] ? locationMapByCityId[id]['wind']["deg"] : 0,
                                pressure: !!locationMapByCityId[id] ?  locationMapByCityId[id]['main']['pressure'] : 0,
                                weatherMain: (!!locationMapByCityId[id] && !!locationMapByCityId[id]['weather'][0]) ? locationMapByCityId[id]['weather'][0]['main'] : '',
                            }}
                            handleUpdate={handleUpdate} />
                    </div>)
        }
    </div>
}

export default WeatherWidget;
