import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { withFormik } from 'formik'
import { Form, Icon, Grid, Radio, Label, Dimmer, Loader, Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import Wrapper from '../../components/content/Wrapper'
import { updateBusiness, getBusiness, uploadIM } from '../../redux/ducks/business'
import { getLogFromBusiness } from '../../redux/ducks/businessLog'

import { theme } from '../../styles'

class EditBusinessDetailForm extends Component {
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
      modalOpenReassignBusiness: false,
      updateStageSalesMemo: false,
      updateStageLost: false,
      stage: 0,
      testAgreement: true,
      editAgreement: true
    }
  }

  // componentWillUnmount () {
  //   this.props.updateBusiness(this.props.values)
  // }

  componentDidUpdate (nextProps) {
    if (this.props.reassignedBusiness && nextProps.reassignedBusiness !== this.props.reassignedBusiness) {
      this.props.getBusiness(this.props.business.id)
    }
    if (this.props.isUploadedIM && nextProps.isUploadedIM !== this.props.isUploadedIM) {
      this.props.getBusiness(this.props.business.id)
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    // if (nextProps.updateStageSalesMemo && prevState.updateStageSalesMemo !== nextProps.updateStageSalesMemo) {
    //   nextProps.getBusiness(nextProps.business.id)
    // }
    // if (nextProps.updateStageLost && prevState.updateStageLost !== nextProps.updateStageLost) {
    //   nextProps.getBusiness(nextProps.business.id)
    //   nextProps.getLogFromBusiness(nextProps.business.id)
    // }
    // if (nextProps.values.stage === 8 && prevState.stage !== nextProps.values.stage) {
    //   this._openModalStageLost()
    // }
    // if (nextProps.values.stage === 3 && prevState.stage !== nextProps.values.stage) {
    //   this._openModalStageSalesMemo()
    // }

    return {
      updateStageSalesMemo: nextProps.updateStageSalesMemo,
      updateStageLost: nextProps.updateStageLost,
      stage: nextProps.values.stage
    }
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    if (name === 'stage' && value === 8) this._openModalStageLost()
    if (name === 'stage' && value === 3) this._openModalStageSalesMemo()
    if (name === 'stage' && value === 6) this._openModalStageSold()
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _toggleModal = modal => {
    this.setState(prevState => ({
      [modal]: !prevState[modal]
    }))
  }

  _openModalStageSalesMemo = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_STAGE_SALES_MEMO, {
      options: {
        title: 'What to enter for `Sales Memorandum` Stage'
      },
      callBack: isConfirmed => {
        if (!isConfirmed) {
          this.props.setFieldValue('stage', this.props.business.stageId)
        }
      },
      business: this.props.business
    })
  }

  _openModalStageSold = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_STAGE_SOLD, {
      options: {
        title: 'Change the business stage to `Sold`'
      },
      callBack: isConfirmed => {
        if (!isConfirmed) {
          this.props.setFieldValue('stage', this.props.business.stageId)
        }
      },
      business: this.props.business
    })
  }

  _openModalStageLost = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_STAGE_LOST, {
      options: {
        title: 'Change the business stage to `Lost`'
      },
      callBack: isConfirmed => {
        if (!isConfirmed) {
          this.props.setFieldValue('stage', this.props.business.stageId)
        }
      },
      business: this.props.business
    })
  }

  _openModalReassignBusiness = (id, listingAgent) => {
    this.props.openModal(TypesModal.MODAL_TYPE_STAGE_REASSIGN_BUSINESS, {
      options: {
        title: 'Reassign Business to New Listing Agent'
      },
      businessId: id,
      listingAgent: listingAgent.id
    })
  }

  _isUserPreSale = () => {
    return _.includes(this.props.userRoles, 'PRESALE_MENU')
  }

  _isUserClientManager = () => {
    return _.includes(this.props.userRoles, 'CLIENT_MANAGER_MENU')
  }

  _openModalListAgreement = state => {
    this.props.openModal(TypesModal.MODAL_TYPE_LIST_AGREEMENTS, {
      options: {
        title: 'List of Agreements'
      },
      callBack: (isConfirmed, idAgreement) => {
        if (isConfirmed) {
          this.props.history.push(`${this.props.business.id}/agreement/${idAgreement}`)
        }
      },
      state: state
    })
  }

  _urlReplace (businessURL) {
    const replacedURL = businessURL.replace('www.', 'http://')
    window.open(`${replacedURL}`, '_blank')
  }

  _uploadIM () {
    if (this.props.business.imUploaded) {
      this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
        options: {
          title: 'IM Uploaded',
          text: 'IM already uploaded. Do you want to upload again?'
        },
        onConfirm: isConfirmed => {
          if (isConfirmed) {
            this.props.openModal(TypesModal.MODAL_TYPE_UPLOAD_FILE, {
              options: {
                title: 'Upload IM'
              },
              onConfirm: isConfirmed => {
                if (isConfirmed) {
                  this.props.uploadIM(this.state.file, this.props.business.id)
                }
              },
              handleFileUpload: e => {
                const file = e.target.files[0]
                this.setState({ file })
              }
            })
          }
        }
      })
    } else {
      this.props.openModal(TypesModal.MODAL_TYPE_UPLOAD_FILE, {
        options: {
          title: 'Upload IM'
        },
        onConfirm: isConfirmed => {
          if (isConfirmed) {
            this.props.uploadIM(this.state.file, this.props.business.id)
          }
        },
        handleFileUpload: e => {
          const file = e.target.files[0]
          this.setState({ file })
        }
      })
    }
  }

  _downloadIM () {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Download IM',
        text: 'Are you sure you want to download the IM?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          // this.props.downloadIM(this.props.business.id)
          window.open(`${this.props.business.imUrl}`, '_blank')
        }
      }
    })
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      errors,
      touched,
      isLoadingGet,
      isLoadingUpdate,
      isValid,
      isSubmitting,
      sourceOptions,
      ratingOptions,
      productOptions,
      industryOptions,
      typeOptions,
      stageOptions,
      usersBroker,
      isLoadingIM
    } = this.props
    const { state } = this.state
    return (
      <Wrapper>
        <Dimmer inverted active={isLoadingGet}>
          <Loader inverted />
        </Dimmer>
        <Grid celled="internally" divided>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form noValidate size="tiny">
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.Input
                      required
                      label="Business name"
                      name="businessName"
                      autoComplete="businessName"
                      value={values.businessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessName && touched.businessName && (
                      <Label basic color="red" pointing content={errors.businessName} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      required
                      label="First name"
                      name="firstNameV"
                      autoComplete="firstNameV"
                      value={values.firstNameV}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstNameV && touched.firstNameV && (
                      <Label basic color="red" pointing content={errors.firstNameV} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      required
                      label="Last name"
                      name="lastNameV"
                      autoComplete="lastNameV"
                      value={values.lastNameV}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastNameV && touched.lastNameV && (
                      <Label basic color="red" pointing content={errors.lastNameV} />
                    )}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.Input
                      label="Telephone 1"
                      name="vendorPhone1"
                      autoComplete="vendorPhone1"
                      value={values.vendorPhone1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorPhone1 && touched.vendorPhone1 && (
                      <Label basic color="red" pointing content={errors.vendorPhone1} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="Telephone 2"
                      name="vendorPhone2"
                      autoComplete="vendorPhone2"
                      value={values.vendorPhone2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorPhone2 && touched.vendorPhone2 && (
                      <Label basic color="red" pointing content={errors.vendorPhone2} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="Telephone 3"
                      name="vendorPhone3"
                      autoComplete="vendorPhone3"
                      value={values.vendorPhone3}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorPhone3 && touched.vendorPhone3 && (
                      <Label basic color="red" pointing content={errors.vendorPhone3} />
                    )}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.Input
                      required
                      label="Email"
                      icon={
                        <Icon
                          name="mail"
                          inverted
                          circular
                          link
                          onClick={() => (window.location.href = `mailto:${values.vendorEmail}`)}
                        />
                      }
                      name="vendorEmail"
                      autoComplete="vendorEmail"
                      value={values.vendorEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorEmail && touched.vendorEmail && (
                      <Label basic color="red" pointing content={errors.vendorEmail} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      required
                      label="Source"
                      options={sourceOptions}
                      name="businessSource"
                      autoComplete="businessSource"
                      value={values.businessSource}
                      onChange={this._handleSelectChange}
                    />
                    {errors.businessSource && touched.businessSource && (
                      <Label basic color="red" pointing content={errors.businessSource} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="Source Notes"
                      name="sourceNotes"
                      autoComplete="sourceNotes"
                      value={values.sourceNotes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.sourceNotes && touched.sourceNotes && (
                      <Label basic color="red" pointing content={errors.sourceNotes} />
                    )}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.TextArea
                      label="Description"
                      name="description"
                      autoComplete="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.description && touched.description && (
                      <Label basic color="red" pointing content={errors.description} />
                    )}
                  </Form.Field>
                </Form.Group>
                <Form.Group inline>
                  <Form.Input
                    label="Listing Agent"
                    placeholder={`${values.listingAgent.firstName} ${values.listingAgent.lastName}`}
                    readOnly
                  />
                  <Button
                    primary
                    size="small"
                    onClick={() => this._openModalReassignBusiness(values.id, values.listingAgent)}
                  >
                    <Icon name="edit" />
                    Reassign Business
                  </Button>
                  <Button
                    color={'yellow'}
                    size="small"
                    onClick={() =>
                      this.props.history.push({
                        pathname: `${this.props.business.id}/appraisalList`,
                        state: {
                          business: this.props.business
                        }
                      })
                    }
                  >
                    <Icon name="edit" />
                    Appraisal Mgmt
                  </Button>
                </Form.Group>
                <Form.Group>
                  {!this.props.business.agreement_id ? (
                    <Form.Button size="small" color="brown" onClick={() => this._openModalListAgreement(values.state)}>
                      <Icon name="file" />
                      Agreement
                    </Form.Button>
                  ) : (
                    <Fragment>
                      <Form.Button
                        size="small"
                        color={theme.buttonEdit}
                        onClick={() =>
                          this.props.history.push({
                            pathname: `/business/${this.props.business.id}/agreement/${
                              this.props.business.agreement_id
                            }/preview`,
                            state: {
                              business: this.props.business,
                              editAgreement: this.state.editAgreement
                            }
                          })
                        }
                      >
                        <Icon name="edit" />
                        Edit Agreement
                      </Form.Button>
                      <Form.Button
                        size="small"
                        color={theme.buttonNew}
                        onClick={() => this._openModalListAgreement(values.state)}
                      >
                        <Icon name="file" />
                        New Agreement
                      </Form.Button>
                    </Fragment>
                  )}
                  <Button
                    color="grey"
                    onClick={() =>
                      this.props.history.push({
                        pathname: `/business/${this.props.business.id}/invoice`,
                        state: {
                          business: this.props.business
                        }
                      })
                    }
                    size="small"
                    floated="left"
                  >
                    <Icon name="file" />
                    Invoice
                  </Button>
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.Input
                      label="Business name (Secondary)"
                      name="businessNameSecondary"
                      autoComplete="businessNameSecondary"
                      value={values.businessNameSecondary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessNameSecondary && touched.businessNameSecondary && (
                      <Label basic color="red" pointing content={errors.businessNameSecondary} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="ABN"
                      name="businessABN"
                      autoComplete="businessABN"
                      value={values.businessABN}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessABN && touched.businessABN && (
                      <Label basic color="red" pointing content={errors.businessABN} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="Website"
                      icon={
                        <Icon
                          name="chrome"
                          inverted
                          circular
                          link
                          onClick={() => this._urlReplace(values.businessURL)}
                        />
                      }
                      name="businessURL"
                      autoComplete="businessURL"
                      value={values.businessURL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessURL && touched.businessURL && (
                      <Label basic color="red" pointing content={errors.businessURL} />
                    )}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.Input
                      label="Address"
                      name="address1"
                      autoComplete="address1"
                      value={values.address1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address1 && touched.address1 && (
                      <Label basic color="red" pointing content={errors.address1} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="Suburb"
                      name="suburb"
                      autoComplete="suburb"
                      value={values.suburb}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.suburb && touched.suburb && <Label basic color="red" pointing content={errors.suburb} />}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.Select
                      label="State"
                      name="state"
                      options={state}
                      autoComplete="state"
                      value={values.state}
                      onChange={this._handleSelectChange}
                    />
                    {errors.state && touched.state && <Label basic color="red" pointing content={errors.state} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="Post Code"
                      name="postCode"
                      autoComplete="postCode"
                      value={values.postCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.postCode && touched.postCode && (
                      <Label basic color="red" pointing content={errors.postCode} />
                    )}
                  </Form.Field>
                  <label>Eligible for 120 Day Guarantee? </label>
                  <Form.Field
                    control={Radio}
                    label="Yes"
                    name="data120DayGuarantee"
                    onChange={this._handleChangeCheckBox}
                    checked={values.data120DayGuarantee}
                  />
                  <Form.Field
                    control={Radio}
                    label="No"
                    name="data120DayGuarantee"
                    onChange={this._handleChangeCheckBox}
                    checked={!values.data120DayGuarantee}
                  />
                  <Form.Checkbox
                    label="Notify Owner for IM request"
                    name="notifyOwner"
                    onChange={this._handleChangeCheckBox}
                    checked={values.notifyOwner}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.Select
                      label="Rating"
                      options={ratingOptions}
                      name="businessRating"
                      autoComplete="businessRating"
                      value={values.businessRating}
                      onChange={this._handleSelectChange}
                    />
                    {errors.businessRating && touched.businessRating && (
                      <Label basic color="red" pointing content={errors.businessRating} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      required
                      label="Product"
                      options={productOptions}
                      name="businessProduct"
                      autoComplete="businessProduct"
                      value={values.businessProduct}
                      onChange={this._handleSelectChange}
                    />
                    {errors.businessProduct && touched.businessProduct && (
                      <Label basic color="red" pointing content={errors.businessProduct} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      label="Broker"
                      options={usersBroker}
                      name="brokerAccountName"
                      autoComplete="brokerAccountName"
                      value={values.brokerAccountName}
                      onChange={this._handleSelectChange}
                    />
                    {errors.brokerAccountName && touched.brokerAccountName && (
                      <Label basic color="red" pointing content={errors.brokerAccountName} />
                    )}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.Select
                      label="Industry"
                      options={industryOptions}
                      name="businessIndustry"
                      autoComplete="businessIndustry"
                      value={values.businessIndustry}
                      onChange={this._handleSelectChange}
                    />
                    {errors.businessIndustry && touched.businessIndustry && (
                      <Label basic color="red" pointing content={errors.businessIndustry} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      label="Business Type"
                      options={typeOptions}
                      name="businessType"
                      autoComplete="businessType"
                      value={values.businessType}
                      onChange={this._handleSelectChange}
                    />
                    {errors.businessType && touched.businessType && (
                      <Label basic color="red" pointing content={errors.businessType} />
                    )}
                  </Form.Field>
                </Form.Group>
                <Form.Group inline>
                  <Form.Field>
                    <Form.Select
                      label="Business Stage"
                      options={stageOptions}
                      name="stage"
                      autoComplete="stage"
                      value={values.stage}
                      disabled={
                        !this._isUserPreSale() && (values.stage === 3 || values.stage === 8)
                      } /* Sales Memo and Lost */
                      onChange={this._handleSelectChange}
                    />
                    {errors.stage && touched.stage && <Label basic color="red" pointing content={errors.stage} />}
                  </Form.Field>
                  <Form.Button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    loading={isLoadingUpdate}
                    color={theme.buttonSave}
                    onClick={handleSubmit}
                  >
                    <Icon name="save" />
                    Save
                  </Form.Button>
                </Form.Group>
                <Form.Group>
                  {this._isUserClientManager() ? (
                    <Form.Button
                      // disabled={isSubmitting || !isValid}
                      loading={isLoadingIM}
                      color="yellow"
                      size="small"
                      onClick={() => this._uploadIM()}
                    >
                      <Icon name="upload" />
                      Upload IM
                    </Form.Button>
                  ) : null}
                  <Form.Button
                    disabled={!this.props.business.imUrl}
                    color="grey"
                    size="small"
                    onClick={() => this._downloadIM()}
                  >
                    <Icon name="download" />
                    Download IM
                  </Form.Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

EditBusinessDetailForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isLoadingGet: PropTypes.bool,
  isLoadingUpdate: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  sourceOptions: PropTypes.array,
  productOptions: PropTypes.array,
  ratingOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  typeOptions: PropTypes.array,
  stageOptions: PropTypes.array,
  reassignedBusiness: PropTypes.bool,
  getBusiness: PropTypes.func,
  business: PropTypes.object,
  usersBroker: PropTypes.array,
  updateStageSalesMemo: PropTypes.bool,
  updateStageLost: PropTypes.bool,
  getLogFromBusiness: PropTypes.func,
  openModal: PropTypes.func,
  userRoles: PropTypes.array,
  history: PropTypes.object,
  updateBusiness: PropTypes.func,
  uploadIM: PropTypes.func,
  isUploadedIM: PropTypes.bool,
  isLoadingIM: PropTypes.bool
}

const mapPropsToValues = props => {
  if (props.business) {
    const {
      id,
      businessName,
      firstNameV,
      lastNameV,
      vendorPhone1,
      vendorPhone2,
      vendorPhone3,
      vendorEmail,
      sourceNotes,
      description,
      businessNameSecondary,
      businessABN,
      businessURL,
      address1,
      suburb,
      state,
      postCode,
      data120DayGuarantee,
      notifyOwner,
      listingAgent,
      sourceId,
      ratingId,
      productId,
      industryId,
      typeId,
      brokerAccountName,
      stageId
    } = props.business

    const business = {
      id,
      businessName,
      firstNameV,
      lastNameV,
      vendorPhone1,
      vendorPhone2,
      vendorPhone3,
      vendorEmail,
      sourceNotes,
      description,
      businessNameSecondary,
      businessABN,
      businessURL,
      address1,
      suburb,
      state,
      postCode: postCode && postCode.toString().length > 3 ? postCode : '0000',
      data120DayGuarantee,
      notifyOwner,
      listingAgent,
      businessSource: sourceId,
      businessRating: ratingId,
      businessProduct: productId,
      businessIndustry: industryId,
      businessType: typeId,
      brokerAccountName,
      stage: stageId
    }
    business.data120DayGuarantee = business.data120DayGuarantee === '1'
    business.notifyOwner = business.notifyOwner === true
    return _.mapValues(business, value => (value == null ? '' : value))
  }
  return {
    businessName: '',
    firstNameV: '',
    lastNameV: '',
    vendorPhone1: '',
    vendorPhone2: '',
    vendorPhone3: '',
    vendorEmail: '',
    sourceNotes: '',
    description: '',
    businessNameSecondary: '',
    businessABN: '',
    businessURL: '',
    address1: '',
    suburb: '',
    postCode: '0000',
    data120DayGuarantee: false,
    notifyOwner: false,
    listingAgent: 0,
    businessSource: '',
    businessRating: '',
    businessProduct: '',
    businessIndustry: '',
    businessType: '',
    stage: ''
  }
}

const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required('Business name is required.')
    .max(120, 'Business name require max 120 characters.'),
  firstNameV: Yup.string()
    .required('First name is required.')
    .max(40, 'First name require max 40 characters.'),
  lastNameV: Yup.string()
    .required('Last name is required.')
    .max(40, 'Last name require max 40 characters.'),
  vendorPhone1: Yup.string().max(15, 'Telephone 1 require max 15 characters.'),
  vendorPhone2: Yup.string().max(15, 'Telephone 2 require max 15 characters.'),
  vendorPhone3: Yup.string().max(15, 'Telephone 3 require max 15 characters.'),
  vendorEmail: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  businessSource: Yup.string().required('Source is required.'),
  sourceNotes: Yup.string().max(40, 'Source Notes require max 40 characters.'),
  description: Yup.string()
    .required('Notes is required.')
    .max(2000, 'Source Notes require max 2000 characters.'),
  businessNameSecondary: Yup.string().max(120, 'Source Notes require max 120 characters.'),
  // businessABN: Yup.string()
  //   .min(11, 'ABN require min 11 integers.')
  //   .max(11, 'ABN require max 11 integers.'),
  // businessURL: Yup.string().url('You must type a valid URL (http://website.com.au).'),
  address1: Yup.string().max(100, 'Street require max 100 characters.'),
  suburb: Yup.string().max(100, 'Suburb require max 100 characters.'),
  postCode: Yup.string()
    .min(4, 'Post Code require min 4 integers.')
    .max(4, 'Post Code require max 4 integers.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateBusiness(values).then(setSubmitting(false))
}

const mapStateToProps = state => {
  return {
    isLoadingGet: state.business.get.isLoading,
    isLoadingUpdate: state.business.update.isLoading,
    sourceOptions: state.business.get.sourceOptions,
    ratingOptions: state.business.get.ratingOptions,
    productOptions: state.business.get.productOptions,
    industryOptions: state.business.get.industryOptions,
    typeOptions: state.business.get.typeOptions,
    stageOptions: state.business.get.stageOptions,
    reassignedBusiness: state.business.reassignBusiness.isReassigned,
    usersBroker: state.business.get.usersBroker,
    updateStageSalesMemo: state.business.updateStageSalesMemo.isUpdated,
    updateStageLost: state.business.updateStageLost.isUpdated,
    userRoles: state.auth.user.roles,
    isUploadedIM: state.business.uploadIM.isUploaded,
    isLoadingIM: state.business.uploadIM.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateBusiness, getBusiness, getLogFromBusiness, openModal, uploadIM }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(EditBusinessDetailForm)
)
