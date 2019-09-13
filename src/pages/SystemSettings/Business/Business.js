import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import BusinessRegisters from './BusinessRegisters'
import ScoreRegisters from './ScoreRegisters'
import AppraisalRegisters from './AppraisalRegisters'
import IssueRegisters from './IssueRegisters'

class BusinessPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Issue Registers',
          render: () => <IssueRegisters />
        },
        {
          menuItem: 'Business Registers',
          render: () => <BusinessRegisters />
        },
        {
          menuItem: 'Score Registers',
          render: () => <ScoreRegisters />
        },
        {
          menuItem: 'Appraisal Registers',
          render: () => <AppraisalRegisters />
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

export default BusinessPage
