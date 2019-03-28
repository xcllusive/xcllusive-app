import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'
import BrokersWeeklyReports from './BrokersWeeklyReports'
import MarketingReports from './MarketingReports'
import AnalystReports from './AnalystReports'
import { setLastTabSelected } from '../../../redux/ducks/reports'
import EnquiryReports from './EnquiryReports'

class Reports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Marketing Reports',
          render: () => <MarketingReports history={this.props.history} />
        },
        {
          menuItem: 'Broker`s Weekly Report',
          render: () => <BrokersWeeklyReports history={this.props.history} />
        },
        {
          menuItem: 'Analyst`s Report',
          render: () => <AnalystReports history={this.props.history} />
        },
        {
          menuItem: 'Enquiries Report',
          render: () => <EnquiryReports history={this.props.history} />
        }
      ]
    }
  }

  _handleSelect = (e, { activeIndex }) => {
    this.props.setLastTabSelected(activeIndex)
  }

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

Reports.propTypes = {
  history: PropTypes.object,
  setLastTabSelected: PropTypes.func,
  indexLastTabSelected: PropTypes.number
}
const mapDispatchToProps = dispatch => bindActionCreators({ setLastTabSelected }, dispatch)

const mapStateToProps = state => ({
  indexLastTabSelected: state.reports.setLastTabSelected.index
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports)
