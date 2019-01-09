import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'

import { PrivateRoute, PublicRoute } from './components/routes'

import { Layout, LoginPage } from './pages'

const Routes = ({ isAuthenticated, isAppLoading, location, setTimeout }) => {
  if (isAppLoading) {
    return (
      <Dimmer page active>
        <Loader content="Loading..." />
      </Dimmer>
    )
  }

  return (
    <Switch>
      <PublicRoute exact location={location} path="/auth" component={LoginPage} />
      <PrivateRoute path="/" component={Layout} authenticated={isAuthenticated} />
    </Switch>
  )
}

Routes.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAppLoading: PropTypes.bool,
  location: PropTypes.object,
  setTimeout: PropTypes.func
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  isAppLoading: auth.isAppLoading
})

export default connect(mapStateToProps)(Routes)
