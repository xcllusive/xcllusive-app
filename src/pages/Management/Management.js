import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'
import XcllusiveManagmentReports from './Xcllusive/index'
import CtcManagementReports from './CTC/index'

class ManagementPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Xcllusive',
          render: () => <XcllusiveManagmentReports history={this.props.history} />
        },
        {
          menuItem: 'CTC',
          render: () => <CtcManagementReports history={this.props.history} />
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

ManagementPage.propTypes = {
  history: PropTypes.object
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagementPage)
