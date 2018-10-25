import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Segment, Grid, Button, Icon, Header, Progress, Label } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import BusinessDetails from './BusinessDetails'
import About from './About/About'
import { theme } from '../../../styles'
import FinancialAnalysis from './FinancialAnalysis/FinancialAnalysis'
// import { getSystemSettings } from '../../redux/ducks/systemSettings'
import { getBusiness } from '../../../redux/ducks/business'

import { getAppraisal } from '../../../redux/ducks/appraisal'
import BusinessAnalysis from './BusinessAnalysis'
import ComparableData from './ComparableData'
import Pricing from './Pricing/Pricing'
import NotesAndAssumptions from './NotesAndAssumptions'

class AppraisalMenuPage extends Component {
  constructor (props) {
    super(props)
    this.showViewAction = this.showViewAction.bind(this)
    this.state = {
      activeItem: 'NotesAndAssumptions',
      percent: 75,
      colorProgress: null,
      confirmBusinessDetail: false
    }
  }

  showViewAction (viewToShow) {
    this.setState({ confirmBusinessDetail: viewToShow })
  }

  componentDidMount () {
    this.props.getAppraisal(this.props.location.state.appraisalObject.id)
    this.setState({ colorProgress: this._colorProgress() })

    if (!this.props.business.id) {
      this.props.getBusiness(this.props.location.state.business.id)
    }

    this.setState({ confirmBusinessDetail: this.props.location.state.appraisalObject.confirmBusinessDetail })
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
      this.setState({ activeItem: 'NotesAndAssumptions' })
    }
    if (this.state.activeItem === 'NotesAndAssumptions') {
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
    if (this.state.activeItem === 'NotesAndAssumptions') {
      this.setState({ activeItem: 'Pricing' })
    }
    if (this.state.activeItem === 'Confirm and Send') {
      this.setState({ activeItem: 'NotesAndAssumptions' })
    }
  }

  _colorProgress = () => {
    if (this.state.percent >= 0 && this.state.percent <= 24) return 'red'
    if (this.state.percent >= 25 && this.state.percent <= 50) return 'orange'
    if (this.state.percent >= 50 && this.state.percent <= 75) return 'yellow'
    if (this.state.percent >= 75 && this.state.percent <= 99) return 'blue'
    if (this.state.percent === 100) return 'green'
  }

  render () {
    const { activeItem, colorProgress } = this.state
    const { history, business, appraisal, isLoadingAppraisal } = this.props
    const { isLoadingCreating } = this.props.location.state
    return (
      <Wrapper loading={isLoadingAppraisal}>
        <Segment size="mini">
          <Grid>
            <Grid.Row style={{ backgroundColor: '#ecf0f3' }} columns={2}>
              <Grid.Column width={11}>
                <Header as="h3" textAlign="center">
                  Business Appraisal Wizard
                </Header>
                <Header style={{ marginTop: '-10px' }} as="h3" textAlign="center" color="blue">
                  {business.businessName}
                </Header>
              </Grid.Column>
              <Grid.Column width={5}>
                <Progress label="Complete" color={colorProgress} percent={this.state.percent} progress />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Menu pointing horizontal="true" color="blue" fixed="top">
          <Menu.Item name="Business Details" active={activeItem === 'Business Details'} onClick={this._handleItemClick}>
            Business Details
            {this.state.confirmBusinessDetail ? (
              <Label style={{ marginLeft: '5px' }} circular empty color="green" size="medium" />
            ) : (
              <Label style={{ marginLeft: '5px' }} circular empty color="red" size="medium" />
            )}
          </Menu.Item>
          <Menu.Item name="About" active={activeItem === 'About'} onClick={this._handleItemClick}>
            About
          </Menu.Item>
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
          <Menu.Item name="Comparable Data" active={activeItem === 'Comparable Data'} onClick={this._handleItemClick} />
          <Menu.Item name="Pricing" active={activeItem === 'Pricing'} onClick={this._handleItemClick} />
          <Menu.Item
            name="Notes And Assumptions"
            active={activeItem === 'Notes And Assumptions'}
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
            <BusinessDetails
              business={business}
              isLoadingCreating={isLoadingCreating}
              appraisalObject={appraisal}
              showView={this.showViewAction}
            />
          </Segment>
        ) : null}
        {this.state.activeItem === 'About' ? (
          <Segment>
            <About business={business} appraisalObject={appraisal} />
          </Segment>
        ) : null}
        {this.state.activeItem === 'Business Analysis' ? (
          <Segment>
            <BusinessAnalysis business={business} appraisalObject={appraisal} />
          </Segment>
        ) : null}
        {this.state.activeItem === 'Financial Analysis' ? (
          <Segment>
            <FinancialAnalysis business={business} appraisalObject={appraisal} />
          </Segment>
        ) : null}
        {this.state.activeItem === 'Comparable Data' ? (
          <Segment>
            {appraisal && appraisal.id ? <ComparableData business={business} appraisalObject={appraisal} /> : null}
          </Segment>
        ) : null}
        {this.state.activeItem === 'Pricing' ? (
          <Segment>
            {appraisal && appraisal.id ? <Pricing business={business} appraisalObject={appraisal} /> : null}
          </Segment>
        ) : null}
        {this.state.activeItem === 'NotesAndAssumptions' ? (
          <Segment>
            {appraisal && appraisal.id ? <NotesAndAssumptions business={business} appraisalObject={appraisal} /> : null}
          </Segment>
        ) : null}
        <Grid style={{ marginTop: 0 }}>
          <Grid.Column>
            <Button
              color={theme.buttonSave}
              onClick={() => history.push(`/business/${this.props.match.params.id}`)}
              size="small"
              floated="left"
            >
              <Icon name="save" />
              Save and Complete Later
            </Button>
            <Button color="facebook" onClick={this._nextStep} size="small" floated="right">
              <Icon name="forward" />
              Next Step
            </Button>
            <Button color={theme.buttonBack} onClick={this._previousStep} size="small" floated="right">
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
  location: PropTypes.object,
  business: PropTypes.object,
  appraisal: PropTypes.object,
  getAppraisal: PropTypes.func,
  getBusiness: PropTypes.func,
  isLoadingAppraisal: PropTypes.bool
}

const mapStateToProps = state => ({
  appraisal: state.appraisal.get.object,
  isLoadingAppraisal: state.appraisal.get.isLoading,
  business: state.business.get.object
})

// const mapPropsToValues = props => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAppraisal,
      getBusiness
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppraisalMenuPage)
