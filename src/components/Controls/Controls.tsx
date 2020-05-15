import React, { ChangeEvent, useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import SyncIcon from '@material-ui/icons/Sync'
import { common } from '@material-ui/core/colors'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import { WeatherContext, IContext } from '../Weather'
import {Lang, Units} from '../../common/constants'
import {Autocomplete} from './components'

import './index.scss'

export const Controls = () => {
    const context = useContext<IContext>(WeatherContext)
    const { store, onLangChange, onUnitsChange, onRefresh, onAddressChange } = context
    const { lang, units } = store

    const handleLangChange = (event: ChangeEvent<{ value: unknown }>) =>
        onLangChange && onLangChange(event.target.value as Lang)

    const handleUnitsChange = (event: React.MouseEvent<HTMLElement>, newUnits: Units) => {
        if (onUnitsChange && newUnits) {
             onUnitsChange(newUnits)
        }
    }

    return (
        <div className="controls-container">
            <div>
                <IconButton aria-label="sync" title={'Refresh'} onClick={onRefresh} color="primary">
                    <SyncIcon fontSize="small" htmlColor={common.white} />
                </IconButton>
            </div>

            <FormControl variant="outlined" className="form-container" size="small" color="primary">
                <Select
                    defaultValue={Lang.en}
                    value={lang}
                    onChange={handleLangChange}
                    inputProps={{
                        classes: {
                            icon: 'select-icon',
                        }
                    }}
                    className="select"
                >
                    {Object.keys(Lang).map((key) => {
                        // @ts-ignore
                        const value = Lang[key]
                        return <MenuItem key={key} value={value}>{value}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <ToggleButtonGroup
                className="toggle-button-container"
                value={units}
                exclusive
                onChange={handleUnitsChange}
                aria-label="units"
            >
                <ToggleButton value={Units.metric} aria-label={Units.metric}>
                    &#8451;
                </ToggleButton>
                <ToggleButton value={Units.imperial} aria-label={Units.imperial}>
                    &#8457;
                </ToggleButton>
            </ToggleButtonGroup>

            <div className="autocomplete-container">
                <Autocomplete onChange={onAddressChange} />
            </div>
        </div>
    )
}