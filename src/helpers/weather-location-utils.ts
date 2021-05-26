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