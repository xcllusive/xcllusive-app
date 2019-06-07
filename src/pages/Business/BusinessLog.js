import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import Wrapper from '../../components/content/Wrapper'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { getBusiness } from '../../redux/ducks/business'
import {
  getLogFromBusiness,
  clearBusinessLog,
  updateBusinessLog,
  finaliseBusinessLog
} from '../../redux/ducks/businessLog'
import {
  getBusinessFromBuyer,
  getBusinessLogFromBuyer,
  updateBusinessLogFromBuyer,
  finaliseBusinessLogFromBuyer
} from '../../redux/ducks/buyer'

import { Statistic, Grid, Input, Table, Form, Label, Button, Icon, Segment } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react'

class BusinessLogPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: null,
      focused: false,
      newLog: false,
      inputSearch: '',
      businessLog: null,
      businessLog_id: null,
      businessLog_followUp: null,
      businessLog_text: null,
      businessLog_time: null
    }
  }

  // static getDerivedStateFromProps (nextProps) {
  //   if (
  //     nextProps.arrayLogBusiness.length &&
  //     this.props.arrayLogBusiness.length !== nextProps.arrayLogBusiness.length
  //   ) {
  //     this._selectLog(nextProps.arrayLogBusiness[0])
  //   }
  // }

  static getDerivedStateFromProps (nextProps) {
    if (nextProps.arrayLogBusiness && nextProps.arrayLogBusiness.length && !nextProps.isLoadingarrayLogBusiness) {
      const { newLog, id, followUp, text, time } = nextProps.arrayLogBusiness[0]

      return {
        newLog: !!newLog,
        businessLog_id: id,
        businessLog_followUp: followUp,
        businessLog_text: text,
        businessLog_time: time
      }
    }
    return null
  }

  componentDidMount () {
    if (this.props.location.state && this.props.location.state.fromBuyerMenu) {
      this.props.getBusinessFromBuyer(this.props.match.params.id)
      this.props.getBusinessLogFromBuyer(this.props.match.params.id)
    } else {
      this.props.getBusiness(this.props.match.params.id)
      this.props.getLogFromBusiness(this.props.match.params.id)
    }
    if (this.props.arrayLogBusiness.length) {
      this._selectLog(this.props.arrayLogBusiness[0])
    }
  }

  componentWillUnmount () {
    this.props.clearBusinessLog()
  }

  _onSearch = (e, { value }) => {
    this.setState({
      inputSearch: value
    })
  }

  _handleSearch = () => {
    if (this.props.location.state && this.props.location.state.fromBuyerMenu) {
      this.props.getBusinessLogFromBuyer(this.props.match.params.id, this.state.inputSearch)
    } else {
      this.props.getLogFromBusiness(this.props.match.params.id, this.state.inputSearch)
    }
  }

  _handleDateChange = date => {
    this.props.setFieldValue('businessLog_followUp', date)
  }

  _selectLog = businessLog => {
    const { newLog, id, followUp, text, time } = businessLog

    if (newLog) {
      this.props.setFieldValue('newLog', true)
      this.setState({
        businessLog: null
      })
    } else {
      this.props.setFieldValue('newLog', false)
      this.setState({
        businessLog
      })
    }

    this.props.setFieldValue('businessLog_id', id)
    this.props.setFieldValue('businessLog_followUp', followUp)
    this.props.setFieldValue('businessLog_text', text)
    this.props.setFieldValue('businessLog_time', time)
  }

  _saveAndReturnToBusiness = async values => {
    if (this.props.location.state && this.props.location.state.fromBuyerMenu) {
      if (this.props.values.newLog) {
        values.businessLog_followUp = new Date(values.businessLog_followUp)
        await this.props.updateBusinessLogFromBuyer(values)
      }
      this.props.history.push(`/business/${this.props.match.params.id}/from-buyer`)
    } else {
      if (this.props.values.newLog) {
        values.businessLog_followUp = new Date(values.businessLog_followUp)
        await this.props.updateBusinessLog(values)
      }

      this.props.history.push(`/business/${this.props.match.params.id}`)
    }
  }

  _finaliseBusinessLog = values => {
    if (this.props.location.state && this.props.location.state.fromBuyerMenu) {
      this.props.finaliseBusinessLogFromBuyer(values)
    } else {
      this.props.finaliseBusinessLog(values)
    }
  }

  _handleChange = (event, { name, value }) => {
    if (this.props.values.hasOwnProperty(name)) {
      console.log(value)
      if (name === 'businessLog_followUp') this.props.setFieldValue(name, moment(value).format('DD-MM-YYYY'))
      else this.props.setFieldValue(name, value)
    }
  }

  render () {
    const {
      values,
      handleChange,
      errors,
      touched,
      arrayLogBusiness,
      business,
      isLoadingarrayLogBusiness,
      loadingFinaliseStatus
    } = this.props
    return (
      <Wrapper>
        <div>
          {business ? (
            <Statistic.Group style={{ marginTop: '20px' }} size="mini" widths={4}>
              <Statistic color="orange">
                <Statistic.Value>{business.businessName}</Statistic.Value>
                <Statistic.Label>
                  BS
                  {this.props.match.params.id}
                </Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>
                  {business.firstNameV} {business.lastNameV}
                </Statistic.Value>
                <Statistic.Label>Vendor</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>
                  <Icon link name="mail" onClick={() => (window.location.href = `mailto:${business.vendorEmail}`)} />
                </Statistic.Value>
                <Statistic.Label>{business.vendorEmail}</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{business.vendorPhone1}</Statistic.Value>
                <Statistic.Label>Telephone</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          ) : null}
          <Segment style={{ height: '300px', backgroundColor: '#d4d4d53b' }}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Form>
                    <Form.Group>
                      <Form.Field width={16}>
                        <Form.TextArea
                          style={{ height: '150px' }}
                          label="Communication text"
                          name="businessLog_text"
                          autoComplete="businessLog_text"
                          value={values.businessLog_text}
                          onChange={handleChange}
                        />
                        {errors.text && touched.text && <Label basic color="red" pointing content={errors.text} />}
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field style={{ marginLeft: '70%' }}>
                        <h5>Follow Up Date</h5>
                        <DatePicker
                          selected={
                            values.businessLog_followUp
                              ? moment(values.businessLog_followUp)
                              : moment(this.state.businessLog_followUp)
                          }
                          startDate={moment().subtract(10, 'days')}
                          onChange={this._handleDateChange}
                          popperPlacement="top-end"
                          form
                        />
                        {/* <DateInput
                          value={
                            values.businessLog_followUp
                              ? moment(values.businessLog_followUp).format('DD-MM-YYYY')
                              : moment(this.state.businessLog_followUp).format('DD-MM-YYYY')
                          }
                          name="businessLog_followUp"
                          // startDate={moment().subtract(10, 'days')}
                          onChange={this._handleChange}
                          iconPosition="left"
                        /> */}
                      </Form.Field>
                      <Form.Field style={{ marginTop: '32px' }}>
                        <TimeInput
                          name="businessLog_time"
                          placeholder="Time"
                          value={values.businessLog_time === null ? '' : values.businessLog_time}
                          iconPosition="left"
                          closable
                          onChange={this._handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Button
                  color="orange"
                  size="small"
                  loading={loadingFinaliseStatus}
                  onClick={() => this._finaliseBusinessLog(values)}
                >
                  <Icon name="cut" />
                  Finalise Communication
                </Button>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Form.Group widths="equal">
                  <Button
                    color="blue"
                    size="small"
                    onClick={() =>
                      this._selectLog({
                        newLog: true,
                        id: 1,
                        followUp: moment().add(1, 'day'),
                        text: ' ',
                        time: ''
                      })
                    }
                  >
                    <Icon name="commenting" />
                    New Communication
                  </Button>
                  {/* <Button
                    color="yellow"
                    loading={loadingUpdateStatus}
                    onClick={() => this.props.updateBusinessLog(values)}
                  >
                    <Icon name="save" />
                    Save Communication
                  </Button> */}

                  <Button color="green" size="small" onClick={() => this._saveAndReturnToBusiness(values)}>
                    <Icon name="backward" />
                    Save and Return to Business
                  </Button>
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Label size={'big'}>Log History</Label>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Input
                  fluid
                  action={{
                    icon: 'search',
                    onClick: this._handleSearch
                  }}
                  placeholder="Find logs..."
                  iconPosition="left"
                  loading={isLoadingarrayLogBusiness}
                  onChange={this._onSearch}
                  value={this.state.inputSearch}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {arrayLogBusiness ? (
            <Table color="blue" celled inverted selectable compact size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date Created</Table.HeaderCell>
                  <Table.HeaderCell>Text</Table.HeaderCell>
                  <Table.HeaderCell>Follow Up Date</Table.HeaderCell>
                  <Table.HeaderCell>Time</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {arrayLogBusiness.map(logBusiness => {
                  return (
                    <Table.Row active key={logBusiness.id} onClick={() => this._selectLog(logBusiness)}>
                      <Table.Cell>
                        {logBusiness.dateTimeCreated === null
                          ? moment(logBusiness.dateTimeModified).format('DD/MM/YYYY - HH:mm')
                          : moment(logBusiness.dateTimeCreated).format('DD/MM/YYYY - HH:mm')}
                      </Table.Cell>
                      <Table.Cell>{logBusiness.text}</Table.Cell>
                      <Table.Cell>{moment(logBusiness.followUp).format('DD/MM/YYYY')}</Table.Cell>
                      <Table.Cell>{logBusiness.time}</Table.Cell>
                      <Table.Cell>{logBusiness.followUpStatus}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          ) : null}
          {this.state.businessLog ? (
            <Form>
              <Form.Group inline>
                <Form.Input
                  label="Created By"
                  placeholder={
                    this.state.businessLog.CreatedBy
                      ? `${this.state.businessLog.CreatedBy.firstName} ${this.state.businessLog.CreatedBy.lastName}`
                      : ''
                  }
                  readOnly
                />
                <Form.Input
                  label="Creation Date"
                  placeholder={moment(this.state.businessLog.dateTimeCreated).format('DD/MM/YYYY - HH:mm')}
                  readOnly
                />
                <Form.Input
                  label="Modified By"
                  placeholder={
                    this.state.businessLog.ModifiedBy
                      ? `${this.state.businessLog.ModifiedBy.firstName} ${this.state.businessLog.ModifiedBy.lastName}`
                      : ''
                  }
                  readOnly
                />
                <Form.Input
                  label="Modified Date"
                  placeholder={moment(this.state.businessLog.dateTimeModified).format('DD/MM/YYYY - HH:mm')}
                  readOnly
                />
              </Form.Group>
            </Form>
          ) : null}
        </div>
      </Wrapper>
    )
  }
}

BusinessLogPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  getBusiness: PropTypes.func,
  getLogFromBusiness: PropTypes.func,
  arrayLogBusiness: PropTypes.array,
  business: PropTypes.object,
  setFieldValue: PropTypes.func,
  clearBusinessLog: PropTypes.func,
  isLoadingarrayLogBusiness: PropTypes.bool,
  updateBusinessLog: PropTypes.func,
  loadingUpdateStatus: PropTypes.bool,
  finaliseBusinessLog: PropTypes.func,
  loadingFinaliseStatus: PropTypes.bool,
  location: PropTypes.object,
  getBusinessLogFromBuyer: PropTypes.func,
  getBusinessFromBuyer: PropTypes.func,
  updateBusinessLogFromBuyer: PropTypes.func,
  finaliseBusinessLogFromBuyer: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    businessId: props.match ? props.match.params.id : null,
    textLog: '',
    businessLog_id: '',
    businessLog_followUp: moment().format('DD-MM-YYYY'),
    businessLog_text: '',
    newLog: false,
    businessLog_time: ''
  }
}

const handleSubmit = () => {}

const mapStateToProps = (state, props) => {
  return {
    business:
      props.location.state && props.location.state.fromBuyerMenu
        ? state.buyer.getBusinessFromBuyer.object
        : state.business.get.object,
    arrayLogBusiness:
      props.location.state && props.location.state.fromBuyerMenu
        ? state.buyer.getBusinessLogFromBuyer.array
        : state.businessLog.get.array,
    isLoadingarrayLogBusiness:
      props.location.state && props.location.state.fromBuyerMenu
        ? state.buyer.getBusinessLogFromBuyer.isLoading
        : state.businessLog.get.isLoading,
    loadingUpdateStatus:
      props.location.state && props.location.state.fromBuyerMenu
        ? state.buyer.updateBusinessLogFromBuyer.isLoading
        : state.businessLog.updateLog.isLoading,
    loadingFinaliseStatus:
      props.location.state && props.location.state.fromBuyerMenu
        ? state.buyer.finaliseBusinessLogFromBuyer.isLoading
        : state.businessLog.finaliseLog.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getBusiness,
      getLogFromBusiness,
      clearBusinessLog,
      updateBusinessLog,
      finaliseBusinessLog,
      getBusinessFromBuyer,
      getBusinessLogFromBuyer,
      updateBusinessLogFromBuyer,
      finaliseBusinessLogFromBuyer
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    handleSubmit
  })(BusinessLogPage)
)
