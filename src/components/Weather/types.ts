import {Lang, Units} from '../../common/constants'

export interface ICoords {
    lat: number
    lon: number
}

export interface IState {
    isLoading: boolean
    error: Error | null
    currentLocation: ICoords | null
    place: string | null
    weather: any
    backgroundUrl: string
    lang: Lang
    units: Units
}

export interface IContext {
    store: IState
    onRefresh?: () => void
    onLangChange?: (lang: Lang) => void
    onUnitsChange?: (units: Units) => void
    onAddressChange: (address: string) => void
}