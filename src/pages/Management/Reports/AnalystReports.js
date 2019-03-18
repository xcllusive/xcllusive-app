import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Button, Statistic, Dimmer, Loader, Table } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'
import { getAllAnalysts, getAnalystReport } from '../../../redux/ducks/reports'
import GridBusinessStage from '../../../components/content/GridBusinessStage'
import moment from 'moment'

class AnalystReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isGotUser: true
    }
  }
  componentDidMount () {
    this.props.getAllAnalysts()
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
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

  _confirmReports = (values, stageId) => {
    this.props.getAnalystReport(
      values.analyst,
      moment(values.dateFrom).format('YYYY/MM/DD'),
      moment(values.dateTo).format('YYYY/MM/DD'),
      stageId
    )
  }

  render () {
    const { values, arrayAnalysts, arrayBusinesses, isLoadingReports, match } = this.props
    return (
      <Wrapper>
        <Form>
          <Grid>
            <Grid.Row style={{ paddingBottom: '0px' }} columns={2}>
              <Grid.Column>
                <Form.Group>
                  <Form.Field>
                    <Form.Select
                      required
                      label="Select One Analyst"
                      name="analyst"
                      options={arrayAnalysts}
                      value={values.analyst}
                      onChange={this._handleSelectChange}
                    />
                  </Form.Field>
                  {values.analyst !== '' ? (
                    <Fragment>
                      <Form.Field>
                        <label
                          style={{
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
                      <Form.Field style={{ marginTop: '25px' }}>
                        <Button
                          positive
                          icon="checkmark"
                          labelPosition="right"
                          content="Confirm"
                          onClick={() => this._confirmReports(values, 1)}
                        />
                      </Form.Field>
                    </Fragment>
                  ) : null}
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        <Dimmer.Dimmable dimmed={isLoadingReports} style={{ height: '80vh' }}>
          <Dimmer inverted active={isLoadingReports}>
            <Loader>Loading</Loader>
          </Dimmer>
          {arrayBusinesses.length > 0 ? (
            <Fragment>
              <GridBusinessStage>
                <Statistic.Group size="mini" color="blue" widths={4}>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 1)}>
                    {/* <Statistic.Value>
                  {objectQtdeBusinessStage
                  ? `${objectQtdeBusinessStage.businessPotentialListingFilter} of ${
                    objectQtdeBusinessStage.businessPotentialListing
                  }`
                  : 0}
                </Statistic.Value> */}
                    <Statistic.Label>Potential Listing</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 9)}>
                    <Statistic.Value>
                      {/* {objectQtdeBusinessStage
                  ? `${objectQtdeBusinessStage.businessAppraisalFilter} of ${objectQtdeBusinessStage.businessAppraisal}`
                  : 0} */}
                    </Statistic.Value>
                    <Statistic.Label>Appraisal</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 4)}>
                    {/* <Statistic.Value>{objectQtdeBusinessStage ? objectQtdeBusinessStage.businessForSale : 0}</Statistic.Value> */}
                    <Statistic.Label>For Sale</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 8)}>
                    {/* <Statistic.Value>{objectQtdeBusinessStage ? objectQtdeBusinessStage.businessLost : 0}</Statistic.Value> */}
                    <Statistic.Label>Lost</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </GridBusinessStage>
              <Table color="blue" inverted celled selectable compact size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Business ID</Table.HeaderCell>
                    <Table.HeaderCell>Business Name</Table.HeaderCell>
                    <Table.HeaderCell>Contact Name</Table.HeaderCell>
                    <Table.HeaderCell>Log Text</Table.HeaderCell>
                    <Table.HeaderCell>Follow Up Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {arrayBusinesses.map(business => (
                    <Table.Row active key={business.id} onClick={() => history.push(`${match.path}/${business.id}`)}>
                      <Table.Cell
                        style={{
                          backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                        }}
                        warning={
                          !business.BusinessLog.reduce((last, log) => {
                            if (last === true) {
                              return true
                            }
                            return (
                              log.followUpStatus === 'Pending' &&
                              moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                            )
                          }, false)
                        }
                      >{`BS${business.id}`}</Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                        }}
                        warning={
                          !business.BusinessLog.reduce((last, log) => {
                            if (last === true) {
                              return true
                            }
                            return (
                              log.followUpStatus === 'Pending' &&
                              moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                            )
                          }, false)
                        }
                      >
                        {business.businessName}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                        }}
                        warning={
                          !business.BusinessLog.reduce((last, log) => {
                            if (last === true) {
                              return true
                            }
                            return (
                              log.followUpStatus === 'Pending' &&
                              moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                            )
                          }, false)
                        }
                      >{`${business.firstNameV} ${business.lastNameV}`}</Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                        }}
                        warning={
                          !business.BusinessLog.reduce((last, log) => {
                            if (last === true) {
                              return true
                            }
                            return (
                              log.followUpStatus === 'Pending' &&
                              moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                            )
                          }, false)
                        }
                      >
                        {business.BusinessLog[0].text}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                        }}
                        warning={
                          !business.BusinessLog.reduce((last, log) => {
                            if (last === true) {
                              return true
                            }
                            return (
                              log.followUpStatus === 'Pending' &&
                              moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                            )
                          }, false)
                        }
                      >
                        {moment(business.BusinessLog[0].followUp).format('DD/MM/YYYY')}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Fragment>
          ) : null}
        </Dimmer.Dimmable>
      </Wrapper>
    )
  }
}

AnalystReports.propTypes = {
  values: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  setFieldValue: PropTypes.func,
  getAllAnalysts: PropTypes.func,
  arrayAnalysts: PropTypes.array,
  openModal: PropTypes.func,
  getAnalystReport: PropTypes.func,
  arrayBusinesses: PropTypes.array,
  isLoadingReports: PropTypes.bool,
  match: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    analyst: '',
    dateFrom: moment().startOf('month'),
    dateTo: moment()
  }
}

const mapStateToProps = state => ({
  arrayAnalysts: state.reports.getAllAnalysts.array,
  arrayBusinesses: state.reports.getAnalystReports.array,
  isLoadingReports: state.reports.getAnalystReports.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllAnalysts,
      openModal,
      getAnalystReport
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(AnalystReports)
)
