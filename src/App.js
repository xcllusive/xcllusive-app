import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { store } from './redux/store';
import { loginSuccess } from './redux/ducks/auth';
import Routes from './Routes';
import { theme } from './styles';

class App extends Component {
  componentDidMount() {
    // store.dispatch(store.dispatch(loginSuccess({name: 'Bruno'})))
    // this.removeListener = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     store.dispatch(loginSuccess(user))
    //   } else {
    //     store.dispatch(loginLoading(false))
    //   }
    // })
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
