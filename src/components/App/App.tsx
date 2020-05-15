import React, { useRef } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import moment from 'moment'

import { Controls, Weather } from '../'
import { theme } from '../../theme'
import { googleMapsUrl, loadScript } from '../../common'

import './styles.css'

function App() {
    const loaded = useRef(false)

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                googleMapsUrl,
                document.querySelector('head'),
                'google-maps',
            );
        }
        loaded.current = true
    }

  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <Weather>
                  <Controls />
                  <div>
                      {moment().format('dddd D MMMM YYYY h:mm')}
                  </div>
              </Weather>
          </div>
      </ThemeProvider>
  )
}

export default App
