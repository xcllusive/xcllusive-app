import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Button, Segment, Header, Table, Dimmer, Loader } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import { getEnquiryReport } from '../../../redux/ducks/reports'
import Wrapper from '../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import numeral from 'numeral'

class EnquiryReports extends Component {
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
    this.props.getEnquiryReport(
      moment(dateFrom).format('YYYY/MM/DD 00:00:00'),
      moment(dateTo).format('YYYY/MM/DD 23:59:59')
    )
  }

  _percNewEnquiries = enquirie => {
    return (enquirie.count / this.props.objectEnquiry.totalNewEnquiries) * 100
  }

  render () {
    const { values, objectEnquiry, isLoading } = this.props
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
        <Dimmer.Dimmable dimmed={isLoading} style={{ height: '80vh' }}>
          <Dimmer inverted active={isLoading}>
            <Loader>Loading</Loader>
          </Dimmer>
          {objectEnquiry ? (
            <Segment
              style={{ paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px', marginLeft: '25%', width: '50%' }}
              size="small"
            >
              <Fragment>
                <Header style={{ marginLeft: '10px' }} color="red">
                  Enquiries
                </Header>
                <Table celled striped selectable compact size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell textAlign="center" width={2}>
                        Source
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center" width={2}>
                        Quantity
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center" width={2}>
                        % of New Enquiries
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {objectEnquiry.arrayNewEnquiriesOrderByBigger.map(newEnquiries => {
                      return (
                        <Table.Row key={newEnquiries.source_id}>
                          <Table.Cell>{newEnquiries['BuyerSource.label']}</Table.Cell>
                          <Table.Cell textAlign="right">{newEnquiries.count}</Table.Cell>
                          <Table.Cell textAlign="right">
                            {numeral(this._percNewEnquiries(newEnquiries)).format('0,0.[0]')}%
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell>
                        <b>TOTAL New Enquiries:</b>
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="right">
                        <b>{objectEnquiry.totalNewEnquiries}</b>
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="right">
                        <b>
                          % out of total{' '}
                          {numeral((objectEnquiry.totalNewEnquiries / objectEnquiry.totalEnquiries) * 100).format(
                            '0,0.[0]'
                          )}
                        </b>
                      </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <b>Existing (DB):</b>
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="right">
                        <b>{objectEnquiry.totalEnquiries - objectEnquiry.totalNewEnquiries}</b>
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="right">
                        <b>
                          % out of total{' '}
                          {numeral(
                            ((objectEnquiry.totalEnquiries - objectEnquiry.totalNewEnquiries) /
                              objectEnquiry.totalEnquiries) *
                              100
                          ).format('0,0.[0]')}
                        </b>
                      </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>
                        <b>TOTAL:</b>
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="right">
                        <b>{objectEnquiry.totalEnquiries}</b>
                      </Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Fragment>
            </Segment>
          ) : null}
        </Dimmer.Dimmable>
      </Wrapper>
    )
  }
}

EnquiryReports.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  openModal: PropTypes.func,
  getEnquiryReport: PropTypes.func,
  savedRecords: PropTypes.object,
  objectEnquiry: PropTypes.object,
  isLoading: PropTypes.bool
}

const mapPropsToValues = props => {
  return {
    dateFrom: props.savedRecords ? moment(new Date(props.savedRecords.dateFrom)) : moment().startOf('month'),
    dateTo: props.savedRecords ? moment(new Date(props.savedRecords.dateTo)) : moment()
  }
}

const mapStateToProps = state => ({
  savedRecords: state.reports.keepEnquiryParams,
  isLoading: state.reports.getEnquiryReport.isLoading,
  objectEnquiry: state.reports.getEnquiryReport.objectEnquiry
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getEnquiryReport
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(EnquiryReports)
)
