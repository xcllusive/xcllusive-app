import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { withFormik } from 'formik'
import { Form, Icon, Grid, Radio, Label } from 'semantic-ui-react'
import Yup from 'yup'
import Wrapper from '../../components/content/Wrapper'
import { updateBusiness } from '../../redux/ducks/business'
import ReassignBusinessForm from './ReassignBusinessForm'

const rating = [
  { key: '1', text: 'Verify file rating.txt', value: 'verify' }
]

const staffAccountName = [
  { key: 'Z', text: 'Zoran', value: 'Zoran' },
  { key: 'C', text: 'Cayo', value: 'Cayo' }
]

const businessCat = [
  { key: 'F', text: 'Verify file industry', value: 'verify' }
]

const industry = [
  { key: 'F', text: 'Verify file industry', value: 'verify' }
]

const businessType = [
  { key: 'T', text: 'Verify file businessType', value: 'verify' }
]

const ownersTime = [
  { key: '1', text: 'verify file ownersTime', value: 'verify' }
]

class EditBusinessDetailForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sourceOptions: [
        { key: 1, text: 'Verify file sourceOptions', value: 'Google' }
      ],
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
      stage: [
        { key: '1', text: 'Potential Listing', value: '1' },
        { key: '2', text: 'Meeting', value: '2' },
        { key: '3', text: 'Data Gathering', value: '3' },
        { key: '4', text: 'Appraisal', value: '4' },
        { key: '5', text: 'Closing Stage', value: '5' },
        { key: '6', text: 'SALES MEMORANDUM', value: '6' },
        { key: '7', text: 'LOST', value: '7' }
      ]
    }
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isUpdated !== nextProps.isUpdated) {
      alert(nextProps.isUpdated)
    }
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _toggleModal = business => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      business
    }))
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      errors,
      touched
    } = this.props

    const {
      sourceOptions,
      state,
      stage
    } = this.state
    return (
      <Wrapper>
        <ReassignBusinessForm
          modalOpen={this.state.modalOpen}
          toggleModal={this._toggleModal}
          business={this.state.business}
        />
        <Grid celled divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form noValidate size='tiny' onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.Input
                      required
                      label='Business name'
                      name='businessName'
                      autoComplete='businessName'
                      value={values.businessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessName && touched.businessName && <Label basic color='red' pointing content={errors.businessName} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      required
                      label='First name'
                      name='firstNameV'
                      autoComplete='firstNameV'
                      value={values.firstNameV}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstNameV && touched.firstNameV && <Label basic color='red' pointing content={errors.firstNameV} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      required
                      label='Last name'
                      name='lastNameV'
                      autoComplete='lastNameV'
                      value={values.lastNameV}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastNameV && touched.lastNameV && <Label basic color='red' pointing content={errors.lastNameV} />}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.Input
                      label='Telephone 1'
                      name='vendorPhone1'
                      autoComplete='vendorPhone1'
                      value={values.vendorPhone1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorPhone1 && touched.vendorPhone1 && <Label basic color='red' pointing content={errors.vendorPhone1} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label='Telephone 2'
                      name='vendorPhone2'
                      autoComplete='vendorPhone2'
                      value={values.vendorPhone2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorPhone2 && touched.vendorPhone2 && <Label basic color='red' pointing content={errors.vendorPhone2} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label='Telephone 3'
                      name='vendorPhone3'
                      autoComplete='vendorPhone3'
                      value={values.vendorPhone3}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorPhone3 && touched.vendorPhone3 && <Label basic color='red' pointing content={errors.vendorPhone3} />}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.Input
                      required
                      label='Email'
                      icon={<Icon name='mail' inverted circular link onClick={() => (window.location.href = `mailto:${values.vendorEmail}`)} />}
                      name='vendorEmail'
                      autoComplete='vendorEmail'
                      value={values.vendorEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorEmail && touched.vendorEmail && <Label basic color='red' pointing content={errors.vendorEmail} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      required
                      label='Source'
                      options={sourceOptions}
                      name='businessSource'
                      autoComplete='businessSource'
                      value={values.businessSource}
                      onChange={this._handleSelectChange}
                    />
                    {errors.businessSource && touched.businessSource && <Label basic color='red' pointing content={errors.businessSource} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label='Source Notes'
                      name='sourceNotes'
                      autoComplete='sourceNotes'
                      value={values.sourceNotes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.sourceNotes && touched.sourceNotes && <Label basic color='red' pointing content={errors.sourceNotes} />}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.TextArea
                      label='Notes'
                      name='description'
                      autoComplete='description'
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.description && touched.description && <Label basic color='red' pointing content={errors.description} />}
                  </Form.Field>
                </Form.Group>
                <Form.Group inline>
                  <Form.Input
                    label='Listing Agent'
                    placeholder={values.listingAgent}
                    readOnly
                  />
                  <Form.Button onClick={this._toggleModal} primary>
                    <Icon name='edit' />
                    Reassign Business
                  </Form.Button>
                  <Form.Button color='blue'>
                    <Icon name='file pdf outline' />
                    PDF
                  </Form.Button>
                  <Form.Button color='vk'>
                    <Icon name='file text' />
                    Appraisal Mgt
                  </Form.Button>
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size='tiny'>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.Input
                      label='Business name (Secondary)'
                      name='businessNameSecondary'
                      autoComplete='businessNameSecondary'
                      value={values.businessNameSecondary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessNameSecondary && touched.businessNameSecondary && <Label basic color='red' pointing content={errors.businessNameSecondary} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label='ABN'
                      name='businessABN'
                      autoComplete='businessABN'
                      value={values.businessABN}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessABN && touched.businessABN && <Label basic color='red' pointing content={errors.businessABN} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label='Website'
                      icon={<Icon name='chrome' inverted circular link onClick={() => (window.open(`${values.businessURL}`))} />}
                      name='businessURL'
                      autoComplete='businessURL'
                      value={values.businessURL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessURL && touched.businessURL && <Label basic color='red' pointing content={errors.businessURL} />}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.Input
                      label='Street'
                      name='address1'
                      autoComplete='address1'
                      value={values.address1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address1 && touched.address1 && <Label basic color='red' pointing content={errors.address1} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label='Suburb'
                      name='suburb'
                      autoComplete='suburb'
                      value={values.suburb}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.suburb && touched.suburb && <Label basic color='red' pointing content={errors.suburb} />}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.Select
                      label='State'
                      name='state'
                      options={state}
                      autoComplete='state'
                      value={values.state}
                      onChange={this._handleSelectChange}
                    />
                    {errors.state && touched.state && <Label basic color='red' pointing content={errors.state} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label='Post Code'
                      name='postCode'
                      autoComplete='postCode'
                      value={values.postCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.postCode && touched.postCode && <Label basic color='red' pointing content={errors.postCode} />}
                  </Form.Field>
                  <label>Eligible for 120 Day Guarantee? </label>
                  <Form.Field
                    control={Radio}
                    label='Yes'
                    name='data120DayGuarantee'
                    onChange={this._handleChangeCheckBox}
                    checked={values.data120DayGuarantee}
                  />
                  <Form.Field
                    control={Radio}
                    label='No'
                    name='data120DayGuarantee'
                    checked={!values.data120DayGuarantee}
                    onChange={this._handleChangeCheckBox}
                  />
                  <Form.Checkbox
                    label='Notify Owner for IM request'
                    name='notifyOwner'
                    checked={values.notifyOwner}
                    onChange={this._handleChangeCheckBox}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.Select
                      label='Rating'
                      options={rating}
                      name='rating'
                      autoComplete='rating'
                      value={values.rating}
                      onChange={this._handleSelectChange}
                    />
                    {errors.rating && touched.rating && <Label basic color='red' pointing content={errors.rating} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      required
                      label='Product'
                      options={businessCat}
                      name='businessCat'
                      autoComplete='businessCat'
                      value={values.businessCat}
                      onChange={this._handleSelectChange}
                    />
                    {errors.businessCat && touched.businessCat && <Label basic color='red' pointing content={errors.businessCat} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      label='Agent'
                      options={staffAccountName}
                      name='staffAccountName'
                      autoComplete='staffAccountName'
                      value={values.staffAccountName}
                      onChange={this._handleSelectChange}
                    />
                    {errors.staffAccountName && touched.staffAccountName && <Label basic color='red' pointing content={errors.staffAccountName} />}
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.Select
                      label='Industry'
                      options={industry}
                      name='industry'
                      autoComplete='industry'
                      value={values.industry}
                      onChange={this._handleSelectChange}
                    />
                    {errors.industry && touched.industry && <Label basic color='red' pointing content={errors.industry} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      label='Business Type'
                      options={businessType}
                      name='businessType'
                      autoComplete='businessType'
                      value={values.businessType}
                      onChange={this._handleSelectChange}
                    />
                    {errors.businessType && touched.businessType && <Label basic color='red' pointing content={errors.businessType} />}
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      label='Owner`s time'
                      options={ownersTime}
                      name='ownersTime'
                      autoComplete='ownersTime'
                      value={values.ownersTime}
                      onChange={this._handleSelectChange}
                    />
                    {errors.ownersTime && touched.ownersTime && <Label basic color='red' pointing content={errors.ownersTime} />}
                  </Form.Field>
                </Form.Group>
                <Form.Group inline>
                  <Form.Field>
                    <Form.Select
                      label='Business Stage'
                      options={stage}
                      name='stage'
                      autoComplete='stage'
                      value={values.stage}
                      onChange={this._handleSelectChange}
                    />
                    {errors.stage && touched.stage && <Label basic color='red' pointing content={errors.stage} />}
                  </Form.Field>
                  <Form.Button compact color='red' onClick={handleSubmit}>
                    <Icon name='save' />
                    SAVE
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
  isUpdated: PropTypes.bool
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
      businessSource,
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
      listingAgent
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
      businessSource,
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
      listingAgent
    }

    business.data120DayGuarantee = business.data120DayGuarantee !== ''
    business.notifyOwner = business.data120DayGuarantee !== ''
    return _.mapValues(business, value => value == null ? '' : value)
  }
  return {
    businessName: '',
    firstNameV: '',
    lastNameV: '',
    vendorPhone1: '',
    vendorPhone2: '',
    vendorPhone3: '',
    vendorEmail: '',
    businessSource: '',
    sourceNotes: '',
    description: '',
    businessNameSecondary: '',
    businessABN: '',
    businessURL: '',
    address1: '',
    suburb: '',
    postCode: '',
    data120DayGuarantee: false,
    notifyOwner: true,
    listingAgent: ''
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
  vendorPhone1: Yup.string()
    .max(15, 'Telephone 1 require max 15 characters.'),
  vendorPhone2: Yup.string()
    .max(15, 'Telephone 2 require max 15 characters.'),
  vendorPhone3: Yup.string()
    .max(15, 'Telephone 3 require max 15 characters.'),
  vendorEmail: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  businessSource: Yup.string()
    .required('Source is required.'),
  sourceNotes: Yup.string()
    .max(40, 'Source Notes require max 40 characters.'),
  description: Yup.string()
    .required('Notes is required.')
    .max(2000, 'Source Notes require max 2000 characters.'),
  businessNameSecondary: Yup.string()
    .max(120, 'Source Notes require max 120 characters.'),
  businessABN: Yup.string()
    .min(11, 'ABN require min 11 integers.')
    .max(11, 'ABN require max 11 integers.'),
  businessURL: Yup.string()
    .url('You must type a valid URL (http://website.com.au).'),
  address1: Yup.string()
    .max(11, 'Street require max 100 characters.'),
  suburb: Yup.string()
    .max(11, 'Suburb require max 100 characters.'),
  postCode: Yup.string()
    .min(4, 'Post Code require min 4 integers.')
    .max(4, 'Post Code require max 4 integers.')
})

const handleSubmit = (values, {props, setSubmitting}) => {
  props.updateBusiness(values).then(setSubmitting(false))
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.update.isLoading,
    isLoadingGet: state.business.isLoadingGetBusiness,
    isUpdated: state.business.update.isUpdated
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateBusiness }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(EditBusinessDetailForm)
)
