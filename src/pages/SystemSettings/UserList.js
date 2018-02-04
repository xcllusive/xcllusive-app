import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUsers } from '../../redux/ducks/user';
import NewUserModal from './NewUserModal'

import styled from 'styled-components';

import {
  Table,
  Input,
  Checkbox,
  Grid,
  Button,
  Icon,
  Dimmer,
  Loader
} from 'semantic-ui-react';

import Wrapper from '../../components/Wrapper';

const CheckboxFormatted = styled.div`
  padding-right: 1em;
`;

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: true,
      staff: true,
      introducer: true,
      inputSearch: '',
      modalOpen: false,
      user: null
    };
  }

  componentWillMount() {
    this.props.getUsers();
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.setState(prevState => ({
      [value]: !prevState[value]
    }));
  };

  _onSearch = (e, { value }) => {
    this.setState({
      inputSearch: value
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.props.getUsers(value), 1000);
  };

  _toggleModal = (user, e) => {
    //e.preventDefault()
    //console.log(user)
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      user      
    }));
  };

  render() {
    if (this.state.modalOpen) {
      return <NewUserModal modalOpen={this.state.modalOpen} funcao={this._toggleModal} user={this.state.user} />
    }
    return (
      <Wrapper>
        <Grid padded='horizontally'>
          <Grid.Row>
            <Grid.Column width={5}>
              <Input
                fluid
                icon='search'
                placeholder='Find users...'
                onChange={this._onSearch}
                value={this.state.inputSearch}
              />
            </Grid.Column>
            <Grid.Column width={5} verticalAlign='middle'>
              <Checkbox
                as={CheckboxFormatted}
                label='Admin'
                value='admin'
                checked={this.state.admin === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='Staff'
                value='staff'
                checked={this.state.staff === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                label='Introducer'
                value='introducer'
                checked={this.state.introducer === true}
                onChange={this._handleChangeCheckBox}
              />
            </Grid.Column>
            <Grid.Column width={2} floated='right'>
              <Button onClick={this._toggleModal} color='facebook'>
                <Icon name='add' />
                New User
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Dimmer inverted active={this.props.isLoading}>
              <Loader inverted />
            </Dimmer>
            <Table color='blue' inverted selectable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>User Type</Table.HeaderCell>
                  <Table.HeaderCell>Listing Agent</Table.HeaderCell>
                  <Table.HeaderCell>Buyer</Table.HeaderCell>
                  <Table.HeaderCell>Business</Table.HeaderCell>
                  <Table.HeaderCell>Pre Sale</Table.HeaderCell> 
                  <Table.HeaderCell>Resources</Table.HeaderCell>
                  <Table.HeaderCell>Client Manager</Table.HeaderCell>
                  <Table.HeaderCell>System Settings</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.users.map(user => {
                  return (
                    <Table.Row active key={user.id}
                      onClick={ (e) => this._toggleModal(user, e) }>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                      <Table.Cell>{user.userTypeId}</Table.Cell>
                      <Table.Cell>{user.listingAgent}</Table.Cell>
                      <Table.Cell>{user.buyer}</Table.Cell>
                      <Table.Cell>{user.business}</Table.Cell>
                      <Table.Cell>{user.preSale}</Table.Cell>
                      <Table.Cell>{user.resources}</Table.Cell>
                      <Table.Cell>{user.clientManager}</Table.Cell>
                      <Table.Cell>{user.systemSettings}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading,
    users: state.user.users,
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUsers }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
