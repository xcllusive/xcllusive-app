import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Header, Segment, Statistic, Grid, Form, Button, Icon, Tab, Dimmer, Loader } from 'semantic-ui-react'
import moment from 'moment'
import numeral from 'numeral'
import _ from 'lodash'
import Wrapper from '../../components/content/Wrapper'
import EditBusinessDetailForm from '../../components/forms/EditBusinessDetailForm'
import EditBusinessPriceForm from '../../components/forms/EditBusinessPriceForm'

import {
  getBusiness,
  cleanBusiness,
  verifyBusinessFirstOpenByAgent,
  setLastBusinessTabSelected
} from '../../redux/ducks/business'
import { getBusinessFromBuyer, getBusinessLogFromBuyer } from '../../redux/ducks/buyer'
import { getLogFromBusiness } from '../../redux/ducks/businessLog'
import BusinessLogList from './BusinessLogList'

class BusinessEditPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      isUpdated: false
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.error && nextProps.error !== prevState.error) {
      nextProps.history.goBack()
    }
    // if (nextProps.isUpdated) {
    //   console.log(nextProps)
    //   // nextProps.getBusiness(nextProps.match.params.id)
    // }

    return {
      error: nextProps.error,
      isUpdated: nextProps.isUpdated
    }
  }

  componentDidMount () {
    const { id } = this.props.match.params
    if (
      (this.props.location.state && this.props.location.state.fromBuyerMenu) ||
      (this.props.location && this.props.location.pathname === `/business/${id}/from-buyer`)
    ) {
      this.props.getBusinessFromBuyer(id)
      this.props.getBusinessLogFromBuyer(id)
    } else {
      this.props.getBusiness(id)
      this.props.getLogFromBusiness(id)
      this.props.verifyBusinessFirstOpenByAgent(id)
    }
    this.setState({ isUserClientManager: this._isUserClientManager() })
  }

  shouldComponentUpdate (nextprops) {
    const { id } = this.props.match.params
    if (
      (this.props.location.state && this.props.location.state.fromBuyerMenu) ||
      (this.props.location && this.props.location.pathname === `/business/${id}/from-buyer`)
    ) {
      if (this.props.isLoadingGetFromBuyer === nextprops.isLoadingGetFromBuyer) {
        return false
      }
    } else {
      if (this.props.isLoading === nextprops.isLoading) {
        return false
      }
    }

    return true
  }

  componentWillUnmount () {
    this.props.cleanBusiness()
  }

  _isUserClientManager = () => {
    return _.includes(this.props.userRoles, 'CLIENT_MANAGER_MENU')
  }

  _getProduct (id) {
    if (id === 1) {
      return 'Business Sale'
    }
    if (id === 2) {
      return 'Seller Assist'
    }
    if (id === 3) {
      return 'Franchise Sale'
    }
  }

  _getStage (id) {
    if (this.props.business.company_id === 1) {
      const stage = this.props.stageOptions.map(item => {
        if (item.value === id) {
          return item.text
        }
      })
      return stage
    } else {
      const stage = this.props.ctcStageOptions.map(item => {
        if (item.value === id) {
          return item.text
        }
      })
      return stage
    }
  }

  _diffDays = date => {
    return moment().diff(date, 'day')
  }

  _backToPreviousPage () {
    this.props.history.goBack()
  }

  _openBusinessLog = () => {
    if (
      (this.props.location.state && this.props.location.state.fromBuyerMenu) ||
      (this.props.location && this.props.location.pathname === `/business/${this.props.match.params.id}/from-buyer`)
    ) {
      return this.props.history.push({
        pathname: `/business/${this.props.business.id}/log/from-buyer`,
        state: {
          fromBuyerMenu: true,
          newCommunication: true
        }
      })
    } else {
      return this.props.history.push({
        pathname: `${this.props.match.url}/log`,
        state: {
          newCommunication: true
        }
      })
    }
  }

  _handleSelect = async (e, { activeIndex }) => {
    await this.props.setLastBusinessTabSelected(activeIndex)
    this.props.getBusiness(this.props.business.id)
  }

  render () {
    const { isLoading, business, history, isLoadingGetFromBuyer, match } = this.props

    if (isLoading && isLoadingGetFromBuyer) {
      return (
        <Dimmer
          inverted
          active={
            (this.props.location.state && this.props.location.state.fromBuyerMenu) ||
            (this.props.location &&
              this.props.location.pathname === `/business/${this.props.match.params.id}/from-buyer`)
              ? isLoadingGetFromBuyer
              : isLoading
          }
        >
          <Loader inverted />
        </Dimmer>
      )
    }
    return (
      <Wrapper>
        <Grid>
          {this.props.location.state && this.props.location.state.previousPage ? (
            <Grid.Row
              style={{
                marginTop: '25px',
                marginBottom: 0,
                paddingBottom: 0
              }}
            >
              <Grid.Column floated="left">
                <Header>
                  <Button size="small" color="green" onClick={() => this._backToPreviousPage()}>
                    <Icon name="backward" />
                    Back to {this.props.location.state.previousPage}
                  </Button>
                </Header>
              </Grid.Column>
            </Grid.Row>
          ) : null}
          <Grid.Row
            style={{
              justifyContent: 'center',
              marginTop: '25px',
              marginBottom: 0,
              paddingBottom: 0
            }}
          >
            <Statistic.Group size="mini" widths={16}>
              <Statistic color="orange">
                <Statistic.Value>
                  BS
                  {this.props.business.id}
                </Statistic.Value>
                <Statistic.Label>Id</Statistic.Label>
              </Statistic>
              <Statistic color="orange">
                <Statistic.Value>{this.props.business.businessName}</Statistic.Value>
                <Statistic.Label>Business Name</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{numeral(this.props.business.listedPrice).format('0,0.00')}</Statistic.Value>
                <Statistic.Label>Price</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{this.props.totalEnquiry}</Statistic.Value>
                <Statistic.Label>Enquiries</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>
                  {this.props.business.daysOnTheMarket === null
                    ? 0
                    : this._diffDays(this.props.business.daysOnTheMarket)}
                </Statistic.Value>
                <Statistic.Label>Days on the market</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{moment().diff(moment(business.dateTimeCreated), 'days')} Days</Statistic.Value>
                <Statistic.Label>Age</Statistic.Label>
              </Statistic>
              <Statistic color="green">
                <Statistic.Value>
                  {this._getStage(business.company_id === 1 ? business.stageId : business.ctcStageId)}
                </Statistic.Value>
                <Statistic.Label>Stage</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: 0 }}>
            <Tab
              activeIndex={this.props.indexLastTabSelected}
              onTabChange={this._handleSelect}
              renderActiveOnly
              style={{ width: '100%', padding: '0 15px' }}
              menu={{ secondary: true, pointing: true }}
              panes={[
                {
                  menuItem: 'Business Detail',
                  render: () => (
                    <Tab.Pane style={{ backgroundColor: '#f1f1f1' }} className="BusinessDetail">
                      <Segment size="mini" inverted color={this.props.business.company_id === 1 ? 'blue' : 'green'}>
                        <Grid>
                          <Grid.Row columns={3}>
                            <Grid.Column>
                              <Header as="h3" textAlign="left" inverted>
                                Business Detail
                              </Header>
                            </Grid.Column>
                            <Grid.Column>
                              <Header as="h2" textAlign="center" inverted>
                                {this.props.business.company_id === 1 ? 'Xcllusive Business' : 'CTC Business'}
                              </Header>
                            </Grid.Column>
                            <Grid.Column>
                              <Header as="h4" floated="right" inverted>
                                Enquiry Date: {moment(this.props.business.dateTimeCreated).format('DD/MM/YYYY')}
                              </Header>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>
                      {
                        <EditBusinessDetailForm
                          business={this.props.business}
                          history={this.props.history}
                          match={this.props.match}
                        />
                      }
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: 'Pricing/Information',
                  render: () => (
                    <Tab.Pane style={{ backgroundColor: '#f1f1f1' }}>
                      <EditBusinessPriceForm
                        business={this.props.business}
                        history={this.props.history}
                        isUserClientManager={this.state.isUserClientManager}
                      />
                    </Tab.Pane>
                  )
                }
              ]}
            />
          </Grid.Row>
          <Grid.Row style={{ justifyContent: 'flex-end', padding: '0 15px' }}>
            <Button color="facebook" onClick={() => this._openBusinessLog()}>
              <Icon name="commenting" />
              New Communication
            </Button>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <BusinessLogList business={business} history={history} match={match} />
            </Grid.Column>
          </Grid.Row>
          {business && business.CreatedBy ? (
            <Grid.Row style={{ justifyContent: 'center' }}>
              <Form>
                <Form.Group inline>
                  <Form.Input
                    label="Created By"
                    placeholder={`${business.CreatedBy.firstName} ${business.CreatedBy.lastName}`}
                    readOnly
                  />
                  <Form.Input
                    label="Creation Date"
                    placeholder={moment(this.props.business.dateTimeCreated).format('DD/MM/YYYY - HH:mm')}
                    readOnly
                  />
                  <Form.Input
                    label="Modified By"
                    placeholder={`${business.ModifiedBy.firstName} ${business.ModifiedBy.lastName}`}
                    readOnly
                  />
                  <Form.Input
                    label="Modified Date"
                    placeholder={moment(this.props.business.dateTimeModified).format('DD/MM/YYYY - HH:mm')}
                    readOnly
                  />
                </Form.Group>
              </Form>
            </Grid.Row>
          ) : null}
        </Grid>
      </Wrapper>
    )
  }
}

BusinessEditPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  getBusiness: PropTypes.func,
  cleanBusiness: PropTypes.func,
  business: PropTypes.object,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  arrayLogsFromBusiness: PropTypes.array,
  getLogFromBusiness: PropTypes.func,
  businessesForSale: PropTypes.array,
  totalEnquiry: PropTypes.number,
  totalLastScore: PropTypes.number,
  isUpdated: PropTypes.bool,
  location: PropTypes.object,
  getBusinessFromBuyer: PropTypes.func,
  isLoadingGetFromBuyer: PropTypes.bool,
  getBusinessLogFromBuyer: PropTypes.func,
  userRoles: PropTypes.array,
  verifyBusinessFirstOpenByAgent: PropTypes.func,
  setLastBusinessTabSelected: PropTypes.func,
  indexLastTabSelected: PropTypes.number,
  stageOptions: PropTypes.array,
  ctcStageOptions: PropTypes.array
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getBusiness,
      cleanBusiness,
      getLogFromBusiness,
      getBusinessFromBuyer,
      getBusinessLogFromBuyer,
      verifyBusinessFirstOpenByAgent,
      setLastBusinessTabSelected
    },
    dispatch
  )
}

const mapStateToProps = (state, props) => {
  return {
    isLoading: state.business.get.isLoading,
    isLoadingGetFromBuyer: state.buyer.getBusinessFromBuyer.isLoading,
    business:
      (props.location.state && props.location.state.fromBuyerMenu) ||
      (props.history.location && props.history.location.pathname === `/business/${props.match.params.id}/from-buyer`)
        ? state.buyer.getBusinessFromBuyer.object
        : state.business.get.object,
    totalEnquiry:
      (props.location.state && props.location.state.fromBuyerMenu) ||
      (props.history.location && props.history.location.pathname === `/business/${props.match.params.id}/from-buyer`)
        ? state.buyer.getBusinessFromBuyer.totalEnquiry
        : state.business.get.totalEnquiry,
    totalLastScore:
      (props.location.state && props.location.state.fromBuyerMenu) ||
      (props.history.location && props.history.location.pathname === `/business/${props.match.params.id}/from-buyer`)
        ? state.buyer.getBusinessFromBuyer.totalLastScore
        : state.business.get.totalLastScore,
    error:
      (props.location.state && props.location.state.fromBuyerMenu) ||
      (props.history.location && props.history.location.pathname === `/business/${props.match.params.id}/from-buyer`)
        ? state.buyer.getBusinessFromBuyer.error
        : state.business.get.error,
    arrayLogsFromBusiness:
      (props.location.state && props.location.state.fromBuyerMenu) ||
      (props.history.location && props.history.location.pathname === `/business/${props.match.params.id}/from-buyer`)
        ? state.buyer.getBusinessLogFromBuyer.array
        : state.businessLog.get.array,
    isUpdated:
      (props.location.state && props.location.state.fromBuyerMenu) ||
      (props.history.location && props.history.location.pathname === `/business/${props.match.params.id}/from-buyer`)
        ? state.buyer.getBusinessFromBuyer.isUpdated
        : state.business.get.isUpdated,
    userRoles: state.auth.user.roles,
    indexLastTabSelected:
      (props.location.state && props.location.state.fromBuyerMenu) ||
      (props.history.location && props.history.location.pathname === `/business/${props.match.params.id}/from-buyer`)
        ? state.buyer.getBusinessFromBuyer.isUpdated
        : state.business.setLastTabSelected.index,
    stageOptions:
      props.history.location && props.history.location.pathname === `/business/${props.match.params.id}/from-buyer`
        ? state.buyer.getBusinessFromBuyer.stageOptions
        : state.business.get.stageOptions,
    ctcStageOptions:
      props.history.location && props.history.location.pathname === `/business/${props.match.params.id}/from-buyer`
        ? state.buyer.getBusinessFromBuyer.ctcStageOptions
        : state.business.get.ctcStageOptions
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessEditPage)
