import React, { Component, Fragment } from 'react'
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
import { getLastWeeklyReport, createWeeklyReport, updateWeeklyReport } from '../../redux/ducks/broker'
import numeral from 'numeral'

class ModalBrokersWeeklyReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stage: [
        { key: 1, text: 'Info Memorandum', value: 'Info Memorandum' },
        { key: 2, text: 'On The Market', value: 'On The Market' },
        { key: 3, text: 'Under Offer', value: 'Under Offer' },
        { key: 4, text: 'Exchange', value: 'Exchange' },
        { key: 5, text: 'Sold', value: 'Sold' }
      ],
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

  _numberFormat = (e, { name, value }) => {
    const myNumeral = numeral(value)
    const numberFormated = myNumeral.format('$0,0.[99]')
    this.props.setFieldValue(name, myNumeral.value())
    this.setState({ [name]: numberFormated })
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    if (value === 'Exchange') {
      this.setState({ exchange: true })
      if (this.props.lastWeeklyReport && !moment(this.props.lastWeeklyReport.expectedSettlementDate).isValid()) {
        this.props.setFieldValue('expectedSettlementDate', null)
      }
    } else {
      this.setState({ exchange: false })
      this.props.setFieldValue('expectedSettlementDate', null)
    }
  }

  _handleDateChange = date => {
    this.props.setFieldValue('expectedSettlementDate', date)
  }

  _handleConfirm = async isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    if (this.props.lastWeeklyReport) {
      const comparingDate = moment().diff(this.props.lastWeeklyReport.dateTimeCreated, 'day')
      if (comparingDate >= 3) {
        await this.props.createWeeklyReport(this.props.values)
      } else {
        await this.props.updateWeeklyReport(this.props.values)
      }
      this.props.closeModal()
    } else {
      await this.props.createWeeklyReport(this.props.values)
      this.props.closeModal()
    }
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      isSubmitting,
      isValid,
      isLoading,
      title,
      closeModal
    } = this.props
    return (
      <Modal open dimmer={'blurring'} onClose={() => this._handleConfirm(false)}>
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
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  label="Stage"
                  name="stage"
                  options={this.state.stage}
                  value={values.stage}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              {this.state.exchange ||
              (this.props.lastWeeklyReport && this.props.lastWeeklyReport.stage === 'Exchange') ? (
                  <Fragment>
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
                  </Fragment>
                ) : null}
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
          <Button
            color="green"
            type="submit"
            disabled={isSubmitting || !isValid}
            loading={isLoading}
            onClick={this._handleConfirm}
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
  lastWeeklyReport: PropTypes.object,
  createWeeklyReport: PropTypes.func,
  updateWeeklyReport: PropTypes.func
}

const mapPropsToValues = props => {
  if (props.lastWeeklyReport) {
    const comparingDate = moment().diff(props.lastWeeklyReport.dateTimeCreated, 'day')
    if (comparingDate >= 3) {
      return {
        id: null,
        business_id: props.business.id,
        dateTimeCreated: moment(),
        text: '',
        expectedPrice: 0,
        expectedSettlementDate: null,
        stage: ''
      }
    }
  }

  return {
    id: props.lastWeeklyReport ? props.lastWeeklyReport.id : null,
    business_id: props.business.id,
    dateTimeCreated: props.lastWeeklyReport ? moment(props.lastWeeklyReport.dateTimeCreated) : moment(),
    text: props.lastWeeklyReport ? props.lastWeeklyReport.text : '',
    expectedPrice: props.lastWeeklyReport ? props.lastWeeklyReport.expectedPrice : 0,
    expectedSettlementDate: props.lastWeeklyReport ? moment(props.lastWeeklyReport.expectedSettlementDate) : null,
    stage: props.lastWeeklyReport ? props.lastWeeklyReport.stage : ''
  }
}

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required('Text is required.')
    .max(400, 'Text require max 400 characters.'),
  stage: Yup.string().required()
})

const mapStateToProps = state => ({
  isLoading: state.buyer.update.isLoading,
  lastWeeklyReport: state.broker.getLastWeeklyReport.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeModal, getLastWeeklyReport, createWeeklyReport, updateWeeklyReport }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(ModalBrokersWeeklyReport)
)
