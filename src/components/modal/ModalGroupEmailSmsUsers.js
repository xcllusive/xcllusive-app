import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Table, Checkbox, Dimmer, Loader, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'

class ModalGroupEmailSmsUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      array: [],
      checkboxMarkAll: false,
      fileUpload: true,
      arrayEmailsOrSms: []
    }
  }

  componentDidMount () {}

  _config = () => {}

  _handleConfirm = async isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    if (this.props.emailOrSms === 'email') this.props.onConfirm(this.state.arrayEmailsOrSms, this.props.emailOrSms)
    if (this.props.emailOrSms === 'sms') {
      this.props.onConfirm(this.state.arrayEmailsOrSms, this.props.emailOrSms, this.props.values.text)
    }
    this.props.closeModal()
  }

  _removeFileUploaded = e => {
    if (this.timer) clearTimeout(this.timer)
    this.setState({ fileUpload: false })
    this.props.setFieldValue('attachment', null)
    this.timer = setTimeout(() => this.setState({ fileUpload: true }), 10)
  }

  _handleFileUpload = e => {
    const file = e.target.files[0]
    this.props.setFieldValue('attachment', file)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _markAllcheckBoxArray = (e, { checked }) => {
    if (!checked) {
      this.setState({
        array: [],
        arrayEmailsOrSms: []
      })
    }
    this.setState(prevState => ({
      checkboxMarkAll: !prevState.checkboxMarkAll
    }))
    return checked
      ? this.setState({
        array: this.props.users,
        arrayEmailsOrSms:
            this.props.emailOrSms === 'email'
              ? this.props.users.map(item => {
                return item.email
              })
              : this.props.users.map(item => {
                return item.phoneMobile ? item.phoneMobile : null
              })
      })
      : this.setState({ array: [] })
  }

  _checkBoxArray = (e, { values }) => {
    const isChecked = this.state.array.filter(item => {
      return item.id === values.id
    })

    if (!isChecked.length) {
      const array = this.state.array
      array.push(values)
      this.setState({ array })

      const arrayEmailsOrSms = this.state.arrayEmailsOrSms
      arrayEmailsOrSms.push(this.props.emailOrSms === 'email' ? values.email : values)
      this.setState({ arrayEmailsOrSms })
    } else {
      const array = this.state.array.filter(item => {
        return item.id !== values.id
      })
      this.setState({ array })
      const arrayEmailsOrSms = this.state.arrayEmailsOrSms.filter(item => {
        return this.props.emailOrSms === 'email' ? item !== values.email : item !== values.phoneMobile
      })
      this.setState({ arrayEmailsOrSms })
    }
  }

  render () {
    const {
      handleChange,
      handleBlur,
      errors,
      touched,
      options,
      isLoadingGroupEmail,
      users,
      emailOrSms,
      values
    } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Dimmer.Dimmable dimmed={isLoadingGroupEmail}>
            <Dimmer inverted active={isLoadingGroupEmail}>
              <Loader>Loading</Loader>
            </Dimmer>
            {users.length ? (
              <Form>
                <Form.Group>
                  <Form.Checkbox
                    label="Mark All"
                    name="markAll"
                    checked={this.state.checkboxMarkAll}
                    onChange={this._markAllcheckBoxArray}
                  />
                </Form.Group>
                <Form.Group>
                  <Table striped celled compact definition>
                    <Table.Body>
                      {users.map((groupEmail, index) => (
                        <Table.Row key={index}>
                          <Table.Cell collapsing>
                            <Checkbox
                              checked={this.state.array.some(item => item.id === groupEmail.id)}
                              values={groupEmail}
                              onChange={this._checkBoxArray}
                              disabled={emailOrSms === 'sms' && !groupEmail.phoneMobile}
                            />
                          </Table.Cell>
                          <Table.Cell
                            style={{ backgroundColor: emailOrSms === 'sms' && !groupEmail.phoneMobile ? 'grey' : null }}
                          >
                            {groupEmail.firstName} {groupEmail.lastName}
                          </Table.Cell>
                          {emailOrSms === 'sms' ? (
                            <Table.Cell style={{ backgroundColor: !groupEmail.phoneMobile ? 'grey' : null }}>
                              {groupEmail.phoneMobile}
                            </Table.Cell>
                          ) : (
                            <Table.Cell>{groupEmail.email}</Table.Cell>
                          )}
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Form.Group>
                {emailOrSms === 'sms' ? (
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.TextArea
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
                ) : null}
                <Form.Group>
                  <b>
                    <label>Total email(s) to be sent: {this.state.array.length}</label>
                  </b>
                </Form.Group>
              </Form>
            ) : null}
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
            disabled={this.state.array.length === 0}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalGroupEmailSmsUsers.propTypes = {
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  emailOrSms: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  users: PropTypes.array,
  isLoadingGroupEmail: PropTypes.bool,
  onConfirm: PropTypes.func
}

const mapStateToProps = state => ({
  listGroupEmail: state.business.getBuyersGroupEmail.array,
  isLoadingGroupEmail: state.user.get.isLoading
})

const mapPropsToValues = () => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal
    },
    dispatch
  )

const validationSchema = Yup.object().shape({
  text: Yup.string().max(2000, 'Text require max 2000 characters.')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true,
    validationSchema
  })(ModalGroupEmailSmsUsers)
)
