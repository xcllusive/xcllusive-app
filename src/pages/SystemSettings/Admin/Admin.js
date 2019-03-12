import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Button, Icon } from 'semantic-ui-react'
import { getUserLogged } from '../../../redux/ducks/user'
import { executeJavaScript } from '../../../redux/ducks/systemSettings'

class Admin extends Component {
  componentDidMount () {
    this.props.getUserLogged()
  }

  _executeJavaScript = () => {
    this.props.executeJavaScript()
  }

  render () {
    return (
      <Grid>
        {this.props.user && this.props.user.id === 1 ? (
          <Grid.Row style={{ marginLeft: '10px' }}>
            <Grid.Column textAlign="left">
              <Button primary size="small" onClick={() => this._executeJavaScript()}>
                <Icon name="edit" />
                Execute JavaScript
              </Button>
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Row>
            <Grid.Column textAlign="center">
              <b>This Tab is designated only for IT department!</b>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    )
  }
}

Admin.propTypes = {
  getSystemSettings: PropTypes.func,
  getUserLogged: PropTypes.func,
  user: PropTypes.object,
  executeJavaScript: PropTypes.func
}

const mapStateToProps = state => ({
  user: state.user.getLogged.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserLogged,
      executeJavaScript
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)
