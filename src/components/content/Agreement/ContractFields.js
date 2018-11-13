import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Segment, Form, Label } from 'semantic-ui-react'
import numeral from 'numeral'

class ContractFields extends Component {
  render () {
    const { values, handleBlur, handleChange, errors, touched } = this.props
    return (
      <Fragment>
        <Segment>
          <Form.Group widths="equal">
            <Form.Field>
              <Form.Input
                label="Listed Price $"
                name="listedPrice"
                autoComplete="listedPrice"
                value={numeral(values.listedPrice).format('$0,0.[99]')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.listedPrice && touched.listedPrice && (
                <Label basic pointing color="red" content={errors.listedPrice} />
              )}
            </Form.Field>
            <Form.Input
              label="Engagement Fee $"
              name="engagementFee"
              autoComplete="engagementFee"
              value={numeral(values.engagementFee).format('$0,0.[99]')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.engagementFee && touched.engagementFee && (
              <Label basic pointing color="red" content={errors.engagementFee} />
            )}
            <Form.Input
              label="Commission %"
              name="commissionPerc"
              autoComplete="commissionPerc"
              value={values.commissionPerc}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.commissionPerc && touched.commissionPerc && (
              <Label basic pointing color="red" content={errors.commissionPerc} />
            )}
            <Form.Input
              label="Minimum Commission $"
              name="minimumCommission"
              autoComplete="minimumCommission"
              value={numeral(values.minimumCommission).format('$0,0.[99]')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.minimumCommission && touched.minimumCommission && (
              <Label basic pointing color="red" content={errors.minimumCommission} />
            )}
            <Form.Input
              label="Appraisal High $"
              name="appraisalHigh"
              autoComplete="appraisalHigh"
              value={numeral(values.appraisalHigh).format('$0,0')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.appraisalHigh && touched.appraisalHigh && (
              <Label basic pointing color="red" content={errors.appraisalHigh} />
            )}
            <Form.Input
              label="Appraisal Low $"
              name="appraisalLow"
              autoComplete="appraisalLow"
              value={numeral(values.appraisalLow).format('$0,0.[99]')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.appraisalLow && touched.appraisalLow && (
              <Label basic pointing color="red" content={errors.appraisalLow} />
            )}
          </Form.Group>
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
