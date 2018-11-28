import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AuthorizationRoute = ({ allowedRoles, userRoles, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      allowedRoles.includes(userRoles) ? (
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

AuthorizationRoute.propTypes = {
  component: PropTypes.func.isRequired,
  allowedRoles: PropTypes.array.isRequired,
  userRoles: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  userRoles: auth.user.roles
})

export default connect(mapStateToProps)(AuthorizationRoute)
