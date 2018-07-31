import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Segment, Header, Form, Label } from 'semantic-ui-react'

class ContractFields extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    const { values, handleBlur, handleChange, errors, touched } = this.props
    return (
      <Fragment>
        <Header as="h3" content="Contract Fields" />
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
                // value={this.props.buyer.firstName}
              />
              <Form.Input
                label="Appraisal Low $"
                // value={this.props.buyer.firstName}
              />
              <Form.Input
                label="Engagement Fee"
                // value={this.props.buyer.firstName}
              />
              <Form.Input
                label="Commission %"
                // value={this.props.buyer.firstName}
              />
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
