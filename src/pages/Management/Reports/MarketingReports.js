import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Header, Segment, Button } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import { getMarketingReport } from '../../../redux/ducks/reports'
import Wrapper from '../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import numeral from 'numeral'

class MarketingReports extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  async componentDidMount () {
    // // this.props.clearWeeklyReports()
    // if (
    //   (this.props.user && this.props.user.brokerAccountName) ||
    //   (this.props.location && this.props.location.state.keepRecords)
    // ) {
    //   this.props.setFieldValue('dataRegion', this.props.user.dataRegion)
    //   this.props.setFieldValue('brokerAccountName', this.props.user.brokerAccountName)
    // } else {
    // await this.props.getUserLogged()
    // this.props.setFieldValue('dataRegion', this.props.user.dataRegion)
    // if (this.props.brokersPerRegion <= 0) {
    //   this.props.getBrokersPerRegion(this.props.user.dataRegion)
    // }
    // this.props.brokerAccountNameRestored &&
    //   this.props.setFieldValue('brokerAccountName', this.props.brokerAccountNameRestored)
  }

  componentDidUpdate (nextProps) {
    // if (
    //   (this.props.isCreated && nextProps.isCreated !== this.props.isCreated) ||
    //   (this.props.isUpdated && nextProps.isUpdated !== this.props.isUpdated)
    // ) {
    //   this.props.getBusinessesPerBroker(this.props.values.brokerAccountName)
    // }
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
    this.props.getMarketingReport(moment(dateFrom).format('YYYY/MM/DD'), moment(dateTo).format('YYYY/MM/DD'))
  }

  render () {
    const { values, leadsPerAnalystArray, arrayTotalPerSource, totalGeralPerSource, arrayLeadsPerSource } = this.props
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
                          <Table.HeaderCell style={{ textAlign: 'left' }}>Sydney Office</Table.HeaderCell>
                          <Table.HeaderCell />
                          <Table.HeaderCell />
                          <Table.HeaderCell />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {leadsPerAnalystArray.map(leadsPerAnalyst => {
                          if (leadsPerAnalyst['listingAgent.dataRegion'] === 'Sydney Office') {
                            return (
                              <Table.Row key={leadsPerAnalyst.listingAgent_id}>
                                {/* <Table.Cell>{leadsPerAnalyst['listingAgent.dataRegion']}</Table.Cell> */}
                                <Table.Cell>{`${leadsPerAnalyst['listingAgent.firstName']} ${
                                  leadsPerAnalyst['listingAgent.lastName']
                                }`}</Table.Cell>
                                <Table.Cell style={{ textAlign: 'right' }}>{leadsPerAnalyst.count}</Table.Cell>
                                <Table.Cell style={{ textAlign: 'right' }}>
                                  {leadsPerAnalyst.countImStage > 0 ? leadsPerAnalyst.countImStage : 0}
                                </Table.Cell>
                                <Table.Cell style={{ textAlign: 'right' }}>
                                  {leadsPerAnalyst.countImStage > 0
                                    ? numeral((leadsPerAnalyst.count / leadsPerAnalyst.countImStage) * 100).format(
                                      '0,0'
                                    )
                                    : 0}
                                </Table.Cell>
                              </Table.Row>
                            )
                          }
                        })}
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Fragment>
          </Segment>
        ) : null}
        {arrayLeadsPerSource && arrayLeadsPerSource.length > 0 ? (
          <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
            <Fragment>
              <Header style={{ marginLeft: '10px' }} color="red">
                Leads Per Source
              </Header>
              <Grid padded="horizontally">
                <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
                  <Grid.Column
                    style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                  >
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ textAlign: 'center' }}>Office</Table.HeaderCell>
                          <Table.HeaderCell style={{ textAlign: 'center' }}>Analyst</Table.HeaderCell>
                          <Table.HeaderCell style={{ textAlign: 'center' }}>Source</Table.HeaderCell>
                          <Table.HeaderCell style={{ textAlign: 'center' }}>N of Source</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {arrayLeadsPerSource.map((LeadsPerSource, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{LeadsPerSource['listingAgent.dataRegion']}</Table.Cell>
                              <Table.Cell>{`${LeadsPerSource['listingAgent.firstName']} ${
                                LeadsPerSource['listingAgent.lastName']
                              }`}</Table.Cell>
                              <Table.Cell>{LeadsPerSource['source.label']}</Table.Cell>
                              <Table.Cell>{LeadsPerSource.count}</Table.Cell>
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
        ) : null}
        {arrayTotalPerSource && arrayTotalPerSource.length > 0 ? (
          <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
            <Fragment>
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
            </Fragment>
          </Segment>
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
  totalGeralPerSource: PropTypes.number
}

const mapPropsToValues = props => {
  return {
    dateFrom: moment(),
    dateTo: moment()
  }
}

const mapStateToProps = state => ({
  leadsPerAnalystArray: state.reports.getMarketingReport.leadsPerAnalystArray,
  arrayTotalPerSource: state.reports.getMarketingReport.arrayTotalPerSource,
  arrayLeadsPerSource: state.reports.getMarketingReport.arrayLeadsPerSource,
  totalGeralPerSource: state.reports.getMarketingReport.totalGeralPerSource
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getMarketingReport
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
