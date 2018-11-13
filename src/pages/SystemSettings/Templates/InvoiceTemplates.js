import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Icon, Grid, Dimmer, Loader, Header, Button } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { TypesModal, openModal } from '../../../redux/ducks/modal'

import {
  getInvoiceTemplates,
  getInvoiceTemplate,
  updateTemplates,
  clearInvoiceTemplates
} from '../../../redux/ducks/invoiceTemplates'
import { mapArrayToValuesForDropdownTemplates } from '../../../utils/sharedFunctionArray'

class InvoiceTemplates extends Component {
  constructor (props) {
    super(props)
    this.state = {
      state: [
        { key: '1', text: 'ACT', value: 'ACT' },
        { key: '2', text: 'NT', value: 'NT' },
        { key: '3', text: 'NSW', value: 'NSW' },
        { key: '4', text: 'QLD', value: 'QLD' },
        { key: '5', text: 'SA', value: 'SA' },
        { key: '6', text: 'TAS', value: 'TAS' },
        { key: '7', text: 'VIC', value: 'VIC' },
        { key: '8', text: 'WA', value: 'WA' }
      ],
      text: '',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean']
        ]
      },
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image'
      ]
    }
    this.quillRef = null
    this.reactQuillRef = null
  }

  componentDidMount () {
    this.props.getInvoiceTemplates()
    this.props.clearInvoiceTemplates()
    this._attachQuillRefs()
  }

  componentDidUpdate () {
    this._attachQuillRefs()
  }

  _handleChangeOfficeDetails = value => {
    this.props.setFieldValue('officeDetails', value)
  }

  _handleChangeDescription = value => {
    this.props.setFieldValue('description', value)
  }

  _handleChangeBankDetails = value => {
    this.props.setFieldValue('bankDetails', value)
  }

  _handleSelectChange = (e, { value }) => {
    this.props.getInvoiceTemplate(value)
  }

  _handleSelectChangeState = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (!this.reactQuillRef || typeof this.reactQuillRef.getEditor !== 'function') {
      return false
    }
    // Skip if Quill reference is defined:
    if (this.quillRef !== null) return false

    const quillRef = this.reactQuillRef.getEditor()
    if (quillRef !== null) this.quillRef = quillRef
  }

  insertTextQuill = word => {
    const range = this.quillRef.selection.savedRange
    const position = range ? range.index : 0
    this.quillRef.insertText(position, ` {{${word}}} `)
  }

  _openModalNewInvoiceTemplate = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_INVOICE_TEMPLATE, {
      options: {
        title: 'Create New Invoice Template'
      },
      onCreated: isCreated => {
        if (isCreated) this.props.getInvoiceTemplates()
      }
    })
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const {
      values,
      touched,
      errors,
      listInvoiceTemplates,
      objectInvoiceTemplate,
      isLoadingUpdate,
      isLoadingAllTemplate,
      isSubmitting,
      handleSubmit,
      isValid,
      isLoadingTemplate,
      handleChange,
      handleBlur
    } = this.props
    const { state } = this.state
    return (
      <Wrapper>
        <Form>
          <Form.Group widths={16}>
            <Form.Field width={6}>
              <Form.Select
                style={{ zIndex: 1000 }}
                label="Templates"
                placeholder="Please select one template bellow..."
                options={mapArrayToValuesForDropdownTemplates(listInvoiceTemplates)}
                name="title"
                autoComplete="title"
                value={values.title}
                loading={isLoadingAllTemplate}
                onChange={this._handleSelectChange}
              />
              {errors.title && touched.title && <Label basic color="red" pointing content={errors.title} />}
            </Form.Field>
            <Form.Field style={{ width: '100%', alignSelf: 'flex-end' }}>
              <Button onClick={() => this._openModalNewInvoiceTemplate()} color="facebook" floated="right">
                <Icon name="add" />
                New Template
              </Button>
            </Form.Field>
          </Form.Group>
          <Dimmer.Dimmable style={{ zIndex: 999 }} dimmed={!objectInvoiceTemplate || isLoadingTemplate}>
            <Dimmer inverted active={!objectInvoiceTemplate || isLoadingTemplate}>
              {isLoadingTemplate ? <Loader inverted /> : <Header as="h2">Please, select one template!</Header>}
            </Dimmer>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  label="State"
                  name="state"
                  options={state}
                  autoComplete="state"
                  value={values.state}
                  onChange={this._handleSelectChangeState}
                />
                {errors.state && touched.state && <Label basic color="red" pointing content={errors.state} />}
              </Form.Field>
            </Form.Group>
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
                <h4 style={{ fontSize: '.92857143em' }}>Office Details</h4>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column floated="left" width={16} style={{ paddingLeft: '0px', paddingRight: 0 }}>
                  <Form.Field>
                    <ReactQuill
                      value={values.officeDetails}
                      onChange={this._handleChangeOfficeDetails}
                      style={{ height: '25vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded="horizontally">
              <Grid.Row columns={1}>
                <Grid.Column
                  floated="left"
                  width={16}
                  style={{ paddingTop: '25px', paddingLeft: '0px', paddingRight: 0, paddingBottom: '0px' }}
                >
                  <Form.Field>
                    <Form.Input
                      label="From Office Description"
                      name="fromOfficeDescription"
                      autoComplete="fromOfficeDescription"
                      value={values.fromOfficeDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.fromOfficeDescription && touched.fromOfficeDescription && (
                      <Label basic pointing color="red" content={errors.fromOfficeDescription} />
                    )}
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded="horizontally">
              <Grid.Row
                style={{
                  paddingBottom: 0,
                  paddingLeft: '0px'
                }}
              >
                <h4 style={{ fontSize: '.92857143em' }}>Description</h4>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column floated="left" width={16} style={{ paddingLeft: '0px', paddingRight: 0 }}>
                  <Form.Field>
                    <ReactQuill
                      value={values.description}
                      onChange={this._handleChangeDescription}
                      style={{ height: '10vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column
                  style={{
                    paddingLeft: '0px',
                    paddingRight: 0,
                    marginTop: '30px'
                  }}
                >
                  <Form.TextArea
                    label="Payment Terms"
                    name="paymentTerms"
                    autoComplete="paymentTerms"
                    value={values.paymentTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row
                style={{
                  paddingBottom: 0,
                  paddingLeft: '0px'
                }}
              >
                <h4 style={{ fontSize: '.92857143em' }}>Bank Details</h4>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column floated="left" width={16} style={{ paddingLeft: '0px', paddingRight: 0 }}>
                  <Form.Field>
                    <ReactQuill
                      value={values.bankDetails}
                      onChange={this._handleChangeBankDetails}
                      style={{ height: '10vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ marginTop: '50px' }}>
                {objectInvoiceTemplate ? (
                  <Form.Field width={16} style={{ alignSelf: 'flex-end' }}>
                    <Form.Button
                      floated="right"
                      type="submit"
                      color="red"
                      disabled={isSubmitting || !isValid}
                      loading={isLoadingUpdate}
                      onClick={handleSubmit}
                    >
                      <Icon name="save" />
                      Save
                    </Form.Button>
                  </Form.Field>
                ) : null}
              </Grid.Row>
            </Grid>
          </Dimmer.Dimmable>
        </Form>
      </Wrapper>
    )
  }
}

InvoiceTemplates.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  getInvoiceTemplates: PropTypes.func,
  listInvoiceTemplates: PropTypes.array,
  getInvoiceTemplate: PropTypes.func,
  objectInvoiceTemplate: PropTypes.object,
  setFieldValue: PropTypes.func,
  isLoadingUpdate: PropTypes.bool,
  clearInvoiceTemplates: PropTypes.func,
  isLoadingTemplate: PropTypes.bool,
  openModal: PropTypes.func,
  isLoadingAllTemplate: PropTypes.bool
}

const mapPropsToValues = props => ({
  state: props.objectInvoiceTemplate ? props.objectInvoiceTemplate.state : '',
  officeDetails: props.objectInvoiceTemplate ? props.objectInvoiceTemplate.officeDetails : '',
  fromOfficeDescription: props.objectInvoiceTemplate ? props.objectInvoiceTemplate.fromOfficeDescription : '',
  description: props.objectInvoiceTemplate ? props.objectInvoiceTemplate.description : '',
  paymentTerms: props.objectInvoiceTemplate ? props.objectInvoiceTemplate.paymentTerms : '',
  bankDetails: props.objectInvoiceTemplate ? props.objectInvoiceTemplate.bankDetails : '',
  id: props.objectInvoiceTemplate ? props.objectInvoiceTemplate.id : ''
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateTemplates(values).then(setSubmitting(false))
}

const mapStateToProps = state => ({
  listInvoiceTemplates: state.invoiceTemplates.getAll.array,
  objectInvoiceTemplate: state.invoiceTemplates.get.object,
  isLoadingTemplate: state.invoiceTemplates.get.isLoading,
  isLoadingUpdate: state.invoiceTemplates.update.isLoading,
  isLoadingAllTemplate: state.invoiceTemplates.getAll.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInvoiceTemplates,
      getInvoiceTemplate,
      updateTemplates,
      clearInvoiceTemplates,
      openModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })(InvoiceTemplates)
)
