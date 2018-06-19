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
