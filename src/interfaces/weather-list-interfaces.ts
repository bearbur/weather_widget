export interface City  {id: string, label: string, lat: number, lon: number}

export interface CityRequests  {id: string, label: string, lat: number, lon: number, processing: boolean, error: boolean, success: boolean, lastSync: number}

export interface CityInfo {id: string, label: string, lat: number, lon: number, tempC: number, weatherIcon: string, windMs: number,  pressure: number}

export interface WeatherInfoResponse {
    coord: {
        "lat": number,
        "lon": number
    },
    weather: [
        {"id": number,
        "main": string,
        "description": string,
        "icon": string}
    ],
    main: {
        "temp": number,
        "pressure": number
    },
    wind: {
        "speed": number,
        "deg": number,
        "gust": number
    },
    clouds: {
        "all": number
    },
    "name": string
}



