import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Slider } from 'react-semantic-ui-range'
// import _ from 'lodash'

class SliderComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      colorSliderBR: 'yellow',
      labelSliderBR: 'Acceptable Risk'
    }
  }

  _labelColorSlider (value) {
    this.setState({
      valueSliderBR: value
    })
    // this.setState({ objectDescriptionBR: _.find(this.props.descriptionBusinessRiskArray, o => o.points === value) })

    if (value >= 0 && value <= 20) {
      this.setState({
        labelSliderBR: this.props.type === 'businessRisk' ? 'Unsustainable Risk' : 'Weak',
        colorSliderBR: 'red'
      })
    }
    if (value >= 21 && value <= 40) {
      this.setState({
        labelSliderBR: this.props.type === 'businessRisk' ? 'Challenge Risk' : 'Challenging',
        colorSliderBR: 'orange'
      })
    }
    if (value >= 41 && value <= 60) {
      this.setState({
        labelSliderBR: this.props.type === 'businessRisk' ? 'Acceptable Risk' : 'Fair',
        colorSliderBR: 'yellow'
      })
    }
    if (value >= 61 && value <= 80) {
      this.setState({
        labelSliderBR: this.props.type === 'businessRisk' ? 'Attractive' : 'Good',
        colorSliderBR: 'teal'
      })
    }
    if (value >= 81 && value <= 100) {
      this.setState({
        labelSliderBR: this.props.type === 'businessRisk' ? 'Highly Attractive' : 'Bullish',
        colorSliderBR: 'green'
      })
    }
  }

  render () {
    return (
      <Slider
        color={this.state.colorSliderBR}
        inverted={false}
        settings={{
          start: this.props.value,
          min: 0,
          max: 100,
          step: 10,
          onChange: value => {
            this._labelColorSlider(value)
          }
        }}
      />
    )
  }
}

SliderComponent.propTypes = {
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
}

export default SliderComponent
