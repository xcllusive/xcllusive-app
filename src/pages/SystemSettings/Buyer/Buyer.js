import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import BuyerRegisters from './BuyerRegisters'

class BuyerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
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
        <Tab renderActiveOnly menu={{ secondary: true, pointing: true }} panes={this.state.panes} />
      </div>
    )
  }
}

export default BuyerPage
