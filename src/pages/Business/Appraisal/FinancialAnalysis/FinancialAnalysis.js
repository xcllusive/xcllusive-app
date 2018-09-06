import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Grid, Header } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../../components/content/Wrapper'
import AddbacksAndAdjustmentsForm from './AddbacksAndAdjustmentsForm'
import FinancialAnalysisForm from './FinancialAnalysisForm'
import TotalAdjustmentsForm from './TotalAdjustmentsForm'
import moment from 'moment'

class FinancialAnalysisPage extends Component {
  constructor (props) {
    super(props)
    this.state = { financialYear: null }
  }

  componentDidMount () {
    this._calculateFinancialYear()
  }

  _calculateFinancialYear = () => {
    const dateChangeFinancialYear = moment('30/06', 'DD/MM')
    const currentDayMonth = moment()
    let financialYear = null
    if (currentDayMonth > dateChangeFinancialYear) {
      financialYear = moment()
        .add(1, 'year')
        .format('YYYY')
    } else financialYear = moment().format('YYYY')

    this.setState({ financialYear })
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step
            active
            icon="chart line"
            title="Step 4"
            description="Financial Analysis"
          />
          <Message info size="large">
            <p>
              The data you enter on this page will be used on the `Financial
              Analysis` page of the appraisal. This information will also be
              used to calculate the value of the business. Enter data as you
              would on a spreadsheet, using the [tab] key to switch quickly
              between cells. This page can be left open for longer than most
              other pages, but it is recommended that you manually save
              regularly to ensure that you don`t lose any work. This is done by
              clicking the [Save] button at the bottom of this page.
            </p>
          </Message>
        </Step.Group>
        <Grid celled="internally" divided>
          <FinancialAnalysisForm financialYear={this.state.financialYear} />
          <Grid.Row>
            <Grid.Column>
              <Header
                style={{ marginTop: '10px', marginBottom: '10px' }}
                as="h3"
                textAlign="center"
                color="blue"
              >
                Addbacks and Adjustments
              </Header>
            </Grid.Column>
          </Grid.Row>
          <AddbacksAndAdjustmentsForm
            financialYear={this.state.financialYear}
          />
          <TotalAdjustmentsForm />
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
  isValid: PropTypes.bool
}

const mapPropsToValues = props => ({})

const validationSchema = Yup.object().shape({})

const handleSubmit = (values, { props, setSubmitting }) => {}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
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
