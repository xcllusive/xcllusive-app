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
import { getLastWeeklyReport, updateWeeklyReport } from '../../redux/ducks/broker'

class ModalBrokersWeeklyReportToDo extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.props.getLastWeeklyReport(this.props.business.id)
  }

  _handleConfirm = async isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    if (this.props.lastWeeklyReport) {
      await this.props.updateWeeklyReport(this.props.values, true)
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
                    <DatePicker disabled={true} selected={values.dateTimeCreatedToDo} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.TextArea
                  style={{ height: '20vh' }}
                  label="Text"
                  name="textToDo"
                  autoComplete="textToDo"
                  value={values.textToDo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.textToDo && touched.textToDo && <Label basic color="red" pointing content={errors.textToDo} />}
              </Form.Field>
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

ModalBrokersWeeklyReportToDo.propTypes = {
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
  updateWeeklyReport: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    id: props.lastWeeklyReport ? props.lastWeeklyReport.id : null,
    business_id: props.business.id,
    dateTimeCreatedToDo: moment(),
    textToDo: ''
  }
}

const validationSchema = Yup.object().shape({
  textToDo: Yup.string()
    .required('TextToDo is required.')
    .max(400, 'TextToDo require max 400 characters.')
})

const mapStateToProps = state => ({
  isLoading: state.buyer.update.isLoading,
  lastWeeklyReport: state.broker.getLastWeeklyReport.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeModal, getLastWeeklyReport, updateWeeklyReport }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(ModalBrokersWeeklyReportToDo)
)
