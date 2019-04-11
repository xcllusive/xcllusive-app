import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Segment, Grid } from 'semantic-ui-react'
import * as Yup from 'yup'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, YAxis, Legend } from 'recharts'
import numeral from 'numeral'

class ChartsPage extends Component {
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

  async _mountGraph1 (appraisalObject) {
    if (appraisalObject && appraisalObject.sales1 > 0) {
      const obj1 = {
        year: appraisalObject.year1,
        Sales: appraisalObject.sales1,
        'Gross Profit': appraisalObject.calcGrossProfit1,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit1
      }
      await this.setState({ graph1: [...this.state.graph1, obj1] })
    }
    if (appraisalObject && appraisalObject.sales2 > 0) {
      const obj2 = {
        year: appraisalObject.year2,
        Sales: appraisalObject.sales2,
        'Gross Profit': appraisalObject.calcGrossProfit2,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit2
      }
      await this.setState({ graph1: [...this.state.graph1, obj2] })
    }
    if (appraisalObject && appraisalObject.sales3 > 0) {
      const obj3 = {
        year: appraisalObject.year3,
        Sales: appraisalObject.sales3,
        'Gross Profit': appraisalObject.calcGrossProfit3,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit3
      }
      await this.setState({ graph1: [...this.state.graph1, obj3] })
    }
    if (appraisalObject && appraisalObject.sales4 > 0) {
      const obj4 = {
        year: appraisalObject.year4,
        Sales: appraisalObject.sales4,
        'Gross Profit': appraisalObject.calcGrossProfit4,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit4
      }
      await this.setState({ graph1: [...this.state.graph1, obj4] })
    }
    if (appraisalObject && appraisalObject.sales5 > 0) {
      const obj5 = {
        year: appraisalObject.year5,
        Sales: appraisalObject.sales5,
        'Gross Profit': appraisalObject.calcGrossProfit5,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit5
      }
      await this.setState({ graph1: [...this.state.graph1, obj5] })
    }
    if (appraisalObject && appraisalObject.sales6 > 0) {
      const obj6 = {
        year: appraisalObject.year6,
        Sales: appraisalObject.sales6,
        'Gross Profit': appraisalObject.calcGrossProfit6,
        'Total Adjusted Profit': appraisalObject.totalAdjustedProfit6
      }
      await this.setState({ graph1: [...this.state.graph1, obj6] })
    }
  }

  async _mountGraph2 (appraisalObject) {
    if (appraisalObject && appraisalObject.sales1 > 0) {
      const obj1 = {
        year: appraisalObject.year1,
        'Gross Profit %': Math.round(appraisalObject.calcOperatingProfitPerc1),
        'Adjusted Profit %': Math.round(appraisalObject.adjustedProfitPerc1)
      }
      await this.setState({ graph2: [...this.state.graph2, obj1] })
    }
    if (appraisalObject && appraisalObject.sales2 > 0) {
      const obj2 = {
        year: appraisalObject.year2,
        'Gross Profit %': Math.round(appraisalObject.calcOperatingProfitPerc2),
        'Adjusted Profit %': Math.round(appraisalObject.adjustedProfitPerc2)
      }
      await this.setState({ graph2: [...this.state.graph2, obj2] })
    }
    if (appraisalObject && appraisalObject.sales3 > 0) {
      const obj3 = {
        year: appraisalObject.year3,
        'Gross Profit %': Math.round(appraisalObject.calcOperatingProfitPerc3),
        'Adjusted Profit %': Math.round(appraisalObject.adjustedProfitPerc3)
      }
      await this.setState({ graph2: [...this.state.graph2, obj3] })
    }
    if (appraisalObject && appraisalObject.sales4 > 0) {
      const obj4 = {
        year: appraisalObject.year4,
        'Gross Profit %': Math.round(appraisalObject.calcOperatingProfitPerc4),
        'Adjusted Profit %': Math.round(appraisalObject.adjustedProfitPerc4)
      }
      await this.setState({ graph2: [...this.state.graph2, obj4] })
    }
    if (appraisalObject && appraisalObject.sales5 > 0) {
      const obj5 = {
        year: appraisalObject.year5,
        'Gross Profit %': Math.round(appraisalObject.calcOperatingProfitPerc5),
        'Adjusted Profit %': Math.round(appraisalObject.adjustedProfitPerc5)
      }
      await this.setState({ graph2: [...this.state.graph2, obj5] })
    }
    if (appraisalObject && appraisalObject.sales6 > 0) {
      const obj6 = {
        year: appraisalObject.year6,
        'Gross Profit %': Math.round(appraisalObject.calcOperatingProfitPerc6),
        'Adjusted Profit %': Math.round(appraisalObject.adjustedProfitPerc6)
      }
      await this.setState({ graph2: [...this.state.graph2, obj6] })
    }
  }

  render () {
    return (
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
                <YAxis tickFormatter={value => numeral(value).format('$0,0')} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={value => numeral(value).format('$0,0')} />
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
    )
  }
}

ChartsPage.propTypes = {
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
  })(ChartsPage)
)
