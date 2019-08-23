import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Input, Grid, Button, Icon, Dimmer, Loader } from 'semantic-ui-react'
import { getUsers } from '../../redux/ducks/user'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import { sendSmsUsers } from '../../redux/ducks/contact'
import Wrapper from '../../components/content/Wrapper'

class Contacts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputSearch: '',
      optionsSearch: {
        admin: true,
        broker: true,
        introducer: true
      }
    }
  }

  componentDidMount () {
    this.props.getUsers()
    this.timer = null
  }

  _onSearch = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)

    this.setState({
      inputSearch: value
    })

    this.timer = setTimeout(() => this.props.getUsers(this.state.optionsSearch, value), 1000)
  }

  _sendGroupEmailSms = (users, emailOrSms) => {
    this.props.openModal(TypesModal.MODAL_TYPE_GROUP_EMAIL_SMS_USER, {
      options: {
        title: 'Prepare Group Email'
      },
      users,
      emailOrSms,
      onConfirm: async (listEmailOrSms, emailOrSms, textSms) => {
        if (listEmailOrSms) {
          if (emailOrSms === 'email') window.location.href = `mailto:${listEmailOrSms.toString()}`
          if (emailOrSms === 'sms') this.props.sendSmsUsers(listEmailOrSms, textSms)
        }
      }
    })
  }

  render () {
    const { users } = this.props
    return (
      <Wrapper>
        <Grid padded="horizontally">
          <Grid.Row columns={3}>
            <Grid.Column width={5}>
              <Input
                fluid
                icon="search"
                loading={this.state.isLoading}
                placeholder="Type an user..."
                onChange={this._onSearch}
                value={this.state.inputSearch}
              />
            </Grid.Column>
            <Grid.Column width={4} floated="right">
              <Button onClick={() => this._sendGroupEmailSms(users, 'email')} color="facebook" floated="right">
                <Icon name="mail" />
                Group Email
              </Button>
              <Button onClick={() => this._sendGroupEmailSms(users, 'sms')} color="twitter" floated="right">
                <Icon name="mobile alternate" />
                SMS
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
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Work Phone</Table.HeaderCell>
                  <Table.HeaderCell>Mobile Phone</Table.HeaderCell>
                  <Table.HeaderCell>Role</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.users.map(user => {
                  return (
                    <Table.Row active key={user.id}>
                      <Table.Cell>{`${user.firstName} ${user.lastName}`}</Table.Cell>
                      <Table.Cell>
                        <Icon
                          link
                          name="mail"
                          onClick={() => (window.location.href = `mailto:${user.email.toString()}`)}
                        />
                        {user.email}
                      </Table.Cell>
                      <Table.Cell>{user.phoneWork}</Table.Cell>
                      <Table.Cell>{user.phoneMobile}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
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

Contacts.propTypes = {
  isLoading: PropTypes.bool,
  users: PropTypes.array,
  getUsers: PropTypes.func,
  openModal: PropTypes.func,
  sendSmsUsers: PropTypes.func
}

const mapStateToProps = state => {
  return {
    isLoading: state.user.get.isLoading,
    users: state.user.get.usersActive,
    error: state.user.get.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUsers, openModal, sendSmsUsers }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts)
