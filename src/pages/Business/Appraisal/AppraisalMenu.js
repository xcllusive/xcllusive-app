import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Segment, Grid, Button, Icon, Header } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import LoginForm from '../../../components/forms/LoginForm'

// import { getSystemSettings } from '../../redux/ducks/systemSettings'

class AppraisalMenuPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'Business Details',
      test: 'test'
    }
  }

  componentDidMount () {
    // this.props.getSystemSettings()
  }

  _handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state
    const { history } = this.props
    const { business } = this.props.location.state
    return (
      <Wrapper>
        <Segment size="mini">
          <Grid>
            <Grid.Row style={{ backgroundColor: '#ecf0f3' }}>
              <Grid.Column>
                <Header as="h3" textAlign="center">
                  Business Appraisal Wizard
                </Header>
                <Header
                  style={{ marginTop: '-10px' }}
                  as="h3"
                  textAlign="center"
                  color="blue"
                >
                  {business.businessName}
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Menu pointing horizontal="true" color="blue" fixed="top">
          <Menu.Item
            name="Business Details"
            active={activeItem === 'Business Details'}
            onClick={this._handleItemClick}
          />
          <Menu.Item
            name="About"
            active={activeItem === 'About'}
            onClick={this._handleItemClick}
          />
          <Menu.Item
            name="Business Analysis"
            active={activeItem === 'Business Analysis'}
            onClick={this._handleItemClick}
          />
          <Menu.Item
            name="Financial Analysis"
            active={activeItem === 'Financial Analysis'}
            onClick={this._handleItemClick}
          />
          <Menu.Item
            name="Comparable Data"
            active={activeItem === 'Comparable Data'}
            onClick={this._handleItemClick}
          />
          <Menu.Item
            name="Pricing"
            active={activeItem === 'Pricing'}
            onClick={this._handleItemClick}
          />
          <Menu.Item
            name="Recommendations"
            active={activeItem === 'Recommendations'}
            onClick={this._handleItemClick}
          />
          <Menu.Item
            name="Confirm and Send"
            active={activeItem === 'Confirm and Send'}
            onClick={this._handleItemClick}
          />
        </Menu>
        {this.state.activeItem === 'Business Details' ? (
          <Segment>
            <LoginForm />
            <LoginForm />
            <LoginForm />
            <LoginForm />
            <LoginForm />
            <LoginForm />
            <LoginForm />
          </Segment>
        ) : null}
        {this.state.activeItem === 'About' ? (
          <Segment>
            <LoginForm />
          </Segment>
        ) : null}
        <Grid style={{ marginTop: 0 }}>
          <Grid.Column>
            <Button
              color="green"
              onClick={() =>
                history.push(`/business/${this.props.match.params.id}`)
              }
              size="small"
              floated="left"
            >
              <Icon name="backward" />
              Return to Business
            </Button>
          </Grid.Column>
        </Grid>
      </Wrapper>
    )
  }
}

AppraisalMenuPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // getSystemSettings
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppraisalMenuPage)
