import React from 'react';
import { CityInfo } from '../../../interfaces/weather-list-interfaces';
import WeatherIconView from '../weather-icon-view/weather-icon-view';
import { getWindLabelByDeg } from '../../../helpers/weather-location-utils';

const LocationCard = ({
    location,
    handleUpdate,
    errorAtLocationFetch,
}: {
    location: CityInfo;
    handleUpdate: /* tslint:disable */ Function /* tslint:enable */;
    errorAtLocationFetch: boolean;
}) => {
    const { weatherIcon, label, weatherMain, tempC, windMs, windDeg, pressure, id, lat, lon } = location;

    const handleClickOnCard = () => {
        handleUpdate({
            cities: [
                {
                    id,
                    lat,
                    lon,
                    label,
                    processing: false,
                    error: false,
                    lastSync: -1,
                    success: false,
                },
            ],
        });
    };

    const showInfo = !errorAtLocationFetch;

    return (
        <div className={'cityCard'} onClick={handleClickOnCard}>
            {showInfo && <WeatherIconView iconLink={weatherIcon} />}
            <div className={'locationLabel'}>
                <span>{label}</span>
                {showInfo && <span className={'locationLabelMain'}>{weatherMain}</span>}
                {errorAtLocationFetch && <span className={'locationLabelMain loadError'}>{`Error :(`}</span>}
            </div>
            {showInfo && (
                <div className={'weatherDataRow locationTemperature'}>
                    <span>{tempC}</span>
                </div>
            )}
            {showInfo && (
                <div className={'weatherDataRow locationWind'}>
                    <span>{`${windMs}`}</span>
                    <span className={'windDirection'}>{getWindLabelByDeg(windDeg)}</span>
                </div>
            )}
            {showInfo && (
                <div className={'weatherDataRow locationPressure'}>
                    <span>{pressure}</span>
                </div>
            )}

            {showInfo && (
                <div className={'weatherDataRowLabels locationTemperature'}>
                    <span>{'Temp, C'}</span>
                </div>
            )}
            {showInfo && (
                <div className={'weatherDataRowLabels locationWind'}>
                    <span>{'Wind, m/s'}</span>
                </div>
            )}
            {showInfo && (
                <div className={'weatherDataRowLabels locationPressure'}>
                    <span>{'Pressure, hPa'}</span>
                </div>
            )}
        </div>
    );
};

export default LocationCard;
