import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Button, Statistic, Dimmer, Loader, Table, Segment, Header, Icon } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TypesModal, openModal } from '../../../../redux/ducks/modal'
import Wrapper from '../../../../components/content/Wrapper'
import { getAllAnalysts, getAnalystReport, getQtdeBusinessesStagePerUser } from '../../../../redux/ducks/reports'
import GridBusinessStage from '../../../../components/content/GridBusinessStage'
import moment from 'moment'

class AnalystReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isGotUser: true
    }
  }
  componentDidMount () {
    if (!this.props.arrayBusinesses) this.props.getAllAnalysts()
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

  _confirmReports = async (values, stageId, fromButton = false) => {
    if (fromButton) {
      await this.props.getQtdeBusinessesStagePerUser(
        values.analyst,
        moment(values.dateFrom).format('YYYY/MM/DD 00:00:00'),
        moment(values.dateTo).format('YYYY/MM/DD 23:59:59')
      )
    }
    this.props.getAnalystReport(
      values.analyst,
      moment(values.dateFrom).format('YYYY/MM/DD 00:00:00'),
      moment(values.dateTo).format('YYYY/MM/DD 23:59:59'),
      stageId
    )
  }

  _goToBusinessPage (business) {
    this.props.history.push({
      pathname: `/business/${business.id}`,
      state: {
        previousPage: 'Analyst Report'
      }
    })
  }

  _showStageLabel (keepAnalystParams) {
    let label = ''
    if (keepAnalystParams.stageId === 1) label = 'Potential Listing'
    if (keepAnalystParams.stageId === 4) label = 'For Sale'
    if (keepAnalystParams.stageId === 8) label = 'Lost'
    if (keepAnalystParams.stageId === 9) label = 'Appraisal'
    return label
  }

  render () {
    const { values, arrayAnalysts, arrayBusinesses, isLoadingReports, qtdeBusinesses, keepAnalystParams } = this.props
    return (
      <Wrapper>
        <Form>
          <Grid>
            <Grid.Row style={{ paddingBottom: '0px' }}>
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
                          onClick={() => this._confirmReports(values, 1, true)}
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
          {arrayBusinesses ? (
            <Fragment>
              <GridBusinessStage>
                <Statistic.Group size="mini" color="blue" widths={4}>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 1)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessPotentialListing : 0}</Statistic.Value>
                    <Statistic.Label>Potential Listing</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 9)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessAppraisal : 0}</Statistic.Value>
                    <Statistic.Label>Appraisal</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 4)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessForSale : 0}</Statistic.Value>
                    <Statistic.Label>For Sale</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 8)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessLost : 0}</Statistic.Value>
                    <Statistic.Label>Lost</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </GridBusinessStage>
              {keepAnalystParams && arrayBusinesses.length > 0 ? (
                <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
                  <Header style={{ marginLeft: '10px' }} color="red">
                    {this._showStageLabel(keepAnalystParams)}
                  </Header>
                  <Table celled striped selectable compact size="small">
                    <Table.Header>
                      {keepAnalystParams && keepAnalystParams.stageId !== 8 ? (
                        <Table.Row>
                          <Table.HeaderCell width={2}>Business ID</Table.HeaderCell>
                          <Table.HeaderCell width={3}>Business Name</Table.HeaderCell>
                          <Table.HeaderCell width={2}>Contact Name</Table.HeaderCell>
                          <Table.HeaderCell width={8}>Log Text</Table.HeaderCell>
                          <Table.HeaderCell width={1}>Follow Up Date</Table.HeaderCell>
                        </Table.Row>
                      ) : (
                        <Table.Row>
                          <Table.HeaderCell width={4}>Business</Table.HeaderCell>
                          <Table.HeaderCell width={8}>Listing Agent Lost Notes</Table.HeaderCell>
                          <Table.HeaderCell width={4}>Recovery Notes</Table.HeaderCell>
                        </Table.Row>
                      )}
                    </Table.Header>
                    <Table.Body>
                      {arrayBusinesses.map(business =>
                        business.stageId !== 8 ? (
                          <Table.Row key={business.id}>
                            <Table.Cell>
                              <Grid>
                                <Grid.Row columns={2}>
                                  <Grid.Column width={2}>
                                    <Icon link name="magnify" onClick={() => this._goToBusinessPage(business)} />
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingLeft: '0px' }}>{`BS${business.id}`}</Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Table.Cell>
                            <Table.Cell>{business.businessName}</Table.Cell>
                            <Table.Cell>{`${business.firstNameV} ${business.lastNameV}`}</Table.Cell>
                            <Table.Cell>{business.BusinessLog[0].text}</Table.Cell>
                            <Table.Cell>{moment(business.BusinessLog[0].followUp).format('DD/MM/YYYY')}</Table.Cell>
                          </Table.Row>
                        ) : (
                          <Table.Row key={business.id}>
                            <Table.Cell>
                              <Grid celled="internally">
                                <Grid.Row>
                                  <Grid.Column width={16}>
                                    <Header style={{ color: 'blue' }}>
                                      <u>
                                        <b>{business.businessName}</b>
                                      </u>
                                    </Header>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    ID:
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={4}>
                                    <Grid>
                                      <Grid.Row columns={2}>
                                        <Grid.Column>
                                          <Icon link name="magnify" onClick={() => this._goToBusinessPage(business)} />
                                        </Grid.Column>
                                        <Grid.Column style={{ paddingLeft: '0px' }}>
                                          <b>{`BS${business.id}`}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    Source:
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={2}>
                                    <b>{business.source.label}</b>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    Went to meeting:
                                  </Grid.Column>
                                  <Grid.Column
                                    style={{
                                      paddingBottom: '0px',
                                      paddingTop: '0px',
                                      color: business.saleNotesLostMeeting ? 'Green' : 'Red'
                                    }}
                                    width={2}
                                  >
                                    <b>{business.saleNotesLostMeeting ? 'Yes' : 'No'}</b>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    Do we want it:
                                  </Grid.Column>
                                  <Grid.Column
                                    style={{
                                      paddingBottom: '0px',
                                      paddingTop: '0px',
                                      color: business.saleNotesLostWant ? 'Green' : 'Red'
                                    }}
                                    width={2}
                                  >
                                    <b>{business.saleNotesLostWant ? 'Yes' : 'No'}</b>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    Days until lost:
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={2}>
                                    <b>{moment(business.lostDate).diff(business.dateTimeCreated, 'day')}</b>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    Lost date:
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={2}>
                                    <b>{moment(business.lostDate).format('DD/MM/YYYY')}</b>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Table.Cell>
                            <Table.Cell>
                              <Grid celled="internally">
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                    {business.saleNotesLostWant
                                      ? 'Why did they not sign with us?'
                                      : 'Why did we not want then?'}
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={11}>
                                    <b>
                                      {business.saleNotesLostWant
                                        ? business.stageNotSigned.label
                                        : business.stageNotWant.label}
                                    </b>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column width={5}>Agent Notes:</Grid.Column>
                                  <Grid.Column width={11}>
                                    <b>{business.afterSalesNotes}</b>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Table.Cell>
                            <Table.Cell>
                              <Grid celled="internally">
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={7}>
                                    Recovery Business:
                                  </Grid.Column>
                                  <Grid.Column
                                    style={{
                                      paddingBottom: '0px',
                                      paddingTop: '0px',
                                      color: business.BusinessLog[0].followUpStatus === 'Pending' ? 'Green' : 'Red'
                                    }}
                                    width={9}
                                  >
                                    <b>{business.BusinessLog[0].followUpStatus === 'Pending' ? 'Yes' : 'No'}</b>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={7}>
                                    Lead Nature List:
                                  </Grid.Column>
                                  <Grid.Column
                                    style={{
                                      paddingBottom: '0px',
                                      paddingTop: '0px',
                                      color: business.addLeadNurtureList ? 'Green' : 'Red'
                                    }}
                                    width={9}
                                  >
                                    <b>{business.addLeadNurtureList ? 'Yes' : 'No'}</b>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Table.Cell>
                          </Table.Row>
                        )
                      )}
                    </Table.Body>
                  </Table>
                </Segment>
              ) : null}
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
  match: PropTypes.func,
  getQtdeBusinessesStagePerUser: PropTypes.func,
  qtdeBusinesses: PropTypes.object,
  keepAnalystParams: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    analyst: props.keepAnalystParams ? props.keepAnalystParams.analystId : '',
    dateFrom: props.keepAnalystParams ? moment(new Date(props.keepAnalystParams.dateFrom)) : moment().startOf('month'),
    dateTo: props.keepAnalystParams ? moment(new Date(props.keepAnalystParams.dateTo)) : moment()
  }
}

const mapStateToProps = state => ({
  arrayAnalysts: state.reports.getAllAnalysts.array,
  arrayBusinesses: state.reports.getAnalystReports.array,
  isLoadingReports: state.reports.getAnalystReports.isLoading,
  qtdeBusinesses: state.reports.getQtdeBusinessesStagePerUser.qtde,
  keepAnalystParams: state.reports.keepAnalystParams
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllAnalysts,
      openModal,
      getAnalystReport,
      getQtdeBusinessesStagePerUser
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
