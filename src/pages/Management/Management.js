import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'
import XcllusiveManagmentReports from './Xcllusive/index'
import CtcManagementReports from './CTC/index'
import { setLastTabSelected } from '../../redux/ducks/reports'

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

  _handleSelect = (e, { activeIndex }) => {
    this.props.setLastTabSelected(activeIndex)
  }

  componentDidMount () {}

  render () {
    return (
      <div>
        <Tab
          activeIndex={this.props.indexLastTabSelected}
          onTabChange={this._handleSelect}
          renderActiveOnly
          menu={{ secondary: true, pointing: true }}
          panes={this.state.panes}
        />
      </div>
    )
  }
}

ManagementPage.propTypes = {
  history: PropTypes.object,
  indexLastTabSelected: PropTypes.number,
  setLastTabSelected: PropTypes.func
}

const mapStateToProps = state => ({
  indexLastTabSelected: state.reports.setLastTabSelected.index
})

const mapDispatchToProps = dispatch => bindActionCreators({ setLastTabSelected }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagementPage)
