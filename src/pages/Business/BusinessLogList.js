import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Grid } from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'
import moment from 'moment'

class BusinessLogList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { arrayLogsFromBusiness } = this.props
    return (
      <Wrapper>
        {arrayLogsFromBusiness && arrayLogsFromBusiness.length > 0 ? (
          <Grid.Row>
            <Grid.Column>
              <Table
                size={'small'}
                color={this.props.business.company_id === 1 ? 'blue' : 'green'}
                celled
                inverted
                selectable
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Log</Table.HeaderCell>
                    <Table.HeaderCell>Follow Up</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {arrayLogsFromBusiness.map(logBusiness => {
                    return (
                      <Table.Row
                        active
                        key={logBusiness.id}
                        onClick={() =>
                          this.props.history.push({
                            pathname: `${this.props.match.url}/log`,
                            state: { logBusiness }
                          })
                        }
                      >
                        <Table.Cell>{logBusiness.text}</Table.Cell>
                        <Table.Cell>{moment(logBusiness.followUp).format('DD/MM/YYYY')}</Table.Cell>
                        <Table.Cell>{logBusiness.time}</Table.Cell>
                        <Table.Cell>{logBusiness.followUpStatus}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        ) : null}
      </Wrapper>
    )
  }
}

BusinessLogList.propTypes = {
  getLogFromBusiness: PropTypes.func,
  history: PropTypes.object,
  getBusinessLogFromBuyer: PropTypes.func,
  match: PropTypes.object,
  arrayLogsFromBusiness: PropTypes.array,
  business: PropTypes.object
}

const mapStateToProps = (state, props) => {
  return {
    arrayLogsFromBusiness:
      props.history.location && props.history.location.pathname === `/business/${props.business.id}/from-buyer`
        ? state.buyer.getBusinessLogFromBuyer.array
        : state.businessLog.get.array
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessLogList)
