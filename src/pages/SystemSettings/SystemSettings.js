import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'

import UserList from './UserList'
import Business from './Business/Business'
import Buyer from './Buyer/Buyer'
import EmailTemplates from './EmailTemplates'
import AgreementTemplates from './AgreementTemplates'

import { getSystemSettings } from '../../redux/ducks/systemSettings'

class SystemSettingsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Agreement Templates',
          render: () => <AgreementTemplates />
        },
        {
          menuItem: 'Users',
          render: () => <UserList />
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
          menuItem: 'Email Templates',
          render: () => <EmailTemplates />
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
        <Tab
          renderActiveOnly
          menu={{ secondary: true, pointing: true }}
          panes={this.state.panes}
        />
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
