import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Table, Segment, Header, Button, Icon } from 'semantic-ui-react'
import Wrapper from '../../../../components/content/Wrapper'
import { getUserLogged } from '../../../../redux/ducks/user'
import { getBusinessHistoricalWeekly } from '../../../../redux/ducks/broker'
import moment from 'moment'
import numeral from 'numeral'

class HistoricalWeeklyReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isGotUser: true,
      showAll: true
    }
  }
  componentDidMount () {
    this.props.getUserLogged(this.props.location.state.business.brokerAccountName)
    this.props.getBusinessHistoricalWeekly(this.props.location.state.business.id)
  }

  _showAll () {
    this.setState({ showAll: false })
  }

  _showLess () {
    this.setState({ showAll: true })
  }

  _backToWeeklyReport () {
    this.props.history.goBack()
  }

  _convertHtmlToRightText = html => {
    let htmlConverted = html.replace(/<p>/gi, '')
    htmlConverted = htmlConverted.replace(/<\/p>/gi, '')

    return htmlConverted
  }

  render () {
    const { broker, businessHistoricalWeekly, expectedObject } = this.props
    const { business } = this.props.location.state
    return (
      <Wrapper>
        <Header style={{ marginTop: '10px' }} textAlign="center">
          Historical Weekly Report
        </Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column floated="left">
              <Header>
                <Button size="small" color="green" onClick={() => this._backToWeeklyReport()}>
                  <Icon name="backward" />
                  Back to Weekly Report
                </Button>
              </Header>
            </Grid.Column>
            <Grid.Column floated="right">
              <Header>
                {this.state.showAll ? (
                  <Button color="twitter" onClick={() => this._showAll()} size="small" floated="right">
                    <Icon name="zoom" />
                    Show To Do Notes
                  </Button>
                ) : (
                  <Button color="orange" onClick={() => this._showLess()} size="small" floated="right">
                    <Icon name="cut" />
                    Hide To Do Notes
                  </Button>
                )}
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Segment style={{ backgroundColor: '#065896', paddingLeft: '0px', paddingRight: '0px' }} size="small">
          <Fragment>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Header style={{ color: '#ffff', marginLeft: '10px' }} floated="left">
                    {business.businessName}
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  {broker ? (
                    <Header style={{ color: '#ffff', marginLeft: '10px' }} floated="right">
                      {broker.firstName} {broker.lastName}
                    </Header>
                  ) : null}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {businessHistoricalWeekly ? (
              <Grid padded="horizontally">
                <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
                  <Grid.Column
                    style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                  >
                    <Table celled striped selectable compact size="small">
                      {expectedObject && expectedObject.expectedSettlementDate ? (
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell style={{ fontSize: '1.3em' }}>Exchanged</Table.HeaderCell>
                            <Table.HeaderCell style={{ fontSize: '1.3em' }}>
                              Settlement Date:
                              <label style={{ color: 'blue' }}>
                                {' '}
                                {moment(expectedObject.expectedSettlementDate).format('DD/MM/YYYY')}
                              </label>
                            </Table.HeaderCell>
                            <Table.HeaderCell style={{ fontSize: '1.3em' }}>
                              <Grid>
                                <Grid.Row columns={2}>
                                  <Grid.Column>
                                    Price:
                                    <label style={{ color: 'blue' }}>
                                      {' '}
                                      {numeral(expectedObject.expectedPrice).format('$0,0.[99]')}
                                    </label>
                                  </Grid.Column>
                                  <Grid.Column>
                                    Commission:
                                    <label style={{ color: 'blue' }}>
                                      {' '}
                                      {numeral(expectedObject.expectedCommission).format('$0,0.[99]')}
                                    </label>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                      ) : null}
                      <Table.Body>
                        {businessHistoricalWeekly.map(HistoricalWeekly => {
                          return (
                            <Table.Row key={HistoricalWeekly.id}>
                              <Table.Cell verticalAlign="top" width={2}>
                                <Grid celled="internally">
                                  <Grid.Row>
                                    <Grid.Column>
                                      {moment(HistoricalWeekly.dateTimeCreated).format('DD/MM/YYYY')}
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row style={{ fontSize: '1.2em', color: 'red' }}>
                                    <Grid.Column>{HistoricalWeekly.stage}</Grid.Column>
                                  </Grid.Row>
                                </Grid>
                              </Table.Cell>
                              <Table.Cell verticalAlign="top" width={7}>
                                <Grid celled="internally">
                                  <Grid.Row>
                                    <Grid.Column>{this._convertHtmlToRightText(HistoricalWeekly.text)}</Grid.Column>
                                  </Grid.Row>
                                  {HistoricalWeekly.textToDo && !this.state.showAll ? (
                                    <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                      <Grid.Column>{HistoricalWeekly.textToDo}</Grid.Column>
                                    </Grid.Row>
                                  ) : null}
                                </Grid>
                              </Table.Cell>
                              <Table.Cell width={4}>
                                <Grid celled="internally">
                                  <Grid.Row columns={2}>
                                    <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={9}>
                                      <b>Days On The Market:</b>
                                    </Grid.Column>
                                    <Grid.Column
                                      style={{
                                        paddingBottom: '0px',
                                        paddingTop: '0px',
                                        color: 'blue'
                                      }}
                                      width={5}
                                    >
                                      {HistoricalWeekly.daysOnTheMarket}
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row columns={2}>
                                    <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={9}>
                                      <b>No. of Enquiries:</b>
                                    </Grid.Column>
                                    <Grid.Column
                                      style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                      width={5}
                                    >
                                      <b>{HistoricalWeekly.nOfEnquiries}</b>
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row columns={2}>
                                    <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={9}>
                                      <b>No. of Enquiries, 7 Days:</b>
                                    </Grid.Column>
                                    <Grid.Column
                                      style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                      width={5}
                                    >
                                      <b>{HistoricalWeekly.nOfEnquiries7Days}</b>
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row columns={2}>
                                    <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={9}>
                                      <b>120 Guaranty:</b>
                                    </Grid.Column>
                                    <Grid.Column
                                      style={{
                                        paddingBottom: '0px',
                                        paddingTop: '0px',
                                        color: HistoricalWeekly.data120DayGuarantee === 'Yes' ? 'red' : 'green'
                                      }}
                                      width={5}
                                    >
                                      <b>{HistoricalWeekly.data120DayGuarantee}</b>
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row columns={2}>
                                    <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={9}>
                                      <b>No. of Pending Tasks:</b>
                                    </Grid.Column>
                                    <Grid.Column
                                      style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                      width={5}
                                    >
                                      <b>{HistoricalWeekly.nOfPendingTasks}</b>
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row columns={2}>
                                    <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={9}>
                                      <b>No. of New Logs, 7 Days:</b>
                                    </Grid.Column>
                                    <Grid.Column
                                      style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                      width={5}
                                    >
                                      <b>{HistoricalWeekly.nOfNewLogs7Days}</b>
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row columns={2}>
                                    <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={9}>
                                      <b>Weekly Discussion:</b>
                                    </Grid.Column>
                                    <Grid.Column
                                      style={{
                                        paddingBottom: '0px',
                                        paddingTop: '0px',
                                        color: HistoricalWeekly.progressDiscussion === 'Yes' ? 'red' : 'green'
                                      }}
                                      width={5}
                                    >
                                      <b>{HistoricalWeekly.progressDiscussion}</b>
                                    </Grid.Column>
                                  </Grid.Row>
                                </Grid>
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : null}
          </Fragment>
        </Segment>
      </Wrapper>
    )
  }
}

HistoricalWeeklyReport.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  location: PropTypes.object,
  getUserLogged: PropTypes.func,
  broker: PropTypes.object,
  getBusinessHistoricalWeekly: PropTypes.func,
  businessHistoricalWeekly: PropTypes.array,
  history: PropTypes.object,
  expectedObject: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    brokerAccountName: 0
  }
}

const mapStateToProps = state => ({
  broker: state.user.getLogged.object,
  businessHistoricalWeekly: state.broker.getBusinessHistoricalWeekly.array,
  expectedObject: state.broker.getBusinessHistoricalWeekly.expectedObject
})

const mapDispatchToProps = dispatch => bindActionCreators({ getUserLogged, getBusinessHistoricalWeekly }, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(HistoricalWeeklyReport)
)
