import {useEffect} from 'react';
import {CityRequests} from "../interfaces/weather-list-interfaces";
import {getWeatherForCity} from "../helpers/request-former";

export const weatherLoaderEffect = (citiesForRequest: CityRequests[], handleProcessing: Function, handleSuccess: Function, handleFailure: Function ) => {

    useEffect(()=>{
        if(citiesForRequest.length === 0){
            return;
        }

        handleProcessing({cities: citiesForRequest.map(el=>({...el, processing: true, error: false, success: false}))});

        Promise.all([...citiesForRequest].map(({lon, lat})=>getWeatherForCity(lat, lon))).then(resp=>{
            handleSuccess({cities: citiesForRequest.map(el=> (
                {
                    ...el,
                    resp,
                    processing: false,
                    error: false,
                    lastSync: new Date().getTime(),
                    success: true
                }))
            });
        }).catch(e=>{
            handleFailure({cities: citiesForRequest.map(el=>({...el, processing: false, error: true}))})
        })

    },[citiesForRequest])

}
