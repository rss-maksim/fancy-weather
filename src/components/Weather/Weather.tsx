import React, { Component, ReactNode } from 'react'

import {getBackgroundUrl, getCurrentLocation, getWeatherByAddress, getWeatherByCoords} from './services'
import {IContext, IState } from './types'
import {Progress} from '../Progress'
import {initialCenterMap, Lang, Units} from '../../common/constants'

import './index.scss'

interface IProps {}

const defaultState: IState = {
    isLoading: false,
    error: null,
    currentLocation: initialCenterMap,
    place: null,
    weather: null,
    backgroundUrl: '',
    lang: Lang.en,
    units: Units.metric
}

export const WeatherContext = React.createContext<IContext>({
    store: defaultState,
    onAddressChange: (address: any) => null
});

export class Weather extends Component<IProps, IState> {
    state: IState = defaultState
    public componentDidMount(): void {
        this.fetchAll()
    }

    componentDidCatch(error: Error): void {
        this.setState({ error })
    }

    public fetchAll = async (place?: string): Promise<void> => {
        const { lang, units } = this.state
        this.setState( { isLoading: true })
        try {
            const currentLocation = await getCurrentLocation()
            const getWeather = place
                ? getWeatherByAddress(place, { lang, units })
                : getWeatherByCoords(currentLocation, { lang, units })
            const [ weather, backgroundUrl] = await Promise.all([
                getWeather,
                getBackgroundUrl()
            ])
            this.setState({ backgroundUrl, weather, currentLocation })
            console.log('data', { backgroundUrl, weather, currentLocation })
        } catch (error) {
            this.setState({ error })
            console.error(error)
        } finally {
            this.setState( { isLoading: false })
        }
    }

    public handleLanguageChange = (lang: Lang) => this.setState({ lang }, () => this.fetchAll())

    public handleUnitsChange = (units: Units) => this.setState({ units }, () => this.fetchAll())

    public handleAddressChange = (place: string) => this.setState({ place }, () => {
        const { place } = this.state
        if (place) {
            this.fetchAll(place)
        }
    })

    render(): ReactNode {
        const context: IContext = {
            store: this.state,
            onRefresh: this.fetchAll,
            onLangChange: this.handleLanguageChange,
            onUnitsChange: this.handleUnitsChange,
            onAddressChange: this.handleAddressChange
        }
        const { backgroundUrl, isLoading, error } = this.state

        if (error) {
            return <div>Something went wrong</div>
        }

        let containerStyle
        if (backgroundUrl) {
            containerStyle = { backgroundImage: `url(${backgroundUrl})` }
        }
        return (
            <WeatherContext.Provider value={context}>
                <div style={containerStyle} className="app-container">
                    {isLoading && <Progress />}
                    {this.props.children}
                </div>
            </WeatherContext.Provider>
        )
    }
}