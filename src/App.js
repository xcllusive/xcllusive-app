import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import moment from 'moment'

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
  componentWillMount () {
    if (window.localStorage.xcllusiveJWT) {
      setAuthorizationHeader(window.localStorage.xcllusiveJWT)
      store.dispatch(loginWithToken())
    } else {
      store.dispatch(loginAppLoading(false))
    }
  }

  render () {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Route component={Routes} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
