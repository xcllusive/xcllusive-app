import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Header, Segment, Button, Icon, Divider } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../../../redux/ducks/modal'
import { getMarketingReport, clearMarketingReports } from '../../../../redux/ducks/CTC/reports'
import Wrapper from '../../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import numeral from 'numeral'

class MarketingReports extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    // this.props.clearMarketingReports()
  }

  _handleDateFromChange = date => {
    if (moment(date).diff(moment(this.props.values.dateTo)) > 0) {
      this._showMsg('smaller')
    } else {
      this.props.setFieldValue('dateFrom', date)
    }
  }

  _handleDateToChange = date => {
    if (moment(this.props.values.dateFrom).isSameOrAfter(moment(date))) {
      this._showMsg('bigger')
    } else {
      this.props.setFieldValue('dateTo', date)
    }
  }

  _showMsg = message => {
    this.props.openModal(TypesModal.MODAL_TYPE_SHOW_MSG, {
      options: {
        title: 'Alert:',
        content: 'Got it!',
        text: message === 'bigger' ? 'Date To must be bigger than Date From' : 'Date From must be smaller than Date To'
      }
    })
  }

  _confirmReports = (dateFrom, dateTo) => {
    this.props.getMarketingReport(
      moment(dateFrom).format('YYYY-MM-DD 00:00:00'),
      moment(dateTo).format('YYYY-MM-DD 23:59:59')
    )
  }

  _totalGeralLeads = totals => {
    return totals.sumLeads
  }

  _totalGeralSignedUp = totals => {
    return totals.sumIm
  }

  _AvgConvertionRate = totals => {
    return (this._totalGeralSignedUp(totals) / this._totalGeralLeads(totals)) * 100
  }

  _goToBusinessesListPerAnalyst = leadsPerAnalyst => {
    this.props.history.push({
      pathname: `management/ctc/businesses-list-analyst/${leadsPerAnalyst.listingAgentCtc_id}`,
      state: {
        analystObject: leadsPerAnalyst,
        dateFrom: moment(this.props.values.dateFrom).format('YYYY-MM-DD 00:00:00'),
        dateTo: moment(this.props.values.dateTo).format('YYYY-MM-DD 23:59:59')
      }
    })
  }

  render () {
    const {
      values,
      leadsPerAnalystArray,
      arrayTotalPerSource,
      totalGeralPerSource,
      arrayLeadsPerSource,
      totalsArray
    } = this.props
    return (
      <Wrapper>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Form.Group style={{ marginLeft: '20px' }}>
                  <Form.Field>
                    <label
                      style={{
                        marginTop: '5px',
                        marginRight: '15px',
                        fontSize: '.92857143em',
                        color: 'rgba(0,0,0,.87)',
                        fontWeight: '700'
                      }}
                    >
                      Date From:
                    </label>
                    <DatePicker
                      selected={values.dateFrom}
                      onChange={this._handleDateFromChange}
                      popperPlacement="top-end"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label
                      style={{
                        marginTop: '5px',
                        marginRight: '15px',
                        fontSize: '.92857143em',
                        color: 'rgba(0,0,0,.87)',
                        fontWeight: '700'
                      }}
                    >
                      Date To:
                    </label>
                    <DatePicker
                      selected={values.dateTo}
                      onChange={this._handleDateToChange}
                      popperPlacement="top-end"
                    />
                  </Form.Field>
                  <Form.Field style={{ marginTop: '30px' }}>
                    <Button
                      positive
                      icon="checkmark"
                      labelPosition="right"
                      content="Confirm"
                      onClick={() => this._confirmReports(values.dateFrom, values.dateTo)}
                    />
                  </Form.Field>
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        {leadsPerAnalystArray && leadsPerAnalystArray.length > 0 ? (
          <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
            <Fragment>
              <Header style={{ marginLeft: '10px' }} color="red">
                Leads Per Analyst
              </Header>
              <Grid padded="horizontally">
                <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
                  <Grid.Column
                    style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                  >
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>CTC Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'center' }}>
                            Total Leads
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'center' }}>Signed Up</Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'center' }}>
                            Convertion Rate
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {leadsPerAnalystArray.map(leadsPerAnalyst => {
                          return (
                            <Table.Row key={leadsPerAnalyst.listingAgentCtc_id}>
                              <Table.Cell>
                                <Grid>
                                  <Grid.Row columns={2}>
                                    <Grid.Column width={1}>
                                      <Icon
                                        link
                                        name="magnify"
                                        onClick={() => this._goToBusinessesListPerAnalyst(leadsPerAnalyst)}
                                      />
                                    </Grid.Column>
                                    <Grid.Column>
                                      {`${leadsPerAnalyst['listingAgentCtc.firstName']} ${
                                        leadsPerAnalyst['listingAgentCtc.lastName']
                                      }`}
                                    </Grid.Column>
                                  </Grid.Row>
                                </Grid>
                              </Table.Cell>
                              <Table.Cell style={{ textAlign: 'right' }}>{leadsPerAnalyst.count}</Table.Cell>
                              <Table.Cell style={{ textAlign: 'right' }}>
                                {leadsPerAnalyst.countImStage > 0 ? leadsPerAnalyst.countImStage : 0}
                              </Table.Cell>
                              <Table.Cell style={{ textAlign: 'right' }}>
                                {leadsPerAnalyst.countImStage > 0
                                  ? `${numeral((leadsPerAnalyst.countImStage / leadsPerAnalyst.count) * 100).format(
                                    '0.0'
                                  )} %`
                                  : 0}
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                    <Table style={{ marginTop: '0px' }} celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4>TOTAL</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }}>
                            {this._totalGeralLeads(totalsArray[0])}
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }}>
                            {this._totalGeralSignedUp(totalsArray[0])}
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }}>
                            {`${numeral(this._AvgConvertionRate(totalsArray[0])).format('0,0.0')}%`}
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Fragment>
          </Segment>
        ) : null}
        {arrayLeadsPerSource && arrayLeadsPerSource.length > 0 ? (
          <Fragment>
            <Divider style={{ marginTop: '40px', marginBottom: '40px', color: 'blue' }} horizontal>
              <h3>SOURCES</h3>
            </Divider>
            <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
              <Fragment>
                <Header style={{ marginLeft: '10px' }} color="red">
                  Leads Per Source
                </Header>
                <Grid padded="horizontally">
                  <Grid.Row
                    style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                  >
                    <Grid.Column
                      style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                    >
                      <Table celled striped selectable compact size="small">
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                              <h4 style={{ color: '#2185d0' }}>CTC Office</h4>
                            </Table.HeaderCell>
                            <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                            <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                            <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {arrayLeadsPerSource.map((leadsPerSource, index) => {
                            return (
                              <Table.Row key={index}>
                                <Table.Cell>{leadsPerSource['sourceCtc.label']}</Table.Cell>
                                <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                  {leadsPerSource.count}
                                </Table.Cell>
                                <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                  {leadsPerSource.countSourceSignedUp ? leadsPerSource.countSourceSignedUp : 0}
                                </Table.Cell>
                                <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                  {leadsPerSource.countSourceSignedUp > 0
                                    ? `${numeral(
                                      (leadsPerSource.countSourceSignedUp / leadsPerSource.count) * 100
                                    ).format('0,0.0')}%`
                                    : 0}
                                </Table.Cell>
                              </Table.Row>
                            )
                          })}
                        </Table.Body>
                      </Table>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Fragment>
            </Segment>
          </Fragment>
        ) : null}
        {arrayTotalPerSource && arrayTotalPerSource.length > 0 ? (
          <Fragment>
            <Divider style={{ marginTop: '40px', marginBottom: '40px', color: 'blue' }} horizontal>
              <h3>TOTALS</h3>
            </Divider>
            <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
              <Header style={{ marginLeft: '10px' }} color="red">
                Total Per Source
              </Header>
              <Grid padded="horizontally">
                <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
                  <Grid.Column
                    style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                  >
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ textAlign: 'center' }}>Source</Table.HeaderCell>
                          <Table.HeaderCell style={{ textAlign: 'center' }}>Total</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {arrayTotalPerSource.map(totalPerSource => {
                          return (
                            <Table.Row key={totalPerSource.ctcSourceId}>
                              <Table.Cell>{totalPerSource['sourceCtc.label']}</Table.Cell>
                              <Table.Cell style={{ textAlign: 'right' }}>{totalPerSource.count}</Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                      <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>
                            <b>TOTAL:</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{totalGeralPerSource}</b>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Fragment>
        ) : null}
      </Wrapper>
    )
  }
}

MarketingReports.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  openModal: PropTypes.func,
  getMarketingReport: PropTypes.func,
  leadsPerAnalystArray: PropTypes.array,
  arrayTotalPerSource: PropTypes.array,
  arrayLeadsPerSource: PropTypes.array,
  totalGeralPerSource: PropTypes.number,
  totalsArray: PropTypes.array,
  clearMarketingReports: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  savedRecords: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    dateFrom: props.savedRecords ? moment(new Date(props.savedRecords.dateFrom)) : moment().startOf('month'),
    dateTo: props.savedRecords ? moment(new Date(props.savedRecords.dateTo)) : moment()
  }
}

const mapStateToProps = state => ({
  leadsPerAnalystArray: state.reportsCtc.getMarketingReport.leadsPerAnalystArray,
  arrayTotalPerSource: state.reportsCtc.getMarketingReport.arrayTotalPerSource,
  arrayLeadsPerSource: state.reportsCtc.getMarketingReport.arrayLeadsPerSource,
  totalGeralPerSource: state.reportsCtc.getMarketingReport.totalGeralPerSource,
  totalsArray: state.reportsCtc.getMarketingReport.totalsArray,
  savedRecords: state.reportsCtc.keepMarketingRecords.records
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getMarketingReport,
      clearMarketingReports
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(MarketingReports)
)
