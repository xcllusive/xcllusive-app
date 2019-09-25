import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Segment, Button, Icon } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../../../redux/ducks/modal'
import { getSoldBySource } from '../../../../redux/ducks/reports'
import Wrapper from '../../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import numeral from 'numeral'

class SoldBySource extends Component {
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
    this.props.getSoldBySource(
      moment(dateFrom).format('YYYY-MM-DD 00:00:00'),
      moment(dateTo).format('YYYY-MM-DD 23:59:59')
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

  _percEngagedSold = (object, type) => {
    if (type === 'engaged') {
      return (object.totalPerSource / this.props.totalEngaged) * 100
    }
    if (type === 'sold') {
      return (object.countBusinessSold / this.props.totalSold) * 100
    }
  }

  render () {
    const { values, arraySoldBySource } = this.props
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
        {arraySoldBySource && arraySoldBySource.length > 0 ? (
          <Fragment>
            <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
              <Fragment>
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
                            <Table.HeaderCell style={{ textAlign: 'center' }}>Source</Table.HeaderCell>
                            <Table.HeaderCell style={{ textAlign: 'center' }}>Engaged</Table.HeaderCell>
                            <Table.HeaderCell style={{ textAlign: 'center' }}>% Engaged</Table.HeaderCell>
                            <Table.HeaderCell style={{ textAlign: 'center' }}>Sold</Table.HeaderCell>
                            <Table.HeaderCell style={{ textAlign: 'center' }}>% Sold</Table.HeaderCell>
                            <Table.HeaderCell style={{ textAlign: 'center' }}>Sold Value</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {arraySoldBySource.map((leadsPerSource, index) => {
                            return (
                              <Table.Row key={index}>
                                <Table.Cell>
                                  <Grid>
                                    <Grid.Row columns={2}>
                                      <Grid.Column width={1}>
                                        <Icon
                                          link
                                          name="magnify"
                                          onClick={() =>
                                            this._goToBusinessesListPerAnalyst(leadsPerSource, 'sourceSold')
                                          }
                                        />
                                      </Grid.Column>
                                      <Grid.Column>{leadsPerSource.sourceLabel}</Grid.Column>
                                    </Grid.Row>
                                  </Grid>
                                </Table.Cell>
                                <Table.Cell style={{ textAlign: 'right' }}>{leadsPerSource.totalPerSource}</Table.Cell>
                                <Table.Cell style={{ textAlign: 'right' }}>
                                  {numeral(this._percEngagedSold(leadsPerSource, 'engaged')).format('0,0.[0]')}%
                                </Table.Cell>
                                <Table.Cell style={{ textAlign: 'right' }}>
                                  {leadsPerSource.countBusinessSold}
                                </Table.Cell>
                                <Table.Cell style={{ textAlign: 'right' }}>
                                  {numeral(this._percEngagedSold(leadsPerSource, 'sold')).format('0,0.[0]')}%
                                </Table.Cell>
                                <Table.Cell style={{ textAlign: 'right' }}>
                                  {numeral(leadsPerSource.totalSoldPricePerSource).format('$0,0.[99]')}
                                </Table.Cell>
                              </Table.Row>
                            )
                          })}
                        </Table.Body>
                        <Table.Footer fullWidth>
                          <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">
                              <b>{this.props.totalEngaged}</b>
                            </Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">
                              <b>{this.props.totalSold}</b>
                            </Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell style={{ textAlign: 'right' }}>
                              {numeral(this.props.totalSoldPrice).format('$0,0.[99]')}
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Footer>
                      </Table>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Fragment>
            </Segment>
          </Fragment>
        ) : null}
      </Wrapper>
    )
  }
}

SoldBySource.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  openModal: PropTypes.func,
  getSoldBySource: PropTypes.func,
  clearMarketingReports: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  savedRecords: PropTypes.object,
  arraySoldBySource: PropTypes.array,
  totalEngaged: PropTypes.number,
  totalSold: PropTypes.number,
  totalSoldPrice: PropTypes.number
}

const mapPropsToValues = props => {
  return {
    dateFrom: props.savedRecords ? moment(props.savedRecords.dateFrom) : moment().startOf('month'),
    dateTo: props.savedRecords ? moment(props.savedRecords.dateTo) : moment()
  }
}

const mapStateToProps = state => ({
  arraySoldBySource: state.reports.getSoldBySource.arraySoldBySource,
  savedRecords: state.reports.keepSoldBySourceRecords.records,
  totalEngaged: state.reports.getSoldBySource.totalEngaged,
  totalSold: state.reports.getSoldBySource.totalSold,
  totalSoldPrice: state.reports.getSoldBySource.totalSoldPrice
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getSoldBySource
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(SoldBySource)
)
