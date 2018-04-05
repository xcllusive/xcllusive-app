import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Header, Grid, Segment, Icon } from 'semantic-ui-react'

import { updateBusiness } from '../../redux/ducks/business'

const EditBusinessPriceForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isValid,
  isSubmitting,
  isLoadingUpdate
}) => (
  <Form size="tiny" onSubmit={handleSubmit}>
    <Grid celled="internally" divided>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Segment clearing textAlign="center">
            <Header as="h2" floated="left">
              Business Pricing
            </Header>
            <Header as="h2" floated="right">
              (For Sale)
            </Header>
          </Segment>
          <Form.Group widths="equal">
            <Form.Input
              label="Listed Price"
              name="listedPrice"
              autoComplete="listedPrice"
              value={values.listedPrice}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Input
              label="Current Price"
              name="currentPrice"
              autoComplete="currentPrice"
              value={values.currentPrice}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Engagement Fee"
              name="engagementFee"
              autoComplete="engagementFee"
              value={values.engagementFee}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Input
              label="Commission %"
              name="commissionPerc"
              autoComplete="commissionPerc"
              value={values.commissionPerc}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Minimum Com $"
              name="minimumCharge"
              autoComplete="minimumCharge"
              value={values.minimumCharge}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Input
              label="Appraisal High $"
              name="appraisalHigh"
              autoComplete="appraisalHigh"
              value={values.appraisalHigh}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Input
              label="Appraisal Low $"
              name="appraisalLow"
              autoComplete="appraisalLow"
              value={values.appraisalLow}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </Grid.Column>
        <Grid.Column>
          <Segment clearing textAlign="center">
            <Header as="h2" floated="left">
              Sales Information
            </Header>
            <Header as="h6" floated="right">
              (Deposit and Sold)
            </Header>
          </Segment>
          <Form.Group widths="equal">
            <Form.Input
              readOnly
              label="Deposit Taken $"
              name="depositeTaken"
              autoComplete="depositeTaken"
              value={values.depositeTaken}
            />
            <Form.Input
              readOnly
              label="Dep. Taken Date"
              name="depositeTakenDate"
              autoComplete="depositeTakenDate"
              value={values.depositeTakenDate}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              readOnly
              label="Commission $"
              name="commissionSold"
              autoComplete="commissionSold"
              value={values.commissionSold}
            />
            <Form.Input
              readOnly
              label="Settlement Date"
              name="settlementDate"
              autoComplete="settlementDate"
              value={values.settlementDate}
            />
            <Form.Input
              readOnly
              label="Sold Price"
              name="soldPrice"
              autoComplete="soldPrice"
              value={values.soldPrice}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              readOnly
              label="Attached Purchaser"
              name="attachedPurchaser"
              autoComplete="attachedPurchaser"
              value={values.attachedPurchaser}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.TextArea
              label="Search Notes"
              name="searchNote"
              autoComplete="searchNote"
              value={values.searchNote}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.TextArea
              label="Conclusion Notes"
              name="conclusionNote"
              autoComplete="conclusionNote"
              value={values.conclusionNote}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Column floated="right" width={3}>
        <Form.Button
          floated="right"
          type="submit"
          disabled={isSubmitting || !isValid}
          loading={isLoadingUpdate}
          color="red"
          onClick={handleSubmit}
        >
          <Icon name="save" />
          Save
        </Form.Button>
      </Grid.Column>
    </Grid>
  </Form>
)

EditBusinessPriceForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isLoadingUpdate: PropTypes.bool,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool
}

const mapPropsToValues = props => {
  if (props.business) {
    return {
      ...props.business,
      listedPrice: props.business.listedPrice,
      currentPrice: props.business.currentPrice,
      engagementFee: props.business.engagementFee,
      commissionPerc: props.business.commissionPerc,
      minimumCharge: props.business.minimumCharge,
      appraisalHigh: props.business.appraisalHigh,
      appraisalLow: props.business.appraisalLow,
      depositeTaken: props.business.depositeTaken,
      depositeTakenDate: props.business.depositeTakenDate,
      commissionSold: props.business.commissionSold,
      settlementDate: props.business.settlementDate,
      soldPrice: props.business.soldPrice,
      attachedPurchaser: props.business.attachedPurchaser,
      searchNote: props.business.searchNote,
      afterSalesNotes: props.business.afterSalesNotes
    }
  }
  return {
    id: '',
    listedPrice: '',
    currentPrice: '',
    engagementFee: '',
    commissionPerc: '',
    minimumCharge: '',
    appraisalHigh: '',
    appraisalLow: '',
    depositeTaken: '',
    depositeTakenDate: '',
    commissionSold: '',
    settlementDate: '',
    soldPrice: '',
    attachedPurchaser: '',
    searchNote: '',
    afterSalesNotes: ''
  }
}

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateBusiness(values).then(setSubmitting(false))
}

const mapStateToProps = state => ({
  isLoadingUpdate: state.business.update.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateBusiness }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })(EditBusinessPriceForm)
)
