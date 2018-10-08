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

class PricingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
      ]
    }
  }

  componentDidMount () {}

  componentWillUnmount () {
    // this.props.updateAppraisal(this.props.values)
  }

  render () {
    // const { values, errors, touched, handleChange, handleBlur } = this.props
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
        <Segment style={{ backgroundColor: 'linen' }} size="tiny">
          <Grid celled="internally" divided>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">
                <b>Summary</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>2014</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>2015</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>2016</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>2017</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>2018</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>2019 Annualised</b>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Sales</Grid.Column>
              <Grid.Column textAlign="center">$1,406,306</Grid.Column>
              <Grid.Column textAlign="center">$1,272,094</Grid.Column>
              <Grid.Column textAlign="center">$0</Grid.Column>
              <Grid.Column textAlign="center">$0</Grid.Column>
              <Grid.Column textAlign="center">$0</Grid.Column>
              <Grid.Column textAlign="center">$0</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Gross Profit ($)</Grid.Column>
              <Grid.Column textAlign="center">$1,406,306</Grid.Column>
              <Grid.Column textAlign="center">$1,272,094</Grid.Column>
              <Grid.Column textAlign="center">$0</Grid.Column>
              <Grid.Column textAlign="center">$0</Grid.Column>
              <Grid.Column textAlign="center">$0</Grid.Column>
              <Grid.Column textAlign="center">$0</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Gross Profit (%)</Grid.Column>
              <Grid.Column textAlign="center">30 %</Grid.Column>
              <Grid.Column textAlign="center">25 %</Grid.Column>
              <Grid.Column textAlign="center">0 %</Grid.Column>
              <Grid.Column textAlign="center">0 %</Grid.Column>
              <Grid.Column textAlign="center">0 %</Grid.Column>
              <Grid.Column textAlign="center">0 %</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">
                <b>Adjusted Profit ($)</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>$30</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>$30</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>$0</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>$0</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>$0</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <b>$0</b>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Adjusted Profit (%)</Grid.Column>
              <Grid.Column textAlign="center">40 %</Grid.Column>
              <Grid.Column textAlign="center">50 %</Grid.Column>
              <Grid.Column textAlign="center">0 %</Grid.Column>
              <Grid.Column textAlign="center">0 %</Grid.Column>
              <Grid.Column textAlign="center">0 %</Grid.Column>
              <Grid.Column textAlign="center">0 %</Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <LineChart
            width={600}
            height={300}
            data={this.state.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="black" />
          </LineChart>
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
