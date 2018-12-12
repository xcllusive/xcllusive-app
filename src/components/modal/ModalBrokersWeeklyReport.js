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

class ModalBrokersWeeklyReport extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {}

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleDateChange = date => {
    this.props.setFieldValue('settlementDate', date)
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
                      marginRight: '78px',
                      fontSize: '.92857143em',
                      color: 'rgba(0,0,0,.87)',
                      fontWeight: '700'
                    }}
                  >
                    Settlement Date
                  </label>
                  <Form.Field>
                    <DatePicker disabled={true} selected={values.dateTimeCreated} onChange={this._handleDateChange} />
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
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button floated="left" color="orange" onClick={closeModal}>
            <Icon name="archive" />
            Stage
          </Button>
          <Button floated="left" color="yellow" onClick={closeModal}>
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
  closeModal: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    business_id: props.business.id,
    dateTimeCreated: moment(),
    expectedPrice: 0,
    expectedSettlementDate: null
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
  sourceOptions: state.businessRegister.get.source.array
})

const mapDispatchToProps = dispatch => bindActionCreators({ closeModal }, dispatch)

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
