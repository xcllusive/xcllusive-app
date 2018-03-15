import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import Yup from 'yup'
import Wrapper from '../../components/content/Wrapper'
/* import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css' */

import { getBusiness } from '../../redux/ducks/business'

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

const array = [
  {
    logID: '0001',
    dateLog: '01/01/2018',
    textLog: 'Appraisal Production Commenced',
    followUpDate: '01/01/2018',
    status: 'Pending'
  },
  {
    logID: '0002',
    dateLog: '01/01/2018',
    textLog: 'New Enquiry',
    followUpDate: '01/05/2018',
    status: 'Pending'
  },
  {
    logID: '0003',
    dateLog: '01/01/2018',
    textLog: 'New Enquiry',
    followUpDate: '01/01/2019',
    status: 'Done'
  },
  {
    logID: '0004',
    dateLog: '01/01/2018',
    textLog: 'New Enquiry',
    followUpDate: '01/07/2018',
    status: 'Done'
  },
  {
    logID: '0005',
    dateLog: '01/01/2018',
    textLog: 'Appraisal Production Commenced',
    followUpDate: '10/02/2018',
    status: 'Pending'
  }
]

class BusinessLogPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: null,
      focused: false
    }
  }
  componentWillMount () {
    this.props.getBusiness(this.props.match.params.id)
  }
  render () {
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched
    } = this.props
    console.log('caayo', this.props.business)
    return (
      <Wrapper>
        <div>
          <Statistic.Group size='mini' widths={5}>
            <Statistic color='orange'>
              <Statistic.Value>Business Name</Statistic.Value>
              <Statistic.Label>Business ID</Statistic.Label>
            </Statistic>
            <Statistic color='blue'>
              <Statistic.Value>Peter Park</Statistic.Value>
              <Statistic.Label>Name</Statistic.Label>
            </Statistic>
            <Statistic color='blue'>
              <Statistic.Value>peter_park@xcllusive.com.au</Statistic.Value>
              <Statistic.Label>Email</Statistic.Label>
            </Statistic>
            <Statistic color='blue'>
              <Statistic.Value>0468 123 321</Statistic.Value>
              <Statistic.Label>Telephone</Statistic.Label>
            </Statistic>
            <Statistic color='blue'>
              <Statistic.Value>01/12/2017 03:10:01</Statistic.Value>
              <Statistic.Label>Creation Time</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Segment size='small' inverted color='blue'>
            <h4>Business Log Detail</h4>
          </Segment>
          <Grid centered>
            <Grid.Column textAlign='center' width={5}>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder='Find logs...'
              />
            </Grid.Column>
          </Grid>
          <Label size={'big'}>Log History</Label>
          <Table color='blue' celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Log ID</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Text</Table.HeaderCell>
                <Table.HeaderCell>Follow Up date</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {array.map(item => {
                return (
                  <Table.Row
                    active
                    key={item.logID}
                    onClick={() =>
                      this.props.history.push(
                        `${this.props.match.path}/${item.logID}`
                      )
                    }
                  >
                    <Table.Cell>{item.logID}</Table.Cell>
                    <Table.Cell>{item.dateLog}</Table.Cell>
                    <Table.Cell>{item.textLog}</Table.Cell>
                    <Table.Cell>{item.followUpDate}</Table.Cell>
                    <Table.Cell>{item.status}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
          <Form>
            <Form.Group>
              <Form.Field width={5}>
                <Form.TextArea
                  required
                  label='Communication text'
                  name='text'
                  autoComplete='text'
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.text && touched.text && <Label basic color='red' pointing content={errors.text} />}
              </Form.Field>
              <Form.Field>
                <h5>Follow Up Date</h5>
                {/* <SingleDatePicker
                  displayFormat='DD/MM/YYYY'
                  date={this.state.date} // momentPropTypes.momentObj or null
                  onDateChange={this._setStateDate} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                />
                {errors.date && touched.date && <Label basic color='red' pointing content={errors.date} />} */}
              </Form.Field>
            </Form.Group>
            <Grid textAlign='center'>
              <Grid.Column>
                <Form.Group widths='equal'>
                  <Button color='blue'>
                    <Icon name='commenting' />
                    New Communication
                  </Button>
                  <Button color='linkedin'>
                    <Icon name='commenting' />
                    Finalise Communication
                  </Button>
                  <Button color='vk'>
                    <Icon name='commenting' />
                    Save and Retun to Business
                  </Button>
                  <Button color='facebook'>
                    <Icon name='commenting' />
                    Save and Retun to Main Menu
                  </Button>
                </Form.Group>
              </Grid.Column>
            </Grid>
          </Form>
          <Form>
            <Form.Group inline>
              <Form.Input
                label='Created By'
                placeholder='Zoran Sarabaca'
                readOnly
              />
              <Form.Input
                label='Creation Date'
                placeholder='08/12/2017'
                readOnly
              />
              <Form.Input
                label='Modified By'
                placeholder='Cayo Bayestorff'
                readOnly
              />
              <Form.Input
                label='Modified Date'
                placeholder='09/12/2017'
                readOnly
              />
            </Form.Group>
          </Form>
        </div>
      </Wrapper>
    )
  }
}

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required('Communication Text is required.')
  /* date: Yup.string()
    .required('Follow up Date is required.') */
})

BusinessLogPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  getBusiness: PropTypes.func,
  business: PropTypes.object
}

const mapPropsToValues = () => {
  return {
    textLog: ''
  }
}

const handleSubmit = () => {
}

const mapStateToProps = (state) => {
  return {
    business: state.business.get.object
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getBusiness}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit,
    validationSchema})(BusinessLogPage)
)
