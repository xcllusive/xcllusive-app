import React from 'react';

import { Route, Switch, NavLink, Redirect } from 'react-router-dom';

import { Menu, Icon, Header } from 'semantic-ui-react';

import ListPage from './Business/BusinessList';
import EditPage from './Business/BusinessEdit';
import LogPage from './Business/BusinessLog';
import BuyerPage from './Buyer/Buyer';
import UserPage from './SystemSettings/SystemSettings';

const Layout = ({ match }) => (
  <div>
    <Menu pointing secondary attached="top" color={'blue'} stackable>
      <Menu.Item as={NavLink} to={`${match.url}dashboard`}>
        <Header as="h2">Xcllusive </Header>
      </Menu.Item>
      <Menu.Item name="buyer" as={NavLink} to={`${match.url}buyer`} />
      <Menu.Item name="business" as={NavLink} to={`${match.url}business`} />
      <Menu.Item name="pre sale" as={NavLink} to={`${match.url}presale`} />
      <Menu.Item name="resources" as={NavLink} to={`${match.url}resources`} />
      <Menu.Item
        name="client manager"
        as={NavLink}
        to={`${match.url}clientManager`}
      />
      <Menu.Item
        name="system settings"
        as={NavLink}
        to={`${match.url}systemSettings`}
      />
      <Menu.Menu position="right">
        <Menu.Item onClick={() => {}} position="right">
          <Icon name="toggle right" />
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <Switch>
      <Route
        path={`${match.path}`}
        exact
        render={() => <span>dashboard</span>}
      />
      <Route path={`${match.path}business`} exact component={ListPage} />
      <Route
        path={`${match.path}business/:businessID`}
        exact
        component={EditPage}
      />
      <Route
        path={`${match.path}business/:businessID/:logID`}
        component={LogPage}
      />
      <Route path={`${match.path}buyer`} exact component={BuyerPage} />
      <Route
        path={`${match.path}presale`}
        render={() => <span>presale</span>}
      />
      <Route
        path={`${match.path}resources`}
        render={() => <span>resources</span>}
      />
      <Route
        path={`${match.path}clientManager`}
        render={() => <span>clientManager</span>}
      />
      <Route path={`${match.path}systemSettings`} exact component={UserPage} />
      <Route render={() => <span>not found!</span>} />
      <Redirect to={`${match.url}`} />
    </Switch>
  </div>
);

export default Layout;
