import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Segment, Form, Label } from 'semantic-ui-react'

class OptionIntroductionBuyer extends Component {
  render () {
    const { values, handleBlur, handleChange, errors, touched } = this.props
    return (
      <Fragment>
        <Segment>
          <Form.Group widths="equal">
            <Form.Input
              label="Commission Discount %"
              name="commissionDiscount"
              autoComplete="commissionDiscount"
              value={values.commissionDiscount}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={values.optionIntroductionBuyer}
            />
            {errors.commissionDiscount &&
              touched.commissionDiscount && (
              <Label
                basic
                pointing
                color="red"
                content={errors.commissionDiscount}
              />
            )}
            <Form.TextArea
              label="Introduction Parties"
              name="introductionParties"
              autoComplete="introductionParties"
              value={values.introductionParties}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={values.optionIntroductionBuyer}
            />
            {errors.introductionParties &&
              touched.introductionParties && (
              <Label
                basic
                pointing
                color="red"
                content={errors.introductionParties}
              />
            )}
          </Form.Group>
        </Segment>
      </Fragment>
    )
  }
}

OptionIntroductionBuyer.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object
}

export default OptionIntroductionBuyer
