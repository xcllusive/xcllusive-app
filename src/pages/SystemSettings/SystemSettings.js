import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'

import User from './User/User'
import Business from './Business/Business'
import Buyer from './Buyer/Buyer'
// import EmailTemplates from './EmailTemplates'
// import AgreementTemplates from './AgreementTemplates'
// import InvoiceTemplates from './InvoiceTemplates'
import Templates from './Templates/Templates'

import { getSystemSettings } from '../../redux/ducks/systemSettings'
import Admin from './Admin/Admin'
import Emails from './Emails/Emails'
import DocumentFolderEdit from './FolderAndFiles/DocumentFolderEdit'
import Export from './Export/Export'

class SystemSettingsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Users',
          render: () => <User />
        },
        {
          menuItem: 'Buyer',
          render: () => <Buyer />
        },
        {
          menuItem: 'Business',
          render: () => <Business />
        },
        {
          menuItem: 'Templates',
          render: () => <Templates />
        },
        {
          menuItem: 'Emails',
          render: () => <Emails />
        },
        {
          menuItem: 'Folders And Files',
          render: () => <DocumentFolderEdit />
        },
        {
          menuItem: 'Export',
          render: () => <Export></Export>
        },
        {
          menuItem: 'Admin',
          render: () => <Admin />
        }
      ]
    }
  }

  componentDidMount () {
    this.props.getSystemSettings()
  }

  render () {
    return (
      <div>
        <Tab renderActiveOnly menu={{ secondary: true, pointing: true }} panes={this.state.panes} />
      </div>
    )
  }
}

SystemSettingsPage.propTypes = {
  getSystemSettings: PropTypes.func
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSystemSettings
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemSettingsPage)
