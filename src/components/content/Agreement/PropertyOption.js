import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Segment, Form, Label } from 'semantic-ui-react'
import numeral from 'numeral'

class PropertyOption extends Component {
  constructor (props) {
    super(props)
    this.state = {
      priceProperty: 0
    }
  }

  render () {
    const { values, handleBlur, handleChange, errors, touched } = this.props
    return (
      <Fragment>
        <Segment>
          <Form.Group widths="equal">
            <Form.Input
              label="Commission %"
              name="commissionProperty"
              autoComplete="commission"
              value={values.commissionProperty}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={values.propertyOptions}
            />
            {errors.commissionProperty && touched.commissionProperty && (
              <Label basic pointing color="red" content={errors.commissionProperty} />
            )}
            <Form.Input
              label="Address"
              name="addressProperty"
              autoComplete="addressProperty"
              value={values.addressProperty}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={values.propertyOptions}
            />
            {errors.addressProperty && touched.addressProperty && (
              <Label basic pointing color="red" content={errors.addressProperty} />
            )}
            <Form.Input
              label="Price $"
              name="priceProperty"
              autoComplete="priceProperty"
              value={numeral(values.priceProperty).format('$0,0.[99]')}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={values.propertyOptions}
            />
            {errors.priceProperty && touched.priceProperty && (
              <Label basic pointing color="red" content={errors.priceProperty} />
            )}
          </Form.Group>
        </Segment>
      </Fragment>
    )
  }
}

PropertyOption.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func
}

export default PropertyOption
