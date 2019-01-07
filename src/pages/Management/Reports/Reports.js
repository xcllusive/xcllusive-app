import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tab } from 'semantic-ui-react'
import BrokersWeeklyReports from './BrokersWeeklyReports'

class Reports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Broker`s Weekly Report',
          render: () => <BrokersWeeklyReports history={this.props.history} />
        }
      ]
    }
  }

  render () {
    return (
      <div>
        <Tab renderActiveOnly menu={{ secondary: true, pointing: true }} panes={this.state.panes} />
      </div>
    )
  }
}

Reports.propTypes = {
  history: PropTypes.object
}

export default Reports
