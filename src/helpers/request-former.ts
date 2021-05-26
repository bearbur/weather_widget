import apiKeys from '../constants/api-keys'
import apiUrls from '../constants/api-urls'
import axios from "axios";

// Get method implementation for request of weather:
export   function getWeatherForCity  (
    lat:number,
    lon:number,
    url:string = apiUrls.WEATHER_URL,
    apiKey: string = apiKeys.WEATHER_API_KEY) {

    return axios.get(`${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
}

