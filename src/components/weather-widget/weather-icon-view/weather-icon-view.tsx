import React from 'react';
import API_URLS from '../../../constants/api-urls'

const WetherIconView = ({iconLink}: {iconLink: string}) => {


    return <div className={'weatherIcon'}>
        <img className={'weatherIconImg'} src={API_URLS.WEATHER_ICON_URL_GET(iconLink)} alt={': - ('} />
    </div>
}

export default WetherIconView;
