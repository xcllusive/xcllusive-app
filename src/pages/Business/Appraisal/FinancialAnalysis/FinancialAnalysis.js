import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Grid, Header, Form } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../../components/content/Wrapper'
import AddbacksAndAdjustmentsForm from './AddbacksAndAdjustmentsForm'
import FinancialAnalysisForm from './FinancialAnalysisForm'
import moment from 'moment'
import OwnersMarketWagesForm from './OwnersMarketWagesForm'
import StockForm from './StockForm'
import PhysicalAssetValueForm from './PhysicalAssetValueForm'
import FinancialInformationSourceForm from './FinancialInformationSourceForm'

import CustomColumn from '../../../../components/content/CustomGridColumn'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'

class FinancialAnalysisPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      financialYear: null
    }
  }

  componentDidMount () {
    if (this.props.appraisalObject && this.props.appraisalObject.year6 === 0) this._calculateFinancialYear()
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _calculateFinancialYear = async () => {
    const dateChangeFinancialYear = moment('30/06', 'DD/MM')
    const currentDayMonth = moment()
    let financialYear = null
    if (currentDayMonth > dateChangeFinancialYear) {
      financialYear = moment()
        .add(1, 'year')
        .format('YYYY')
    } else financialYear = moment().format('YYYY')

    await this.setState({ financialYear })
    this.props.setFieldValue('year1', this.state.financialYear - 5)
    this.props.setFieldValue('year2', this.state.financialYear - 4)
    this.props.setFieldValue('year3', this.state.financialYear - 3)
    this.props.setFieldValue('year4', this.state.financialYear - 2)
    this.props.setFieldValue('year5', this.state.financialYear - 1)
    this.props.setFieldValue('year6', this.state.financialYear)
  }

  render () {
    const { values, appraisalObject } = this.props
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step active icon="chart line" title="Step 4" description="Financial Analysis" />
          <Message info size="large">
            <p>
              The data you enter on this page will be used on the `Financial Analysis` page of the appraisal. This
              information will also be used to calculate the value of the business. Enter data as you would on a
              spreadsheet, using the [tab] key to switch quickly between cells. This page can be left open for longer
              than most other pages, but it is recommended that you manually save regularly to ensure that you don`t
              lose any work. This is done by clicking the [Save] button at the bottom of this page.
            </p>
          </Message>
        </Step.Group>
        <Grid celled="internally" divided>
          <FinancialAnalysisForm financialYear={this.state.financialYear} appraisalObject={appraisalObject} />
          <Grid.Row>
            <CustomColumn>
              <Header style={{ marginTop: '10px', marginBottom: '10px' }} as="h3" textAlign="center" color="blue">
                Addbacks and Adjustments
              </Header>
            </CustomColumn>
          </Grid.Row>
<<<<<<< HEAD
          <AddbacksAndAdjustmentsForm
            financialYear={this.state.financialYear}
            business={this.props.business}
            appraisalObject={this.props.appraisalObject}
          />
=======
          <AddbacksAndAdjustmentsForm financialYear={this.state.financialYear} />
          <TotalAdjustmentsForm />
>>>>>>> afb40801aae6a8c10e6e313fb041e33294b1f0ff
        </Grid>
        <Grid>
          <Grid.Row columns={2}>
            <CustomColumn width={9}>
              <OwnersMarketWagesForm />
            </CustomColumn>
            <CustomColumn width={7}>
              <StockForm />
              <PhysicalAssetValueForm />
            </CustomColumn>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <FinancialInformationSourceForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Group>
                  <Form.Field>
                    <Form.Checkbox
                      label="Please confirm that you have completed the above information"
                      name="confirmAbout"
                      onChange={this._handleChangeCheckBox}
                      checked={values.confirmFinancialAnalysis}
                      // disabled={!isValid}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

FinancialAnalysisPage.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
<<<<<<< HEAD
=======
  updateAppraisal: PropTypes.func,
>>>>>>> afb40801aae6a8c10e6e313fb041e33294b1f0ff
  appraisalObject: PropTypes.object,
  business: PropTypes.object
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : ''
})

const validationSchema = Yup.object().shape({})

const handleSubmit = (values, { props, setSubmitting }) => {}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateAppraisal }, dispatch)
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
  })(FinancialAnalysisPage)
)
