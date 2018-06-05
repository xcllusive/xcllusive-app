import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import BuyerRegisters from './BuyerRegisters'
import BuyerSettings from './BuyerSettings'

class BuyerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Buyer Settings',
          render: () => <BuyerSettings />
        },
        {
          menuItem: 'Buyer Registers',
          render: () => <BuyerRegisters />
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

export default BuyerPage
