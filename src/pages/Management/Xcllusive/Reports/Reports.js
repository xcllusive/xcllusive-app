import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'
import BrokersWeekly from './BrokersWeekly'
import Marketing from './Marketing'
import Analyst from './Analyst'
import { setLastTabSelected } from '../../../../redux/ducks/reports'
import Enquiry from './Enquiry'
import DailyActivity from './DailyActivity'

class Reports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Marketing',
          render: () => <Marketing history={this.props.history} />
        },
        {
          menuItem: 'Brokers Weekly',
          render: () => <BrokersWeekly history={this.props.history} />
        },
        {
          menuItem: 'Analysts',
          render: () => <Analyst history={this.props.history} />
        },
        {
          menuItem: 'Enquiries',
          render: () => <Enquiry history={this.props.history} />
        },
        {
          menuItem: 'Daily Activity',
          render: () => <DailyActivity history={this.props.history} />
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
