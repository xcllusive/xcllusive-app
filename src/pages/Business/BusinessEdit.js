import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Header,
  Segment,
  Statistic,
  Grid,
  Form,
  Table,
  Button,
  Icon,
  Tab,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import moment from 'moment'
import numeral from 'numeral'
import Wrapper from '../../components/content/Wrapper'
import EditBusinessDetailForm from '../../components/forms/EditBusinessDetailForm'
import EditBusinessPriceForm from '../../components/forms/EditBusinessPriceForm'

import { getBusiness, cleanBusiness } from '../../redux/ducks/business'
import { getLogFromBusiness } from '../../redux/ducks/businessLog'
import { getBuyerBusinesses } from '../../redux/ducks/buyer'

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
    if (nextProps.isUpdated && !prevState.isUpdated) {
      nextProps.getBusiness(nextProps.match.params.id)
    }

    return {
      error: nextProps.error,
      isUpdated: nextProps.isUpdated
    }
  }

  componentDidMount () {
    const { id } = this.props.match.params
    this.props.getBusiness(id)
    this.props.getLogFromBusiness(id)
  }

  shouldComponentUpdate (nextprops) {
    if (this.props.isLoading === nextprops.isLoading) return false

    return true
  }

  componentWillUnmount () {
    this.props.cleanBusiness()
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
    if (id === 1) {
      return 'Potential Listing'
    }
    if (id === 2) {
      return 'Listing Negotiation'
    }
    if (id === 3) {
      return 'Sales Memo'
    }
    if (id === 4) {
      return 'For Sale'
    }
    if (id === 5) {
      return 'Under Offer'
    }
    if (id === 6) {
      return 'Sold'
    }
    if (id === 7) {
      return 'Withdrawn'
    }
    if (id === 8) {
      return 'Lost'
    }
    if (id === 9) {
      return 'Appraisal'
    }
    if (id === 10) {
      return 'Data Gathering'
    }
  }

  _diffDays = date => {
    return moment().diff(date, 'day')
  }

  render () {
    const { arrayLogsFromBusiness, isLoading, business, history } = this.props

    if (isLoading) {
      return (
        <Dimmer inverted active={this.props.isLoading}>
          <Loader inverted />
        </Dimmer>
      )
    }

    return (
      <Wrapper>
        <Grid>
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
                <Statistic.Value>BS{this.props.business.id}</Statistic.Value>
                <Statistic.Label>Id</Statistic.Label>
              </Statistic>
              <Statistic color="orange">
                <Statistic.Value>
                  {this.props.business.businessName}
                </Statistic.Value>
                <Statistic.Label>Business Name</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>
                  {numeral(this.props.business.listedPrice).format('0,0.00')}
                </Statistic.Value>
                <Statistic.Label>Price</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>
                  {this._getProduct(this.props.business.productId)}
                </Statistic.Value>
                <Statistic.Label>Type of Business Sale</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{this.props.totalEnquiry}</Statistic.Value>
                <Statistic.Label>Enquiries</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>
                  {this._diffDays(this.props.business.daysOnTheMarket)}
                </Statistic.Value>
                <Statistic.Label>Days on the market</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>
                  {this.props.totalLastScore ? this.props.totalLastScore : '#'}
                </Statistic.Value>
                <Statistic.Label>Last Feedback Score</Statistic.Label>
              </Statistic>
              <Statistic color="green">
                <Statistic.Value>
                  {this._getStage(this.props.business.stageId)}
                </Statistic.Value>
                <Statistic.Label>Stage</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: 0 }}>
            <Tab
              style={{ width: '100%', padding: '0 15px' }}
              menu={{ secondary: true, pointing: true }}
              panes={[
                {
                  menuItem: 'Business Detail',
                  render: () => (
                    <Tab.Pane className="BusinessDetail" attached={false}>
                      <Segment size="mini" inverted color="blue">
                        <Grid>
                          <Grid.Row columns={2}>
                            <Grid.Column>
                              <Header as="h3" textAlign="left" inverted>
                                Business Detail
                              </Header>
                            </Grid.Column>
                            <Grid.Column>
                              <Header as="h4" floated="right" inverted>
                                Enquiry Date:{' '}
                                {moment(business.dateTimeCreated).format(
                                  'DD/MM/YYYY'
                                )}
                              </Header>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>
                      <EditBusinessDetailForm
                        business={business}
                        history={history}
                      />
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: 'Pricing/Information',
                  render: () => (
                    <Tab.Pane attached={false}>
                      <EditBusinessPriceForm business={business} />
                    </Tab.Pane>
                  )
                }
              ]}
            />
          </Grid.Row>

          <Grid.Row style={{ justifyContent: 'flex-end', padding: '0 15px' }}>
            <Button
              color="facebook"
              onClick={() =>
                this.props.history.push(`${this.props.match.url}/log`)
              }
            >
              <Icon name="commenting" />
              New Communication
            </Button>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table size={'small'} color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Log</Table.HeaderCell>
                    <Table.HeaderCell>Follow Up</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {arrayLogsFromBusiness.map(logBusiness => {
                    return (
                      <Table.Row
                        active
                        key={logBusiness.id}
                        onClick={() =>
                          this.props.history.push(`${this.props.match.url}/log`)
                        }
                      >
                        <Table.Cell>{logBusiness.text}</Table.Cell>
                        <Table.Cell>
                          {moment(logBusiness.followUp).format('DD/MM/YYYY')}
                        </Table.Cell>
                        <Table.Cell>{logBusiness.followUpStatus}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ justifyContent: 'center' }}>
            <Form>
              <Form.Group inline>
                <Form.Input
                  label="Created By"
                  placeholder={`${business.CreatedBy.firstName} ${
                    business.CreatedBy.lastName
                  }`}
                  readOnly
                />
                <Form.Input
                  label="Creation Date"
                  placeholder={moment(
                    this.props.business.dateTimeCreated
                  ).format('DD/MM/YYYY - HH:mm')}
                  readOnly
                />
                <Form.Input
                  label="Modified By"
                  placeholder={`${business.ModifiedBy.firstName} ${
                    business.ModifiedBy.lastName
                  }`}
                  readOnly
                />
                <Form.Input
                  label="Modified Date"
                  placeholder={moment(
                    this.props.business.dateTimeModified
                  ).format('DD/MM/YYYY - HH:mm')}
                  readOnly
                />
              </Form.Group>
            </Form>
          </Grid.Row>
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
  getBuyerBusinesses: PropTypes.func,
  totalEnquiry: PropTypes.number,
  totalLastScore: PropTypes.number,
  isUpdated: PropTypes.bool
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getBusiness, cleanBusiness, getLogFromBusiness, getBuyerBusinesses },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.get.isLoading,
    business: state.business.get.object,
    totalEnquiry: state.business.get.totalEnquiry,
    totalLastScore: state.business.get.totalLastScore,
    error: state.business.get.error,
    arrayLogsFromBusiness: state.businessLog.get.array,
    isUpdated: state.business.update.isUpdated
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessEditPage)
