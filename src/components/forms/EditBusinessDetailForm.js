import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withFormik } from 'formik'
import { Form, Icon, Grid, Radio, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Yup from 'yup'

const state = [
  { key: '1', text: 'ACT', value: 'ACT' },
  { key: '2', text: 'NT', value: 'NT' },
  { key: '3', text: 'NSW', value: 'NSW' },
  { key: '4', text: 'QLD', value: 'QLD' },
  { key: '5', text: 'SA', value: 'SA' },
  { key: '6', text: 'TAS', value: 'TAS' },
  { key: '7', text: 'VIC', value: 'VIC' },
  { key: '8', text: 'WA', value: 'WA' }
]

const rating = [
  { key: '1', text: '1. Awesome', value: '1' },
  { key: '2', text: '2. Good', value: '2' }
]

const agent = [
  { key: 'Z', text: 'Zoran', value: 'Zoran' },
  { key: 'C', text: 'Cayo', value: 'Cayo' }
]

const product = [
  { key: '1', text: 'Business Sale', value: 'BS' },
  { key: '2', text: 'Seller Assist', value: 'SA' },
  { key: '3', text: 'Franchise Sale', value: 'FS' }
]

const industry = [
  { key: 'U', text: 'Car', value: 'Car' },
  { key: 'F', text: 'Fashion', value: 'Fashion' }
]

const businessType = [
  { key: 'T', text: 'Transport', value: 'Transport' },
  { key: 'E', text: 'Export', value: 'Export' }
]

const ownerTime = [
  { key: '1', text: '< 5 days', value: '1' },
  { key: '2', text: '5 days', value: '2' }
]

const businessStage = [
  { key: 'U', text: 'Under Offer', value: 'UnderOffer' },
  { key: 'F', text: 'For Sale', value: 'ForSale' }
]

class EditBusinessDetailForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sourceOptions: [
        { key: 1, text: 'Google', value: 'Google' },
        { key: 2, text: 'Yahoo/Bing', value: 'Yahoo/Bing' },
        { key: 3, text: 'Google (SCBB website)', value: 'Google (SCBB website)' },
        { key: 4, text: 'Ask.com', value: 'Ask.com' },
        { key: 5, text: 'Sensis', value: 'Sensis' },
        { key: 6, text: 'MyBusValuation Website', value: 'MyBusValuation Website' },
        { key: 7, text: 'Referral', value: 'Referral' },
        { key: 8, text: 'Referral Network Contact', value: 'Referral Network Contact' },
        { key: 9, text: 'Introducing Partner', value: 'Introducing Partner' },
        { key: 10, text: 'Zoran Presentation', value: 'Zoran Presentation' },
        { key: 11, text: 'Mailout (To Buyers)', value: 'Mailout (To Buyers)' },
        { key: 12, text: 'Mailout (To Sellers)', value: 'Mailout (To Sellers)' },
        { key: 13, text: 'Mailout (To Sellers) Forward', value: 'Mailout (To Sellers) Forward' },
        { key: 14, text: 'Mailout (To Buyers) Forward', value: 'Mailout (To Buyers) Forward' },
        { key: 15, text: 'WWW', value: 'WWW' },
        { key: 16, text: 'Seek', value: 'Seek' },
        { key: 17, text: 'RealCommercial', value: 'RealCommercial' },
        { key: 18, text: 'AIBB', value: 'AIBB' },
        { key: 19, text: 'AllHomes', value: 'AllHomes' },
        { key: 20, text: 'Anybusiness.com.au', value: 'Anybusiness.com.au' },
        { key: 21, text: 'BxBox', value: 'BxBox' },
        { key: 22, text: 'Business2sell', value: 'Business2sell' },
        { key: 23, text: 'BSale.com.au', value: 'BSale.com.au' },
        { key: 24, text: 'Businessforsale.com', value: 'Businessforsale.com' },
        { key: 25, text: 'Businessesforsale.com', value: 'Businessesforsale.com' },
        { key: 26, text: 'Businessesview.com.au', value: 'Businessesview.com.au' },
        { key: 27, text: 'Gumtree', value: 'Gumtree' },
        { key: 28, text: 'Bizbo', value: 'Bizbo' },
        { key: 29, text: 'BizBuySell', value: 'BizBuySell' },
        { key: 30, text: 'BizClassifieds', value: 'BizClassifieds' },
        { key: 31, text: 'Domain', value: 'Domain' },
        { key: 32, text: 'Constant Contact', value: 'Constant Contact' },
        { key: 33, text: 'Constant Contact Forward', value: 'Constant Contact Forward' },
        { key: 34, text: 'AustralianBiz e-newsletter', value: 'AustralianBiz e-newsletter' },
        { key: 35, text: 'Yellow Pages', value: 'Yellow Pages' },
        { key: 36, text: 'New Source', value: 'New Source' },
        { key: 37, text: 'Seminar- Attendee', value: 'Seminar- Attendee' },
        { key: 38, text: 'Seminar- Non-Attendee', value: 'Seminar- Non-Attendee' },
        { key: 39, text: 'Agent Referral- Denise Hall', value: 'Agent Referral- Denise Hall' },
        { key: 40, text: 'Agent Referral- Choon Ng', value: 'Agent Referral- Choon Ng' },
        { key: 41, text: 'Agent Referral- Jim Lund', value: 'Agent Referral- Jim Lund' },
        { key: 42, text: 'Agent Referral- Mark Attard', value: 'Agent Referral- Mark Attard' },
        { key: 43, text: 'Agent Referral- Rai Kollegger', value: 'Agent Referral- Rai Kollegger' },
        { key: 44, text: 'Agent Referral- Peter George', value: 'Agent Referral- Peter George' },
        { key: 45, text: 'Agent Referral- Frank Sassin', value: 'Agent Referral- Frank Sassin' },
        { key: 46, text: 'Agent Referral- Mark Willoughby', value: 'Agent Referral- Mark Willoughby' },
        { key: 47, text: 'Agent Referral- Keith Brooke', value: 'Agent Referral- Keith Brooke' },
        { key: 48, text: 'Agent Referral- Zoran Sarabaca', value: 'Agent Referral- Zoran Sarabaca' },
        { key: 49, text: 'Agent Referral- Nick Wolski', value: 'Agent Referral- Nick Wolski' },
        { key: 50, text: 'Agent Referral- Angus Suter', value: 'Agent Referral- Angus Suter' },
        { key: 51, text: 'Lead Nurture- RUDE Download', value: 'Lead Nurture- RUDE Download' },
        { key: 52, text: 'Lead Nurture- Sellability', value: 'Lead Nurture- Sellability' },
        { key: 53, text: 'Lead Nurture- Recovery', value: 'Lead Nurture- Recovery' },
        { key: 54, text: 'Lead Nurture', value: 'Lead Nurture' },
        { key: 55, text: 'PR: Article', value: 'PR: Article' },
        { key: 56, text: 'Referral: Administrator', value: 'Referral: Administrator' },
        { key: 57, text: 'You Tube', value: 'You Tube' },
        { key: 58, text: 'Direct Email', value: 'Direct Email' },
        { key: 59, text: 'Paper: Central Coast Express Advocate', value: 'Paper: Central Coast Express Advocate' },
        { key: 60, text: 'Paper: SMH', value: 'Paper: SMH' },
        { key: 61, text: 'Paper: Sydney Business Catalogue', value: 'Paper: Sydney Business Catalogue' },
        { key: 62, text: 'Local Paper advert', value: 'Local Paper advert' },
        { key: 63, text: 'Magazine: Central Coast Business Review', value: 'Magazine: Central Coast Business Review' },
        { key: 64, text: 'Magazine: In The Blank', value: 'Magazine: In The Blank' },
        { key: 65, text: 'Magazine: SME', value: 'Magazine: SME' },
        { key: 66, text: 'Industry Newsletter', value: 'Industry Newsletter' },
        { key: 67, text: 'Industry Website', value: 'Industry Website' },
        { key: 68, text: 'Previous Buyer', value: 'Previous Buyer' },
        { key: 69, text: 'Previous Vendor', value: 'Previous Vendor' },
        { key: 70, text: 'Vendor Referral', value: 'Vendor Referral' },
        { key: 71, text: 'Buyer Referral', value: 'Buyer Referral' },
        { key: 72, text: 'Cold Calling', value: 'Cold Calling' },
        { key: 73, text: 'Door Knocking', value: 'Door Knocking' },
        { key: 74, text: 'Networking', value: 'Networking' },
        { key: 75, text: 'Google Remarketing', value: 'Google Remarketing' },
        { key: 76, text: 'Blog', value: 'Blog' },
        { key: 77, text: 'Xcllusive Website', value: 'Xcllusive Website' },
        { key: 78, text: 'Accountant/Solicitor - from xcll website', value: 'Accountant/Solicitor - from xcll website' },
        { key: 79, text: 'Unknown', value: 'Unknown' },
        { key: 80, text: 'Facebook', value: 'Facebook' },
        { key: 81, text: 'Facebook (organic)', value: 'Facebook (organic)' },
        { key: 82, text: 'Telstra 1234', value: 'Telstra 1234' },
        { key: 83, text: 'Hospitality trader', value: 'Hospitality trader' },
        { key: 84, text: 'Canberra Weekly', value: 'Canberra Weekly' },
        { key: 85, text: '-', value: '-' }
      ]
    }
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched
    } = this.props

    const {
      sourceOptions
    } = this.state

    return (
      <Grid celled divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Form size='tiny'>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  value='Yes'
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='No'
                  value='No'
                  onChange={this.handleChange}
                />
                <Form.Checkbox
                  label='Notify Owner for IM request'
                  defaultChecked
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Select label='Rating' options={rating} />
                <Form.Select label='Product' options={product} />
                <Form.Select label='Agent' options={agent} />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Select label='Industry' options={industry} />
                <Form.Select label='Business Type' options={businessType} />
                <Form.Select label={'Owner`s time'} options={ownerTime} />
              </Form.Group>
              <Form.Group inline>
                <Form.Select label='Business Stage' options={businessStage} />
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
  errors: PropTypes.object,
  touched: PropTypes.object
}

const mapsPropsToValues = () => ({
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

export default connect()(
  withFormik({
    mapsPropsToValues,
    validationSchema
  })(EditBusinessDetailForm)
)
