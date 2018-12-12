import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label, Grid } from 'semantic-ui-react'
import * as Yup from 'yup'
import { closeModal } from '../../redux/ducks/modal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { getLastWeeklyReport } from '../../redux/ducks/broker'
import numeral from 'numeral'

class ModalBrokersWeeklyReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expectedPrice: 0,
      exchange: false
    }
  }
  componentDidMount () {
    this.props.getLastWeeklyReport(this.props.business.id)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.lastWeeklyReport && nextProps.lastWeeklyReport.expectedPrice !== prevState.expectedPrice) {
      var expectedPrice = numeral(nextProps.values.expectedPrice).format('$0,0.[99]')
    }
    return {
      expectedPrice: expectedPrice || prevState.expectedPrice
    }
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _numberFormat = (e, { name, value }) => {
    const myNumeral = numeral(value)
    const numberFormated = myNumeral.format('$0,0.[99]')
    this.props.setFieldValue(name, myNumeral.value())
    this.setState({ [name]: numberFormated })
  }

  _handleDateChange = date => {
    this.props.setFieldValue('expectedSettlementDate', date)
  }

  _exchange = () => {
    this.state.exchange ? this.setState({ exchange: false }) : this.setState({ exchange: true })
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      isValid,
      isLoading,
      title,
      closeModal
    } = this.props
    // if (lastWeeklyReport) console.log(lastWeeklyReport)
    return (
      <Modal open dimmer={'blurring'}>
        <Modal.Header align="center">{title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column textAlign="right">
                  <label
                    style={{
                      marginRight: '148px',
                      fontSize: '.92857143em',
                      color: 'rgba(0,0,0,.87)',
                      fontWeight: '700'
                    }}
                  >
                    Date
                  </label>
                  <Form.Field>
                    <DatePicker disabled={true} selected={values.dateTimeCreated} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.TextArea
                  style={{ height: '20vh' }}
                  label="Text"
                  name="text"
                  autoComplete="text"
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.text && touched.text && <Label basic color="red" pointing content={errors.text} />}
              </Form.Field>
            </Form.Group>
            {this.state.exchange ? (
              <Form.Group>
                <Form.Field>
                  <Form.Input
                    label="Expected Price"
                    name="expectedPrice"
                    autoComplete="expectedPrice"
                    value={this.state.expectedPrice}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.expectedPrice && touched.expectedPrice && (
                    <Label basic color="red" pointing content={errors.expectedPrice} />
                  )}
                </Form.Field>
                <Form.Field>
                  <label
                    style={{
                      marginRight: '78px',
                      fontSize: '.92857143em',
                      color: 'rgba(0,0,0,.87)',
                      fontWeight: '700'
                    }}
                  >
                    Date
                  </label>
                  <DatePicker
                    style={{ marginTop: '5px' }}
                    selected={values.expectedSettlementDate}
                    onChange={this._handleDateChange}
                  />
                </Form.Field>
              </Form.Group>
            ) : null}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button floated="left" color="orange" onClick={closeModal}>
            <Icon name="archive" />
            Stage
          </Button>
          <Button floated="left" color="yellow" onClick={() => this._exchange()}>
            <Icon name="exchange" />
            Exchange
          </Button>
          <Button color="red" onClick={closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
          <Button
            color="blue"
            type="submit"
            disabled={isSubmitting || !isValid}
            loading={isLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalBrokersWeeklyReport.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  title: PropTypes.string,
  business: PropTypes.object,
  closeModal: PropTypes.func,
  getLastWeeklyReport: PropTypes.func,
  lastWeeklyReport: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    business_id: props.business.id,
    dateTimeCreated: props.lastWeeklyReport ? moment(props.lastWeeklyReport.dateTimeCreated) : moment(),
    text: props.lastWeeklyReport ? props.lastWeeklyReport.text : '',
    expectedPrice: props.lastWeeklyReport ? props.lastWeeklyReport.expectedPrice : 0,
    expectedSettlementDate: props.lastWeeklyReport ? moment(props.lastWeeklyReport.expectedSettlementDate) : null
  }
}

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required('Text is required.')
    .max(400, 'Text require max 400 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => props.onConfirm(values)

const mapStateToProps = state => ({
  isLoading: state.buyer.update.isLoading,
  lastWeeklyReport: state.broker.getLastWeeklyReport.object
})

const mapDispatchToProps = dispatch => bindActionCreators({ closeModal, getLastWeeklyReport }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(ModalBrokersWeeklyReport)
)
