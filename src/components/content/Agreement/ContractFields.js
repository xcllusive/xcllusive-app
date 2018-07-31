import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Segment, Form, Label } from 'semantic-ui-react'

class ContractFields extends Component {
  render () {
    const { values, handleBlur, handleChange, errors, touched } = this.props
    return (
      <Fragment>
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="Listed Price"
                  name="listedPrice"
                  autoComplete="listedPrice"
                  value={values.listedPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.listedPrice &&
                  touched.listedPrice && (
                  <Label
                    basic
                    pointing
                    color="red"
                    content={errors.listedPrice}
                  />
                )}
              </Form.Field>
              <Form.Input
                label="Appraisal High $"
                name="appraisalHigh"
                autoComplete="appraisalHigh"
                value={values.appraisalHigh}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.appraisalHigh &&
                touched.appraisalHigh && (
                <Label
                  basic
                  pointing
                  color="red"
                  content={errors.appraisalHigh}
                />
              )}
              <Form.Input
                label="Appraisal Low $"
                name="appraisalLow"
                autoComplete="appraisalLow"
                value={values.appraisalLow}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.appraisalLow &&
                touched.appraisalLow && (
                <Label
                  basic
                  pointing
                  color="red"
                  content={errors.appraisalLow}
                />
              )}
              <Form.Input
                label="Engagement Fee"
                name="engagementFee"
                autoComplete="engagementFee"
                value={values.engagementFee}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.engagementFee &&
                touched.engagementFee && (
                <Label
                  basic
                  pointing
                  color="red"
                  content={errors.engagementFee}
                />
              )}
              <Form.Input
                label="Commission %"
                name="commissionPerc"
                autoComplete="commissionPerc"
                value={values.commissionPerc}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.commissionPerc &&
                touched.commissionPerc && (
                <Label
                  basic
                  pointing
                  color="red"
                  content={errors.commissionPerc}
                />
              )}
            </Form.Group>
          </Form>
        </Segment>
      </Fragment>
    )
  }
}

ContractFields.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object
}

export default ContractFields
