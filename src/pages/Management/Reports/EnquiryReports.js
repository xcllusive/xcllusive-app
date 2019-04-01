import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Button, Segment, Header, Table, Dimmer, Loader, Radio, Divider } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import { getEnquiryReport, clearEnquiriesReports } from '../../../redux/ducks/reports'
import Wrapper from '../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import numeral from 'numeral'

class EnquiryReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listOfIdOfAnalysts: []
    }
  }

  componentDidMount = () => {}

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

  _confirmReports = (dateFrom, dateTo, listOfIdOfAnalysts = false, arraySelectedAnalysts = false) => {
    this.props.getEnquiryReport(
      moment(dateFrom).format('YYYY/MM/DD 00:00:00'),
      moment(dateTo).format('YYYY/MM/DD 23:59:59'),
      listOfIdOfAnalysts,
      arraySelectedAnalysts,
      this.props.values.showAllEnquiries
    )
  }

  _percNewEnquiries = enquirie => {
    return (enquirie.count / this.props.objectEnquiry.totalNewEnquiries) * 100
  }

  _handleChangeCheckBox = async (e, { name }) => {
    await this.props.clearEnquiriesReports()
    await this.props.setFieldValue(name, !this.props.values[name])
    if (!this.props.values.showAllEnquiries) {
      this._openModalPickAnalysts()
    }
  }

  _openModalPickAnalysts = () => {
    this.props.openModal(TypesModal.MODAL_PICK_ANALYSTS, {
      options: {
        title: 'Select the Analysts you want:'
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.setFieldValue('arraySelectedAnalysts', isConfirmed)
          const listOfIdOfAnalysts = isConfirmed.map(item => {
            return parseInt(item.value)
          })
          this.setState({ listOfIdOfAnalysts: listOfIdOfAnalysts })
          this._confirmReports(
            this.props.values.dateFrom,
            this.props.values.dateTo,
            listOfIdOfAnalysts,
            this.props.values.arraySelectedAnalysts,
            this.props.values.showAllEnquiries
          )
        }
      }
    })
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
                  <Form.Field
                    style={{ marginTop: '35px' }}
                    control={Radio}
                    label="Show All Enquiries"
                    name="showAllEnquiries"
                    onChange={this._handleChangeCheckBox}
                    checked={values.showAllEnquiries}
                  />
                  <Form.Field
                    style={{ marginTop: '35px' }}
                    control={Radio}
                    label="Select the Analysts"
                    name="showAllEnquiries"
                    onChange={this._handleChangeCheckBox}
                    checked={!values.showAllEnquiries}
                  />
                  <Form.Field style={{ marginTop: '30px' }}>
                    <Button
                      positive
                      icon="checkmark"
                      labelPosition="right"
                      content="Confirm"
                      onClick={() =>
                        values.showAllEnquiries
                          ? this._confirmReports(values.dateFrom, values.dateTo)
                          : this._confirmReports(
                            this.props.values.dateFrom,
                            this.props.values.dateTo,
                            this.state.listOfIdOfAnalysts,
                            this.props.values.arraySelectedAnalysts,
                            this.props.values.showAllEnquiries
                          )
                      }
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
            <Grid>
              <Grid.Row columns={this.props.values.showAllEnquiries ? 1 : 3}>
                <Grid.Column width={this.props.values.showAllEnquiries ? 16 : 8}>
                  <Segment
                    style={{
                      paddingLeft: '0px',
                      paddingRight: '0px',
                      paddingBottom: '0px',
                      marginLeft: this.props.values.showAllEnquiries ? '25%' : '10%',
                      width: this.props.values.showAllEnquiries ? '50%' : null
                    }}
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
                </Grid.Column>
                {!this.props.values.showAllEnquiries ? (
                  <Fragment>
                    <Grid.Column style={{ marginLeft: '50px' }} width={4}>
                      <Segment
                        style={{
                          paddingLeft: '0px',
                          paddingRight: '0px',
                          paddingBottom: '0px'
                        }}
                        size="small"
                      >
                        <Divider horizontal>Selected Analysts</Divider>
                        <Table celled compact definition>
                          <Table.Body>
                            {this.props.values &&
                              this.props.values.arraySelectedAnalysts.map(analysts => (
                                <Table.Row key={analysts.key}>
                                  <Table.Cell textAlign="center">{analysts.text}</Table.Cell>
                                </Table.Row>
                              ))}
                          </Table.Body>
                        </Table>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '0px' }} width={3}>
                      <Button
                        color="twitter"
                        content="Change my list"
                        size="small"
                        onClick={() => this._openModalPickAnalysts()}
                      />
                    </Grid.Column>
                  </Fragment>
                ) : null}
              </Grid.Row>
            </Grid>
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
  isLoading: PropTypes.bool,
  getAllAnalysts: PropTypes.func,
  arrayAnalysts: PropTypes.array,
  clearEnquiriesReports: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    dateFrom: props.savedRecords ? moment(new Date(props.savedRecords.dateFrom)) : moment().startOf('month'),
    dateTo: props.savedRecords ? moment(new Date(props.savedRecords.dateTo)) : moment(),
    showAllEnquiries: props.savedRecords ? props.savedRecords.showAllEnquiries : true,
    arraySelectedAnalysts: props.savedRecords ? props.savedRecords.arraySelectedAnalysts : []
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
      getEnquiryReport,
      clearEnquiriesReports
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
