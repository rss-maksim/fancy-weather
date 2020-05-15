import {Lang, Units, unsplashUrl, weatherUrl} from '../../common/constants'
import {ICoords} from './types'

interface IOptions {
    units: Units
    lang: Lang
}

export const getWeatherByCoords = async ({ lat, lon }: ICoords, options: IOptions): Promise<void> => {
    const { units, lang } = options
    const url = `${weatherUrl}&lat=${lat}&lon=${lon}&units=${units}&lang=${lang.toLowerCase()}`
    try {
        const json = await fetch(url)
        return (await json.json())
    } catch (error) {
        console.error(error)
    }
}

export const getWeatherByAddress = async (place: string, options: IOptions): Promise<void> => {
    const { units, lang } = options
    const url = `${weatherUrl}&q=${place}&units=${units}&lang=${lang.toLowerCase()}`
    try {
        const json = await fetch(url)
        return (await json.json())
    } catch (error) {
        console.error(error)
    }
}

export const getCurrentLocation = (): Promise<ICoords> =>
    new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude: lat, longitude: lon } = position.coords
                resolve({ lat, lon })
            }, (error) => reject(error));
        } else {
            reject('Not supported')
        }
    })

export const getBackgroundUrl = async () => {
    try {
        const json = await fetch(unsplashUrl)
        const backgroundData = await json.json()
        return backgroundData?.urls?.regular
    } catch (error) {
        console.error(error)
    }
}