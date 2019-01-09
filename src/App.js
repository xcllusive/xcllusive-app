import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import moment from 'moment'
import IdleTimer from 'react-idle-timer'

import { store } from './redux/store'
import { loginWithToken, loginAppLoading, logout } from './redux/ducks/auth'
import Routes from './Routes'
import { theme } from './styles'

import setAuthorizationHeader from './utils/setAuthorizationHeader'

moment.locale('en-au', {
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  }
})

class App extends Component {
  constructor (props) {
    super(props)
    this.idleTimer = null
    this.state = {
      timeout: 1 * 60 * 60 * 1000 // hours * 60 * 60 * 1000 = milliseconds
    }
  }

  componentDidMount () {
    if (window.localStorage.xcllusiveJWT) {
      setAuthorizationHeader(window.localStorage.xcllusiveJWT)
      store.dispatch(loginWithToken())
    } else {
      store.dispatch(loginAppLoading(false))
    }
  }

  _onIdle = () => {
    const token = window.localStorage.getItem('xcllusiveJWT')
    token && store.dispatch(logout('You were disconnected for inactivity.'))
  }

  render () {
    return (
      <Fragment>
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref
          }}
          onIdle={this._onIdle}
          timeout={this.state.timeout}
          debounce={250}
          startOnLoad
        />
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Route component={Routes} />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </Fragment>
    )
  }
}

export default App
