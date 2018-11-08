import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import PropTypes from 'prop-types'
// import { getUsers } from '../../redux/ducks/user'

class DashBoardPage extends Component {
  // componentDidMount = () => {
  //   this.props.getUsers()
  // }

  render () {
    return (
      <div>
        {/* <h1>Hello {this.props.users.firstName}</h1>
        <h1>Welcome to Mercury!</h1> */}
        <h1>DashBoard</h1>
      </div>
    )
  }
}

// DashBoardPage.propTypes = {
//   getUsers: PropTypes.func,
//   users: PropTypes.object
// }

const mapStateToProps = state => ({
  // users: state.user.get.array
})

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       getUsers
//     },
//     dispatch
//   )

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(DashBoardPage)
