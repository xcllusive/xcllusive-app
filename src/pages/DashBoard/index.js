import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserLogged } from '../../redux/ducks/user'
import { Grid } from 'semantic-ui-react'

class DashBoardPage extends Component {
  componentDidMount () {
    this.props.getUserLogged()
  }

  render () {
    return (
      <Grid>
        <Grid.Row style={{ marginTop: '200px' }}>
          <Grid.Column textAlign="center">
            <h1 style={{ color: 'rgb(7, 85, 148)' }}>Hello {this.props.user ? this.props.user.firstName : null},</h1>
            <h1 style={{ color: 'rgb(7, 85, 148)' }}>Welcome to Mercury!</h1>
          </Grid.Column>
        </Grid.Row>
        {/* <h1>DashBoard</h1> */}
      </Grid>
    )
  }
}

DashBoardPage.propTypes = {
  getUserLogged: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.user.getLogged.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserLogged
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoardPage)
