import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'
import Buyers from './Buyers'
import Issue from './Issue'

class Export extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Buyers',
          render: () => <Buyers></Buyers>
        },
        {
          menuItem: 'Issue',
          render: () => <Issue></Issue>
        }
      ]
    }
  }

  componentDidMount () {}

  render () {
    return (
      <div>
        <Tab renderActiveOnly menu={{ secondary: true, pointing: true }} panes={this.state.panes} />
      </div>
    )
  }
}

Export.propTypes = {}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Export)
