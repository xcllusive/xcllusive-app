import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Header, Segment, Button, Icon, Divider } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../../../redux/ducks/modal'
import { getMarketingReport, getMarketingReportTest, clearMarketingReports } from '../../../../redux/ducks/reports'
import Wrapper from '../../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import numeral from 'numeral'

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
    this.props.getMarketingReportTest(
      moment(dateFrom).format('YYYY/MM/DD 00:00:00'),
      moment(dateTo).format('YYYY/MM/DD 23:59:59')
    )
  }

  _totalGeralLeads = arrayOffices => {
    return (
      arrayOffices.arrayAdelaide[0].sumLeadsAdelaide +
      arrayOffices.arrayCamberra[0].sumLeadsCamberra +
      // arrayOffices.arrayCowra[0].sumLeadsCowra +
      arrayOffices.arrayGosford[0].sumLeadsGosford +
      arrayOffices.arrayMelbourne[0].sumLeadsMelbourne +
      arrayOffices.arraySydney[0].sumLeadsSydney +
      arrayOffices.arrayQueensland[0].sumLeadsQueensland +
      this.props.totalBusinessesCtc
    )
  }

  _totalGeralSignedUp = arrayOffices => {
    return (
      arrayOffices.arrayAdelaide[0].sumImAdelaide +
      arrayOffices.arrayCamberra[0].sumImCamberra +
      // arrayOffices.arrayCowra[0].sumImCowra +
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

  _goToCtcBusinessesPerOffice = ctcLeads => {
    this.props.history.push({
      pathname: `management/ctc-businesses-list-office/${ctcLeads['listingAgent.dataRegion']}`,
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
      arrayTotalPerSource,
      totalGeralPerSource,
      arrayLeadsPerSourceAdelaide,
      arrayLeadsPerSourceCamberra,
      // arrayLeadsPerSourceCowra,
      arrayLeadsPerSourceGosford,
      arrayLeadsPerSourceMelbourne,
      arrayLeadsPerSourceSydney,
      arrayLeadsPerSourceQueensland,
      testArray,
      totalLeads,
      totalSignedUp,
      totalConvertionRate
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
        {testArray && testArray.length > 0 ? (
          <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
            <Fragment>
              <Header style={{ marginLeft: '10px' }} color="red">
                Leads Per Analyst Test
              </Header>
              <Grid padded="horizontally">
                <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
                  <Grid.Column
                    style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                  >
                    {testArray.map((leadsPerAnalyst, index) => {
                      return (
                        <Table key={index} celled striped selectable compact size="small">
                          <Table.Header>
                            <Table.Row >
                              <Table.HeaderCell style={{ width: '300px', textAlign: 'left' }}>
                                <h4 style={{ color: '#2185d0' }}>{leadsPerAnalyst[0].dataRegion}</h4>
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
                          {leadsPerAnalyst.map(item => {
                            return (
                              <Table.Body key={item.listingAgent_id}>
                                <Table.Row >
                                  <Table.Cell>
                                    <Grid>
                                      <Grid.Row columns={2}>
                                        <Grid.Column width={1}>
                                          <Icon
                                            link
                                            name="magnify"
                                            onClick={() => this._goToBusinessesListPerAnalyst(item)}
                                          />
                                        </Grid.Column>
                                        <Grid.Column>
                                          {`${item.firstName} ${item.lastName}`}
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Table.Cell>
                                  <Table.Cell style={{ textAlign: 'right' }}>{item.totalLeads}</Table.Cell>
                                  <Table.Cell style={{ textAlign: 'right' }}>
                                    {item.signed}
                                  </Table.Cell>
                                  <Table.Cell style={{ textAlign: 'right' }}>
                                    {item.convertionRate}
                                  </Table.Cell>
                                </Table.Row>
                              </Table.Body>
                            )
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
        {arrayLeadsPerSourceSydney && arrayLeadsPerSourceSydney.length > 0 ? (
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
                                  {LeadsPerSourceAdelaide.countSourceImStageAdelaide
                                    ? LeadsPerSourceAdelaide.countSourceImStageAdelaide
                                    : 0}
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
                                  {LeadsPerSourceCamberra.countSourceImStageCamberra
                                    ? LeadsPerSourceCamberra.countSourceImStageCamberra
                                    : 0}
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
                      {/* <Table celled striped selectable compact size="small">
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
                                  {LeadsPerSourceCowra.countSourceImStageCowra
                                    ? LeadsPerSourceCowra.countSourceImStageCowra
                                    : 0}
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
                      </Table> */}
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
                                  {LeadsPerSourceGosford.countSourceImStageGosford
                                    ? LeadsPerSourceGosford.countSourceImStageGosford
                                    : 0}
                                </Table.Cell>
                                <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                  {LeadsPerSourceGosford.countSourceImStageGosford > 0
                                    ? `${numeral(
                                      (LeadsPerSourceGosford.countSourceImStageGosford /
                                          LeadsPerSourceGosford.count) *
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
                                  {LeadsPerSourceMelbourne.countSourceImStageMelbourne
                                    ? LeadsPerSourceMelbourne.countSourceImStageMelbourne
                                    : 0}
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
                                  {LeadsPerSourceSydney.countSourceImStageSydney
                                    ? LeadsPerSourceSydney.countSourceImStageSydney
                                    : 0}
                                </Table.Cell>
                                <Table.Cell style={{ width: '300px', textAlign: 'right' }}>
                                  {LeadsPerSourceSydney.countSourceImStageSydney > 0
                                    ? `${numeral(
                                      (LeadsPerSourceSydney.countSourceImStageSydney / LeadsPerSourceSydney.count) *
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
                                  {LeadsPerSourceQueensland.countSourceImStageQueensland
                                    ? LeadsPerSourceQueensland.countSourceImStageQueensland
                                    : 0}
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
  leadsPerAnalystArray: PropTypes.array,
  arrayTotalPerSource: PropTypes.array,
  arrayLeadsPerSourceAdelaide: PropTypes.array,
  arrayLeadsPerSourceCamberra: PropTypes.array,
  // arrayLeadsPerSourceCowra: PropTypes.array,
  arrayLeadsPerSourceGosford: PropTypes.array,
  arrayLeadsPerSourceMelbourne: PropTypes.array,
  arrayLeadsPerSourceSydney: PropTypes.array,
  arrayLeadsPerSourceQueensland: PropTypes.array,
  totalGeralPerSource: PropTypes.number,
  arrayOffices: PropTypes.array,
  clearMarketingReports: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  savedRecords: PropTypes.object,
  arrayCtcLeadsPerOfficeFromXcllusive: PropTypes.array,
  totalBusinessesCtc: PropTypes.number,
  getMarketingReportTest: PropTypes.func,
  testArray: PropTypes.array,
  totalLeads: PropTypes.number,
  totalSignedUp: PropTypes.number,
  totalConvertionRate: PropTypes.number
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
  // arrayLeadsPerSourceCowra: state.reports.getMarketingReport.arrayLeadsPerSourceCowra,
  arrayLeadsPerSourceGosford: state.reports.getMarketingReport.arrayLeadsPerSourceGosford,
  arrayLeadsPerSourceMelbourne: state.reports.getMarketingReport.arrayLeadsPerSourceMelbourne,
  arrayLeadsPerSourceSydney: state.reports.getMarketingReport.arrayLeadsPerSourceSydney,
  arrayLeadsPerSourceQueensland: state.reports.getMarketingReport.arrayLeadsPerSourceQueensland,
  totalGeralPerSource: state.reports.getMarketingReport.totalGeralPerSource,
  arrayOffices: state.reports.getMarketingReport.arrayOffices,
  arrayCtcLeadsPerOfficeFromXcllusive: state.reports.getMarketingReport.arrayCtcLeadsPerOfficeFromXcllusive,
  totalBusinessesCtc: state.reports.getMarketingReport.totalBusinessesCtc,
  savedRecords: state.reports.keepMarketingRecords.records,
  testArray: state.reports.getMarketingReportTest.arrayOffices,
  totalLeads: state.reports.getMarketingReportTest.totalLeads,
  totalSignedUp: state.reports.getMarketingReportTest.totalSignedUp,
  totalConvertionRate: state.reports.getMarketingReportTest.totalConvertionRate
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getMarketingReport,
      clearMarketingReports,
      getMarketingReportTest
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
