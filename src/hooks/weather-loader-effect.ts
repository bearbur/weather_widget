import {useEffect} from 'react';
import {CityRequests, WeatherInfoResponse} from "../interfaces/weather-list-interfaces";
import {getWeatherForCity} from "../helpers/request-former";
import {AxiosResponse} from "axios";

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

        Promise.all(locationsForRequest.map(({lon, lat})=>getWeatherForCity(lat, lon))).then( (resp: (AxiosResponse<any>[] | {data: WeatherInfoResponse}[])) =>{
            handleSuccess({cities: locationsForRequest.map(el=> (
                {
                    ...el,
                    processing: false,
                    error: false,
                    lastSync: new Date().getTime(),
                    success: true
                }))
            });
            handleLocationWeatherInfo({weatherInfoAsArray: locationsForRequest.map(({id},locKey)=>({[id]:!!resp[locKey]['data'] ? resp[locKey]['data'] : null}))})
        }).catch(e=>{
            handleFailure({cities: locationsForRequest.map(el=>({...el, processing: false, error: true}))})
        })

    },[citiesForRequest])

}
