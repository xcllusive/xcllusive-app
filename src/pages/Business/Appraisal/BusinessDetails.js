import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Message, Step, Icon, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateBusiness } from '../../../redux/ducks/business'
import { updateAppraisal } from '../../../redux/ducks/appraisal'

class BusinessDetailsPage extends Component {
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
      ]
    }
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
    this._updateBusiness(this.props.values)
  }

  _updateBusiness = values => {
    const business = {
      id: values.business_id,
      businessName: values.businessName,
      businessABN: values.businessABN,
      firstNameV: values.firstNameV,
      lastNameV: values.lastNameV,
      address1: values.address1,
      suburb: values.suburb,
      state: values.state,
      postCode: values.postCode
    }
    this.props.updateBusiness(business)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const { values, handleChange, handleBlur, errors, touched, isLoadingCreating } = this.props
    const { state } = this.state
    return (
      <Wrapper loading={isLoadingCreating}>
        <Segment style={{ backgroundColor: '#ffe7a273', marginTop: '0px' }} size="small">
          <Step.Group size="large">
            <Step active icon="address card" title="Step 1" description="Please Confirm the Business Details" />
            <Message style={{ marginTop: '0px' }} info size="large">
              <p>
                From this section of the database you can enter all of the information necessary to complete a business
                appraisal. The process will take place over 7 steps. If at any time you wish to save your work and come
                back later, you can click <b>`Save and Complete Later`</b>. To quickly save your work, simply hit the
                [Enter] or [Return] key on your keyboard. Once you have completed a step, review your work then click
                the confirmation check box with the red text next to it. Then, simply click the [Next Stage] button to
                advance through the appraisal process.
              </p>
            </Message>
          </Step.Group>
        </Segment>
        <Segment style={{ backgroundColor: '#008eff26', marginTop: '0px' }} size="small">
          <Form>
            <Form.Group>
              <Form.Field width={7}>
                <Form.Input
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
              <Form.Field width={7}>
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
              <Form.Field width={2}>
                <label>ABN LOOKUP</label>
                <Icon
                  style={{ marginLeft: '30px' }}
                  name="chrome"
                  inverted
                  circular
                  link
                  onClick={() => window.open('https://abr.business.gov.au/')}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
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
                  label="Street"
                  name="address1"
                  autoComplete="address1"
                  value={values.address1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address1 && touched.address1 && <Label basic color="red" pointing content={errors.address1} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
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
                {errors.postCode && touched.postCode && <Label basic color="red" pointing content={errors.postCode} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Checkbox
                  label="Please confirm that you have completed the above information"
                  name="confirmBusinessDetail"
                  onChange={this._handleChangeCheckBox}
                  checked={values.confirmBusinessDetail}
                  onClick={() =>
                    this.props.confirmsCompleteSteps('confirmBusinessDetail', !values.confirmBusinessDetail)
                  }
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Segment>
      </Wrapper>
    )
  }
}

BusinessDetailsPage.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  business: PropTypes.object,
  updateBusiness: PropTypes.func,
  updateAppraisal: PropTypes.func,
  isLoadingCreating: PropTypes.bool,
  appraisalObject: PropTypes.object,
  confirmsCompleteSteps: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  businessName: props.business ? props.business.businessName : '',
  businessABN: props.business ? props.business.businessABN : '',
  firstNameV: props.business ? props.business.firstNameV : '',
  lastNameV: props.business ? props.business.lastNameV : '',
  address1: props.business ? props.business.address1 : '',
  suburb: props.business ? props.business.suburb : '',
  state: props.business ? props.business.state : '',
  postCode: props.business ? props.business.postCode : '',
  confirmBusinessDetail: props.appraisalObject ? props.appraisalObject.confirmBusinessDetail : false
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
  businessABN: Yup.string().required('ABN is required.'),
  address1: Yup.string().max(100, 'Street require max 100 characters.'),
  suburb: Yup.string().max(100, 'Suburb require max 100 characters.'),
  postCode: Yup.string()
    .min(4, 'Post Code require min 4 integers.')
    .max(4, 'Post Code require max 4 integers.')
})

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateBusiness, updateAppraisal }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(BusinessDetailsPage)
)
