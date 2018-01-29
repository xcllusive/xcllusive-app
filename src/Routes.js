import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import { Layout, LoginPage } from './pages';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Routes = ({ isAuthenticated, isAppLoading }) => {
  if (isAppLoading) {
    return (
      <Dimmer page active>
        <Loader content="Carregando" />
      </Dimmer>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={LoginPage} />
          <PrivateRoute
            path="/"
            component={Layout}
            authenticated={isAuthenticated}
          />
          <Redirect to="/auth" />
        </Switch>
      </BrowserRouter>
    );
  }
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  isAppLoading: auth.isAppLoading
});

export default connect(mapStateToProps)(Routes);
