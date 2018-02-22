import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withFormik } from 'formik'
import { Form, Icon, Grid, Radio, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Yup from 'yup'

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

const stage = [
  { key: 'U', text: 'Under Offer', value: 'UnderOffer' },
  { key: 'F', text: 'For Sale', value: 'ForSale' }
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
      data120DayGuaranteeOptions: {
        yes: false,
        no: true
      }
    }
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.setState(
      {
        data120DayGuaranteeOptions: {
          ...this.state.data120DayGuaranteeOptions,
          [value]: !this.state.data120DayGuaranteeOptions[value]
        }
      }
    )
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
      state
    } = this.state

    return (
      <Grid celled divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Form size='tiny' onSubmit={handleSubmit} novalidate>
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
                    required
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
                  placeholder='Zoran Sarabaca'
                  readOnly
                />
                <Form.Button primary>
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
                    name='businessURL'
                    autoComplete='BusinessURL'
                    value={values.BusinessURL}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.BusinessURL && touched.BusinessURL && <Label basic color='red' pointing content={errors.BusinessURL} />}
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
                  value={values.data120DayGuarantee}
                  onChange={this._handleChangeCheckBox}
                  checked={this.state.data120DayGuaranteeOptions.yes === true}
                />
                <Form.Field
                  control={Radio}
                  label='No'
                  value={values.data120DayGuarantee}
                  onChange={this._handleChangeCheckBox}
                  checked={this.state.data120DayGuaranteeOptions.no === true}
                />
                <Form.Checkbox
                  label='Notify Owner for IM request'
                  value={values.notifyOwner}
                  defaultChecked
                />
                {errors.notifyOwner && touched.notifyOwner && <Label basic color='red' pointing content={errors.notifyOwner} />}
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
                <Form.Button compact color='green'>
                  <Icon name='forward' />
                  Next Stage
                </Form.Button>
                <Form.Button compact color='red'>
                  <Icon name='save' />
                  SAVE
                </Form.Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

EditBusinessDetailForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object
}

const mapPropsToValues = () => ({
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
  businessABN: ''

})

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
    .max(11, 'ABN require max 11 integers.')
})

const handleSubmit = (values) => {
  console.log(values)
}

export default connect(null, null)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(EditBusinessDetailForm)
)
