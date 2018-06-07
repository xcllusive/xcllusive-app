import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  Card
} from 'semantic-ui-react'

class CardScore extends Component {
  render () {
    return (
      <Card fluid style={{ height: '100%' }}>
        <Card.Content textAlign="center">
          <Card.Header>{this.props.header}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.title}</span>
          </Card.Meta>
          <Card.Description>{this.props.subtitle}</Card.Description>
          <Image size="mini" src='https://image.flaticon.com/icons/svg/25/25361.svg' />
        </Card.Content>
      </Card>
    )
  }
}

// https://image.flaticon.com/icons/svg/25/25361.svg - HAPPY
// https://image.flaticon.com/icons/svg/25/25327.svg - SAD
// https://image.flaticon.com/icons/svg/25/25693.svg - OK

CardScore.propTypes = {
  header: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
  // icon: PropTypes.icon.isRequired
}

export default CardScore
