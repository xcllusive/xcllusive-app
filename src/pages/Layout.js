import React, { Component } from 'react';

import { Route, Switch, NavLink, Redirect, Link } from 'react-router-dom';
import {
  Container,
  Sidebar,
  Segment,
  Menu,
  Image,
  Icon,
  Header
} from 'semantic-ui-react';
import styled from 'styled-components';

/* redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListPage from './Business/BusinessList';
import EditPage from './Business/BusinessEdit';
import LogPage from './Business/BusinessLog';

const Wrapper = styled.div`
  min-height: 100vh !important;
`;

const Layout = ({ match }) => (
  <div>
    <Menu pointing secondary attached="top">
      <Menu.Item as={NavLink} to={`${match.url}dashboard`}>
        <Header as="h2">Xcllusive </Header>
      </Menu.Item>
      <Menu.Item name="buyer" as={NavLink} to={`${match.url}buyer`} />
      <Menu.Item name="business" as={NavLink} to={`${match.url}business`} />
      <Menu.Item name="presale" as={NavLink} to={`${match.url}presale`} />
      <Menu.Item name="resources" as={NavLink} to={`${match.url}resources`} />
      <Menu.Item
        name="client manager"
        as={NavLink}
        to={`${match.url}clientManager`}
      />
      <Menu.Menu position="right">
        <Menu.Item onClick={() => {}} position="right">
          <Icon name="toggle right" />
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <Container fluid>
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
        <Route path={`${match.path}buyer`} exact component={LogPage} />
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
        <Route render={() => <span>not found!</span>} />
        <Redirect to={`${match.url}`} />
      </Switch>
    </Container>
  </div>
);

const mapStateToprops = state => ({
  state
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default Layout;
