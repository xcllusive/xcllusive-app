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
  Segment,
  Dimmer,
  Loader,
  Header,
  Button
} from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { TypesModal, openModal } from '../../redux/ducks/modal'

import {
  getAgreementTemplates,
  getAgreementTemplate,
  updateTemplates,
  clearAgreementTemplates
} from '../../redux/ducks/agreementTemplates'
import { mapArrayToValuesForDropdownTemplates } from '../../utils/sharedFunctionArray'
import ContractFields from '../../components/content/Agreement/ContractFields'
import OptionIntroductionBuyer from '../../components/content/Agreement/OptionIntroductionBuyer'
import PropertyOption from '../../components/content/Agreement/PropertyOption'

class AgreementTemplates extends Component {
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
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_AGREEMENT_TEMPLATE, {
      options: {
        title: 'Create New Agreement Template'
      },
      onCreated: isCreated => {
        if (isCreated) this.props.getAgreementTemplates()
      }
    })
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
            {objectAgreementTemplate &&
            objectAgreementTemplate.handlebars &&
            objectAgreementTemplate.handlebars.length > 0 ? (
                <Grid celled="internally" divided>
                  <Grid.Row>
                    <Grid.Column style={{ paddingLeft: '0px' }}>
                      <Header as="h4" content="Contract Fields" />
                      <ContractFields
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column style={{ paddingLeft: '0px' }}>
                      <Header
                        as="h4"
                        content="Option For Principal Introduction Of Buyer"
                      />
                      <OptionIntroductionBuyer
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column style={{ paddingLeft: '0px' }}>
                      <Header as="h4" content="Property Option" />
                      <PropertyOption
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ) : null}
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
                <h4>Header</h4>
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
                      style={{ height: '10vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid.Row
              style={{
                marginTop: '55px',
                paddingBottom: 0,
                paddingLeft: '0px'
              }}
            >
              <h4>Data Base Fields</h4>
            </Grid.Row>
            <Segment>
              <Label.Group color="teal">
                {objectAgreementTemplate &&
                  objectAgreementTemplate.handlebars.map((item, key) => {
                    return (
                      <Label
                        horizontal
                        key={key}
                        onClick={() => this.insertTextQuill(item)}
                      >
                        {'{{'}
                        {item}
                        {'}}'}
                      </Label>
                    )
                  })}
              </Label.Group>
            </Segment>
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
                <h4>Body</h4>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column
                  floated="left"
                  width={16}
                  style={{ paddingLeft: '0px', paddingRight: 0 }}
                >
                  <Form.Field>
                    <ReactQuill
                      ref={el => {
                        this.reactQuillRef = el
                      }}
                      value={values.body}
                      onChange={this._handleChangeBody}
                      style={{ height: '50vh' }}
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
                <h4>Footer</h4>
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

AgreementTemplates.propTypes = {
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

const mapPropsToValues = props => {
  if (props && props.objectAgreementTemplate) {
    return {
      state: props.objectAgreementTemplate.state,
      header: props.objectAgreementTemplate.header,
      body: props.objectAgreementTemplate.body,
      footer: props.objectAgreementTemplate.footer,
      id: props.objectAgreementTemplate.id,
      listedPrice: props.objectAgreementTemplate.listedPrice.toLocaleString(),
      appraisalHigh: props.objectAgreementTemplate.appraisalHigh.toLocaleString(),
      appraisalLow: props.objectAgreementTemplate.appraisalLow.toLocaleString(),
      engagementFee: props.objectAgreementTemplate.engagementFee.toLocaleString(),
      commissionPerc: props.objectAgreementTemplate.commissionPerc.toLocaleString(),
      commissionDiscount: props.objectAgreementTemplate.commissionDiscount,
      introductionParties: props.objectAgreementTemplate.introductionParties,
      commissionProperty: props.objectAgreementTemplate.commissionProperty,
      addressProperty: props.objectAgreementTemplate.addressProperty,
      priceProperty: props.objectAgreementTemplate.priceProperty
    }
  }
  return {
    state: '',
    header: '',
    body: '',
    footer: '',
    id: '',
    listedPrice: 0,
    appraisalHigh: 0,
    appraisalLow: 0,
    engagementFee: 0,
    commissionPerc: 0,
    commissionDiscount: 0,
    introductionParties: '',
    commissionProperty: 0,
    addressProperty: '',
    priceProperty: 0
  }
}

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
  })(AgreementTemplates)
)
