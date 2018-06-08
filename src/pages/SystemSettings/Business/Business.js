import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import BusinessRegisters from './BusinessRegisters'
import ScoreRegisters from './ScoreRegisters'

class BusinessPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Business Registers',
          render: () => <BusinessRegisters />
        },
        {
          menuItem: 'Score Registers',
          render: () => <ScoreRegisters />
        }
      ]
    }
  }

  render () {
    return (
      <div>
        <Tab
          renderActiveOnly
          menu={{ secondary: true, pointing: true }}
          panes={this.state.panes}
        />
      </div>
    )
  }
}

export default BusinessPage
