export const API_KEY = process.env.REACT_APP_WEATHER_MAP_API_KEY
export const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY
export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export enum Units {
    metric = 'metric',
    imperial = 'imperial'
}

export enum Lang {
    en = 'EN',
    ru = 'RU',
    by = 'BY'
}

export const initialCenterMap = { lat: 27, lon: 53 }

export const weatherMapCommonUrl = 'http://api.openweathermap.org/data/2.5'
export const forecastUrl = `${weatherMapCommonUrl}/forecast?q=Minsk&APPID=${API_KEY}`
export const weatherUrl = `${weatherMapCommonUrl}/weather?APPID=${API_KEY}`

export const unsplashUrl = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=${UNSPLASH_ACCESS_KEY}`

export const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`




