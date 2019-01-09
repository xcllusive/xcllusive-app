import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Segment, Header, Dimmer, Loader, Button, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'
import numeral from 'numeral'
import { openModal, TypesModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'
import { getBrokersPerRegion, getBusinessesPerBroker, clearWeeklyReports } from '../../../redux/ducks/broker'
import { getUserLogged } from '../../../redux/ducks/user'

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
      ],
      isGotUser: true
    }
  }
  async componentDidMount () {
    // this.props.clearWeeklyReports()
    await this.props.getUserLogged()
    this.props.setFieldValue('dataRegion', this.props.user.dataRegion)
    this.props.getBrokersPerRegion(this.props.user.dataRegion)
  }

  componentDidUpdate (nextProps) {
    if (
      (this.props.isCreated && nextProps.isCreated !== this.props.isCreated) ||
      (this.props.isUpdated && nextProps.isUpdated !== this.props.isUpdated)
    ) {
      this.props.getBusinessesPerBroker(this.props.values.brokerAccountName)
    }
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

  _toDo = (business, reports) => {
    this.props.openModal(TypesModal.MODAL_TYPE_BROKERS_WEEKLY_REPORT_TO_DO, {
      title: 'To Do',
      business,
      reports
    })
  }

  _olderThan7Days = report => {
    if (moment().diff(report.dateTimeCreated, 'day') > 7) {
      return '#f5020229'
    } else return null
  }

  _goToHistoricalWeeklyReport (business) {
    this.props.history.push({
      pathname: `/management/historical-weekly-report/${business.id}`,
      state: {
        business: business
      }
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
      businessesNotAlocated,
      user
    } = this.props
    const { dataRegion } = this.state
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
                      label="Select One Region"
                      name="dataRegion"
                      options={dataRegion}
                      value={values.dataRegion}
                      onChange={this._handleSelectChange}
                      disabled={user && !user.levelOfInfoAccess}
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
              </Grid.Column>
              {values.brokerAccountName > 0 ? (
                <Grid.Column textAlign="center">
                  <Grid style={{ marginLeft: '300px' }}>
                    <Grid.Row style={{ paddingBottom: '0px', marginTop: '20px' }}>
                      <Grid.Column textAlign="left">
                        <Label style={{ backgroundColor: '#f5020229' }} size="medium" />
                        <label>
                          <b>older than 7 days</b>
                        </label>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '0px' }}>
                      <Grid.Column textAlign="left">
                        <Label style={{ backgroundColor: 'rgba(255, 255, 0, 1)' }} size="medium" />
                        <label>
                          <b>last to do task</b>
                        </label>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              ) : null}
            </Grid.Row>
          </Grid>
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
                                          <Grid.Row columns={2}>
                                            <Grid.Column>
                                              <Header style={{ marginRight: '0px' }} floated="left">
                                                <Icon
                                                  link
                                                  name="archive"
                                                  onClick={() => this._goToHistoricalWeeklyReport(onTheMarket.business)}
                                                />
                                              </Header>
                                            </Grid.Column>
                                            <Grid.Column>
                                              <Header
                                                onClick={() =>
                                                  this.props.history.push(`business/${onTheMarket.business.id}`)
                                                }
                                              >
                                                <u>
                                                  <b>{onTheMarket.business.businessName}</b>
                                                </u>
                                              </Header>
                                            </Grid.Column>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Header as="h3" color="brown">
                                            <b>{numeral(onTheMarket.business.currentPrice).format('$0,0.[99]')}</b>
                                          </Header>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color={
                                              onTheMarket.reports && onTheMarket.reports.textToDo ? 'yellow' : 'blue'
                                            }
                                            onClick={() => this._toDo(onTheMarket.business, onTheMarket.reports)}
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
                                        <Grid.Column
                                          style={{
                                            backgroundColor: onTheMarket.reports
                                              ? this._olderThan7Days(onTheMarket.reports)
                                              : null
                                          }}
                                        >
                                          {onTheMarket.reports ? onTheMarket.reports.text : ''}
                                        </Grid.Column>
                                      </Grid.Row>
                                      {onTheMarket.arrayOneBeforeLastTextToDo &&
                                      onTheMarket.arrayOneBeforeLastTextToDo.textToDo ? (
                                          <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                            <Grid.Column>
                                              {onTheMarket.reports ? onTheMarket.arrayOneBeforeLastTextToDo.textToDo : ''}
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
                                          <b>120 Guaranty:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: onTheMarket.business.data120DayGuarantee === '1' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{onTheMarket.business.data120DayGuarantee === '1' ? 'Yes' : 'No'}</b>
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
                                          <b>{onTheMarket.nOfPendingTasks}</b>
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
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Weekly Discussion:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: onTheMarket.reports.progressDiscussion === 'No' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{onTheMarket.reports.progressDiscussion}</b>
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
                                          <Grid.Row columns={2}>
                                            <Grid.Column>
                                              <Header style={{ marginRight: '0px' }} floated="left">
                                                <Icon
                                                  link
                                                  name="archive"
                                                  onClick={() => this._goToHistoricalWeeklyReport(imStage.business)}
                                                />
                                              </Header>
                                            </Grid.Column>
                                            <Grid.Column>
                                              <Header
                                                onClick={() =>
                                                  this.props.history.push(`business/${imStage.business.id}`)
                                                }
                                              >
                                                <u>
                                                  <b>{imStage.business.businessName}</b>
                                                </u>
                                              </Header>
                                            </Grid.Column>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Header as="h3" color="brown">
                                            <b>{numeral(imStage.business.currentPrice).format('$0,0.[99]')}</b>
                                          </Header>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color={imStage.reports && imStage.reports.textToDo ? 'yellow' : 'blue'}
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
                                      {imStage.arrayOneBeforeLastTextToDo &&
                                      imStage.arrayOneBeforeLastTextToDo.textToDo ? (
                                          <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                            <Grid.Column>
                                              {imStage.arrayOneBeforeLastTextToDo
                                                ? imStage.arrayOneBeforeLastTextToDo.textToDo
                                                : ''}
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
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Weekly Discussion:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: imStage.reports.progressDiscussion === 'No' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{imStage.reports.progressDiscussion}</b>
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
                                          <Grid.Row columns={2}>
                                            <Grid.Column>
                                              <Header style={{ marginRight: '0px' }} floated="left">
                                                <Icon
                                                  link
                                                  name="archive"
                                                  onClick={() => this._goToHistoricalWeeklyReport(underOffer.business)}
                                                />
                                              </Header>
                                            </Grid.Column>
                                            <Grid.Column>
                                              <Header
                                                onClick={() =>
                                                  this.props.history.push(`business/${underOffer.business.id}`)
                                                }
                                              >
                                                <u>
                                                  <b>{underOffer.business.businessName}</b>
                                                </u>
                                              </Header>
                                            </Grid.Column>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Header as="h3" color="brown">
                                            <b>{numeral(underOffer.business.currentPrice).format('$0,0.[99]')}</b>
                                          </Header>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color={
                                              underOffer.reports && underOffer.reports.textToDo ? 'yellow' : 'blue'
                                            }
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
                                      {underOffer.arrayOneBeforeLastTextToDo &&
                                      underOffer.arrayOneBeforeLastTextToDo.textToDo ? (
                                          <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                            <Grid.Column>
                                              {underOffer.arrayOneBeforeLastTextToDo
                                                ? underOffer.arrayOneBeforeLastTextToDo.textToDo
                                                : ''}
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
                                            color: underOffer.business.data120DayGuarantee === '1' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{underOffer.business.data120DayGuarantee === '1' ? 'Yes' : 'No'}</b>
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
                                          <b>{underOffer.nOfPendingTasks}</b>
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
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Weekly Discussion:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: underOffer.reports.progressDiscussion === 'No' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{underOffer.reports.progressDiscussion}</b>
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
                                          <Grid.Row columns={2}>
                                            <Grid.Column>
                                              <Header style={{ marginRight: '0px' }} floated="left">
                                                <Icon
                                                  link
                                                  name="archive"
                                                  onClick={() => this._goToHistoricalWeeklyReport(exchanged.business)}
                                                />
                                              </Header>
                                            </Grid.Column>
                                            <Grid.Column>
                                              <Header
                                                onClick={() =>
                                                  this.props.history.push(`business/${exchanged.business.id}`)
                                                }
                                              >
                                                <u>
                                                  <b>{exchanged.business.businessName}</b>
                                                </u>
                                              </Header>
                                            </Grid.Column>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Header as="h3" color="brown">
                                            <b>{numeral(exchanged.business.currentPrice).format('$0,0.[99]')}</b>
                                          </Header>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color={exchanged.reports && exchanged.reports.textToDo ? 'yellow' : 'blue'}
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
                                      {exchanged.arrayOneBeforeLastTextToDo &&
                                      exchanged.arrayOneBeforeLastTextToDo.textToDo ? (
                                          <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                            <Grid.Column>
                                              {exchanged.arrayOneBeforeLastTextToDo
                                                ? exchanged.arrayOneBeforeLastTextToDo.textToDo
                                                : ''}
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
                                          {moment(exchanged.reports.expectedSettlementDate).isValid() ? (
                                            <b>
                                              {moment(exchanged.reports.expectedSettlementDate).format('DD/MM/YYYY')}
                                            </b>
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
                                            color: exchanged.business.data120DayGuarantee === '1' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{exchanged.business.data120DayGuarantee === '1' ? 'Yes' : 'No'}</b>
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
                                          <b>{exchanged.nOfPendingTasks}</b>
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
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Weekly Discussion:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: exchanged.reports.progressDiscussion === 'No' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{exchanged.reports.progressDiscussion}</b>
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
                                          <Grid.Row columns={2}>
                                            <Grid.Column>
                                              <Header style={{ marginRight: '0px' }} floated="left">
                                                <Icon
                                                  link
                                                  name="archive"
                                                  onClick={() => this._goToHistoricalWeeklyReport(withdrawn.business)}
                                                />
                                              </Header>
                                            </Grid.Column>
                                            <Grid.Column>
                                              <Header
                                                onClick={() =>
                                                  this.props.history.push(`business/${withdrawn.business.id}`)
                                                }
                                              >
                                                <u>
                                                  <b>{withdrawn.business.businessName}</b>
                                                </u>
                                              </Header>
                                            </Grid.Column>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Header as="h3" color="brown">
                                            <b>{numeral(withdrawn.business.currentPrice).format('$0,0.[99]')}</b>
                                          </Header>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color={withdrawn.reports && withdrawn.reports.textToDo ? 'yellow' : 'blue'}
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
                                      {withdrawn.arrayOneBeforeLastTextToDo &&
                                      withdrawn.arrayOneBeforeLastTextToDo.textToDo ? (
                                          <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                            <Grid.Column>
                                              {withdrawn.arrayOneBeforeLastTextToDo
                                                ? withdrawn.arrayOneBeforeLastTextToDo.textToDo
                                                : ''}
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
                                            color: withdrawn.business.data120DayGuarantee === '1' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{withdrawn.business.data120DayGuarantee === '1' ? 'Yes' : 'No'}</b>
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
                                          <b>{withdrawn.nOfPendingTasks}</b>
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
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Weekly Discussion:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: withdrawn.reports.progressDiscussion === 'No' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{withdrawn.reports.progressDiscussion}</b>
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
                                          <Grid.Row columns={2}>
                                            <Grid.Column>
                                              <Header style={{ marginRight: '0px' }} floated="left">
                                                <Icon
                                                  link
                                                  name="archive"
                                                  onClick={() => this._goToHistoricalWeeklyReport(sold.business)}
                                                />
                                              </Header>
                                            </Grid.Column>
                                            <Grid.Column>
                                              <Header
                                                onClick={() => this.props.history.push(`business/${sold.business.id}`)}
                                              >
                                                <u>
                                                  <b>{sold.business.businessName}</b>
                                                </u>
                                              </Header>
                                            </Grid.Column>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Header as="h3" color="brown">
                                            <b>{numeral(sold.business.currentPrice).format('$0,0.[99]')}</b>
                                          </Header>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color={sold.reports && sold.reports.textToDo ? 'yellow' : 'blue'}
                                            onClick={() => this._toDo(sold.business)}
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
                                        <Grid.Column>{sold.reports ? sold.reports.text : ''}</Grid.Column>
                                      </Grid.Row>
                                      {sold.arrayOneBeforeLastTextToDo && sold.arrayOneBeforeLastTextToDo.textToDo ? (
                                        <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                          <Grid.Column>
                                            {sold.arrayOneBeforeLastTextToDo
                                              ? sold.arrayOneBeforeLastTextToDo.textToDo
                                              : ''}
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
                                          {moment(sold.reports.expectedSettlementDate).isValid() ? (
                                            <b>{moment(sold.reports.expectedSettlementDate).format('DD/MM/YYYY')}</b>
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
                                          <b>120 Guaranty:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: sold.business.data120DayGuarantee === '1' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{sold.business.data120DayGuarantee === '1' ? 'Yes' : 'No'}</b>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>No. of Pending Tasks</b>
                                        </Grid.Column>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                          <b>{sold.nOfPendingTasks}</b>
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
                                      <Grid.Row columns={2}>
                                        <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                          <b>Weekly Discussion:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: sold.reports.progressDiscussion === 'No' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{sold.reports.progressDiscussion}</b>
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
                    Not Alocated
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
                                    <Grid>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Header
                                            onClick={() =>
                                              this.props.history.push(`business/${notAlocated.business.id}`)
                                            }
                                          >
                                            <u>
                                              <b>{notAlocated.business.businessName}</b>
                                            </u>
                                          </Header>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Header as="h3" color="brown">
                                            <b>{numeral(notAlocated.business.currentPrice).format('$0,0.[99]')}</b>
                                          </Header>
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid.Column>
                                          <Button
                                            size="small"
                                            color={
                                              notAlocated.reports && notAlocated.reports.textToDo ? 'yellow' : 'blue'
                                            }
                                            onClick={() => this._toDo(notAlocated.business)}
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
                                        <Grid.Column>{notAlocated.reports ? notAlocated.reports.text : ''}</Grid.Column>
                                      </Grid.Row>
                                      {notAlocated.arrayOneBeforeLastTextToDo &&
                                      notAlocated.arrayOneBeforeLastTextToDo.textToDo ? (
                                          <Grid.Row style={{ backgroundColor: 'yellow' }}>
                                            <Grid.Column>
                                              {notAlocated.arrayOneBeforeLastTextToDo
                                                ? notAlocated.arrayOneBeforeLastTextToDo.textToDo
                                                : ''}
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
                                          <b>120 Guaranty:</b>
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                            color: notAlocated.business.data120DayGuarantee === '1' ? 'red' : 'green'
                                          }}
                                          width={5}
                                        >
                                          <b>{notAlocated.business.data120DayGuarantee === '1' ? 'Yes' : 'No'}</b>
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
                                          <b>{notAlocated.nOfPendingTasks}</b>
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
  businessesNotAlocated: PropTypes.array,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  getUserLogged: PropTypes.func,
  user: PropTypes.object,
  isGotUser: PropTypes.bool,
  history: PropTypes.object
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
  businessesNotAlocated: state.broker.getBusinessesPerBroker.arrayBusinessesNotAlocated,
  isCreated: state.broker.create.isCreated,
  isUpdated: state.broker.update.isUpdated,
  user: state.user.getLogged.object,
  isGotUser: state.user.getLogged.isGot
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getBrokersPerRegion,
      getBusinessesPerBroker,
      clearWeeklyReports,
      getUserLogged
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
