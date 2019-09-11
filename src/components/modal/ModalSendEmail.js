import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Label, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import 'jodit'
import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'

import { getEmailTemplateCompiled } from '../../redux/ducks/emailTemplates'

class ModalSendEmail extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getEmailTemplateCompiled(this.props.options.emailTemplate, this.props.businessId, this.props.buyerId)
  }

  componentWillUnmount () {
    this.setState({ controleMsg: true })
  }

  _handleConfirm = async isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    this.props.onConfirm(this.props.values)
    this.props.closeModal()
  }

  _handleChangeBody = value => {
    this.props.setFieldValue('body', value)
  }

  _config = () => {}

  render () {
    const { options, values, touched, errors, handleChange, handleBlur, isLoadingEmail } = this.props
    return (
      <Modal open size="large" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Dimmer.Dimmable dimmed={isLoadingEmail}>
            <Dimmer inverted active={isLoadingEmail}>
              <Loader>Loading</Loader>
            </Dimmer>
            <Form>
              <Form.Group>
                <Form.Field width={16}>
                  <Form.Input
                    label="To"
                    name="to"
                    autoComplete="to"
                    value={values.to}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.to && touched.to && <Label basic color="red" pointing content={errors.to} />}
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={16}>
                  <Form.Input
                    label="Subject"
                    name="subject"
                    autoComplete="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.subject && touched.subject && <Label basic color="red" pointing content={errors.subject} />}
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <h5 style={{ fontSize: '.92857143em', marginLeft: '10px' }}>Body</h5>
              </Form.Group>
              <Form.Group>
                <Form.Field width={16}>
                  <JoditEditor value={values.body} config={this._config} onChange={this._handleChangeBody} />
                </Form.Field>
              </Form.Group>
            </Form>
          </Dimmer.Dimmable>
        </Modal.Content>
        <Modal.Actions>
          <Button negative content="Cancel" onClick={() => this._handleConfirm(false)} />
          <Button
            positive
            icon="mail"
            labelPosition="right"
            content="Send"
            onClick={this._handleConfirm}
            disabled={!values.to || !values.subject || !values.body}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalSendEmail.propTypes = {
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    emailTemplate: PropTypes.number.isRequired,
    to: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  getEmailTemplateCompiled: PropTypes.func,
  objectEmailTemplate: PropTypes.object,
  isLoadingEmail: PropTypes.bool,
  onConfirm: PropTypes.func,
  bodyEmailTemplate: PropTypes.string,
  businessId: PropTypes.number,
  buyerId: PropTypes.number
}

const mapStateToProps = state => ({
  isLoadingEmail: state.emailTemplates.get.isLoading,
  objectEmailTemplate: state.emailTemplates.getCompiled.object
})

const mapPropsToValues = props => ({
  to: props.options ? props.options.to : '',
  subject: props.objectEmailTemplate ? props.objectEmailTemplate.subject : '',
  body: props.objectEmailTemplate ? props.objectEmailTemplate.body : ''
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      getEmailTemplateCompiled
    },
    dispatch
  )

const validationSchema = Yup.object().shape({
  to: Yup.string().required('To is required.'),
  subject: Yup.string().required('Subject is required.'),
  body: Yup.string().required('Body is required.')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true,
    validationSchema
  })(ModalSendEmail)
)
