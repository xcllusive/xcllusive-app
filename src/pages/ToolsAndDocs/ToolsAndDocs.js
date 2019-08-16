import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'
import Resources from './Resources'
import Contacts from './Contacts'
import DocumentFolder from './DocumentFolder'
// import { setLastTabSelected } from '../../redux/ducks/reports'

class ToolsAndDocs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Documents',
          render: () => <DocumentFolder history={this.props.history} />
        },
        {
          menuItem: 'Contacts',
          render: () => <Contacts history={this.props.history} />
        },
        {
          menuItem: 'Resources',
          render: () => <Resources history={this.props.history} />
        }
      ]
    }
  }

  // _handleSelect = (e, { activeIndex }) => {
  //   this.props.setLastTabSelected(activeIndex)
  // }

  render () {
    return (
      <div>
        <Tab
          // activeIndex={this.props.indexLastTabSelected}
          onTabChange={this._handleSelect}
          renderActiveOnly
          menu={{ secondary: true, pointing: true }}
          panes={this.state.panes}
        />
      </div>
    )
  }
}

ToolsAndDocs.propTypes = {
  history: PropTypes.object,
  // indexLastTabSelected: PropTypes.number,
  // setLastTabSelected: PropTypes.func,
  location: PropTypes.object
}

const mapStateToProps = state => ({
  // indexLastTabSelected: state.reports.setLastTabSelected.index
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolsAndDocs)
