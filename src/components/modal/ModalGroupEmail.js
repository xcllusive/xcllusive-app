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
  Checkbox
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import Yup from 'yup'

class ModalGroupEmail extends Component {
  constructor () {
    super()

    this.state = {}
  }

  componentDidMount () {}

  componentDidUpdate () {}

  componentWillMount () {}

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
      handleBlur
    } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Table celled compact definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell>John Lilki</Table.Cell>
                    <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                    <Table.Cell>Red</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
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
                  required
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
  isValid: PropTypes.bool
}

const mapStateToProps = state => ({})

const mapPropsToValues = () => ({
  subject: '',
  body: '',
  attachment: '',
  replyTo: true
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal
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
