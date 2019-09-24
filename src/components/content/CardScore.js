import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, Icon } from 'semantic-ui-react'

const IconType = ({ icon }) => {
  if (icon < 30) {
    return (
      <Fragment>
        <Card.Meta style={{ marginTop: 10 }}>Needs urgent attention</Card.Meta>
        <Icon color="red" size="huge" name="frown" style={{ marginTop: 20 }} />
      </Fragment>
    )
  }
  if (icon >= 30 && icon <= 59) {
    return (
      <Fragment>
        <Card.Meta style={{ marginTop: 10 }}>Possible improvement</Card.Meta>
        <Icon color="yellow" size="huge" name="meh" style={{ marginTop: 20 }} />
      </Fragment>
    )
  }
  if (icon >= 60) {
    return (
      <Fragment>
        <Card.Meta style={{ marginTop: 10 }}>Satisfactory</Card.Meta>
        <Icon color="green" size="huge" name="smile" style={{ marginTop: 20 }} />
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
      <Card fluid style={{ height: '100%', backgroundColor: this.props.backgroundColor }}>
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
  icon: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired
}

IconType.propTypes = {
  icon: PropTypes.number.isRequired
}

export default CardScore
