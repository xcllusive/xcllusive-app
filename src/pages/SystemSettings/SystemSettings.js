import React, { Component } from 'react'
import { Tab, Segment, Header } from 'semantic-ui-react'

import UserList from './UserList'

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
          render: () => (
            <Tab.Pane attached={false}>
              <Segment size='mini' inverted color='blue'>
                <Header as='h7' textAlign='left'>
                  Users
                </Header>
              </Segment>
            </Tab.Pane>
          )
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
