const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_ICON_URL_GET = (code: string) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default {
    WEATHER_URL,
    WEATHER_ICON_URL_GET
}
