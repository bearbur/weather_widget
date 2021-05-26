import { requestStates } from "../constants/request-constants"
import { CityRequests } from "../interfaces/weather-list-interfaces"

export const crossingLocationFilter = ({activeRequestedLocations, requestedLocations, requestState}:
    {activeRequestedLocations: CityRequests[], requestedLocations: CityRequests[], requestState: string})
    : CityRequests[] => {
    return [...requestedLocations].map(el=>{

        if(!!activeRequestedLocations.find(({id})=>(id===el.id))){
             return {...el,
                processing: requestState===requestStates.processing ? true : false,
                error: requestState===requestStates.error ? true : false,
                success: requestState===requestStates.success ? true : false}
        }

        return el

        })
}

export const getWindLabelByDeg = (windDeg: number) => {

    if((windDeg>=0 && windDeg<=45) || (windDeg > 315 && windDeg <= 360)){
        return 'Nord'
    }

    if(windDeg>45 && windDeg<=135){
        return 'Ost'
    }

    if(windDeg>135 && windDeg<=225){
        return 'South'
    }

    if(windDeg>225 && windDeg<=315){
        return 'West'
    }

}
