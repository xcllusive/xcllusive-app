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

import { getAppraisal, calcCompleteSteps } from '../../../redux/ducks/appraisal'
import BusinessAnalysis from './BusinessAnalysis'
import ComparableData from './ComparableData'
import Pricing from './Pricing/Pricing'
import NotesAndAssumptions from './NotesAndAssumptions'

class AppraisalMenuPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'Notes And Assumptions',
      percent: 75
    }
  }

  componentDidMount () {
    this.props.getAppraisal(this.props.location.state.appraisalObject.id)

    if (!this.props.business.id) {
      this.props.getBusiness(this.props.location.state.business.id)
    }
  }

  updateCompleteSteps = (name, confirm) => {
    this.props.calcCompleteSteps(name, confirm)
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
      this.setState({ activeItem: 'Notes And Assumptions' })
    }
    if (this.state.activeItem === 'Notes And Assumptions') {
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
    if (this.state.activeItem === 'Notes And Assumptions') {
      this.setState({ activeItem: 'Pricing' })
    }
    if (this.state.activeItem === 'Confirm and Send') {
      this.setState({ activeItem: 'Notes And Assumptions' })
    }
  }

  _calcPercCompleted = props => {
    return (
      props.percBusinessDetail +
      props.percAbout +
      props.percBusinessAnalysis +
      props.percFinancialAnalysis +
      props.percComparableData +
      props.percPricing +
      props.percNotesAndAssumptions
    )
  }

  _colorProgress = () => {
    const total = this._calcPercCompleted(this.props)
    if (total >= 0 && total <= 29) return 'red'
    if (total >= 30 && total <= 50) return 'orange'
    if (total >= 50 && total <= 79) return 'yellow'
    if (total >= 80 && total <= 99) return 'blue'
    if (total === 100) return 'green'
  }

  render () {
    const { activeItem } = this.state
    const {
      history,
      business,
      appraisal,
      isLoadingAppraisal,
      isConfirmBusinessDetail,
      isConfirmAbout,
      isConfirmBusinessAnalysis,
      isConfirmFinancialAnalysis,
      isConfirmComparableData,
      isConfirmPricing,
      isConfirmNotesAndAssumptions
    } = this.props
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
                <Progress
                  label="Completed"
                  color={this._colorProgress()}
                  percent={this._calcPercCompleted(this.props)}
                  progress
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Menu pointing horizontal="true" color="blue" fixed="top">
          <Menu.Item name="Business Details" active={activeItem === 'Business Details'} onClick={this._handleItemClick}>
            Business Details
            {isConfirmBusinessDetail ? (
              <Label style={{ marginLeft: '5px' }} circular empty color="green" size="medium" />
            ) : (
              <Label style={{ marginLeft: '5px' }} circular empty color="red" size="medium" />
            )}
          </Menu.Item>
          <Menu.Item name="About" active={activeItem === 'About'} onClick={this._handleItemClick}>
            About
            {isConfirmAbout ? (
              <Label style={{ marginLeft: '5px' }} circular empty color="green" size="medium" />
            ) : (
              <Label style={{ marginLeft: '5px' }} circular empty color="red" size="medium" />
            )}
          </Menu.Item>
          <Menu.Item
            name="Business Analysis"
            active={activeItem === 'Business Analysis'}
            onClick={this._handleItemClick}
          >
            Business Analysis
            {isConfirmBusinessAnalysis ? (
              <Label style={{ marginLeft: '5px' }} circular empty color="green" size="medium" />
            ) : (
              <Label style={{ marginLeft: '5px' }} circular empty color="red" size="medium" />
            )}
          </Menu.Item>
          <Menu.Item
            name="Financial Analysis"
            active={activeItem === 'Financial Analysis'}
            onClick={this._handleItemClick}
          >
            Financial Analysis
            {isConfirmFinancialAnalysis ? (
              <Label style={{ marginLeft: '5px' }} circular empty color="green" size="medium" />
            ) : (
              <Label style={{ marginLeft: '5px' }} circular empty color="red" size="medium" />
            )}
          </Menu.Item>
          <Menu.Item name="Comparable Data" active={activeItem === 'Comparable Data'} onClick={this._handleItemClick}>
            Comparable Data
            {isConfirmComparableData ? (
              <Label style={{ marginLeft: '5px' }} circular empty color="green" size="medium" />
            ) : (
              <Label style={{ marginLeft: '5px' }} circular empty color="red" size="medium" />
            )}
          </Menu.Item>
          <Menu.Item name="Pricing" active={activeItem === 'Pricing'} onClick={this._handleItemClick}>
            Pricing
            {isConfirmPricing ? (
              <Label style={{ marginLeft: '5px' }} circular empty color="green" size="medium" />
            ) : (
              <Label style={{ marginLeft: '5px' }} circular empty color="red" size="medium" />
            )}
          </Menu.Item>
          <Menu.Item
            name="Notes And Assumptions"
            active={activeItem === 'Notes And Assumptions'}
            onClick={this._handleItemClick}
          >
            Notes And Assumptions
            {isConfirmNotesAndAssumptions ? (
              <Label style={{ marginLeft: '5px' }} circular empty color="green" size="medium" />
            ) : (
              <Label style={{ marginLeft: '5px' }} circular empty color="red" size="medium" />
            )}
          </Menu.Item>
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
              confirmsCompleteSteps={this.updateCompleteSteps}
            />
          </Segment>
        ) : null}
        {this.state.activeItem === 'About' ? (
          <Segment>
            <About business={business} appraisalObject={appraisal} confirmsCompleteSteps={this.updateCompleteSteps} />
          </Segment>
        ) : null}
        {this.state.activeItem === 'Business Analysis' ? (
          <Segment>
            <BusinessAnalysis
              business={business}
              appraisalObject={appraisal}
              confirmsCompleteSteps={this.updateCompleteSteps}
            />
          </Segment>
        ) : null}
        {this.state.activeItem === 'Financial Analysis' ? (
          <Segment>
            <FinancialAnalysis
              business={business}
              appraisalObject={appraisal}
              confirmsCompleteSteps={this.updateCompleteSteps}
            />
          </Segment>
        ) : null}
        {this.state.activeItem === 'Comparable Data' ? (
          <Segment>
            {appraisal && appraisal.id ? (
              <ComparableData
                business={business}
                appraisalObject={appraisal}
                confirmsCompleteSteps={this.updateCompleteSteps}
              />
            ) : null}
          </Segment>
        ) : null}
        {this.state.activeItem === 'Pricing' ? (
          <Segment>
            {appraisal && appraisal.id ? (
              <Pricing
                business={business}
                appraisalObject={appraisal}
                confirmsCompleteSteps={this.updateCompleteSteps}
              />
            ) : null}
          </Segment>
        ) : null}
        {this.state.activeItem === 'Notes And Assumptions' ? (
          <Segment>
            {appraisal && appraisal.id ? (
              <NotesAndAssumptions
                business={business}
                appraisalObject={appraisal}
                confirmsCompleteSteps={this.updateCompleteSteps}
              />
            ) : null}
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
  isLoadingAppraisal: PropTypes.bool,
  calcCompleteSteps: PropTypes.func,
  isConfirmBusinessDetail: PropTypes.bool,
  isConfirmAbout: PropTypes.bool,
  isConfirmBusinessAnalysis: PropTypes.bool,
  isConfirmFinancialAnalysis: PropTypes.bool,
  isConfirmComparableData: PropTypes.bool,
  isConfirmPricing: PropTypes.bool,
  isConfirmNotesAndAssumptions: PropTypes.bool,
  percBusinessDetail: PropTypes.number,
  percAbout: PropTypes.number,
  percFinancialAnalysis: PropTypes.number,
  percBusinessAnalysis: PropTypes.number,
  percComparableData: PropTypes.number,
  percPricing: PropTypes.number,
  percNotesAndAssumptions: PropTypes.number
}

const mapStateToProps = state => ({
  appraisal: state.appraisal.get.object,
  isLoadingAppraisal: state.appraisal.get.isLoading,
  business: state.business.get.object,
  isConfirmBusinessDetail: state.appraisal.getCalcCompleteSteps.confirm.confirmBusinessDetail.isConfirm,
  isConfirmAbout: state.appraisal.getCalcCompleteSteps.confirm.confirmAbout.isConfirm,
  isConfirmCustomersSuppliers: state.appraisal.getCalcCompleteSteps.confirm.confirmCustomersSuppliers.isConfirm,
  isConfirmPremisesEnployees: state.appraisal.getCalcCompleteSteps.confirm.confirmPremisesEnployees.isConfirm,
  isConfirmOwnershipFinalNotes: state.appraisal.getCalcCompleteSteps.confirm.confirmOwnershipFinalNotes.isConfirm,
  isConfirmBusinessAnalysis: state.appraisal.getCalcCompleteSteps.confirm.confirmBusinessAnalysis.isConfirm,
  isConfirmFinancialAnalysis: state.appraisal.getCalcCompleteSteps.confirm.confirmFinancialAnalysis.isConfirm,
  isConfirmComparableData: state.appraisal.getCalcCompleteSteps.confirm.confirmComparableData.isConfirm,
  isConfirmPricing: state.appraisal.getCalcCompleteSteps.confirm.confirmPricing.isConfirm,
  isConfirmNotesAndAssumptions: state.appraisal.getCalcCompleteSteps.confirm.confirmNotesAndAssumptions.isConfirm,
  percBusinessDetail: state.appraisal.getCalcCompleteSteps.confirm.confirmBusinessDetail.completedPerc,
  percAbout: state.appraisal.getCalcCompleteSteps.confirm.confirmAbout.completedPerc,
  percBusinessAnalysis: state.appraisal.getCalcCompleteSteps.confirm.confirmBusinessAnalysis.completedPerc,
  percFinancialAnalysis: state.appraisal.getCalcCompleteSteps.confirm.confirmFinancialAnalysis.completedPerc,
  percComparableData: state.appraisal.getCalcCompleteSteps.confirm.confirmComparableData.completedPerc,
  percPricing: state.appraisal.getCalcCompleteSteps.confirm.confirmPricing.completedPerc,
  percNotesAndAssumptions: state.appraisal.getCalcCompleteSteps.confirm.confirmNotesAndAssumptions.completedPerc
})

// const mapPropsToValues = props => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAppraisal,
      getBusiness,
      calcCompleteSteps
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppraisalMenuPage)
