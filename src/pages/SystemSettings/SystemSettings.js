import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'

import UserList from './UserList'
import BusinessSettings from './BusinessSettings'
import BuyerSettings from './BuyerSettings'
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
          menuItem: 'Buyer',
          render: () => <BuyerSettings />
        },
        {
          menuItem: 'Business',
          render: () => <BusinessSettings />
        },
        {
          menuItem: 'Email Templates',
          render: () => <EmailTemplates />
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
