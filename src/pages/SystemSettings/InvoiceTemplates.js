import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import {
  Form,
  Label,
  Icon,
  Grid,
  Dimmer,
  Loader,
  Header,
  Button
} from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import numeral from 'numeral'

import {
  getAgreementTemplates,
  getAgreementTemplate,
  updateTemplates,
  clearAgreementTemplates
} from '../../redux/ducks/agreementTemplates'
import { mapArrayToValuesForDropdownTemplates } from '../../utils/sharedFunctionArray'

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
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
          ],
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
    this.props.getAgreementTemplates()
    this.props.clearAgreementTemplates()
    this._attachQuillRefs()
  }

  componentDidUpdate () {
    this._attachQuillRefs()
  }

  _handleChangeHeader = value => {
    this.props.setFieldValue('header', value)
  }

  _handleChangeBody = value => {
    this.props.setFieldValue('body', value)
  }

  _handleChangeFooter = value => {
    this.props.setFieldValue('footer', value)
  }

  _handleSelectChange = (e, { value }) => {
    this.props.getAgreementTemplate(value)
  }

  _handleSelectChangeState = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (
      !this.reactQuillRef ||
      typeof this.reactQuillRef.getEditor !== 'function'
    ) {
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

  _openModalNewAgreementTemplate = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_INVOICE_TEMPLATE, {
      options: {
        title: 'Create New Invoice Template'
      },
      onCreated: isCreated => {
        if (isCreated) this.props.getAgreementTemplates()
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
      listAgreementTemplates,
      objectAgreementTemplate,
      isLoadingUpdate,
      isLoadingAllTemplate,
      isSubmitting,
      handleSubmit,
      isValid,
      isLoadingTemplate
      // handleChange,
      // handleBlur
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
                options={mapArrayToValuesForDropdownTemplates(
                  listAgreementTemplates
                )}
                name="title"
                autoComplete="title"
                value={values.title}
                loading={isLoadingAllTemplate}
                onChange={this._handleSelectChange}
              />
              {errors.title &&
                touched.title && (
                <Label basic color="red" pointing content={errors.title} />
              )}
            </Form.Field>
            <Form.Field style={{ width: '100%', alignSelf: 'flex-end' }}>
              <Button
                onClick={() => this._openModalNewAgreementTemplate()}
                color="facebook"
                floated="right"
              >
                <Icon name="add" />
                New Template
              </Button>
            </Form.Field>
          </Form.Group>
          <Dimmer.Dimmable
            style={{ zIndex: 999 }}
            dimmed={!objectAgreementTemplate || isLoadingTemplate}
          >
            <Dimmer
              inverted
              active={!objectAgreementTemplate || isLoadingTemplate}
            >
              {isLoadingTemplate ? (
                <Loader inverted />
              ) : (
                <Header as="h2">Please, select one template!</Header>
              )}
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
                {errors.state &&
                  touched.state && (
                  <Label basic color="red" pointing content={errors.state} />
                )}
              </Form.Field>
            </Form.Group>
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
                <h4>Office Details</h4>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column
                  floated="left"
                  width={16}
                  style={{ paddingLeft: '0px', paddingRight: 0 }}
                >
                  <Form.Field>
                    <ReactQuill
                      value={values.header}
                      onChange={this._handleChangeHeader}
                      style={{ height: '25vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded="horizontally">
              <Grid.Row
                style={{
                  marginTop: '30px',
                  paddingBottom: 0,
                  paddingLeft: '0px'
                }}
              >
                <h4>Description</h4>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column
                  floated="left"
                  width={16}
                  style={{ paddingLeft: '0px', paddingRight: 0 }}
                >
                  <Form.Field>
                    <ReactQuill
                      value={values.footer}
                      onChange={this._handleChangeFooter}
                      style={{ height: '10vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row
                style={{
                  marginTop: '30px',
                  paddingBottom: 0,
                  paddingLeft: '0px'
                }}
              >
                <h4>Bank Details</h4>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column
                  floated="left"
                  width={16}
                  style={{ paddingLeft: '0px', paddingRight: 0 }}
                >
                  <Form.Field>
                    <ReactQuill
                      value={values.footer}
                      onChange={this._handleChangeFooter}
                      style={{ height: '10vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ marginTop: '50px' }}>
                {objectAgreementTemplate ? (
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
  getAgreementTemplates: PropTypes.func,
  listAgreementTemplates: PropTypes.array,
  getAgreementTemplate: PropTypes.func,
  objectAgreementTemplate: PropTypes.object,
  setFieldValue: PropTypes.func,
  isLoadingUpdate: PropTypes.bool,
  clearAgreementTemplates: PropTypes.func,
  isLoadingTemplate: PropTypes.bool,
  openModal: PropTypes.func,
  isLoadingAllTemplate: PropTypes.bool
}

const mapPropsToValues = props => ({
  state: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.state
    : '',
  header: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.header
    : '',
  body: props.objectAgreementTemplate ? props.objectAgreementTemplate.body : '',
  footer: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.footer
    : '',
  id: props.objectAgreementTemplate ? props.objectAgreementTemplate.id : '',
  engagementFee: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.engagementFee).format('0,0.00')
    : 0,
  commissionPerc: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.commissionPerc).format('0,0.00')
    : 0,
  commissionDiscount: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.commissionDiscount).format('0,0.00')
    : 0,
  introductionParties: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.introductionParties
    : '',
  commissionProperty: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.commissionProperty).format('0,0.00')
    : 0,
  addressProperty: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.addressProperty
    : '',
  priceProperty: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.priceProperty).format('0,0.00')
    : 0,
  propertyOptions: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.propertyOptions
    : false,
  optionIntroductionBuyer: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.optionIntroductionBuyer
    : false
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateTemplates(values).then(setSubmitting(false))
}

const mapStateToProps = state => ({
  listAgreementTemplates: state.agreementTemplates.getAll.array,
  objectAgreementTemplate: state.agreementTemplates.get.object,
  isLoadingTemplate: state.agreementTemplates.get.isLoading,
  isLoadingUpdate: state.agreementTemplates.update.isLoading,
  isLoadingAllTemplate: state.agreementTemplates.getAll.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAgreementTemplates,
      getAgreementTemplate,
      updateTemplates,
      clearAgreementTemplates,
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
