import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import EmailTemplates from './EmailTemplates'
import AgreementTemplates from './AgreementTemplates'
import InvoiceTemplates from './InvoiceTemplates'
import SmsTemplates from './SmsTemplates'

class TemplatesPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Email Templates',
          render: () => <EmailTemplates />
        },
        {
          menuItem: 'Agreement Templates',
          render: () => <AgreementTemplates />
        },
        {
          menuItem: 'Invoice Templates',
          render: () => <InvoiceTemplates />
        },
        {
          menuItem: 'SMS Templates',
          render: () => <SmsTemplates></SmsTemplates>
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

export default TemplatesPage
