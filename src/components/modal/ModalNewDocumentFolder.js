import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button, Radio, Divider, Checkbox } from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Yup from 'yup'
import styled from 'styled-components'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

import { closeModal } from '../../redux/ducks/modal'
import { getOfficeRegister } from '../../redux/ducks/officeRegister'
import { getDocumentFolder, createDocumentFolder, updateDocumentFolder } from '../../redux/ducks/documentFolder'
const CheckboxFormatted = styled.div`
  padding-right: 1em;
`

class ModalNewDocumentFolder extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getOfficeRegister()
    this.props.getDocumentFolder()
  }

  static getDerivedStateFromProps = nextProps => {
    if (nextProps.isCreated || nextProps.isUpdated) {
      nextProps.getDocumentFolder()
    }
    return null
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    this.props.setFieldValue('allOffices', false)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
    if (name === 'allOffices') {
      this.props.setFieldValue('officeId', null)
    }
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      // isValid,
      createLoading,
      updateLoading,
      officeOptions
      // documentFolder
    } = this.props
    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">{this.props.titleModal ? this.props.titleModal : ''}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && <Label basic color="red" pointing content={errors.name} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  required
                  label="Office Region"
                  name="officeId"
                  options={mapArrayToValuesForDropdown(officeOptions)}
                  value={values.officeId}
                  onChange={this._handleSelectChange}
                />
                {errors.officeId && touched.officeId && <Label basic color="red" pointing content={errors.officeId} />}
              </Form.Field>
              <Form.Field
                style={{ marginTop: '30px', marginLeft: '15px' }}
                control={Radio}
                label="All Offices"
                name="allOffices"
                onChange={this._handleChangeCheckBox}
                checked={values.allOffices}
              />
            </Form.Group>
            <Divider horizontal clearing>
              Giving Access
            </Divider>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Listing Agent Xcllusive</label>
                <Form.Field
                  control={Radio}
                  label="Yes"
                  name="accessListingAgentXcllusive"
                  onChange={this._handleChangeCheckBox}
                  checked={values.accessListingAgentXcllusive}
                />
                <Form.Field
                  control={Radio}
                  label="No"
                  name="accessListingAgentXcllusive"
                  onChange={this._handleChangeCheckBox}
                  checked={!values.accessListingAgentXcllusive}
                />
              </Form.Field>
              <Form.Field>
                <label>Listing Agent CTC</label>
                <Form.Field
                  control={Radio}
                  label="Yes"
                  name="accessListingAgentCtc"
                  onChange={this._handleChangeCheckBox}
                  checked={values.accessListingAgentCtc}
                />
                <Form.Field
                  control={Radio}
                  label="No"
                  name="accessListingAgentCtc"
                  onChange={this._handleChangeCheckBox}
                  checked={!values.accessListingAgentCtc}
                />
              </Form.Field>
              <Form.Field>
                <label>Level of Info Access</label>
                <Form.Field
                  control={Radio}
                  label="Management"
                  name="accesslevelOfInfo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.accesslevelOfInfo}
                />
                <Form.Field
                  control={Radio}
                  label="Team Leader"
                  name="accesslevelOfInfo"
                  onChange={this._handleChangeCheckBox}
                  checked={!values.accesslevelOfInfo}
                />
              </Form.Field>
            </Form.Group>
            <Divider horizontal clearing>
              Menu Access
            </Divider>
            <Form.Group widths="equal">
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="buyerMenu"
                  label="Buyer"
                  value="buyerMenu"
                  checked={values.buyerMenu}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="businessMenu"
                  label="Business"
                  value="businessMenu"
                  checked={values.businessMenu}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={4}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="preSaleMenu"
                  label="Pre Sale"
                  value="preSaleMenu"
                  checked={values.preSaleMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={6}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="clientManagerMenu"
                  label="Client Manager"
                  value="clientManagerMenu"
                  checked={values.clientManagerMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  as={CheckboxFormatted}
                  name="systemSettingsMenu"
                  label="System Settings"
                  value="systemSettingsMenu"
                  checked={values.systemSettingsMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            disabled={createLoading || updateLoading || (!values.officeId && !values.allOffices)}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.documentFolder ? 'Edit Folder' : 'Create Folder'}
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

ModalNewDocumentFolder.propTypes = {
  closeModal: PropTypes.func.isRequired,
  titleModal: PropTypes.string.isRequired,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  createLoading: PropTypes.bool,
  updateLoading: PropTypes.bool,
  getDocumentFolder: PropTypes.func,
  createDocumentFolder: PropTypes.func,
  updateDocumentFolder: PropTypes.func,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  officeOptions: PropTypes.array,
  getOfficeRegister: PropTypes.func,
  documentFolder: PropTypes.object
}

const mapPropsToValues = props => ({
  id: props.documentFolder ? props.documentFolder.id : null,
  name: props.documentFolder ? props.documentFolder.name : '',
  officeId: props.documentFolder ? props.documentFolder.officeId : '',
  allOffices: props.documentFolder ? props.documentFolder.allOffices : false,
  accessListingAgentXcllusive: props.documentFolder ? props.documentFolder.accessListingAgentXcllusive : false,
  accessListingAgentCtc: props.documentFolder ? props.documentFolder.accessListingAgentCtc : false,
  accesslevelOfInfo: props.documentFolder ? props.documentFolder.accesslevelOfInfo : false,
  buyerMenu: props.documentFolder ? _.includes(props.documentFolder.roles, 'BUYER_MENU') : false,
  businessMenu: props.documentFolder ? _.includes(props.documentFolder.roles, 'BUSINESS_MENU') : false,
  preSaleMenu: props.documentFolder ? _.includes(props.documentFolder.roles, 'PRESALE_MENU') : false,
  clientManagerMenu: props.documentFolder ? _.includes(props.documentFolder.roles, 'CLIENT_MANAGER_MENU') : false,
  systemSettingsMenu: props.documentFolder ? _.includes(props.documentFolder.roles, 'SYSTEM_SETTINGS_MENU') : false
})

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required.')
    .min(2, 'Name required minimum 2 characters.')
    .max(200, 'Name require max 200 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.documentFolder) {
    props.updateDocumentFolder(values)
  } else {
    props.createDocumentFolder(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.documentFolder.create.isLoading,
  isCreated: state.documentFolder.create.isCreated,
  updateLoading: state.documentFolder.update.isLoading,
  isUpdated: state.documentFolder.update.isUpdated,
  officeOptions: state.officeRegister.get.array
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      getDocumentFolder,
      createDocumentFolder,
      updateDocumentFolder,
      getOfficeRegister
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
  })(ModalNewDocumentFolder)
)
