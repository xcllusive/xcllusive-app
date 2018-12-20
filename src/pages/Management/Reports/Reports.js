import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import BrokersWeeklyReports from './BrokersWeeklyReports'

class Reports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Broker`s Weekly Report',
          render: () => <BrokersWeeklyReports />
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

export default Reports
