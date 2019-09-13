import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import { createIssue, updateIssue } from '../../redux/ducks/issue'

class ModalIssueRegister extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _handleChangeCheckBox = name => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isValid,
      createLoading,
      updateLoading
    } = this.props
    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">{this.props.title ? this.props.title : ''}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Label"
                  name="label"
                  autoComplete="label"
                  value={values.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.label && touched.label && <Label basic color="red" pointing content={errors.label} />}
              </Form.Field>
            </Form.Group>
            {this.props.issue ? (
              <Form.Group>
                <Form.Field>
                  <Form.Checkbox
                    style={{ checkboxBackground: 'red' }}
                    name="closed"
                    onChange={() => this._handleChangeCheckBox('closed')}
                    checked={values.closed}
                    toggle
                  />
                </Form.Field>
                <Label
                  onClick={() => this._handleChangeCheckBox('closed')}
                  as="a"
                  basic
                  color={values.closed ? 'red' : 'blue'}
                >
                  {values.closed ? 'Closed' : 'Open'}
                </Label>
              </Form.Group>
            ) : null}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            disabled={createLoading || updateLoading || !isValid}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.issue ? 'Edit Issue' : 'Create Issue'}
          </Button>
          <Button color="red" onClick={this.props.closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalIssueRegister.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  createLoading: PropTypes.bool,
  issue: PropTypes.object,
  updateLoading: PropTypes.bool,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  onConfirm: PropTypes.func
}

const mapPropsToValues = props => ({
  label: props.issue ? props.issue.label : '',
  closed: props.issue ? props.issue.closed : false,
  id: props.issue ? props.issue.id : null
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (!props.issue) {
    props.createIssue(values)
  } else {
    props.updateIssue(values)
  }
  props.onConfirm(values)
}

const mapStateToProps = state => ({
  createLoading: state.businessRegister.create.isLoading,
  isCreated: state.businessRegister.create.isCreated,
  updateLoading: state.businessRegister.update.isLoading,
  isUpdated: state.businessRegister.update.isUpdated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createIssue,
      updateIssue
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(ModalIssueRegister)
)
