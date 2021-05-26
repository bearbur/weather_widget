import React, {useEffect, useState, useMemo} from 'react';
import {City, CityRequests, WeatherInfoResponse} from "../../interfaces/weather-list-interfaces";
import {weatherLoaderEffect} from "../../hooks/weather-loader-effect";
import CityCard from './location-card/location-card';
import {convertDataFromLocations, crossingLocationFilter} from '../../helpers/weather-location-utils'
import {INTERVAL_CHECK_UPDATE_MS, requestStates, UPDATE_LIMIT_MS} from '../../constants/request-constants';
import {setInterval} from "timers";

const WeatherWidget = ({locations}: {locations: City[]}) => {
    const INITIAL_CITIES : CityRequests[] = [];
    const INITIAL_LOCATION_MAP : {[key: string]:WeatherInfoResponse} = {};
    const INITIAL_MAKE_UPDATE : true | false = false;

    const [locationsToRequest, setLocationsToRequest] = useState(INITIAL_CITIES);
    const [locationMapByCityId, setLocationMapByCityId] = useState(INITIAL_LOCATION_MAP);
    const [makeUpdate, setMakeUpdate] = useState(INITIAL_MAKE_UPDATE);

    const citiesToUpdate = useMemo(()=>({ cities: convertDataFromLocations(locations)}),[locations]);

    const handleProcessing = ({cities}: { cities: CityRequests[] }) => {
        setLocationsToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...locationsToRequest], requestState: requestStates.processing}))
    }

    const handleSuccess = ({cities}: { cities: CityRequests[] }) => {
        setLocationsToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...locationsToRequest], requestState: requestStates.success}))
    }

    const handleFailure = ({cities}: { cities: CityRequests[] }) => {
        setLocationsToRequest(crossingLocationFilter({activeRequestedLocations: [...cities], requestedLocations: [...locationsToRequest], requestState: requestStates.success}))
    }

    const handleUpdate  = ({cities}: { cities: CityRequests[] })  => {

        //Current time at update moment at ms
        const currentTime = new Date().getTime();

        const citiesFilteredBySyncTimeLimit = [...cities].filter((el)=>{
            const locationToRequest = [...locationsToRequest].find(({id})=>id === el.id);

            return !(!locationToRequest || (locationToRequest.lastSync < currentTime && locationToRequest.lastSync + UPDATE_LIMIT_MS >= currentTime));
        });

        if(citiesFilteredBySyncTimeLimit.length === 0) {
            return;
        }

        setLocationsToRequest(crossingLocationFilter({activeRequestedLocations: [...citiesFilteredBySyncTimeLimit], requestedLocations: [...locationsToRequest], requestState: requestStates.update}))
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

    //On mount effect
    useEffect(()=>{

        const updateOnInterval = () => {
            setMakeUpdate(true)
        }

        let intervalCheckOnMount = setInterval(updateOnInterval,INTERVAL_CHECK_UPDATE_MS);
        return ()=>{
            clearInterval(intervalCheckOnMount)
        }
    },[])

    useEffect(()=>{
        if(!makeUpdate){
            return
        }

        setMakeUpdate(false);
        handleUpdate(citiesToUpdate);

        //Unmount
        return ()=>{
            setMakeUpdate(false);
        }

    },[makeUpdate])

    useEffect(()=>{

        setLocationsToRequest(convertDataFromLocations(locations));
    },[locations]);

    return <div className='weatherWrapper'>
        {
            locations.map(
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
                            handleUpdate={handleUpdate}
                            errorAtLocationFetch={!!locationsToRequest.find(el=>(el.id===id && el.error))}
                        />
                    </div>)
        }
    </div>
}

export default WeatherWidget;
