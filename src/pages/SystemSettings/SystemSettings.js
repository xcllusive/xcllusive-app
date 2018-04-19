import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'

import UserList from './UserList'
import BusinessRegisters from './BusinessRegisters'
import EmailTemplates from './EmailTemplates'

class SystemSettingsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Users',
          render: () => <UserList />
        },
        {
          menuItem: 'Email Templates',
          render: () => <EmailTemplates />
        },
        {
          menuItem: 'Business Registers',
          render: () => <BusinessRegisters />
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

export default SystemSettingsPage
