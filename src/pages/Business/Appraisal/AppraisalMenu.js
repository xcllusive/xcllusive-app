import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Menu,
  Segment,
  Grid,
  Button,
  Icon,
  Header
  // Label
} from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import BusinessDetails from './BusinessDetails'
import About from './About'
import { theme } from '../../../styles'
import FinancialAnalysis from './FinancialAnalysis/FinancialAnalysis'
// import { getSystemSettings } from '../../redux/ducks/systemSettings'

class AppraisalMenuPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'Financial Analysis'
    }
  }

  componentDidMount () {
    // this.props.getSystemSettings()
  }

  _handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  _nextStep = () => {
    if (this.state.activeItem === 'Business Details') {
      this.setState({ activeItem: 'About' })
    }
    if (this.state.activeItem === 'About') {
      this.setState({ activeItem: 'Business Analysis' })
    }
    if (this.state.activeItem === 'Business Analysis') {
      this.setState({ activeItem: 'Financial Analysis' })
    }
    if (this.state.activeItem === 'Financial Analysis') {
      this.setState({ activeItem: 'Comparable Data' })
    }
    if (this.state.activeItem === 'Comparable Data') {
      this.setState({ activeItem: 'Pricing' })
    }
    if (this.state.activeItem === 'Pricing') {
      this.setState({ activeItem: 'Recommendations' })
    }
    if (this.state.activeItem === 'Recommendations') {
      this.setState({ activeItem: 'Confirm and Send' })
    }
  }

  _previousStep = () => {
    if (this.state.activeItem === 'About') {
      this.setState({ activeItem: 'Business Details' })
    }
    if (this.state.activeItem === 'Business Analysis') {
      this.setState({ activeItem: 'About' })
    }
    if (this.state.activeItem === 'Financial Analysis') {
      this.setState({ activeItem: 'Business Analysis' })
    }
    if (this.state.activeItem === 'Comparable Data') {
      this.setState({ activeItem: 'Financial Analysis' })
    }
    if (this.state.activeItem === 'Pricing') {
      this.setState({ activeItem: 'Comparable Data' })
    }
    if (this.state.activeItem === 'Recommendations') {
      this.setState({ activeItem: 'Pricing' })
    }
    if (this.state.activeItem === 'Confirm and Send') {
      this.setState({ activeItem: 'Recommendations' })
    }
  }

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
            <BusinessDetails business={business} />
          </Segment>
        ) : null}
        {this.state.activeItem === 'About' ? (
          <Segment>
            <About business={business} />
          </Segment>
        ) : null}
        {this.state.activeItem === 'Financial Analysis' ? (
          <Segment>
            <FinancialAnalysis business={business} />
          </Segment>
        ) : null}
        <Grid style={{ marginTop: 0 }}>
          <Grid.Column>
            <Button
              color={theme.buttonSave}
              onClick={() =>
                history.push(`/business/${this.props.match.params.id}`)
              }
              size="small"
              floated="left"
            >
              <Icon name="save" />
              Save and Complete Later
            </Button>
            <Button
              color="facebook"
              onClick={this._nextStep}
              size="small"
              floated="right"
            >
              <Icon name="forward" />
              Next Step
            </Button>
            <Button
              color={theme.buttonBack}
              onClick={this._previousStep}
              size="small"
              floated="right"
            >
              <Icon name="backward" />
              Previous Step
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

// const mapPropsToValues = props => ({})

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
