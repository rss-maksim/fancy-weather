import React, {useContext} from 'react'
import {Map as GoogleMap, GoogleApiWrapper, Marker, GoogleAPI} from 'google-maps-react'

import {IContext, WeatherContext} from '../Weather'
import {initialCenterMap} from '../../common/constants'

const mapStyles = {
    width: '100%',
    height: '100%'
}

interface IProps {
    google: GoogleAPI
}

export const MapComponent = ({ google }: IProps) => {
    const context = useContext<IContext>(WeatherContext)
    const { store } = context
    const { currentLocation } = store

    const onMarkerClick = () => null

    return (
        <GoogleMap
            google={google}
            style={mapStyles}
            initialCenter={currentLocation ? currentLocation : initialCenterMap }
        >
            <Marker
                onClick={onMarkerClick}
            />
        </GoogleMap>
    )
}

export const Map = GoogleApiWrapper({
    apiKey: ''
})(MapComponent);