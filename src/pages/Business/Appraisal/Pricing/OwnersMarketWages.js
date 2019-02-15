import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Segment, Grid, Header } from 'semantic-ui-react'
import * as Yup from 'yup'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'

import numeral from 'numeral'

class OwnersMarketWagesPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _totalWages = appraisalObject => {
    let totalWages = 0
    if (appraisalObject && appraisalObject.owner7AnnualWage > 0) {
      totalWages = appraisalObject.owner7AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner6AnnualWage > 0) {
      totalWages = appraisalObject.owner6AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner5AnnualWage > 0) {
      totalWages = appraisalObject.owner5AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner4AnnualWage > 0) {
      totalWages = appraisalObject.owner4AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner3AnnualWage > 0) {
      totalWages = appraisalObject.owner3AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner2AnnualWage > 0) {
      totalWages = appraisalObject.owner2AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner1AnnualWage > 0) {
      totalWages = appraisalObject.owner1AnnualWage + totalWages
    }

    return totalWages
  }

  render () {
    const { appraisalObject } = this.props
    // const {} = this.state
    return (
      <Segment style={{ backgroundColor: '#ecf4fb' }} size="tiny">
        <Header as="h4" textAlign="center" color="blue">
          Owners Market Wages
        </Header>
        <Grid celled="internally" divided>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              <b>Position</b>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <b>Hours per Week</b>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <b>Annual Wage inc Super</b>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner1Position ? appraisalObject.owner1Position : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner1HoursPWeek ? appraisalObject.owner1HoursPWeek : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner1AnnualWage
                ? numeral(appraisalObject.owner1AnnualWage).format('$0,0')
                : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner2Position ? appraisalObject.owner2Position : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner2HoursPWeek ? appraisalObject.owner2HoursPWeek : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner2AnnualWage
                ? numeral(appraisalObject.owner2AnnualWage).format('$0,0')
                : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner3Position ? appraisalObject.owner3Position : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner3HoursPWeek ? appraisalObject.owner3HoursPWeek : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner3AnnualWage
                ? numeral(appraisalObject.owner3AnnualWage).format('$0,0')
                : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner4Position ? appraisalObject.owner4Position : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner4HoursPWeek ? appraisalObject.owner4HoursPWeek : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner4AnnualWage
                ? numeral(appraisalObject.owner4AnnualWage).format('$0,0')
                : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner5Position ? appraisalObject.owner5Position : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner5HoursPWeek ? appraisalObject.owner5HoursPWeek : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner5AnnualWage
                ? numeral(appraisalObject.owner5AnnualWage).format('$0,0')
                : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner6Position ? appraisalObject.owner6Position : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner6HoursPWeek ? appraisalObject.owner6HoursPWeek : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner6AnnualWage
                ? numeral(appraisalObject.owner6AnnualWage).format('$0,0')
                : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner7Position ? appraisalObject.owner7Position : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner7HoursPWeek ? appraisalObject.owner7HoursPWeek : null}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {appraisalObject && appraisalObject.owner7AnnualWage
                ? numeral(appraisalObject.owner7AnnualWage).format('$0,0')
                : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center" />
            <Grid.Column textAlign="center">Total Wages</Grid.Column>
            <Grid.Column textAlign="center">{numeral(this._totalWages(appraisalObject)).format('$0,0')}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

OwnersMarketWagesPage.propTypes = {
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
  })(OwnersMarketWagesPage)
)
