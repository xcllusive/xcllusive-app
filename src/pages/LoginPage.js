import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { Grid, Segment, Image } from 'semantic-ui-react'

import { login } from '../redux/ducks/auth'

import LoginForm from '../components/forms/LoginForm'

import logo from '../assets/images/logo.jpg'

const Wrapper = styled.div`
  height: 100vh
  padding-top: 10%
  background-color: #dfe6e9
`

class LoginPage extends React.Component {
  state = {
    redirectToReferrer: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) this.props.history.push('/')
  }

  _submit = (email, password) => this.props.login(email, password)

  _handleClose = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <Wrapper>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={5}>
              <Segment as='h1'>
                <Image src={logo} alt='Logo Xcllusive' fluid centered />
                <LoginForm
                  submit={this._submit}
                  isLoading={this.props.isLoading}
                  errorApi={this.props.error}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
