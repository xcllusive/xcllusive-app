import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import styled from 'styled-components'
import {
  Table,
  Input,
  Checkbox,
  Grid,
  Button,
  Icon,
  Dimmer,
  Loader
} from 'semantic-ui-react'

import { getUsers } from '../../redux/ducks/user'

import Wrapper from '../../components/content/Wrapper'
import NewUserForm from '../../components/forms/NewUserForm'

const CheckboxFormatted = styled.div`
  padding-right: 1em;
`

class UserList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputSearch: '',
      optionsSearch: {
        admin: true,
        broker: true,
        introducer: true
      },
      modalOpen: false,
      user: false
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (
      this.props.userCreated !== nextProps.userCreated &&
      nextProps.userCreated
    ) {
      await this._toggleModal({})
      this.props.getUsers()
    }
    if (
      this.props.userUpdated !== nextProps.userUpdated &&
      nextProps.userUpdated
    ) {
      await this._toggleModal({})
      this.props.getUsers()
    }
  }

  componentWillMount () {
    this.props.getUsers()
    this.timer = null
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.setState(
      {
        optionsSearch: {
          ...this.state.optionsSearch,
          [value]: !this.state.optionsSearch[value]
        }
      },
      () =>
        this.props.getUsers(this.state.optionsSearch, this.state.inputSearch)
    )
  }

  _onSearch = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)

    this.setState({
      inputSearch: value
    })

    this.timer = setTimeout(
      () => this.props.getUsers(this.state.optionsSearch, value),
      1000
    )
  }

  _toggleModal = user => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      user
    }))
  }

  render () {
    return (
      <Wrapper>
        {this.state.modalOpen ? (
          <NewUserForm
            modalOpen={this.state.modalOpen}
            toggleModal={this._toggleModal}
            userCreated={this.props.userCreated}
            user={this.state.user}
          />
        ) : null}
        <Grid padded="horizontally">
          <Grid.Row>
            <Grid.Column width={5}>
              <Input
                fluid
                icon="search"
                loading={this.state.isLoading}
                placeholder="Find users..."
                onChange={this._onSearch}
                value={this.state.inputSearch}
              />
            </Grid.Column>
            <Grid.Column width={5} verticalAlign="middle">
              <Checkbox
                as={CheckboxFormatted}
                label="Admin"
                value="admin"
                checked={this.state.optionsSearch.admin === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label="Broker"
                value="broker"
                checked={this.state.optionsSearch.broker === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                label="Introducer"
                value="introducer"
                checked={this.state.optionsSearch.introducer === true}
                onChange={this._handleChangeCheckBox}
              />
            </Grid.Column>
            <Grid.Column width={2} floated="right">
              <Button onClick={this._toggleModal} color="facebook">
                <Icon name="add" />
                New User
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Dimmer inverted active={this.props.isLoading}>
              <Loader inverted />
            </Dimmer>
            <Table color="blue" celled inverted selectable>
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
                  <Table.HeaderCell>Systems Settings</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.users.map(user => {
                  let roles =
                    user.roles.length > 0 ? JSON.parse(user.roles) : []
                  return (
                    <Table.Row
                      active
                      onClick={() => this._toggleModal(user)}
                      key={user.id}
                    >
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{`${user.firstName} ${
                        user.lastName
                      }`}</Table.Cell>
                      <Table.Cell>{user.userType}</Table.Cell>
                      <Table.Cell>
                        {user.listingAgent === 1 ? 'Yes' : 'No'}
                      </Table.Cell>
                      <Table.Cell>
                        {_.includes(roles, 'BUYER_MENU') ? 'Yes' : 'No'}
                      </Table.Cell>
                      <Table.Cell>
                        {_.includes(roles, 'BUSINESS_MENU') ? 'Yes' : 'No'}
                      </Table.Cell>
                      <Table.Cell>
                        {_.includes(roles, 'PRESALE_MENU') ? 'Yes' : 'No'}
                      </Table.Cell>
                      <Table.Cell>
                        {_.includes(roles, 'RESOURCES_MENU') ? 'Yes' : 'No'}
                      </Table.Cell>
                      <Table.Cell>
                        {_.includes(roles, 'CLIENT_MANAGER_MENU')
                          ? 'Yes'
                          : 'No'}
                      </Table.Cell>
                      <Table.Cell>
                        {_.includes(roles, 'SYSTEM_SETTINGS_MENU')
                          ? 'Yes'
                          : 'No'}
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

UserList.propTypes = {
  isLoading: PropTypes.bool,
  users: PropTypes.array,
  getUsers: PropTypes.func,
  userCreated: PropTypes.bool,
  userUpdated: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    isLoading: state.user.get.isLoading,
    users: state.user.get.array,
    error: state.user.get.error,
    userCreated: state.user.create.isCreated,
    userUpdated: state.user.update.isUpdated
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUsers }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
