import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Icon, Header } from 'semantic-ui-react'
import { ToastContainer } from 'react-toastify'
import { AuthorizationRoute } from '../components/routes'
import { logout } from '../redux/ducks/auth'
import 'react-toastify/dist/ReactToastify.css'

import ModalRoot from '../components/modal/ModalRoot'
import { NotFoundPage } from './'
import DashBoardPage from './DashBoard'
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
import ManagementPage from './Management/Management'
import ClientManagerList from './ClientManager/ClientManagerList'
import AgreementPage from './Business/Agreement/BusinessAgreementFields'
import PreviewAgreement from './Business/Agreement/PreviewAgreement'
import MakeTaxInvoice from './Business/Invoice/MakeTaxInvoice'
import AppraisalMenu from './Business/Appraisal/AppraisalMenu'
import AppraisalList from './Business/Appraisal/AppraisalList'
import HistoricalWeeklyReport from './Management/Xcllusive/Reports/HistoricalWeekly'
import BusinessesListPerAnalyst from './Management/Xcllusive/Reports/BusinessesListPerAnalyst'
import DailyTimeActivityReports from './Management/Xcllusive/Reports/DailyTimeActivity'
import BusinessesCtcListPerAnalyst from './Management/CTC/Reports/BusinessesListPerAnalyst'
import CtcBusinessList from './Business/CtcBusinessList'
import CtcBusinessesListPerOffice from './Management/Xcllusive/Reports/CtcBusinessesListPerOffice'
import AgreementInvoice from './Business/AgreementInvoice'
import ToolsAndDocs from './ToolsAndDocs/ToolsAndDocs'
import ShowEnquiries from './ClientManager/ShowEnquiries'

const Layout = ({ match, logout, menu, user }) => (
  <Fragment>
    <Menu inverted attached color="blue" size="small">
      <Menu.Item as={NavLink} to={`${match.url}`}>
        <Header inverted as="h4">
          Xcllusive
        </Header>
      </Menu.Item>
      {menu.map(item => {
        if (item === 'BUYER_MENU') {
          return <Menu.Item key={item} name="buyer" as={NavLink} to={`${match.url}buyer`} />
        }
        if (item === 'BUSINESS_MENU') {
          return <Menu.Item key={item} name="business" as={NavLink} to={`${match.url}business`} />
        }
        if (item === 'PRESALE_MENU') {
          return <Menu.Item key={item} name="pre sale" as={NavLink} to={`${match.url}presale`} />
        }
        if (item === 'TOOLS_AND_DOCS_MENU') {
          return <Menu.Item key={item} name="tools and docs" as={NavLink} to={`${match.url}toolsAndDocs`} />
        }
        if (item === 'CLIENT_MANAGER_MENU') {
          return <Menu.Item key={item} name="client manager" as={NavLink} to={`${match.url}clientManager`} />
        }
        if (item === 'MANAGEMENT_MENU') {
          return <Menu.Item key={item} name="management" as={NavLink} to={`${match.url}management`} />
        }
        if (item === 'SYSTEM_SETTINGS_MENU') {
          return <Menu.Item key={item} name="system settings" as={NavLink} to={`${match.url}systemSettings`} />
        }
        if (item === 'CTC_MENU') {
          return <Menu.Item key={item} name="ctc" as={NavLink} to={`${match.url}ctc`} />
        }
        // if (item === 'HELP_DESK_MENU') {
        //   return <Menu.Item key={item} name="help desk" as={NavLink} to={`${match.url}helpDesk`} />
        // }
      })}
      <Menu.Menu position="right">
        <Menu.Item onClick={() => logout(user)} position="right">
          <Icon name="toggle right" />
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <ToastContainer position="bottom-right" />
    <ModalRoot />
    <Switch>
      <Route exact component={DashBoardPage} path={`${match.path}`} />
      <AuthorizationRoute
        exact
        // component={ListPage}
        component={user.listingAgent ? ListPage : CtcBusinessList}
        path={`${match.path}business`}
        allowedRoles="BUSINESS_MENU"
      />
      <AuthorizationRoute exact component={EditPage} path={`${match.path}business/:id`} allowedRoles="BUSINESS_MENU" />
      <AuthorizationRoute
        exact
        component={EditPage}
        path={`${match.path}business/:id/from-buyer`}
        allowedRoles="BUYER_MENU"
      />
      <AuthorizationRoute
        exact
        component={AgreementPage}
        path={`${match.path}business/:id/agreement/:idAgreement`}
        allowedRoles="BUSINESS_MENU"
      />
      <AuthorizationRoute
        exact
        component={PreviewAgreement}
        path={`${match.path}business/:id/agreement/:idAgreement/preview`}
        allowedRoles="BUSINESS_MENU"
      />
      <AuthorizationRoute
        exact
        component={MakeTaxInvoice}
        path={`${match.path}business/:id/invoice`}
        allowedRoles="BUSINESS_MENU"
      />
      <AuthorizationRoute
        exact
        component={AppraisalList}
        path={`${match.path}business/:id/appraisalList`}
        allowedRoles="BUSINESS_MENU"
      />
      <AuthorizationRoute
        exact
        component={AppraisalMenu}
        path={`${match.path}business/:id/appraisalMenu`}
        allowedRoles="BUSINESS_MENU"
      />
      <AuthorizationRoute
        exact
        component={AgreementInvoice}
        path={`${match.path}business/:id/agreementInvoice`}
        allowedRoles="BUSINESS_MENU"
      />
      {/* <Route
        exact
        component={LogPage}
        path={`${match.path}business/:id/log/:logID`}
      /> */}
      <AuthorizationRoute
        exact
        component={LogPage}
        path={`${match.path}business/:id/log`}
        allowedRoles="BUSINESS_MENU"
      />
      <AuthorizationRoute
        exact
        component={LogPage}
        path={`${match.path}business/:id/log/from-buyer`}
        allowedRoles="BUYER_MENU"
      />
      <AuthorizationRoute exact component={BuyerPage} path={`${match.path}buyer`} allowedRoles="BUYER_MENU" />
      <AuthorizationRoute
        exact
        component={BuyerDetailsCM}
        path={`${match.path}clientManager/buyer/:id`}
        allowedRoles="CLIENT_MANAGER_MENU"
      />
      <AuthorizationRoute
        exact
        component={ShowEnquiries}
        path={`${match.path}clientManager/enquiries/:idBusiness`}
        allowedRoles="CLIENT_MANAGER_MENU"
      />
      <AuthorizationRoute
        exact
        component={BuyerDetails}
        path={`${match.path}buyer/:idBuyer/business/:idBusiness`}
        allowedRoles="BUYER_MENU"
      />
      <AuthorizationRoute
        exact
        component={BuyerList}
        path={`${match.path}buyer/business/:id`}
        allowedRoles="BUYER_MENU"
      />
      <AuthorizationRoute
        exact
        component={ScoreList}
        path={`${match.path}buyer/business/:id/score-list`}
        allowedRoles="BUYER_MENU"
      />
      <AuthorizationRoute
        exact
        component={MakeNewScore}
        path={`${match.path}buyer/business/:idBusiness/make-new-score`}
        allowedRoles="BUYER_MENU"
      />
      <AuthorizationRoute
        exact
        component={MakeNewScore}
        path={`${match.path}buyer/business/:idBusiness/make-new-score/:idScore`}
        allowedRoles="BUYER_MENU"
      />
      <Route render={() => <span>presale</span>} path={`${match.path}presale`} />
      {/* <Route render={() => <span>resources</span>} path={`${match.path}resources`} /> */}
      <AuthorizationRoute
        component={ToolsAndDocs}
        path={`${match.path}toolsAndDocs`}
        allowedRoles="TOOLS_AND_DOCS_MENU"
      />
      <AuthorizationRoute
        component={ClientManagerList}
        path={`${match.path}clientManager`}
        allowedRoles="CLIENT_MANAGER_MENU"
      />
      <AuthorizationRoute
        exact
        component={ManagementPage}
        path={`${match.path}management`}
        allowedRoles="MANAGEMENT_MENU"
      />
      <AuthorizationRoute
        exact
        component={BusinessesListPerAnalyst}
        path={`${match.path}management/businesses-list-analyst/:idUser`}
        allowedRoles="MANAGEMENT_MENU"
      />
      <AuthorizationRoute
        exact
        component={CtcBusinessesListPerOffice}
        path={`${match.path}management/ctc-businesses-list-office/:dataRegion`}
        allowedRoles="MANAGEMENT_MENU"
      />
      <AuthorizationRoute
        exact
        component={HistoricalWeeklyReport}
        path={`${match.path}management/historical-weekly-report/:idBusiness`}
        allowedRoles="MANAGEMENT_MENU"
      />
      <AuthorizationRoute
        exact
        component={DailyTimeActivityReports}
        path={`${match.path}management/daily-time-activity-report`}
        allowedRoles="MANAGEMENT_MENU"
      />
      <AuthorizationRoute
        exact
        component={BusinessesCtcListPerAnalyst}
        path={`${match.path}management/ctc/businesses-list-analyst/:idUser`}
        allowedRoles="MANAGEMENT_MENU"
      />
      <AuthorizationRoute
        exact
        component={UserPage}
        path={`${match.path}systemSettings`}
        allowedRoles="SYSTEM_SETTINGS_MENU"
      />
      <Route render={() => <span>ctc</span>} path={`${match.path}ctc`} />
      {/* <AuthorizationRoute exact component={<span>ctc</span>} path={`${match.path}ctc`} allowedRoles="CTC_MENU" /> */}
      {/* <AuthorizationRoute exact component={HelpDesk} path={`${match.path}helpDesk`} allowedRoles="HELP_DESK_MENU" /> */}
      <Route
        render={() => <span>Sorry, You don`t have permission to access this page!</span>}
        path={`${match.path}unathorized`}
      />
      <Route component={NotFoundPage} />
      <Redirect to={`${match.url}`} />
    </Switch>
  </Fragment>
)

Layout.propTypes = {
  match: PropTypes.object,
  logout: PropTypes.func,
  menu: PropTypes.array,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  menu: state.auth.user.roles,
  user: state.auth.user.userObj
})

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
