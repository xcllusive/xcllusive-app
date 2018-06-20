import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Icon, Header } from 'semantic-ui-react'
import { ToastContainer } from 'react-toastify'
import { logout } from '../redux/ducks/auth'

import ModalRoot from '../components/modal/ModalRoot'
import { NotFoundPage } from './'
import ListPage from './Business/BusinessList'
import EditPage from './Business/BusinessEdit'
import LogPage from './Business/BusinessLog'
import BuyerPage from './Buyer/Buyer'
import BuyerDetailsCM from './ClientManager/BuyerDetailsCM'
import BuyerList from './Buyer/BuyerList'
import BuyerDetails from './Buyer/BuyerDetails'
import ScoreList from './Buyer/ScoreList'
import MakeNewScore from './Buyer/MakeNewScore'
import UserPage from './SystemSettings/SystemSettings'
import ClientManagerList from './ClientManager/ClientManagerList'

import PdfScore from '../components/pdf/PdfScore'

const Layout = ({ match, logout, menu }) => (
  <Fragment>
    <Menu inverted attached color="blue" size="small">
      <Menu.Item as={NavLink} to={`${match.url}dashboard`}>
        <Header inverted as="h4">
          Xcllusive
        </Header>
      </Menu.Item>
      {menu.map(item => {
        if (item === 'BUYER_MENU') {
          return (
            <Menu.Item
              key={item}
              name="buyer"
              as={NavLink}
              to={`${match.url}buyer`}
            />
          )
        }
        if (item === 'BUSINESS_MENU') {
          return (
            <Menu.Item
              key={item}
              name="business"
              as={NavLink}
              to={`${match.url}business`}
            />
          )
        }
        if (item === 'PRESALE_MENU') {
          return (
            <Menu.Item
              key={item}
              name="pre sale"
              as={NavLink}
              to={`${match.url}presale`}
            />
          )
        }
        if (item === 'RESOURCES_MENU') {
          return (
            <Menu.Item
              key={item}
              name="resources"
              as={NavLink}
              to={`${match.url}resources`}
            />
          )
        }
        if (item === 'CLIENT_MANAGER_MENU') {
          return (
            <Menu.Item
              key={item}
              name="client manager"
              as={NavLink}
              to={`${match.url}clientManager`}
            />
          )
        }
        if (item === 'SYSTEM_SETTINGS_MENU') {
          return (
            <Menu.Item
              key={item}
              name="system settings"
              as={NavLink}
              to={`${match.url}systemSettings`}
            />
          )
        }
      })}
      <Menu.Menu position="right">
        <Menu.Item onClick={() => logout()} position="right">
          <Icon name="toggle right" />
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <ToastContainer position="bottom-right" />
    <ModalRoot />
    <Switch>
      <Route
        exact
        // render={() => <span>dashboard</span>}
        component={PdfScore}
        path={`${match.path}`}
      />
      <Route exact component={ListPage} path={`${match.path}business`} />
      <Route exact component={EditPage} path={`${match.path}business/:id`} />
      {/* <Route
        exact
        component={LogPage}
        path={`${match.path}business/:id/log/:logID`}
      /> */}
      <Route exact component={LogPage} path={`${match.path}business/:id/log`} />
      <Route exact component={BuyerPage} path={`${match.path}buyer`} />
      <Route
        exact
        component={BuyerDetailsCM}
        path={`${match.path}clientManager/buyer/:id`}
      />
      <Route
        exact
        component={BuyerDetails}
        path={`${match.path}buyer/:idBuyer/business/:idBusiness`}
      />
      <Route
        exact
        component={BuyerList}
        path={`${match.path}buyer/business/:id`}
      />
      <Route
        exact
        component={ScoreList}
        path={`${match.path}buyer/business/:id/score-list`}
      />
      <Route
        exact
        component={MakeNewScore}
        path={`${match.path}buyer/business/:idBusiness/make-new-score`}
      />
      <Route
        exact
        component={MakeNewScore}
        path={`${match.path}buyer/business/:idBusiness/make-new-score/:idScore`}
      />
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
  </Fragment>
)

Layout.propTypes = {
  match: PropTypes.object,
  logout: PropTypes.func,
  menu: PropTypes.array
}

const mapStateToProps = state => ({
  menu: state.auth.user.roles
})

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
