import { requestStates } from '../constants/request-constants';
import { City, CityRequests } from '../interfaces/weather-list-interfaces';

export const crossingLocationFilter = ({
    activeRequestedLocations,
    requestedLocations,
    requestState,
}: {
    activeRequestedLocations: CityRequests[];
    requestedLocations: CityRequests[];
    requestState: string;
}): CityRequests[] => {
    return [...requestedLocations].map((el) => {
        const activeLocationRequest = activeRequestedLocations.find(({ id }) => id === el.id);

        if (!!activeLocationRequest) {
            return {
                ...el,
                processing:
                    requestState === requestStates.update
                        ? false
                        : requestState === requestStates.processing
                        ? true
                        : el.processing,
                error:
                    requestState === requestStates.update
                        ? false
                        : requestState === requestStates.error
                        ? true
                        : el.error,
                success:
                    requestState === requestStates.update
                        ? false
                        : requestState === requestStates.success
                        ? true
                        : el.success,
                lastSync: requestState === requestStates.success ? activeLocationRequest.lastSync : el.lastSync,
            };
        }

        return el;
    });
};

export const getWindLabelByDeg = (windDeg: number) => {
    if ((windDeg >= 0 && windDeg <= 45) || (windDeg > 315 && windDeg <= 360)) {
        return 'Nord';
    }

    if (windDeg > 45 && windDeg <= 135) {
        return 'Ost';
    }

    if (windDeg > 135 && windDeg <= 225) {
        return 'South';
    }

    if (windDeg > 225 && windDeg <= 315) {
        return 'West';
    }
};

export const convertDataFromLocations = (locations: City[]) =>
    [...locations].map(({ id, lat, lon, label }) => ({
        id,
        lat,
        lon,
        label,
        processing: false,
        error: false,
        lastSync: -1,
        success: false,
    }));
