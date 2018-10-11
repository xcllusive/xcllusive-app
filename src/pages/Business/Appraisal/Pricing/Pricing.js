import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Segment, Grid, Form } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../../components/content/Wrapper'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
import SalesGPProfit from './SalesGPProfit'
import Charts from './Charts'
import SummaryOfFinancial from './SummaryOfFinancial'
import OwnersMarketWages from './OwnersMarketWages'

class PricingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _handleChangeCheckBox = (name, value) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const { appraisalObject, values } = this.props
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
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <SummaryOfFinancial appraisalObject={appraisalObject} />
            </Grid.Column>
            <Grid.Column>
              <OwnersMarketWages appraisalObject={appraisalObject} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Segment style={{ backgroundColor: '#d4d4d53b' }}>
          <Grid celled="internally" divided>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITA last year"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 1)}
                      checked={values.pricingMethod === 1}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>test</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITA AVG"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 2)}
                      checked={values.pricingMethod === 2}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>test</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="PEBITA last year"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 3)}
                      checked={values.pricingMethod === 3}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>test</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="PEBITA Multiplier"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 4)}
                      checked={values.pricingMethod === 4}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>test</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="T/O Multiplier"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 5)}
                      checked={values.pricingMethod === 5}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>test</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Assets Value"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 6)}
                      checked={values.pricingMethod === 6}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>test</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Agreed Value"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 7)}
                      checked={values.pricingMethod === 7}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>test</Grid.Column>
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
  id: props.appraisalObject ? props.appraisalObject.id : '',
  pricingMethod: props.appraisalObject ? props.appraisalObject.pricingMethod : 1
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
