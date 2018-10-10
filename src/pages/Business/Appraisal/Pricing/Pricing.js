import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../../components/content/Wrapper'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
import SalesGPProfit from './SalesGPProfit'
import Charts from './Charts'

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
          <SalesGPProfit appraisalObject={appraisalObject} />
        </Segment>
        <Segment style={{ backgroundColor: '#ecf4fb' }}>
          <Charts appraisalObject={appraisalObject} />
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
