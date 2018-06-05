import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Form,
  Label,
  Segment,
  Header,
  Icon,
  Message,
  Radio,
  Table,
  Checkbox,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import Yup from 'yup'

import { getBuyersGroupEmail } from '../../redux/ducks/business'

class ModalGroupEmail extends Component {
  constructor () {
    super()

    this.state = {}
  }

  componentDidMount () {
    this.props.getBuyersGroupEmail(this.props.businessId)
  }

  componentDidUpdate () {}

  componentWillMount () {
  }

  componentWillReceiveProps () {}

  _handleConfirm = isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
    }
  }

  _removeFileUploaded = () => {
    this.props.setFieldValue('attachment', null)
  }

  _handleFileUpload = e => {
    const file = e.target.files[0]
    this.props.setFieldValue('attachment', file)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const {
      options,
      values,
      touched,
      errors,
      isValid,
      handleChange,
      handleBlur,
      listGroupEmail,
      isLoadingGroupEmail
    } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Dimmer.Dimmable dimmed={isLoadingGroupEmail}>
                <Dimmer inverted active={isLoadingGroupEmail}>
                  <Loader>Loading</Loader>
                </Dimmer>
                <Table celled compact definition>
                  <Table.Body>
                    {listGroupEmail.map((groupEmail, index) => (
                      <Table.Row key={index}>
                        <Table.Cell collapsing>
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell>{groupEmail.firstName} {groupEmail.lastName}</Table.Cell>
                        <Table.Cell>{groupEmail.email}</Table.Cell>
                        <Table.Cell>
                          <Label color={groupEmail.isPending ? 'red' : 'green'}>
                            {groupEmail.isPending ? 'Pending' : 'Done'}
                          </Label>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Dimmer.Dimmable>
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
                {errors.subject &&
                  touched.subject && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.subject}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <h5 style={{ fontSize: '.92857143em' }}>Body</h5>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Segment size="mini" inverted color="grey">
                  <Header inverted>Dear ‹‹buyer`s name››</Header>
                </Segment>
                <Form.TextArea
                  name="body"
                  autoComplete="body"
                  value={values.body}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Segment size="mini" inverted color="grey">
                  <Header inverted>
                    Xcllusive Business Sales
                    <p />
                    www.xcllusive.com.au | (02) 9817 3331
                  </Header>
                </Segment>
                {errors.text &&
                  touched.text && (
                  <Label basic color="red" pointing content={errors.text} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={11}>
                <Form.Input
                  type="file"
                  label="Attachment"
                  name="attachment"
                  autoComplete="attachment"
                  onChange={this._handleFileUpload}
                />
                {errors.attachment &&
                  touched.attachment && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.attachment}
                  />
                )}
              </Form.Field>
              <Form.Field width={5} style={{ alignSelf: 'flex-end' }}>
                <Form.Button
                  floated="right"
                  color="yellow"
                  onClick={() => this._removeFileUploaded()}
                >
                  <Icon name="remove" />
                  Remove
                </Form.Button>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Message info size="small">
                <p>
                  You can attach one file. To send multiple files you can
                  compress the files and attach.
                </p>
              </Message>
            </Form.Group>
            <Form.Group>
              <b>
                <label>Who would you like the recipients to reply to?</label>
              </b>
              <Form.Field
                control={Radio}
                label="You only"
                name="replyTo"
                onChange={this._handleChangeCheckBox}
                checked={values.replyTo}
              />
              <Form.Field
                control={Radio}
                label="You and the office"
                name="replyTo"
                onChange={this._handleChangeCheckBox}
                checked={!values.replyTo}
              />
            </Form.Group>
            <Form.Group>
              <b>
                <p />
                <label>Total email(s) to be generated: {listGroupEmail.length}</label>
              </b>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            content="Cancel"
            onClick={() => this._handleConfirm(false)}
          />
          <Button
            positive
            icon="mail"
            labelPosition="right"
            content="Send"
            onClick={this._handleConfirm}
            disabled={!isValid}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalGroupEmail.propTypes = {
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  getBuyersGroupEmail: PropTypes.func,
  businessId: PropTypes.number,
  listGroupEmail: PropTypes.array,
  isLoadingGroupEmail: PropTypes.bool
}

const mapStateToProps = state => ({
  listGroupEmail: state.business.getBuyersGroupEmail.array,
  isLoadingGroupEmail: state.business.getBuyersGroupEmail.isLoading
})

const mapPropsToValues = () => ({
  subject: '',
  body: '',
  attachment: '',
  replyTo: true
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      getBuyersGroupEmail
    },
    dispatch
  )

const validationSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required.'),
  body: Yup.string().required('Body is required.')
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true,
    validationSchema
  })(ModalGroupEmail)
)
