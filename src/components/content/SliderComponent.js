import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'
import _ from 'lodash'

const SliderComponent = ({ value, onChange, type, descriptionArray }) => {
  let objectDescription = _.find(descriptionArray, o => o.points === value)

  let option = { label: '', color: 'white' }
  if (value >= 0 && value <= 20) {
    option.label = type === 'businessRisk' ? 'Unsustainable Risk' : 'Weak'
    option.color = 'red'
  }
  if (value >= 21 && value <= 40) {
    option.label = type === 'businessRisk' ? 'Challenge Risk' : 'Challenging'
    option.color = 'orange'
  }
  if (value >= 41 && value <= 60) {
    option.label = type === 'businessRisk' ? 'Acceptable Risk' : 'Fair'
    option.color = 'yellow'
  }
  if (value >= 61 && value <= 80) {
    option.label = type === 'businessRisk' ? 'Attractive' : 'Good'
    option.color = 'teal'
  }
  if (value >= 81 && value <= 100) {
    option.label = type === 'businessRisk' ? 'Highly Attractive' : 'Bullish'
    option.color = 'green'
  }
  console.log(value)
  return (
    <Fragment>
      <h3>{option.label}</h3>
      <label>{objectDescription ? objectDescription.label : null}</label>
      <Slider
        color={option.color}
        inverted={false}
        settings={{
          start: value,
          min: 0,
          max: 100,
          step: 10,
          onChange: value => onChange(value)
        }}
      />
      <Label color={option.color}>{value}</Label>
    </Fragment>
  )
}

SliderComponent.propTypes = {
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  descriptionArray: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SliderComponent
