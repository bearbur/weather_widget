import { useEffect } from 'react';
import { CityRequests, WeatherInfoResponse } from '../interfaces/weather-list-interfaces';
import { getWeatherForCity } from '../helpers/request-former';
import { AxiosResponse } from 'axios';

export const weatherLoaderEffect = (
    citiesForRequest: CityRequests[],
    /* tslint:disable */ handleProcessing: Function /* tslint:enable */,
    /* tslint:disable */ handleSuccess: Function /* tslint:enable */,
    /* tslint:disable */ handleFailure: Function /* tslint:enable */,
    /* tslint:disable */ handleLocationWeatherInfo: Function /* tslint:enable */
) => {
    useEffect(() => {
        if (citiesForRequest.length === 0) {
            return;
        }

        const locationsForRequest = [...citiesForRequest].filter(
            ({ processing, success, error }) => !processing && !success && !error
        );

        if (locationsForRequest.length === 0) {
            return;
        }

        handleProcessing({ cities: locationsForRequest });

        Promise.all(locationsForRequest.map(({ lon, lat }) => getWeatherForCity(lat, lon)))
            .then((
                resp: /* tslint:disable */ AxiosResponse<any>[] | { data: WeatherInfoResponse }[] /* tslint:enable */
            ) => {
                handleSuccess({
                    cities: locationsForRequest.map((el) => ({
                        ...el,
                        processing: false,
                        error: false,
                        lastSync: new Date().getTime(),
                        success: true,
                    })),
                });
                handleLocationWeatherInfo({
                    weatherInfoAsArray: locationsForRequest.map(({ id }, locKey) => ({
                        [id]: !!resp[locKey].data ? resp[locKey].data : {},
                    })),
                });
            })
            .catch((e) => {
                handleFailure({ cities: locationsForRequest.map((el) => ({ ...el, processing: false, error: true })) });
            });
    }, [citiesForRequest]);
};
