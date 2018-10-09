import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Segment, Grid } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal } from '../../../redux/ducks/appraisal'
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, YAxis, Legend } from 'recharts'
import numeral from 'numeral'

class PricingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      graph1: [],
      graph2: []
    }
  }

  componentDidMount () {
    this._mountGraph1(this.props.appraisalObject)
    this._mountGraph2(this.props.appraisalObject)
  }

  componentWillUnmount () {
    // this.props.updateAppraisal(this.props.values)
  }

  async _mountGraph1 (appraisalObject) {
    if (appraisalObject && appraisalObject.sales1 > 0) {
      const obj1 = {
        year: appraisalObject.year1,
        Sales: appraisalObject.sales1,
        'Gross Profit': appraisalObject.grossProfit1,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit1
      }
      await this.setState({ graph1: [...this.state.graph1, obj1] })
    }
    if (appraisalObject && appraisalObject.sales2 > 0) {
      const obj2 = {
        year: appraisalObject.year2,
        Sales: appraisalObject.sales2,
        'Gross Profit': appraisalObject.grossProfit2,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit2
      }
      await this.setState({ graph1: [...this.state.graph1, obj2] })
    }
    if (appraisalObject && appraisalObject.sales3 > 0) {
      const obj3 = {
        year: appraisalObject.year3,
        Sales: appraisalObject.sales3,
        'Gross Profit': appraisalObject.grossProfit3,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit3
      }
      await this.setState({ graph1: [...this.state.graph1, obj3] })
    }
    if (appraisalObject && appraisalObject.sales4 > 0) {
      const obj4 = {
        year: appraisalObject.year4,
        Sales: appraisalObject.sales4,
        'Gross Profit': appraisalObject.grossProfit4,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit4
      }
      await this.setState({ graph1: [...this.state.graph1, obj4] })
    }
    if (appraisalObject && appraisalObject.sales5 > 0) {
      const obj5 = {
        year: appraisalObject.year5,
        Sales: appraisalObject.sales5,
        'Gross Profit': appraisalObject.grossProfit5,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit5
      }
      await this.setState({ graph1: [...this.state.graph1, obj5] })
    }
    if (appraisalObject && appraisalObject.sales6 > 0) {
      const obj6 = {
        year: appraisalObject.year6,
        Sales: appraisalObject.sales6,
        'Gross Profit': appraisalObject.grossProfit6,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit6
      }
      await this.setState({ graph1: [...this.state.graph1, obj6] })
    }
  }

  async _mountGraph2 (appraisalObject) {
    if (appraisalObject && appraisalObject.sales1 > 0) {
      const obj1 = {
        year: appraisalObject.year1,
        'Gross Profit %': appraisalObject.grossMarginPerc1,
        'Adjusted Profit %': appraisalObject.adjustedProfitPerc1
      }
      await this.setState({ graph1: [...this.state.graph1, obj1] })
    }
    if (appraisalObject && appraisalObject.sales2 > 0) {
      const obj2 = {
        year: appraisalObject.year2,
        'Gross Profit %': appraisalObject.grossMarginPerc2,
        'Adjusted Profit %': appraisalObject.adjustedProfitPerc2
      }
      await this.setState({ graph2: [...this.state.graph2, obj2] })
    }
    if (appraisalObject && appraisalObject.sales3 > 0) {
      const obj3 = {
        year: appraisalObject.year3,
        'Gross Profit %': appraisalObject.grossMarginPerc3,
        'Adjusted Profit %': appraisalObject.adjustedProfitPerc3
      }
      await this.setState({ graph2: [...this.state.graph2, obj3] })
    }
    if (appraisalObject && appraisalObject.sales4 > 0) {
      const obj4 = {
        year: appraisalObject.year4,
        'Gross Profit %': appraisalObject.grossMarginPerc4,
        'Adjusted Profit %': appraisalObject.adjustedProfitPerc4
      }
      await this.setState({ graph2: [...this.state.graph2, obj4] })
    }
    if (appraisalObject && appraisalObject.sales5 > 0) {
      const obj5 = {
        year: appraisalObject.year5,
        'Gross Profit %': appraisalObject.grossMarginPerc5,
        'Adjusted Profit %': appraisalObject.adjustedProfitPerc5
      }
      await this.setState({ graph2: [...this.state.graph2, obj5] })
    }
    if (appraisalObject && appraisalObject.sales6 > 0) {
      const obj6 = {
        year: appraisalObject.year6,
        'Gross Profit %': appraisalObject.grossMarginPerc6,
        'Adjusted Profit %': appraisalObject.adjustedProfitPerc6
      }
      await this.setState({ graph2: [...this.state.graph2, obj6] })
    }
  }

  render () {
    const { appraisalObject } = this.props
    // const {} = this.state
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step active icon="calculator" title="Step 5" description="Pricing" />
          <Message info size="large">
            <p>
              On this page you can assess the results of your financial inputs and Financial Analysis in order to
              identify the best pricing method for the business.
            </p>
          </Message>
        </Step.Group>
        <Segment style={{ backgroundColor: '#d4d4d53b' }} size="tiny">
          <Grid celled="internally" divided>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">
                <b>Summary</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales1 > 0 ? <b>{appraisalObject.year1}</b> : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales2 > 0 ? <b>{appraisalObject.year2}</b> : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales3 > 0 ? <b>{appraisalObject.year3}</b> : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales4 > 0 ? <b>{appraisalObject.year4}</b> : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales5 > 0 ? <b>{appraisalObject.year5}</b> : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales6 > 0 ? <b>{appraisalObject.year6} Annualised</b> : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Sales</Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales1 > 0
                  ? numeral(appraisalObject.sales1).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales2 > 0
                  ? numeral(appraisalObject.sales2).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales3 > 0
                  ? numeral(appraisalObject.sales3).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales4 > 0
                  ? numeral(appraisalObject.sales4).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales5 > 0
                  ? numeral(appraisalObject.sales5).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.sales6 > 0
                  ? numeral(appraisalObject.sales6).format('$0,0.[99]')
                  : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Gross Profit ($)</Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossProfit1 > 0
                  ? numeral(appraisalObject.grossProfit1).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossProfit2 > 0
                  ? numeral(appraisalObject.grossProfit2).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossProfit3 > 0
                  ? numeral(appraisalObject.grossProfit3).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossProfit4 > 0
                  ? numeral(appraisalObject.grossProfit4).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossProfit5 > 0
                  ? numeral(appraisalObject.grossProfit5).format('$0,0.[99]')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossProfit6 > 0
                  ? numeral(appraisalObject.grossProfit6).format('$0,0.[99]')
                  : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Gross Profit (%)</Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossMarginPerc1 > 0
                  ? `${appraisalObject.grossMarginPerc1}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossMarginPerc2 > 0
                  ? `${appraisalObject.grossMarginPerc2}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossMarginPerc3 > 0
                  ? `${appraisalObject.grossMarginPerc3}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossMarginPerc4 > 0
                  ? `${appraisalObject.grossMarginPerc4}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossMarginPerc5 > 0
                  ? `${appraisalObject.grossMarginPerc5}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.grossMarginPerc6 > 0
                  ? `${appraisalObject.grossMarginPerc6}%`
                  : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">
                <b>Adjusted Profit ($)</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.totalAdjustedProfit1 > 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit1).format('$0,0.[99]')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.totalAdjustedProfit2 > 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit2).format('$0,0.[99]')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.totalAdjustedProfit3 > 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit3).format('$0,0.[99]')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.totalAdjustedProfit4 > 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit4).format('$0,0.[99]')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.totalAdjustedProfit5 > 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit5).format('$0,0.[99]')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.totalAdjustedProfit6 > 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit6).format('$0,0.[99]')}</b>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Adjusted Profit (%)</Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.adjustedProfitPerc1 > 0
                  ? `${appraisalObject.adjustedProfitPerc1}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.adjustedProfitPerc2 > 0
                  ? `${appraisalObject.adjustedProfitPerc2}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.adjustedProfitPerc3 > 0
                  ? `${appraisalObject.adjustedProfitPerc3}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.adjustedProfitPerc4 > 0
                  ? `${appraisalObject.adjustedProfitPerc4}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.adjustedProfitPerc5 > 0
                  ? `${appraisalObject.adjustedProfitPerc5}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject && appraisalObject.adjustedProfitPerc6 > 0
                  ? `${appraisalObject.adjustedProfitPerc6}%`
                  : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ backgroundColor: '#ecf4fb' }}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <LineChart
                  width={600}
                  height={300}
                  data={this.state.graph1}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={value => numeral(value).format('$0,0.[99]')} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={value => numeral(value).format('$0,0.[99]')} />
                  <Legend />
                  <Line type="monotone" dataKey="Sales" stroke="orange" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Gross Profit" stroke="blue" strokeWidth={2} />
                  <Line type="monotone" dataKey="Total Adjusted Profit" stroke="green" strokeWidth={2} />
                </LineChart>
              </Grid.Column>
              <Grid.Column>
                <LineChart
                  width={600}
                  height={300}
                  data={this.state.graph2}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={value => `${value}%`} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={value => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="Gross Profit %" stroke="purple" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Adjusted Profit %" stroke="red" strokeWidth={2} />
                </LineChart>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Wrapper>
    )
  }
}

PricingPage.propTypes = {
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
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : ''
})

const mapStateToProps = state => {
  return {}
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAppraisal
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(PricingPage)
)
