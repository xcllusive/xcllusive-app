import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import { listIssue } from '../../redux/ducks/issue'
import { addIssueToBusiness } from '../../redux/ducks/business'

class ModalSelectIssue extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.listIssue(
      null,
      null,
      this.props.business.listIssues_id ? JSON.parse(this.props.business.listIssues_id) : null
    )
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const { values, touched, errors, handleSubmit, issueOptions } = this.props
    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">Selecting Issue</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={10}>
                <label>Issue</label>
                <Dropdown
                  name="issueId"
                  placeholder="Select Issue"
                  fluid
                  search
                  selection
                  options={issueOptions}
                  value={values.issueId}
                  onChange={this._handleSelectChange}
                  onSearchChange={this._handleSearchChange}
                />
                {errors.issueList && touched.issueList && (
                  <Label basic color="red" pointing content={errors.issueList} />
                )}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            // disabled={createLoading || updateLoading || !isValid}
            // loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            Add Issue
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

ModalSelectIssue.propTypes = {
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
  business: PropTypes.object,
  onConfirm: PropTypes.func,
  issueOptions: PropTypes.array,
  listIssue: PropTypes.func,
  addIssueToBusiness: PropTypes.func
}

const mapPropsToValues = props => ({
  issueId: null
})

const validationSchema = Yup.object().shape({})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.addIssueToBusiness(values.issueId, props.business)
  // if (!props.issue) {
  //   props.createIssue(values)
  // } else {
  //   props.updateIssue(values)
  // }
  props.onConfirm(values)
}

const mapStateToProps = state => ({
  issueOptions: state.issue.get.issuesAvailable
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      listIssue,
      addIssueToBusiness
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
  })(ModalSelectIssue)
)
