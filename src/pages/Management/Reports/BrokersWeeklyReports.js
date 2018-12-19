import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Segment, Header, Dimmer, Loader, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import numeral from 'numeral'
import { openModal, TypesModal } from '../../../redux/ducks/modal'
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

  _toDo = business => {
    this.props.openModal(TypesModal.MODAL_TYPE_BROKERS_WEEKLY_REPORT_TO_DO, {
      title: 'To Do',
      business
    })
  }

  render () {
    const {
      values,
      brokersPerRegion,
      isLoadingBroker,
      reportOnTheMarket,
      reportImStage,
      reportUnderOffer,
      reportExchanged,
      isLoadingReports,
      reportWithdrawn,
      reportSold,
      businessesNotAlocated
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
        <Dimmer.Dimmable dimmed={isLoadingReports} style={{ height: '80vh' }}>
          <Dimmer inverted active={isLoadingReports}>
            <Loader>Loading</Loader>
          </Dimmer>
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
                                    <Grid>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <b>{onTheMarket.business.businessName}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color="blue"
                                            onClick={() => this._toDo(onTheMarket.business)}
                                          >
                                            <Icon name="pencil alternate" />
                                            To Do
                                          </Button>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell verticalAlign="top" width={7}>
                                    <Grid celled="internally">
                                      <Grid.Row>
                                        <Grid.Column>{onTheMarket.reports ? onTheMarket.reports.text : ''}</Grid.Column>
                                      </Grid.Row>
                                      {onTheMarket.reports.textToDo ? (
                                        <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                          <Grid.Column>
                                            {onTheMarket.reports ? onTheMarket.reports.textToDo : ''}
                                          </Grid.Column>
                                        </Grid.Row>
                                      ) : null}
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell width={4}>
                                    <Grid celled="internally">
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Days On The Market:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color:
                                              this._diffDays(onTheMarket.business.daysOnTheMarket) > 120
                                                ? 'red'
                                                : 'blue'
                                          }}
                                          width={5}
                                        >
                                          {onTheMarket.business.daysOnTheMarket ? (
                                            <b>{this._diffDays(onTheMarket.business.daysOnTheMarket)}</b>
                                          ) : (
                                            '-'
                                          )}
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Enquiries:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{onTheMarket.nOfEnquiries.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Enquiries, 7 days:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{onTheMarket.nOfEnquiries7Days.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>120 Guaranty</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: onTheMarket.business.data120DayGuarantee === 1 ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{onTheMarket.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Pending Tasks:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{onTheMarket.nOfPendingTasks.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of New Logs, 7 Days:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{onTheMarket.nOfNewLogs7Days.count}</b>
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
                                    <Grid>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <b>{imStage.business.businessName}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color="blue"
                                            onClick={() => this._toDo(imStage.business)}
                                          >
                                            <Icon name="pencil alternate" />
                                            To Do
                                          </Button>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell verticalAlign="top" width={7}>
                                    <Grid celled="internally">
                                      <Grid.Row>
                                        <Grid.Column>{imStage.reports ? imStage.reports.text : ''}</Grid.Column>
                                      </Grid.Row>
                                      {imStage.reports.textToDo ? (
                                        <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                          <Grid.Column>{imStage.reports ? imStage.reports.textToDo : ''}</Grid.Column>
                                        </Grid.Row>
                                      ) : null}
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell width={4}>
                                    <Grid celled="internally">
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Days On The Market:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          {imStage.business.daysOnTheMarket ? (
                                            <b>{this._diffDays(imStage.business.daysOnTheMarket)}</b>
                                          ) : (
                                            '-'
                                          )}
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Days Since Engaged:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{imStage.nOfEnquiries.count}</b>
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
                                    <Grid>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <b>{underOffer.business.businessName}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color="blue"
                                            onClick={() => this._toDo(underOffer.business)}
                                          >
                                            <Icon name="pencil alternate" />
                                            To Do
                                          </Button>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell verticalAlign="top" width={7}>
                                    <Grid celled="internally">
                                      <Grid.Row>
                                        <Grid.Column>{underOffer.reports ? underOffer.reports.text : ''}</Grid.Column>
                                      </Grid.Row>
                                      {underOffer.reports.textToDo ? (
                                        <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                          <Grid.Column>
                                            {underOffer.reports ? underOffer.reports.textToDo : ''}
                                          </Grid.Column>
                                        </Grid.Row>
                                      ) : null}
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell width={4}>
                                    <Grid celled="internally">
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Days On The Market:</b>
                                        </Grid.Column>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                          {underOffer.business.daysOnTheMarket ? (
                                            <b>{this._diffDays(underOffer.business.daysOnTheMarket)}</b>
                                          ) : (
                                            '-'
                                          )}
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Enquiries:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{underOffer.nOfEnquiries.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Enquiries, 7 days:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{underOffer.nOfEnquiries7Days.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>120 Guaranty:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: underOffer.business.data120DayGuarantee === 1 ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{underOffer.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Pending Tasks:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{underOffer.nOfPendingTasks.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of New Logs, 7 Days:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{underOffer.nOfNewLogs7Days.count}</b>
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
                                    <Grid>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <b>{exchanged.business.businessName}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color="blue"
                                            onClick={() => this._toDo(exchanged.business)}
                                          >
                                            <Icon name="pencil alternate" />
                                            To Do
                                          </Button>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell verticalAlign="top" width={7}>
                                    <Grid celled="internally">
                                      <Grid.Row>
                                        <Grid.Column>{exchanged.reports ? exchanged.reports.text : ''}</Grid.Column>
                                      </Grid.Row>
                                      {exchanged.reports.textToDo ? (
                                        <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                          <Grid.Column>
                                            {exchanged.reports ? exchanged.reports.textToDo : ''}
                                          </Grid.Column>
                                        </Grid.Row>
                                      ) : null}
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell width={4}>
                                    <Grid celled="internally">
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Days On The Market:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          {exchanged.business.daysOnTheMarket ? (
                                            <b>{this._diffDays(exchanged.business.daysOnTheMarket)}</b>
                                          ) : (
                                            '-'
                                          )}
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'red' }}
                                          width={8}
                                        >
                                          <b>Price:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{numeral(exchanged.reports.expectedPrice).format('$0,0.[99]')}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'red' }}
                                          width={8}
                                        >
                                          <b>Settlement Date:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{moment(exchanged.reports.expectedSettlementDate).format('DD/MM/YYYY')}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'red' }}
                                          width={8}
                                        >
                                          <b>Commission:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{numeral(exchanged.reports.expectedCommission).format('$0,0.[99]')}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>120 Guaranty:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: exchanged.business.data120DayGuarantee === 1 ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{exchanged.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Pending Tasks:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{exchanged.nOfPendingTasks.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of New Logs, 7 Days:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{exchanged.nOfNewLogs7Days.count}</b>
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
              {reportWithdrawn.length > 0 ? (
                <Fragment>
                  <Header style={{ marginLeft: '10px' }} color="red">
                    Withdrawn
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
                            {reportWithdrawn.map(withdrawn => {
                              return (
                                <Table.Row key={withdrawn.business.id}>
                                  <Table.Cell verticalAlign="top" width={2}>
                                    <Grid>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <b>{withdrawn.business.businessName}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color="blue"
                                            onClick={() => this._toDo(withdrawn.business)}
                                          >
                                            <Icon name="pencil alternate" />
                                            To Do
                                          </Button>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell verticalAlign="top" width={7}>
                                    <Grid celled="internally">
                                      <Grid.Row>
                                        <Grid.Column>{withdrawn.reports ? withdrawn.reports.text : ''}</Grid.Column>
                                      </Grid.Row>
                                      {withdrawn.reports.textToDo ? (
                                        <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                          <Grid.Column>
                                            {withdrawn.reports ? withdrawn.reports.textToDo : ''}
                                          </Grid.Column>
                                        </Grid.Row>
                                      ) : null}
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell width={4}>
                                    <Grid celled="internally">
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Days On The Market:</b>
                                        </Grid.Column>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                          {withdrawn.business.daysOnTheMarket ? (
                                            <b>{this._diffDays(withdrawn.business.daysOnTheMarket)}</b>
                                          ) : (
                                            '-'
                                          )}
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Enquiries:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{withdrawn.nOfEnquiries.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Enquiries, 7 days:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{withdrawn.nOfEnquiries7Days.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>120 Guaranty:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: withdrawn.business.data120DayGuarantee === 1 ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{withdrawn.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Pending Tasks:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{withdrawn.nOfPendingTasks.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of New Logs, 7 Days:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{withdrawn.nOfNewLogs7Days.count}</b>
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
              {reportSold.length > 0 ? (
                <Fragment>
                  <Header style={{ marginLeft: '10px' }} color="red">
                    Sold
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
                            {reportSold.map(sold => {
                              return (
                                <Table.Row key={sold.business.id}>
                                  <Table.Cell verticalAlign="top" width={2}>
                                    <Grid>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <b>{sold.business.businessName}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button size="small" color="blue" onClick={() => this._toDo(sold.business)}>
                                            <Icon name="pencil alternate" />
                                            To Do
                                          </Button>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell verticalAlign="top" width={7}>
                                    <Grid celled="internally">
                                      <Grid.Row>
                                        <Grid.Column>{sold.reports ? sold.reports.text : ''}</Grid.Column>
                                      </Grid.Row>
                                      {sold.reports.textToDo ? (
                                        <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                          <Grid.Column>{sold.reports ? sold.reports.textToDo : ''}</Grid.Column>
                                        </Grid.Row>
                                      ) : null}
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell width={4}>
                                    <Grid celled="internally">
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Days On The Market:</b>
                                        </Grid.Column>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                          {sold.business.daysOnTheMarket ? (
                                            <b>{this._diffDays(sold.business.daysOnTheMarket)}</b>
                                          ) : (
                                            '-'
                                          )}
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'red' }}
                                          width={8}
                                        >
                                          <b>Price:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          {numeral(sold.reports.expectedPrice).format('$0,0.[99]')}
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'red' }}
                                          width={8}
                                        >
                                          <b>Settlement Date:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{moment(sold.reports.expectedSettlementDate).format('DD/MM/YYYY')}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'red' }}
                                          width={8}
                                        >
                                          <b>Commission:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{numeral(sold.reports.expectedCommission).format('$0,0.[99]')}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>120 Guaranty</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: sold.business.data120DayGuarantee === 1 ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{sold.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Pending Tasks</b>
                                        </Grid.Column>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                          <b>{sold.nOfPendingTasks.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of New Logs</b>
                                        </Grid.Column>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                          <b>{sold.nOfNewLogs7Days.count}</b>
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
              {businessesNotAlocated.length > 0 ? (
                <Fragment>
                  <Header style={{ marginLeft: '10px' }} color="red">
                    Not Located
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
                            {businessesNotAlocated.map(notAlocated => {
                              return (
                                <Table.Row key={notAlocated.business.id}>
                                  <Table.Cell verticalAlign="top" width={2}>
                                    <b>{notAlocated.business.businessName}</b>
                                  </Table.Cell>
                                  <Table.Cell verticalAlign="top" width={7}>
                                    {notAlocated.reports ? notAlocated.reports.text : ''}
                                  </Table.Cell>
                                  <Table.Cell width={4}>
                                    <Grid celled="internally">
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Days On The Market:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color:
                                              this._diffDays(notAlocated.business.daysOnTheMarket) > 120
                                                ? 'red'
                                                : 'blue'
                                          }}
                                          width={5}
                                        >
                                          {notAlocated.business.daysOnTheMarket ? (
                                            <b>{this._diffDays(notAlocated.business.daysOnTheMarket)}</b>
                                          ) : (
                                            '-'
                                          )}
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Enquiries:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{notAlocated.nOfEnquiries.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Enquiries, 7 days:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{notAlocated.nOfEnquiries7Days.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>120 Guaranty</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: notAlocated.business.data120DayGuarantee === 1 ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{notAlocated.business.data120DayGuarantee === 1 ? 'Yes' : 'No'}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Pending Tasks:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{notAlocated.nOfPendingTasks.count}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of New Logs, 7 Days:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ paddingBottom: '0px', paddingTop: '0px', color: 'blue' }}
                                          width={5}
                                        >
                                          <b>{notAlocated.nOfNewLogs7Days.count}</b>
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
        </Dimmer.Dimmable>
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
  reportExchanged: PropTypes.array,
  isLoadingReports: PropTypes.bool,
  reportWithdrawn: PropTypes.array,
  reportSold: PropTypes.array,
  businessesNotAlocated: PropTypes.array
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
  reportExchanged: state.broker.getBusinessesPerBroker.arrayReportExchanged,
  reportWithdrawn: state.broker.getBusinessesPerBroker.arrayReportWithdrawn,
  isLoadingReports: state.broker.getBusinessesPerBroker.isLoading,
  reportSold: state.broker.getBusinessesPerBroker.arrayReportSold,
  businessesNotAlocated: state.broker.getBusinessesPerBroker.arrayBusinessesNotAlocated
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
