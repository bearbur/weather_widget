export interface City  {id: string, label: string, lat: number, lon: number}

export interface CityRequests  {id: string, label: string, lat: number, lon: number, processing: boolean, error: boolean, success: boolean, lastSync: number}

export interface CityInfo {id: string, label: string, lat: number, lon: number, tempC: number, weatherIcon: string, windMs: number,  pressure: number}



