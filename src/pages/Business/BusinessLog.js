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
  updateFollowUpStatus
} from '../../redux/ducks/businessLog'

import {
  Statistic,
  Grid,
  Input,
  Table,
  Segment,
  Form,
  Label,
  Button,
  Icon
} from 'semantic-ui-react'

class BusinessLogPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: null,
      focused: false,
      newLog: false,
      inputSearch: '',
      businessLog: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.arrayLogBusiness.length &&
      this.props.arrayLogBusiness.length !== nextProps.arrayLogBusiness.length
    ) {
      this._selectLog(nextProps.arrayLogBusiness[0])
    }
  }

  componentWillMount () {
    this.props.getBusiness(this.props.match.params.id)
    this.props.getLogFromBusiness(this.props.match.params.id)
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
    this.props.getLogFromBusiness(
      this.props.match.params.id,
      this.state.inputSearch
    )
  }

  _selectLog = businessLog => {
    const { newLog, id, followUp, text } = businessLog

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
      loadingUpdateStatus,
      history
    } = this.props
    return (
      <Wrapper>
        <div>
          <Statistic.Group size="mini" widths={4}>
            <Statistic color="orange">
              <Statistic.Value>{business.businessName}</Statistic.Value>
              <Statistic.Label>{this.props.match.params.id}</Statistic.Label>
            </Statistic>
            <Statistic color="blue">
              <Statistic.Value>
                {business.firstNameV} {business.lastNameV}
              </Statistic.Value>
              <Statistic.Label>Vendor</Statistic.Label>
            </Statistic>
            <Statistic color="blue">
              <Statistic.Value>
                <Icon
                  link
                  name="mail"
                  onClick={() =>
                    (window.location.href = `mailto:${business.vendorEmail}`)
                  }
                />
              </Statistic.Value>
              <Statistic.Label>{business.vendorEmail}</Statistic.Label>
            </Statistic>
            <Statistic color="blue">
              <Statistic.Value>{business.vendorPhone1}</Statistic.Value>
              <Statistic.Label>Telephone</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Segment size="small" inverted color="blue">
            <h4>Business Log Detail</h4>
          </Segment>
          <Grid centered>
            <Grid.Column textAlign="center" width={5}>
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
          </Grid>
          <Label size={'big'}>Log History</Label>
          <Table color="blue" celled inverted selectable compact size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date Created</Table.HeaderCell>
                <Table.HeaderCell>Text</Table.HeaderCell>
                <Table.HeaderCell>Follow Up date</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {arrayLogBusiness.map(logBusiness => {
                return (
                  <Table.Row
                    active
                    key={logBusiness.id}
                    onClick={() => this._selectLog(logBusiness)}
                  >
                    <Table.Cell>
                      {moment(logBusiness.dateTimeCreated).format(
                        'DD/MM/YYYY - HH:mm'
                      )}
                    </Table.Cell>
                    <Table.Cell>{logBusiness.text}</Table.Cell>
                    <Table.Cell>
                      {moment(logBusiness.followUp).format('DD/MM/YYYY')}
                    </Table.Cell>
                    <Table.Cell>{logBusiness.followUpStatus}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
          <Form>
            <Form.Group>
              <Form.Field width={3}>
                <h5>Follow Up Date</h5>
                <DatePicker
                  style={{ left: '30px' }}
                  selected={moment(values.businessLog_followUp)}
                  onChange={this._handleDateChange}
                  popperPlacement="top-end"
                  left="30px"
                  form
                />
              </Form.Field>
              <Form.Field width={13}>
                <Form.TextArea
                  label="Communication text"
                  name="businessLog_text"
                  autoComplete="businessLog_text"
                  value={values.businessLog_text}
                  onChange={handleChange}
                />
                {errors.text &&
                  touched.text && (
                  <Label basic color="red" pointing content={errors.text} />
                )}
              </Form.Field>
            </Form.Group>
            <Grid>
              <Grid.Row style={{ justifyContent: 'center' }}>
                <Form.Group widths="equal">
                  <Button
                    color="blue"
                    size="small"
                    onClick={() =>
                      this._selectLog({
                        newLog: true,
                        id: 1,
                        followUp: moment().add(1, 'day'),
                        text: ''
                      })
                    }
                  >
                    <Icon name="commenting" />
                    New Communication
                  </Button>
                  <Button color="yellow">
                    <Icon name="save" />
                    Save Communication
                  </Button>
                  <Button
                    color="red"
                    loading={loadingUpdateStatus}
                    onClick={() => this.props.updateFollowUpStatus()}
                  >
                    <Icon name="save" />
                    Finalise Communication
                  </Button>
                  <Button
                    color="green"
                    onClick={() =>
                      history.push(`/business/${this.props.match.params.id}`)
                    }
                  >
                    <Icon name="backward" />
                    Return to Business
                  </Button>
                </Form.Group>
              </Grid.Row>
            </Grid>
          </Form>
          {this.state.businessLog ? (
            <Form>
              <Form.Group inline>
                <Form.Input
                  label="Created By"
                  placeholder={
                    this.state.businessLog.CreatedBy
                      ? `${this.state.businessLog.CreatedBy.firstName} ${
                        this.state.businessLog.CreatedBy.lastName
                      }`
                      : ''
                  }
                  readOnly
                />
                <Form.Input
                  label="Creation Date"
                  placeholder={moment(
                    this.state.businessLog.dateTimeCreated
                  ).format('DD/MM/YYYY - HH:mm')}
                  readOnly
                />
                <Form.Input
                  label="Modified By"
                  placeholder={
                    this.state.businessLog.ModifiedB
                      ? `${this.state.businessLog.ModifiedBy.firstName} ${
                        this.state.businessLog.ModifiedBy.lastName
                      }`
                      : ''
                  }
                  readOnly
                />
                <Form.Input
                  label="Modified Date"
                  placeholder={moment(
                    this.state.businessLog.dateTimeModified
                  ).format('DD/MM/YYYY - HH:mm')}
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
  updateFollowUpStatus: PropTypes.func,
  loadingUpdateStatus: PropTypes.bool
}

const mapPropsToValues = () => {
  return {
    textLog: '',
    businessLog_id: '',
    businessLog_followUp: '',
    businessLog_text: '',
    newLog: false
  }
}

const handleSubmit = () => {}

const mapStateToProps = state => {
  return {
    business: state.business.get.object,
    arrayLogBusiness: state.businessLog.get.array,
    isLoadingarrayLogBusiness: state.businessLog.get.isLoading,
    loadingUpdateStatus: state.businessLog.updateStatus.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getBusiness, getLogFromBusiness, clearBusinessLog, updateFollowUpStatus },
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
