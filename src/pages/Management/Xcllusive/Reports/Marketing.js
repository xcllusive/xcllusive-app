import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Header, Segment, Button, Icon, Divider } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../../../redux/ducks/modal'
import { getMarketingReport, clearMarketingReports } from '../../../../redux/ducks/reports'
import Wrapper from '../../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

class MarketingReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dateTime: ''
    }
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
      moment(dateFrom).format('YYYY/MM/DD 00:00:00'),
      moment(dateTo).format('YYYY/MM/DD 23:59:59')
    )
  }

  _goToBusinessesListPerAnalyst = (leads, type) => {
    this.props.history.push({
      pathname: `management/businesses-list/${type === 'analyst' ? leads.listingAgent_id : leads.sourceId}`,
      state: {
        leadsObject: leads,
        dateFrom: this.props.values.dateFrom,
        dateTo: this.props.values.dateTo,
        type
      }
    })
  }

  _goToCtcBusinessesPerOffice = ctcLeads => {
    this.props.history.push({
      pathname: `management/ctc-businesses-list-office/${ctcLeads.dataRegion}`,
      state: {
        officeObject: ctcLeads,
        dateFrom: this.props.values.dateFrom,
        dateTo: this.props.values.dateTo
      }
    })
  }

  render () {
    const {
      values,
      totalGeralPerSource,
      arrayLeadsPerAnalyst,
      totalLeads,
      totalSignedUp,
      totalConvertionRate,
      arrayLeadsPerSource,
      arrayTotalPerSource
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
                    <DatePicker selected={values.dateFrom} onChange={this._handleDateFromChange} />
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
                    <DatePicker selected={values.dateTo} onChange={this._handleDateToChange} />
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
        {arrayLeadsPerAnalyst && arrayLeadsPerAnalyst.length > 0 ? (
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
                    {arrayLeadsPerAnalyst.map((leadsPerAnalyst, index) => {
                      if (leadsPerAnalyst.length > 0) {
                        return (
                          <Table key={index} celled striped selectable compact size="small">
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                                  <h4 style={{ color: '#2185d0' }}>{leadsPerAnalyst[0].dataRegion}</h4>
                                </Table.HeaderCell>
                                <Table.HeaderCell style={{ width: '300px', textAlign: 'center' }}>
                                  Total Leads
                                </Table.HeaderCell>
                                <Table.HeaderCell style={{ width: '300px', textAlign: 'center' }}>
                                  Signed Up
                                </Table.HeaderCell>
                                <Table.HeaderCell style={{ width: '300px', textAlign: 'center' }}>
                                  Convertion Rate
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            {leadsPerAnalyst.map(item => {
                              if (item.listingAgent_id) {
                                return (
                                  <Table.Body key={item.listingAgent_id}>
                                    <Table.Row>
                                      <Table.Cell>
                                        <Grid>
                                          <Grid.Row columns={2}>
                                            <Grid.Column width={1}>
                                              <Icon
                                                link
                                                name="magnify"
                                                onClick={() => this._goToBusinessesListPerAnalyst(item, 'analyst')}
                                              />
                                            </Grid.Column>
                                            <Grid.Column>{`${item.firstName} ${item.lastName}`}</Grid.Column>
                                          </Grid.Row>
                                        </Grid>
                                      </Table.Cell>
                                      <Table.Cell style={{ textAlign: 'right' }}>{item.totalLeads}</Table.Cell>
                                      <Table.Cell style={{ textAlign: 'right' }}>{item.signed}</Table.Cell>
                                      <Table.Cell style={{ textAlign: 'right' }}>{item.convertionRate}</Table.Cell>
                                    </Table.Row>
                                  </Table.Body>
                                )
                              }
                            })}
                            {leadsPerAnalyst[0].countCtc ? (
                              <Table.Footer fullWidth>
                                <Table.Row>
                                  <Table.HeaderCell>
                                    <Grid>
                                      <Grid.Row columns={2}>
                                        <Grid.Column width={1}>
                                          <Icon
                                            link
                                            name="magnify"
                                            onClick={() => this._goToCtcBusinessesPerOffice(leadsPerAnalyst[0])}
                                          />
                                        </Grid.Column>
                                        <Grid.Column style={{ color: 'green' }}>
                                          <b>CTC Business</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Table.HeaderCell>
                                  <Table.HeaderCell textAlign="right">
                                    <b>{leadsPerAnalyst[0].countCtc}</b>
                                  </Table.HeaderCell>
                                  <Table.HeaderCell textAlign="right" />
                                  <Table.HeaderCell textAlign="right" />
                                </Table.Row>
                              </Table.Footer>
                            ) : null}
                          </Table>
                        )
                      }
                    })}
                    {totalLeads ? (
                      <Table style={{ marginTop: '0px' }} celled striped selectable compact size="small">
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                              <h4>TOTAL</h4>
                            </Table.HeaderCell>
                            <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }}>
                              {totalLeads}
                            </Table.HeaderCell>
                            <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }}>
                              {totalSignedUp}
                            </Table.HeaderCell>
                            <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }}>
                              {`${totalConvertionRate}%`}
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                      </Table>
                    ) : null}
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
                      {arrayLeadsPerSource.map((leadsPerSource, index) => {
                        if (leadsPerSource.length > 0) {
                          return (
                            <Table key={index} celled striped selectable compact size="small">
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                                    <h4 style={{ color: '#2185d0' }}>{leadsPerSource[0].dataRegion}</h4>
                                  </Table.HeaderCell>
                                  <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                                  <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                                  <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                                </Table.Row>
                              </Table.Header>
                              {leadsPerSource.map((leadsPerSource, index) => {
                                return (
                                  <Table.Body key={index}>
                                    <Table.Row>
                                      <Table.Cell>
                                        <Grid>
                                          <Grid.Row columns={2}>
                                            <Grid.Column width={1}>
                                              <Icon
                                                link
                                                name="magnify"
                                                onClick={() =>
                                                  this._goToBusinessesListPerAnalyst(leadsPerSource, 'source')
                                                }
                                              />
                                            </Grid.Column>
                                            <Grid.Column>{leadsPerSource.sourceLabel}</Grid.Column>
                                          </Grid.Row>
                                        </Grid>
                                      </Table.Cell>
                                      <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                        {leadsPerSource.totalLeads}
                                      </Table.Cell>
                                      <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                        {leadsPerSource.totalSignedUp}
                                      </Table.Cell>
                                      <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                        {leadsPerSource.convertionRate}
                                      </Table.Cell>
                                    </Table.Row>
                                  </Table.Body>
                                )
                              })}
                            </Table>
                          )
                        }
                      })}
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
                            <Table.Row key={totalPerSource.sourceId}>
                              <Table.Cell>{totalPerSource['source.label']}</Table.Cell>
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
  totalGeralPerSource: PropTypes.number,
  clearMarketingReports: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  savedRecords: PropTypes.object,
  arrayLeadsPerAnalyst: PropTypes.array,
  totalLeads: PropTypes.number,
  totalSignedUp: PropTypes.number,
  totalConvertionRate: PropTypes.number,
  arrayLeadsPerSource: PropTypes.array,
  arrayTotalPerSource: PropTypes.array
}

const mapPropsToValues = props => {
  return {
    dateFrom: props.savedRecords ? moment(new Date(props.savedRecords.dateFrom)) : moment().startOf('month'),
    dateTo: props.savedRecords ? moment(new Date(props.savedRecords.dateTo)) : moment()
  }
}

const mapStateToProps = state => ({
  arrayTotalPerSource: state.reports.getMarketingReport.arrayTotalPerSource,
  totalGeralPerSource: state.reports.getMarketingReport.totalGeralPerSource,
  savedRecords: state.reports.keepMarketingRecords.records,
  arrayLeadsPerAnalyst: state.reports.getMarketingReport.arrayLeadsPerAnalyst,
  totalLeads: state.reports.getMarketingReport.totalLeads,
  totalSignedUp: state.reports.getMarketingReport.totalSignedUp,
  totalConvertionRate: state.reports.getMarketingReport.totalConvertionRate,
  arrayLeadsPerSource: state.reports.getMarketingReport.arrayLeadsPerSource
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
