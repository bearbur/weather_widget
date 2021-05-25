import apiKeys from '../constants/api-keys'
import apiUrls from '../constants/api-urls'

// Get method implementation for request of weather:
export async function getWeatherForCity(
    lat:number,
    lon:number,
    dayLimit: number = 1,
    lang: string = 'ru_RU',
    extra: boolean = false,
    url:string = apiUrls.YANDEX_WEATHER_URL,
    headerApiKey: string = apiKeys.YANDEX_WEATHER_API_KEY) {

    const response = await fetch(`${url}?lat=${lat}&lon=${lon}&limit=${dayLimit}&lang=${lang}&extra=${extra}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-Yandex-API-Key': headerApiKey,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

