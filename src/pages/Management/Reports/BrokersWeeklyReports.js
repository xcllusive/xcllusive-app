import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Segment, Header } from 'semantic-ui-react'
import moment from 'moment'
import numeral from 'numeral'
import { openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'
import { getBrokersPerRegion, getBusinessesPerBroker, clearWeeklyReports } from '../../../redux/ducks/broker'

class BrokersWeeklyReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataRegion: [
        { key: 1, text: 'Adelaide Office', value: 'Adelaide Office' },
        { key: 2, text: 'Camberra Office', value: 'Camberra Office' },
        { key: 3, text: 'Cowra Office', value: 'Cowra Office' },
        { key: 4, text: 'Gosford Office', value: 'Gosford Office' },
        { key: 5, text: 'Melbourne Office', value: 'Melbourne Office' },
        { key: 6, text: 'Sydney Office', value: 'Sydney Office' },
        { key: 7, text: 'Queensland Office', value: 'Queensland Office' }
      ]
    }
  }
  componentDidMount () {
    this.props.clearWeeklyReports()
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    if (name === 'dataRegion') {
      this.props.getBrokersPerRegion(value)
    }
    if (name === 'brokerAccountName') {
      this.props.getBusinessesPerBroker(value)
    }
  }

  _diffDays = date => {
    return moment().diff(date, 'day')
  }
  render () {
    const {
      values,
      brokersPerRegion,
      isLoadingBroker,
      reportOnTheMarket,
      reportImStage,
      reportUnderOffer,
      reportExchanged
    } = this.props
    const { dataRegion } = this.state
    return (
      <Wrapper>
        <Form>
          <Form.Group>
            <Form.Field>
              <Form.Select
                required
                label="Select One Region"
                name="dataRegion"
                options={dataRegion}
                value={values.dataRegion}
                onChange={this._handleSelectChange}
              />
            </Form.Field>
            {brokersPerRegion.length > 0 ? (
              <Form.Field>
                <Form.Select
                  required
                  label="Select One Broker"
                  options={brokersPerRegion}
                  name="brokerAccountName"
                  autoComplete="brokerAccountName"
                  value={values.brokerAccountName}
                  onChange={this._handleSelectChange}
                  loading={isLoadingBroker}
                />
              </Form.Field>
            ) : null}
          </Form.Group>
        </Form>
        {values.brokerAccountName > 0 ? (
          <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
            {reportOnTheMarket.length > 0 ? (
              <Fragment>
                <Header style={{ marginLeft: '10px' }} color="red">
                  On The Market
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
                            <Table.HeaderCell>Business Name</Table.HeaderCell>
                            <Table.HeaderCell>Text</Table.HeaderCell>
                            <Table.HeaderCell />
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {reportOnTheMarket.map(onTheMarket => {
                            return (
                              <Table.Row key={onTheMarket.business.id}>
                                <Table.Cell verticalAlign="top" width={2}>
                                  <b>{onTheMarket.business.businessName}</b>
                                </Table.Cell>
                                <Table.Cell verticalAlign="top" width={7}>
                                  {onTheMarket.reports ? onTheMarket.reports.text : ''}
                                </Table.Cell>
                                <Table.Cell width={4}>
                                  <Grid celled="internally">
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>Days On The Market:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {onTheMarket.business.daysOnTheMarket
                                          ? this._diffDays(onTheMarket.business.daysOnTheMarket)
                                          : '-'}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Enquiries:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {onTheMarket.nOfEnquiries.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Enquiries, 7 days:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {onTheMarket.nOfEnquiries7Days.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>120 Guaranty</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {onTheMarket.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Pending Tasks</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {onTheMarket.nOfPendingTasks.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of New Logs</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {onTheMarket.nOfNewLogs7Days.count}
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
              </Fragment>
            ) : null}
            {reportImStage.length > 0 ? (
              <Fragment>
                <Header style={{ marginLeft: '10px' }} color="red">
                  IM Stage
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
                            <Table.HeaderCell>Business Name</Table.HeaderCell>
                            <Table.HeaderCell>Text</Table.HeaderCell>
                            <Table.HeaderCell />
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {reportImStage.map(imStage => {
                            return (
                              <Table.Row key={imStage.business.id}>
                                <Table.Cell verticalAlign="top" width={2}>
                                  <b>{imStage.business.businessName}</b>
                                </Table.Cell>
                                <Table.Cell verticalAlign="top" width={7}>
                                  {imStage.reports ? imStage.reports.text : ''}
                                </Table.Cell>
                                <Table.Cell width={4}>
                                  <Grid celled="internally">
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>Days On The Market:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {imStage.business.daysOnTheMarket
                                          ? this._diffDays(imStage.business.daysOnTheMarket)
                                          : '-'}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Enquiries:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {imStage.nOfEnquiries.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Enquiries, 7 days:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {imStage.nOfEnquiries7Days.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>120 Guaranty</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {imStage.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Pending Tasks</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {imStage.nOfPendingTasks.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of New Logs</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {imStage.nOfNewLogs7Days.count}
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
              </Fragment>
            ) : null}
            {reportUnderOffer.length > 0 ? (
              <Fragment>
                <Header style={{ marginLeft: '10px' }} color="red">
                  Under Offer
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
                            <Table.HeaderCell>Business Name</Table.HeaderCell>
                            <Table.HeaderCell>Text</Table.HeaderCell>
                            <Table.HeaderCell />
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {reportUnderOffer.map(underOffer => {
                            return (
                              <Table.Row key={underOffer.business.id}>
                                <Table.Cell verticalAlign="top" width={2}>
                                  <b>{underOffer.business.businessName}</b>
                                </Table.Cell>
                                <Table.Cell verticalAlign="top" width={7}>
                                  {underOffer.reports ? underOffer.reports.text : ''}
                                </Table.Cell>
                                <Table.Cell width={4}>
                                  <Grid celled="internally">
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>Days On The Market:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {underOffer.business.daysOnTheMarket
                                          ? this._diffDays(underOffer.business.daysOnTheMarket)
                                          : '-'}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Enquiries:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {underOffer.nOfEnquiries.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Enquiries, 7 days:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {underOffer.nOfEnquiries7Days.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>120 Guaranty</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {underOffer.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Pending Tasks</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {underOffer.nOfPendingTasks.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of New Logs</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {underOffer.nOfNewLogs7Days.count}
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
              </Fragment>
            ) : null}
            {reportExchanged.length > 0 ? (
              <Fragment>
                <Header style={{ marginLeft: '10px' }} color="red">
                  Exchanged
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
                            <Table.HeaderCell>Business Name</Table.HeaderCell>
                            <Table.HeaderCell>Text</Table.HeaderCell>
                            <Table.HeaderCell />
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {reportExchanged.map(exchanged => {
                            return (
                              <Table.Row key={exchanged.business.id}>
                                <Table.Cell verticalAlign="top" width={2}>
                                  <b>{exchanged.business.businessName}</b>
                                </Table.Cell>
                                <Table.Cell verticalAlign="top" width={7}>
                                  {exchanged.reports ? exchanged.reports.text : ''}
                                </Table.Cell>
                                <Table.Cell width={4}>
                                  <Grid celled="internally">
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>Days On The Market:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {exchanged.business.daysOnTheMarket
                                          ? this._diffDays(exchanged.business.daysOnTheMarket)
                                          : '-'}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>Price:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {numeral(exchanged.reports.expectedPrice).format('$0,0.[99]')}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>Settlement Date:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {moment(exchanged.reports.expectedSettlementDate).format('DD/MM/YYYY')}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>Commission:</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {numeral(exchanged.reports.expectedCommission).format('$0,0.[99]')}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>120 Guaranty</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {exchanged.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of Pending Tasks</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {exchanged.nOfPendingTasks.count}
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                        <b>No. of New Logs</b>
                                      </Grid.Column>
                                      <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                        {exchanged.nOfNewLogs7Days.count}
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
              </Fragment>
            ) : null}
          </Segment>
        ) : null}
      </Wrapper>
    )
  }
}

BrokersWeeklyReports.propTypes = {
  values: PropTypes.object,
  openModal: PropTypes.func,
  setFieldValue: PropTypes.func,
  getBrokersPerRegion: PropTypes.func,
  brokersPerRegion: PropTypes.array,
  isLoadingBroker: PropTypes.bool,
  getBusinessesPerBroker: PropTypes.func,
  reportOnTheMarket: PropTypes.array,
  clearWeeklyReports: PropTypes.func,
  reportImStage: PropTypes.array,
  reportUnderOffer: PropTypes.array,
  reportExchanged: PropTypes.array
}

const mapPropsToValues = props => {
  return {
    dataRegion: '',
    brokerAccountName: 0
  }
}

const mapStateToProps = state => ({
  brokersPerRegion: state.broker.getBrokersPerRegion.array,
  isLoadingBroker: state.broker.getBrokersPerRegion.isLoading,
  reportOnTheMarket: state.broker.getBusinessesPerBroker.arrayReportOnTheMarket,
  reportImStage: state.broker.getBusinessesPerBroker.arrayReportImStage,
  reportUnderOffer: state.broker.getBusinessesPerBroker.arrayReportUnderOffer,
  reportExchanged: state.broker.getBusinessesPerBroker.arrayReportExchanged
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getBrokersPerRegion,
      getBusinessesPerBroker,
      clearWeeklyReports
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(BrokersWeeklyReports)
)
