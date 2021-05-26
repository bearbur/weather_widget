import {useEffect} from 'react';
import {CityRequests} from "../interfaces/weather-list-interfaces";
import {getWeatherForCity} from "../helpers/request-former";

export const weatherLoaderEffect = (
    citiesForRequest: CityRequests[], 
    handleProcessing: Function, 
    handleSuccess: Function,
     handleFailure: Function, 
     handleLocationWeatherInfo: Function 
     ) => {

    useEffect(()=>{
        if(citiesForRequest.length === 0){
            return;
        }

        const locationsForRequest = [...citiesForRequest].filter(({processing, success, error})=>!processing && !success && !error);

        if(locationsForRequest.length ===0){
            return;
        }

        handleProcessing({cities: locationsForRequest});

        Promise.all(locationsForRequest.map(({lon, lat})=>getWeatherForCity(lat, lon))).then(resp=>{
            handleSuccess({cities: locationsForRequest.map(el=> (
                {
                    ...el,
                    processing: false,
                    error: false,
                    lastSync: new Date().getTime(),
                    success: true
                }))
            });
            handleLocationWeatherInfo({weatherInfo: locationsForRequest.map(({id},locKey)=>({[id]:resp[locKey]}))})
        }).catch(e=>{
            handleFailure({cities: locationsForRequest.map(el=>({...el, processing: false, error: true}))})
        })

    },[citiesForRequest])

}
