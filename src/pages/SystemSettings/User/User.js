import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import UserList from './UserList'
import OfficeRegisters from './OfficeRegisters'

class BuyerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'User List',
          render: () => <UserList />
        },
        {
          menuItem: 'Office Registers',
          render: () => <OfficeRegisters />
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
