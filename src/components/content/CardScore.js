import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Image, Card } from 'semantic-ui-react'

const IconType = props => {
  const { icon } = props

  if (icon < 30) {
    return (
      <Fragment>
        <Card.Meta style={{ marginTop: 10 }}>Needs urgent attention</Card.Meta>
        <Image
          style={{ width: '40px', marginTop: 20 }}
          size="mini"
          src={'https://image.flaticon.com/icons/svg/25/25327.svg'}
        />
      </Fragment>
    )
  }
  if (icon >= 30 && icon <= 59) {
    return (
      <Fragment>
        <Card.Meta style={{ marginTop: 10 }}>Possible improvement</Card.Meta>
        <Image
          style={{ width: '40px', marginTop: 20 }}
          size="mini"
          src={'https://image.flaticon.com/icons/svg/25/25693.svg'}
        />
      </Fragment>
    )
  }
  if (icon >= 60) {
    return (
      <Fragment>
        <Card.Meta style={{ marginTop: 10 }}>Satisfactory</Card.Meta>
        <Image
          style={{ width: '40px', marginTop: 20 }}
          size="mini"
          src={'https://image.flaticon.com/icons/svg/25/25361.svg'}
        />
      </Fragment>
    )
  }
  return null
}

class CardScore extends Component {
  constructor (props) {
    super(props)
    this.state = { image: '', subtitle: '' }
  }

<<<<<<< HEAD
=======
  _calculateIcon () {
    if (this.props.icon < 30) {
      console.log('1')
      const src = 'https://image.flaticon.com/icons/svg/25/25327.svg'
      const message = 'Needs urgent attention'
      this.setState({
        image: src,
        subtitle: message
      })
    }
    if (this.props.icon >= 30 && this.props.icon <= 59) {
      console.log('2')
      const src = 'https://image.flaticon.com/icons/svg/25/25693.svg'
      const message = 'Possible improvement'
      this.setState({
        image: src,
        subtitle: message
      })
    }
    if (this.props.icon >= 60) {
      console.log('3')
      const src = 'https://image.flaticon.com/icons/svg/25/25361.svg'
      const message = 'Satisfactory'
      this.setState({
        image: src,
        subtitle: message
      })
    }
    return this.state.image
  }

>>>>>>> 8e448663839563fff7e0d5c0feca1c35d408c7c3
  render () {
    return (
      <Card fluid style={{ height: '100%' }}>
        <Card.Content textAlign="center">
          <Card.Header>{this.props.header}</Card.Header>
          <Card.Description style={{ marginTop: 10 }}>
            <span className="date">{this.props.title}</span>
          </Card.Description>
          <Card.Meta style={{ marginTop: 10 }}>{this.state.subtitle}</Card.Meta>
          <IconType icon={this.props.icon} />
        </Card.Content>
      </Card>
    )
  }
}

CardScore.propTypes = {
  header: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired
}

IconType.propTypes = {
  icon: PropTypes.number.isRequired
}

export default CardScore
