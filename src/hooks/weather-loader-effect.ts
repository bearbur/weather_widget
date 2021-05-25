import {useEffect, useState} from 'react';
import {City} from "../interfaces/weather-list-interfaces";
import {getWeatherForCity} from "../helpers/request-former";

export const weatherLoaderEffect = (citiesForRequest: City[], setApiResponse: Function) => {


    useEffect(()=>{
        if(citiesForRequest.length === 0){
            return;
        }

        Promise.all(citiesForRequest.map(({lon, lat})=>getWeatherForCity(lat, lon))).then(resp=>{

        }).catch(e=>{

        })

    },[citiesForRequest])

}
