import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { closeModal } from '../../redux/ducks/modal'
import {
  getAgreementTemplates,
  getAgreementTemplate,
  clearAgreementTemplates
} from '../../redux/ducks/agreementTemplates'
import { mapArrayToValuesForDropdownTemplates } from '../../utils/sharedFunctionArray'

class ModalListAgreements extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getAgreementTemplates(this.props.state)
    this.props.clearAgreementTemplates()
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.getAgreementTemplate(value)
  }

  _handleConfirm = isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    this.props.callBack(isConfirmed, this.props.objectAgreementTemplate.id)
    this.props.closeModal()
  }

  _showAll = () => {
    this.props.clearAgreementTemplates()
    this.props.getAgreementTemplates()
  }

  render () {
    const {
      values,
      touched,
      errors,
      options,
      listAgreementTemplates,
      objectAgreementTemplate,
      agreementLoading
    } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={13}>
                <Form.Select
                  label="Title"
                  name="title"
                  autoComplete="title"
                  loading={agreementLoading}
                  options={mapArrayToValuesForDropdownTemplates(
                    listAgreementTemplates
                  )}
                  value={values.title}
                  onChange={this._handleSelectChange}
                />
                {errors.title &&
                  touched.title && (
                  <Label basic color="red" pointing content={errors.title} />
                )}
              </Form.Field>
              <Form.Field style={{ marginTop: '24px' }} width={3}>
                <Button
                  color="facebook"
                  size="small"
                  onClick={() => this._showAll()}
                >
                  <Icon name="backward" />
                  Show all
                </Button>
              </Form.Field>
            </Form.Group>
            {objectAgreementTemplate ? (
              <Form.Group>
                <Form.Field>
                  <Form.Input
                    readOnly
                    label="State"
                    name="state"
                    autoComplete="state"
                    value={values.state}
                  />
                </Form.Field>
              </Form.Group>
            ) : null}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            disabled={!objectAgreementTemplate}
            onClick={this._handleConfirm}
            // onClick={() =>
            //   history.push(`business/${this.props.business.id}/agreement`)
            // }
          >
            <Icon name="edit" />
            Preview Agreement
          </Button>
          <Button color="red" onClick={() => this._handleConfirm(false)}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalListAgreements.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  getAgreementTemplates: PropTypes.func,
  listAgreementTemplates: PropTypes.array,
  getAgreementTemplate: PropTypes.func,
  objectAgreementTemplate: PropTypes.object,
  clearAgreementTemplates: PropTypes.func,
  state: PropTypes.string.isRequired,
  agreementLoading: PropTypes.bool,
  callBack: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  agreementLoading: state.agreementTemplates.get.isLoading,
  listAgreementTemplates: state.agreementTemplates.getAll.array,
  objectAgreementTemplate: state.agreementTemplates.get.object
})

const mapPropsToValues = props => {
  if (props && props.objectAgreementTemplate) {
    return {
      state: props.objectAgreementTemplate.state
    }
  }
  return {
    state: ''
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      getAgreementTemplates,
      getAgreementTemplate,
      clearAgreementTemplates
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true
  })(ModalListAgreements)
)
