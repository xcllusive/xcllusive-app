import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import styled from 'styled-components'
import { Form, Label, Icon, Grid, Segment, Dimmer, Loader, Header, Button, Checkbox } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import 'jodit'
import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'

import { TypesModal, openModal } from '../../../redux/ducks/modal'
import numeral from 'numeral'

import {
  getAgreementTemplates,
  getAgreementTemplate,
  updateTemplates,
  clearAgreementTemplates
} from '../../../redux/ducks/agreementTemplates'
import { mapArrayToValuesForDropdownTemplates } from '../../../utils/sharedFunctionArray'
import OptionIntroductionBuyer from '../../../components/content/Agreement/OptionIntroductionBuyer'
// import PropertyOption from '../../../components/content/Agreement/PropertyOption'

const CheckboxFormatted = styled.div`
  padding-right: 1em;
`

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
      ],
      engagementFee: 0
    }
    this.quillRef = null
    this.reactQuillRef = null
    this.editor = null
    this.editorRef = React.createRef()
  }

  componentDidMount () {
    this.props.getAgreementTemplates()
    this.props.clearAgreementTemplates()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (
      nextProps.objectAgreementTemplate &&
      nextProps.objectAgreementTemplate.engagementFee !== prevState.engagementFee
    ) {
      var engagementFee = numeral(nextProps.values.engagementFee).format('$0,0.[99]')
    }
    if (
      nextProps.objectAgreementTemplate &&
      nextProps.objectAgreementTemplate.priceProperty !== prevState.priceProperty
    ) {
      var priceProperty = numeral(nextProps.values.priceProperty).format('$0,0.[99]')
    }
    if (
      nextProps.objectAgreementTemplate &&
      nextProps.objectAgreementTemplate.minimumCommission !== prevState.minimumCommission
    ) {
      var minimumCommission = numeral(nextProps.values.minimumCommission).format('$0,0.[99]')
    }
    return {
      engagementFee: engagementFee || prevState.engagementFee,
      priceProperty: priceProperty || prevState.priceProperty,
      minimumCommission: minimumCommission || prevState.minimumCommission
    }
  }

  _numberFormat = (e, { name, value }) => {
    const myNumeral = numeral(value)
    const numberFormated = myNumeral.format('$0,0.[99]')
    this.props.setFieldValue(name, myNumeral.value())
    this.setState({ [name]: numberFormated })
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

  insertTextQuill = word => {
    // console.log(this.editorRef)
    const test = this.editorRef.editor.selection.current()
    console.log(test)
    this.editorRef.editor.selection.insertHTML(` {{${word}}} `)
    // const test = this.editorRef.current.editor.selection.focusAfter()
    // console.log(test)
    // const range = this.quillRef.selection.savedRange
    // const position = range ? range.index : 0
    // this.editor.insertText(2, ` {{${word}}} `)
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

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleChangeCheckBoxType = (e, { name }) => {
    if (name === 'business') this.props.setFieldValue('type', 0)
    if (name === 'property') this.props.setFieldValue('type', 1)
  }

  _config = () => {}

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
    // if (this.editorRef.editor && this.editorRef.editor.selection) {
    //   this.editorRef.editor.selection.insertAtPoint(10, 5)
    //   // const uba = this.editorRef.editor.selection.current()
    //   // if (uba) {
    //   //   // this.editorRef.editor.selection.focusAfter(uba)
    //   //   console.log(uba)
    //   // }
    // }
    return (
      <Wrapper>
        <Form>
          <Form.Group widths={16}>
            <Form.Field width={6}>
              <Form.Select
                style={{ zIndex: 1000 }}
                label="Templates"
                placeholder="Please select one template bellow..."
                options={mapArrayToValuesForDropdownTemplates(listAgreementTemplates)}
                name="title"
                autoComplete="title"
                value={values.title}
                loading={isLoadingAllTemplate}
                onChange={this._handleSelectChange}
              />
              {errors.title && touched.title && <Label basic color="red" pointing content={errors.title} />}
            </Form.Field>
            <Form.Field style={{ width: '100%', alignSelf: 'flex-end' }}>
              <Button onClick={() => this._openModalNewAgreementTemplate()} color="facebook" floated="right">
                <Icon name="add" />
                New Template
              </Button>
            </Form.Field>
          </Form.Group>
          <Dimmer.Dimmable style={{ zIndex: 999 }} dimmed={!objectAgreementTemplate || isLoadingTemplate}>
            <Dimmer inverted active={!objectAgreementTemplate || isLoadingTemplate}>
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
              <Form.Field style={{ marginLeft: '50px', marginTop: '30px' }}>
                <Checkbox
                  as={CheckboxFormatted}
                  label="Business"
                  name="business"
                  value="type"
                  checked={values.type === 0}
                  onChange={this._handleChangeCheckBoxType}
                  // onChange={async (e, data) => {
                  //   this._handleChangeCheckBoxType(data)
                  // }}
                />
                <Checkbox
                  label="Property"
                  name="property"
                  value="type"
                  checked={values.type === 1}
                  onChange={this._handleChangeCheckBoxType}
                  // onChange={async (e, data) => {
                  //   this._handleChangeCheckBoxType(data)
                  // }}
                />
              </Form.Field>
            </Form.Group>
            {objectAgreementTemplate &&
            objectAgreementTemplate.handlebars &&
            objectAgreementTemplate.handlebars.length > 0 ? (
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h4" content="Contract Fields" />
                      <Fragment>
                        <Segment>
                          <Form.Group widths="equal">
                            <Form.Input
                              label="Engagement Fee $"
                              name="engagementFee"
                              autoComplete="engagementFee"
                              value={this.state.engagementFee}
                              onChange={this._numberFormat}
                              onBlur={handleBlur}
                            />
                            {errors.engagementFee && touched.engagementFee && (
                              <Label basic pointing color="red" content={errors.engagementFee} />
                            )}
                            <Form.Input
                              label="Commission %"
                              name="commissionPerc"
                              autoComplete="commissionPerc"
                              value={values.commissionPerc}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.commissionPerc && touched.commissionPerc && (
                              <Label basic pointing color="red" content={errors.commissionPerc} />
                            )}
                            <Form.Input
                              label="Minimum Commission $"
                              name="minimumCommission"
                              autoComplete="minimumCommission"
                              value={this.state.minimumCommission}
                              onChange={this._numberFormat}
                              onBlur={handleBlur}
                            />
                            {errors.minimumCommission && touched.minimumCommission && (
                              <Label basic pointing color="red" content={errors.minimumCommission} />
                            )}
                          </Form.Group>
                        </Segment>
                      </Fragment>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Header as="h4" content="Option For Principal Introduction Of Buyer" />
                    </Grid.Column>
                    <Grid.Column width={2} floated="right">
                      <Header as="h4" floated="right">
                        <Form.Checkbox
                          label="N/A"
                          name="optionIntroductionBuyer"
                          onChange={this._handleChangeCheckBox}
                          checked={values.optionIntroductionBuyer}
                        />
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{ paddingTop: '0px' }}>
                    <Grid.Column>
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
                    <Grid.Column width={5}>
                      <Header as="h4" content="Property Option" />
                    </Grid.Column>
                    <Grid.Column width={2} floated="right">
                      <Header as="h4" floated="right">
                        <Form.Checkbox
                          label="N/A"
                          name="propertyOptions"
                          onChange={this._handleChangeCheckBox}
                          checked={values.propertyOptions}
                        />
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{ paddingTop: '0px' }}>
                    <Grid.Column>
                      {/* <PropertyOption
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      /> */}
                      <Segment>
                        <Form.Group widths="equal">
                          <Form.Input
                            label="Commission %"
                            name="commissionProperty"
                            autoComplete="commission"
                            value={values.commissionProperty}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={values.propertyOptions}
                          />
                          {errors.commissionProperty && touched.commissionProperty && (
                            <Label basic pointing color="red" content={errors.commissionProperty} />
                          )}
                          <Form.Input
                            label="Price $"
                            name="priceProperty"
                            autoComplete="priceProperty"
                            value={this.state.priceProperty}
                            onChange={this._numberFormat}
                            onBlur={handleBlur}
                            disabled={values.propertyOptions}
                          />
                          {errors.priceProperty && touched.priceProperty && (
                            <Label basic pointing color="red" content={errors.priceProperty} />
                          )}
                        </Form.Group>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ) : null}
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
                <h4>Header</h4>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column floated="left" width={16} style={{ paddingLeft: '0px', paddingRight: 0 }}>
                  <Form.Field>
                    <JoditEditor value={values.header} config={this._config} onChange={this._handleChangeHeader} />
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
                      <Label horizontal key={key} onClick={() => this.insertTextQuill(item)}>
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
                <Grid.Column floated="left" width={16} style={{ paddingLeft: '0px', paddingRight: 0 }}>
                  <Form.Field>
                    <JoditEditor
                      // ref={el => {
                      //   this.reactQuillRef = el
                      // }}
                      ref={el => {
                        this.editorRef = el
                      }}
                      value={values.body}
                      config={this._config}
                      onChange={this._handleChangeBody}
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
                <Grid.Column floated="left" width={16} style={{ paddingLeft: '0px', paddingRight: 0 }}>
                  <Form.Field>
                    <JoditEditor value={values.footer} config={this._config} onChange={this._handleChangeFooter} />
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
                      disabled={isSubmitting || !isValid || !values.header || !values.body || !values.footer}
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

const mapPropsToValues = props => ({
  state: props.objectAgreementTemplate ? props.objectAgreementTemplate.state : '',
  header:
    props.objectAgreementTemplate && props.objectAgreementTemplate.header !== null
      ? props.objectAgreementTemplate.header
      : '',
  body:
    props.objectAgreementTemplate && props.objectAgreementTemplate.body !== null
      ? props.objectAgreementTemplate.body
      : '',
  footer:
    props.objectAgreementTemplate && props.objectAgreementTemplate.footer !== null
      ? props.objectAgreementTemplate.footer
      : '',
  id: props.objectAgreementTemplate ? props.objectAgreementTemplate.id : '',
  engagementFee: props.objectAgreementTemplate ? props.objectAgreementTemplate.engagementFee : 0,
  commissionPerc:
    props.objectAgreementTemplate && props.objectAgreementTemplate.commissionPerc !== null
      ? props.objectAgreementTemplate.commissionPerc
      : 0,
  commissionDiscount: props.objectAgreementTemplate ? props.objectAgreementTemplate.commissionDiscount : 0,
  introductionParties: props.objectAgreementTemplate ? props.objectAgreementTemplate.introductionParties : '',
  commissionProperty: props.objectAgreementTemplate ? props.objectAgreementTemplate.commissionProperty : 0,
  priceProperty: props.objectAgreementTemplate ? props.objectAgreementTemplate.priceProperty : 0,
  propertyOptions: props.objectAgreementTemplate ? props.objectAgreementTemplate.propertyOptions : false,
  optionIntroductionBuyer: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.optionIntroductionBuyer
    : false,
  minimumCommission: props.objectAgreementTemplate ? props.objectAgreementTemplate.minimumCommission : 0,
  type: props.objectAgreementTemplate ? props.objectAgreementTemplate.type : 0
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
  })(AgreementTemplates)
)
