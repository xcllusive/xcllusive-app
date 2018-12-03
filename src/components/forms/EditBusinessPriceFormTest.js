import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Icon, Grid, Segment, Header } from 'semantic-ui-react'
import Wrapper from '../content/Wrapper'
import { updateBusiness } from '../../redux/ducks/business'
import numeral from 'numeral'

class EditBusinessDetailForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listedPrice: 0,
      currentPrice: 0
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.business && nextProps.business.listedPrice !== prevState.listedPrice) {
      var listedPrice = numeral(nextProps.values.listedPrice).format('$0,0.[99]')
    }
    if (nextProps.business && nextProps.business.currentPrice !== prevState.currentPrice) {
      var currentPrice = numeral(nextProps.values.currentPrice).format('$0,0.[99]')
    }
    if (nextProps.business && nextProps.business.engagementFee !== prevState.engagementFee) {
      var engagementFee = numeral(nextProps.values.engagementFee).format('$0,0.[99]')
    }
    if (nextProps.business && nextProps.business.minimumCharge !== prevState.minimumCharge) {
      var minimumCharge = numeral(nextProps.values.minimumCharge).format('$0,0.[99]')
    }
    if (nextProps.business && nextProps.business.appraisalHigh !== prevState.appraisalHigh) {
      var appraisalHigh = numeral(nextProps.values.appraisalHigh).format('$0,0.[99]')
    }
    if (nextProps.business && nextProps.business.appraisalLow !== prevState.appraisalLow) {
      var appraisalLow = numeral(nextProps.values.appraisalLow).format('$0,0.[99]')
    }
    return {
      listedPrice: listedPrice || prevState.listedPrice,
      currentPrice: currentPrice || prevState.currentPrice,
      engagementFee: engagementFee || prevState.engagementFee,
      minimumCharge: minimumCharge || prevState.minimumCharge,
      appraisalHigh: appraisalHigh || prevState.appraisalHigh,
      appraisalLow: appraisalLow || prevState.appraisalLow
    }
  }

  async componentWillUnmount () {
    // console.log(this.props.isSubmitting, this.props.isValid)
    if (this.props.isSubmitting || this.props.isValid) {
      await this.props.updateBusiness(this.props.values)
      // this.props.getBusiness(this.props.business.id)
    }
  }

  _numberFormat = (e, { name, value }) => {
    const myNumeral = numeral(value)
    const numberFormated = myNumeral.format('$0,0.[99]')
    this.props.setFieldValue(name, myNumeral.value())
    this.setState({ [name]: numberFormated })
  }

  render () {
    const { values, handleChange, handleBlur, handleSubmit, isValid, isSubmitting, isLoadingUpdate } = this.props
    return (
      <Wrapper>
        {/* <Dimmer inverted active={isLoadingGet}>
          <Loader inverted />
        </Dimmer> */}
        <Form size="tiny" onSubmit={handleSubmit}>
          <Grid divided>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment size="mini" inverted color="blue">
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Header as="h3" textAlign="left" inverted>
                          Business Pricing
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Listed Price"
                    name="listedPrice"
                    autoComplete="listedPrice"
                    value={this.state.listedPrice}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  <Form.Input
                    label="Current Price"
                    name="currentPrice"
                    autoComplete="currentPrice"
                    value={this.state.currentPrice}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Engagement Fee"
                    name="engagementFee"
                    autoComplete="engagementFee"
                    value={this.state.engagementFee}
                    onChange={this._numberFormat}
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
                    value={this.state.minimumCharge}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  <Form.Input
                    label="Appraisal High $"
                    name="appraisalHigh"
                    autoComplete="appraisalHigh"
                    value={this.state.appraisalHigh}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  <Form.Input
                    label="Appraisal Low $"
                    name="appraisalLow"
                    autoComplete="appraisalLow"
                    value={this.state.appraisalLow}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column>
                <Segment size="mini" inverted color="blue">
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Header as="h3" textAlign="left" inverted>
                          Sales Information
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header as="h4" floated="right" inverted>
                          (Deposit and Sold)
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
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
            <Grid.Row style={{ justifyContent: 'flex-end', padding: '0 15px 15px 0' }}>
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
            </Grid.Row>
          </Grid>
        </Form>
      </Wrapper>
    )
  }
}

EditBusinessDetailForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isLoadingUpdate: PropTypes.bool,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  business: PropTypes.object,
  setFieldValue: PropTypes.func,
  updateBusiness: PropTypes.func
}

const mapPropsToValues = props => {
  if (props.business) {
    return {
      ...props.business,
      listedPrice: props.business.listedPrice ? props.business.listedPrice : 0,
      currentPrice: props.business.currentPrice ? props.business.currentPrice : 0,
      engagementFee: props.business.engagementFee ? props.business.engagementFee : 0,
      commissionPerc: props.business.commissionPerc ? props.business.commissionPerc : 0,
      minimumCharge: props.business.minimumCharge ? props.business.minimumCharge : 0,
      appraisalHigh: props.business.appraisalHigh ? props.business.appraisalHigh : 0,
      appraisalLow: props.business.appraisalLow ? props.business.appraisalLow : 0,
      depositeTaken: props.business.depositeTaken ? numeral(props.business.depositeTaken).format('$0,0.[99]') : 0,
      depositeTakenDate: props.business.depositeTakenDate ? props.business.depositeTakenDate : '',
      commissionSold: props.business.commissionSold ? numeral(props.business.commissionSold).format('$0,0.[99]') : 0,
      settlementDate: props.business.settlementDate ? props.business.settlementDate : '',
      soldPrice: props.business.soldPrice ? numeral(props.business.soldPrice).format('$0,0.[99]') : 0,
      attachedPurchaser: props.business.attachedPurchaser ? props.business.attachedPurchaser : 0,
      searchNote: props.business.searchNote ? props.business.searchNote : '',
      afterSalesNotes: props.business.afterSalesNotes ? props.business.afterSalesNotes : '',
      conclusionNote: props.business.conclusionNote ? props.business.conclusionNote : ''
    }
  }
  return {
    id: 0,
    listedPrice: 0,
    currentPrice: 0,
    engagementFee: 0,
    commissionPerc: 0,
    minimumCharge: 0,
    appraisalHigh: 0,
    appraisalLow: 0,
    depositeTaken: 0,
    depositeTakenDate: '',
    commissionSold: 0,
    settlementDate: '',
    soldPrice: 0,
    attachedPurchaser: 0,
    searchNote: '',
    afterSalesNotes: '',
    conclusionNote: ''
  }
}

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateBusiness(values).then(setSubmitting(false))
}

const mapStateToProps = state => {
  return {
    isLoadingUpdate: state.business.update.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateBusiness }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })(EditBusinessDetailForm)
)
