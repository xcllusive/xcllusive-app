import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
// import _ from 'lodash'

const AuthorizationRoute = ({ allowedRoles, userRoles, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        // userRoles.map(role => {
        //   return allowedRoles.includes(role)
        // }) ? (
        userRoles.includes(allowedRoles) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/unathorized',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

AuthorizationRoute.propTypes = {
  component: PropTypes.func.isRequired,
  allowedRoles: PropTypes.string.isRequired,
  userRoles: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  userRoles: auth.user.roles
})

export default connect(mapStateToProps)(AuthorizationRoute)
