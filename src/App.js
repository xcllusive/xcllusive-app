import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import moment from 'moment'
import IdleTimer from 'react-idle-timer'

import { store } from './redux/store'
import { loginWithToken, loginAppLoading } from './redux/ducks/auth'
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
  }

  componentDidMount () {
    if (window.localStorage.xcllusiveJWT) {
      setAuthorizationHeader(window.localStorage.xcllusiveJWT)
      store.dispatch(loginWithToken())
    } else {
      store.dispatch(loginAppLoading(false))
    }

    console.log(this.idleTimer)
  }

  _onAction (e) {
    console.log('user did something', e)
  }

  _onActive (e) {
    console.log('user is active', e)
    console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  _onIdle (e) {
    console.log('user is idle', e)
    console.log('last active', this.idleTimer.getLastActiveTime())
  }

  render () {
    return (
      <Fragment>
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref
          }}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          timeout={10}
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
