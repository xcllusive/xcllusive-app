import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Header, Segment, Button, Icon } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import { getMarketingReport, clearMarketingReports } from '../../../redux/ducks/reports'
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
    this.props.getMarketingReport(moment(dateFrom).format('YYYY/MM/DD'), moment(dateTo).format('YYYY/MM/DD'))
  }

  _totalGeralLeads = arrayOffices => {
    return (
      arrayOffices.arrayAdelaide[0].sumLeadsAdelaide +
      arrayOffices.arrayCamberra[0].sumLeadsCamberra +
      arrayOffices.arrayCowra[0].sumLeadsCowra +
      arrayOffices.arrayGosford[0].sumLeadsGosford +
      arrayOffices.arrayMelbourne[0].sumLeadsMelbourne +
      arrayOffices.arraySydney[0].sumLeadsSydney +
      arrayOffices.arrayQueensland[0].sumLeadsQueensland
    )
  }

  _totalGeralSignedUp = arrayOffices => {
    return (
      arrayOffices.arrayAdelaide[0].sumImAdelaide +
      arrayOffices.arrayCamberra[0].sumImCamberra +
      arrayOffices.arrayCowra[0].sumImCowra +
      arrayOffices.arrayGosford[0].sumImGosford +
      arrayOffices.arrayMelbourne[0].sumImMelbourne +
      arrayOffices.arraySydney[0].sumImSydney +
      arrayOffices.arrayQueensland[0].sumImQueensland
    )
  }

  _AvgConvertionRate = arrayOffices => {
    return (this._totalGeralSignedUp(arrayOffices) / this._totalGeralLeads(arrayOffices)) * 100
  }

  _goToBusinessesListPerAnalyst = leadsPerAnalyst => {
    this.props.history.push({
      pathname: `management/businesses-list-analyst/${leadsPerAnalyst.listingAgent_id}`,
      state: {
        analystObject: leadsPerAnalyst,
        dateFrom: this.props.values.dateFrom,
        dateTo: this.props.values.dateTo
      }
    })
  }

  render () {
    const {
      values,
      leadsPerAnalystArray,
      arrayTotalPerSource,
      totalGeralPerSource,
      arrayLeadsPerSourceAdelaide,
      arrayLeadsPerSourceCamberra,
      arrayLeadsPerSourceCowra,
      arrayLeadsPerSourceGosford,
      arrayLeadsPerSourceMelbourne,
      arrayLeadsPerSourceSydney,
      arrayLeadsPerSourceQueensland,
      arrayOffices
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
                            <h4 style={{ color: '#2185d0' }}>Adelaide Office</h4>
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
                          if (leadsPerAnalyst['listingAgent.dataRegion'] === 'Adelaide Office') {
                            return (
                              <Table.Row key={leadsPerAnalyst.listingAgent_id}>
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
                                        {`${leadsPerAnalyst['listingAgent.firstName']} ${
                                          leadsPerAnalyst['listingAgent.lastName']
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
                          }
                        })}
                      </Table.Body>
                      {/* <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>
                            <b>TOTAL:</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayAdelaide[0].sumLeadsAdelaide : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayAdelaide[0].sumImAdelaide : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>
                              {arrayOffices[0]
                                ? numeral(
                                  arrayOffices[0].arrayAdelaide[0].sumConvertionRateAdelaide /
                                      arrayOffices[0].arrayAdelaide[0].indexAdelaide
                                ).format('0.0[0]')
                                : null}
                            </b>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer> */}
                    </Table>
                    <Table style={{ marginTop: '0px' }} celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Camberra Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {leadsPerAnalystArray.map(leadsPerAnalyst => {
                          if (leadsPerAnalyst['listingAgent.dataRegion'] === 'Camberra Office') {
                            return (
                              <Table.Row key={leadsPerAnalyst.listingAgent_id}>
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
                                        {`${leadsPerAnalyst['listingAgent.firstName']} ${
                                          leadsPerAnalyst['listingAgent.lastName']
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
                                    )}%`
                                    : 0}
                                </Table.Cell>
                              </Table.Row>
                            )
                          }
                        })}
                      </Table.Body>
                      {/* <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>
                            <b>TOTAL:</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayCamberra[0].sumLeadsCamberra : null}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayCamberra[0].sumImCamberra : null}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>
                              {arrayOffices[0]
                                ? numeral(
                                  arrayOffices[0].arrayCamberra[0].sumConvertionRateCamberra /
                                      arrayOffices[0].arrayCamberra[0].indexCamberra
                                ).format('0.0[0]')
                                : null}
                            </b>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer> */}
                    </Table>
                    <Table style={{ marginTop: '0px' }} celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Cowra Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {leadsPerAnalystArray.map(leadsPerAnalyst => {
                          if (leadsPerAnalyst['listingAgent.dataRegion'] === 'Cowra Office') {
                            return (
                              <Table.Row key={leadsPerAnalyst.listingAgent_id}>
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
                                        {`${leadsPerAnalyst['listingAgent.firstName']} ${
                                          leadsPerAnalyst['listingAgent.lastName']
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
                                    )}%`
                                    : 0}
                                </Table.Cell>
                              </Table.Row>
                            )
                          }
                        })}
                      </Table.Body>
                      {/* <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>
                            <b>TOTAL:</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayCowra[0].sumLeadsCowra : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayCowra[0].sumImCowra : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>
                              {arrayOffices[0]
                                ? numeral(
                                  arrayOffices[0].arrayCowra[0].sumConvertionRateCowra /
                                      arrayOffices[0].arrayCowra[0].indexCowra
                                ).format('0.0[0]')
                                : null}
                            </b>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer> */}
                    </Table>
                    <Table style={{ marginTop: '0px' }} celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Gosford Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {leadsPerAnalystArray.map(leadsPerAnalyst => {
                          if (leadsPerAnalyst['listingAgent.dataRegion'] === 'Gosford Office') {
                            return (
                              <Table.Row key={leadsPerAnalyst.listingAgent_id}>
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
                                        {`${leadsPerAnalyst['listingAgent.firstName']} ${
                                          leadsPerAnalyst['listingAgent.lastName']
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
                                    )}%`
                                    : 0}
                                </Table.Cell>
                              </Table.Row>
                            )
                          }
                        })}
                      </Table.Body>
                      {/* <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>
                            <b>TOTAL:</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayGosford[0].sumLeadsGosford : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayGosford[0].sumImGosford : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>
                              {arrayOffices[0]
                                ? numeral(
                                  arrayOffices[0].arrayGosford[0].sumConvertionRateGosford /
                                      arrayOffices[0].arrayGosford[0].indexGosford
                                ).format('0.0[0]')
                                : null}
                            </b>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer> */}
                    </Table>
                    <Table style={{ marginTop: '0px' }} celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Melbourne Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {leadsPerAnalystArray.map(leadsPerAnalyst => {
                          if (leadsPerAnalyst['listingAgent.dataRegion'] === 'Melbourne Office') {
                            return (
                              <Table.Row key={leadsPerAnalyst.listingAgent_id}>
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
                                        {`${leadsPerAnalyst['listingAgent.firstName']} ${
                                          leadsPerAnalyst['listingAgent.lastName']
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
                                    )}%`
                                    : 0}
                                </Table.Cell>
                              </Table.Row>
                            )
                          }
                        })}
                      </Table.Body>
                      {/* <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>
                            <b>TOTAL:</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayMelbourne[0].sumLeadsMelbourne : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayMelbourne[0].sumImMelbourne : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>
                              {arrayOffices[0]
                                ? numeral(
                                  arrayOffices[0].arrayMelbourne[0].sumConvertionRateMelbourne /
                                      arrayOffices[0].arrayMelbourne[0].indexMelbourne
                                ).format('0.0[0]')
                                : null}
                            </b>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer> */}
                    </Table>
                    <Table style={{ marginTop: '0px' }} celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Sydney Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {leadsPerAnalystArray.map(leadsPerAnalyst => {
                          if (leadsPerAnalyst['listingAgent.dataRegion'] === 'Sydney Office') {
                            return (
                              <Table.Row key={leadsPerAnalyst.listingAgent_id}>
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
                                        {`${leadsPerAnalyst['listingAgent.firstName']} ${
                                          leadsPerAnalyst['listingAgent.lastName']
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
                                    )}%`
                                    : 0}
                                </Table.Cell>
                              </Table.Row>
                            )
                          }
                        })}
                      </Table.Body>
                      {/* <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>
                            <b>TOTAL:</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arraySydney[0].sumLeadsSydney : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arraySydney[0].sumImSydney : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>
                              {arrayOffices[0]
                                ? `${numeral(
                                  arrayOffices[0].arraySydney[0].sumConvertionRateSydney /
                                      arrayOffices[0].arraySydney[0].indexSydney
                                ).format('0.0[0]')}%`
                                : null}
                            </b>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer> */}
                    </Table>
                    <Table style={{ marginTop: '0px' }} celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Queensland Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                          <Table.HeaderCell style={{ width: '300px' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {leadsPerAnalystArray.map(leadsPerAnalyst => {
                          if (leadsPerAnalyst['listingAgent.dataRegion'] === 'Queensland Office') {
                            return (
                              <Table.Row key={leadsPerAnalyst.listingAgent_id}>
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
                                        {`${leadsPerAnalyst['listingAgent.firstName']} ${
                                          leadsPerAnalyst['listingAgent.lastName']
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
                                    )}%`
                                    : 0}
                                </Table.Cell>
                              </Table.Row>
                            )
                          }
                        })}
                      </Table.Body>
                      {/* <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>
                            <b>TOTAL:</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayQueensland[0].sumLeadsQueensland : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>{arrayOffices[0] ? arrayOffices[0].arrayQueensland[0].sumImQueensland : 0}</b>
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="right">
                            <b>
                              {arrayOffices[0]
                                ? numeral(
                                  arrayOffices[0].arrayQueensland[0].sumConvertionRateQueensland /
                                      arrayOffices[0].arrayQueensland[0].indexQueensland
                                ).format('0.0[0]')
                                : null}
                            </b>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer> */}
                    </Table>
                    <Table style={{ marginTop: '0px' }} celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4>TOTAL</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }}>
                            {this._totalGeralLeads(arrayOffices[0])}
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }}>
                            {this._totalGeralSignedUp(arrayOffices[0])}
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }}>
                            {`${numeral(this._AvgConvertionRate(arrayOffices[0])).format('0,0.0')}%`}
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
        {arrayLeadsPerSourceSydney && arrayLeadsPerSourceSydney.length > 0 ? (
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
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Adelaide Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {arrayLeadsPerSourceAdelaide.map((LeadsPerSourceAdelaide, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{LeadsPerSourceAdelaide['source.label']}</Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceAdelaide.count}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceAdelaide.countSourceImStageAdelaide}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceAdelaide.countSourceImStageAdelaide > 0
                                  ? `${numeral(
                                    (LeadsPerSourceAdelaide.countSourceImStageAdelaide /
                                        LeadsPerSourceAdelaide.count) *
                                        100
                                  ).format('0,0.0')}%`
                                  : 0}
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Camberra Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {arrayLeadsPerSourceCamberra.map((LeadsPerSourceCamberra, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{LeadsPerSourceCamberra['source.label']}</Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceCamberra.count}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceCamberra.countSourceImStageCamberra}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceCamberra.countSourceImStageCamberra > 0
                                  ? `${numeral(
                                    (LeadsPerSourceCamberra.countSourceImStageCamberra /
                                        LeadsPerSourceCamberra.count) *
                                        100
                                  ).format('0,0.0')}%`
                                  : 0}
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Cowra Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {arrayLeadsPerSourceCowra.map((LeadsPerSourceCowra, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{LeadsPerSourceCowra['source.label']}</Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceCowra.count}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceCowra.countSourceImStageCowra}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceCowra.countSourceImStageCowra > 0
                                  ? `${numeral(
                                    (LeadsPerSourceCowra.countSourceImStageCowra / LeadsPerSourceCowra.count) * 100
                                  ).format('0,0.0')}%`
                                  : 0}
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Gosford Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {arrayLeadsPerSourceGosford.map((LeadsPerSourceGosford, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{LeadsPerSourceGosford['source.label']}</Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceGosford.count}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceGosford.countSourceImStageGosford}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceGosford.countSourceImStageGosford > 0
                                  ? `${numeral(
                                    (LeadsPerSourceGosford.countSourceImStageGosford / LeadsPerSourceGosford.count) *
                                        100
                                  ).format('0,0.0')}%`
                                  : 0}
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Melbourne Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {arrayLeadsPerSourceMelbourne.map((LeadsPerSourceMelbourne, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{LeadsPerSourceMelbourne['source.label']}</Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceMelbourne.count}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceMelbourne.countSourceImStageMelbourne}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceMelbourne.countSourceImStageMelbourne > 0
                                  ? `${numeral(
                                    (LeadsPerSourceMelbourne.countSourceImStageMelbourne /
                                        LeadsPerSourceMelbourne.count) *
                                        100
                                  ).format('0,0.0')}%`
                                  : 0}
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Sydney Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {arrayLeadsPerSourceSydney.map((LeadsPerSourceSydney, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{LeadsPerSourceSydney['source.label']}</Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceSydney.count}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceSydney.countSourceImStageSydney}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceSydney.countSourceImStageSydney > 0
                                  ? `${numeral(
                                    (LeadsPerSourceSydney.countSourceImStageSydney / LeadsPerSourceSydney.count) * 100
                                  ).format('0,0.0')}%`
                                  : 0}
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                            <h4 style={{ color: '#2185d0' }}>Queensland Office</h4>
                          </Table.HeaderCell>
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                          <Table.HeaderCell style={{ width: '300px', textAlign: 'right' }} />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {arrayLeadsPerSourceQueensland.map((LeadsPerSourceQueensland, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{LeadsPerSourceQueensland['source.label']}</Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceQueensland.count}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceQueensland.countSourceImStageQueensland}
                              </Table.Cell>
                              <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                {LeadsPerSourceQueensland.countSourceImStageQueensland > 0
                                  ? `${numeral(
                                    (LeadsPerSourceQueensland.countSourceImStageQueensland /
                                        LeadsPerSourceQueensland.count) *
                                        100
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
  arrayLeadsPerSourceAdelaide: PropTypes.array,
  arrayLeadsPerSourceCamberra: PropTypes.array,
  arrayLeadsPerSourceCowra: PropTypes.array,
  arrayLeadsPerSourceGosford: PropTypes.array,
  arrayLeadsPerSourceMelbourne: PropTypes.array,
  arrayLeadsPerSourceSydney: PropTypes.array,
  arrayLeadsPerSourceQueensland: PropTypes.array,
  totalGeralPerSource: PropTypes.number,
  arrayOffices: PropTypes.array,
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
  leadsPerAnalystArray: state.reports.getMarketingReport.leadsPerAnalystArray,
  arrayTotalPerSource: state.reports.getMarketingReport.arrayTotalPerSource,
  arrayLeadsPerSourceAdelaide: state.reports.getMarketingReport.arrayLeadsPerSourceAdelaide,
  arrayLeadsPerSourceCamberra: state.reports.getMarketingReport.arrayLeadsPerSourceCamberra,
  arrayLeadsPerSourceCowra: state.reports.getMarketingReport.arrayLeadsPerSourceCowra,
  arrayLeadsPerSourceGosford: state.reports.getMarketingReport.arrayLeadsPerSourceGosford,
  arrayLeadsPerSourceMelbourne: state.reports.getMarketingReport.arrayLeadsPerSourceMelbourne,
  arrayLeadsPerSourceSydney: state.reports.getMarketingReport.arrayLeadsPerSourceSydney,
  arrayLeadsPerSourceQueensland: state.reports.getMarketingReport.arrayLeadsPerSourceQueensland,
  totalGeralPerSource: state.reports.getMarketingReport.totalGeralPerSource,
  arrayOffices: state.reports.getMarketingReport.arrayOffices,
  savedRecords: state.reports.keepMarketingRecords.records
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
