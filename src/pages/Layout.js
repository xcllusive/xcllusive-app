import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Icon, Header } from 'semantic-ui-react'

import { logout } from '../redux/ducks/auth'

import { NotFoundPage } from './'

import ListPage from './Business/BusinessList'
import EditPage from './Business/BusinessEdit'
import LogPage from './Business/BusinessLog'
import BuyerPage from './Buyer/Buyer'
import UserPage from './SystemSettings/SystemSettings'
import ClientManagerList from './ClientManager/ClientManagerList'

const Layout = ({ match, logout }) => (
  <div>
    <Menu pointing stackable secondary attached='top' color={'blue'}>
      <Menu.Item as={NavLink} to={`${match.url}dashboard`}>
        <Header as='h2'>Xcllusive</Header>
      </Menu.Item>
      <Menu.Item name='buyer' as={NavLink} to={`${match.url}buyer`} />
      <Menu.Item name='business' as={NavLink} to={`${match.url}business`} />
      <Menu.Item name='pre sale' as={NavLink} to={`${match.url}presale`} />
      <Menu.Item name='resources' as={NavLink} to={`${match.url}resources`} />
      <Menu.Item name='client manager' as={NavLink} to={`${match.url}clientManager`} />
      <Menu.Item name='system settings' as={NavLink} to={`${match.url}systemSettings`} />
      <Menu.Menu position='right'>
        <Menu.Item onClick={() => logout()} position='right'>
          <Icon name='toggle right' />
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <Switch>
      <Route
        exact
        render={() => <span>dashboard</span>}
        path={`${match.path}`}
      />
      <Route exact component={ListPage} path={`${match.path}business`} />
      <Route
        exact
        component={EditPage}
        path={`${match.path}business/:businessID`}
      />
      <Route
        component={LogPage}
        path={`${match.path}business/:businessID/:logID`}
      />
      <Route exact component={BuyerPage} path={`${match.path}buyer`} />
      <Route
        render={() => <span>presale</span>}
        path={`${match.path}presale`}
      />
      <Route
        render={() => <span>resources</span>}
        path={`${match.path}resources`}
      />
      <Route
        component={ClientManagerList}
        path={`${match.path}clientManager`}
      />
      <Route exact component={UserPage} path={`${match.path}systemSettings`} />
      <Route component={NotFoundPage} />
      <Redirect to={`${match.url}`} />
    </Switch>
  </div>
)

Layout.propTypes = {
  match: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = state => {
  return {
    menu: state.auth.user.menu
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)