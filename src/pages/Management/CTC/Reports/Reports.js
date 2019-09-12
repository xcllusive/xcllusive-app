import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'
import Marketing from './Marketing'
import Analyst from './Analyst'
import { setLastCtcTabSelected } from '../../../../redux/ducks/CTC/reports'
import Enquiry from './Enquiry'

class Reports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panes: [
        {
          menuItem: 'Marketing',
          render: () => <Marketing history={this.props.history} />
        },
        {
          menuItem: 'Analysts',
          render: () => <Analyst history={this.props.history} />
        },
        {
          menuItem: 'Enquiries',
          render: () => <Enquiry history={this.props.history} />
        }
      ]
    }
  }

  _handleSelect = (e, { activeIndex }) => {
    this.props.setLastCtcTabSelected(activeIndex)
  }

  render () {
    return (
      <div>
        <Tab
          activeIndex={this.props.indexLastTabSelected}
          onTabChange={this._handleSelect}
          renderActiveOnly
          menu={{ secondary: true, pointing: true }}
          panes={this.state.panes}
        />
      </div>
    )
  }
}

Reports.propTypes = {
  history: PropTypes.object,
  setLastCtcTabSelected: PropTypes.func,
  indexLastTabSelected: PropTypes.number
}
const mapDispatchToProps = dispatch => bindActionCreators({ setLastCtcTabSelected }, dispatch)

const mapStateToProps = state => ({
  indexLastTabSelected: state.reportsCtc.setLastTabSelected.index
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports)
