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
  clearBusinessLog
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
      newLog: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (
      this.props.objectLogBusiness.length !== nextProps.objectLogBusiness.length
    ) {
      this._selectLog(nextProps.objectLogBusiness[0])
    }
  }

  componentWillMount () {
    this.props.getBusiness(this.props.match.params.id)
    this.props.getLogFromBusiness(this.props.match.params.id)
    if (this.props.objectLogBusiness.length) {
      this._selectLog(this.props.objectLogBusiness[0])
    }
  }

  componentWillUnmount () {
    this.props.clearBusinessLog()
  }

  _selectLog = businessLog => {
    const { newLog, id, followUp, text } = businessLog

    if (newLog) this.props.setFieldValue('newLog', true)
    else this.props.setFieldValue('newLog', false)

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
      objectLogBusiness,
      business
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
                action={{ icon: 'search' }}
                placeholder="Find logs..."
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
              {objectLogBusiness.map(logBusiness => {
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
                  selected={moment(values.businessLog_followUp)}
                  onChange={this._handleDateChange}
                  popperPlacement="top-end"
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
            <Grid textAlign="center">
              <Grid.Column>
                <Form.Group widths="equal">
                  <Button color="blue">
                    <Icon name="commenting" />
                    New Communication
                  </Button>
                  <Button color="linkedin">
                    <Icon name="commenting" />
                    Finalise Communication
                  </Button>
                  <Button color="vk">
                    <Icon name="commenting" />
                    Save and Retun to Business
                  </Button>
                  <Button color="facebook">
                    <Icon name="commenting" />
                    Save and Retun to Main Menu
                  </Button>
                </Form.Group>
              </Grid.Column>
            </Grid>
          </Form>
          <Form>
            <Form.Group inline>
              <Form.Input
                label="Created By"
                placeholder="Zoran Sarabaca"
                readOnly
              />
              <Form.Input
                label="Creation Date"
                placeholder="08/12/2017"
                readOnly
              />
              <Form.Input
                label="Modified By"
                placeholder="Cayo Bayestorff"
                readOnly
              />
              <Form.Input
                label="Modified Date"
                placeholder="09/12/2017"
                readOnly
              />
            </Form.Group>
          </Form>
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
  objectLogBusiness: PropTypes.array,
  business: PropTypes.object,
  setFieldValue: PropTypes.func,
  clearBusinessLog: PropTypes.func
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
    objectLogBusiness: state.businessLog.get.array
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getBusiness, getLogFromBusiness, clearBusinessLog },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit
  })(BusinessLogPage)
)
