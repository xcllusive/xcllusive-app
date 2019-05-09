import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'
import Reports from './Reports/Reports'

class XcllusiveManagementReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Reports',
          render: () => <Reports history={this.props.history} />
        }
      ]
    }
  }

  componentDidMount () {}

  render () {
    return (
      <div>
        <Tab renderActiveOnly menu={{ secondary: true, pointing: true }} panes={this.state.panes} />
      </div>
    )
  }
}

XcllusiveManagementReports.propTypes = {
  history: PropTypes.object
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(XcllusiveManagementReports)
