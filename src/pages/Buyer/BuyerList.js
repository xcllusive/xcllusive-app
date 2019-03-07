import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Grid, Header, Dimmer, Loader, Button, Icon } from 'semantic-ui-react'
import { getBuyersFromBusiness, getBusinessFromBuyer } from '../../redux/ducks/buyer'
import moment from 'moment'

import Wrapper from '../../components/content/Wrapper'

class BuyerListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showAll: true
    }
  }

  componentDidMount () {
    this.props.getBuyersFromBusiness(this.props.match.params.id)
    this.props.getBusinessFromBuyer(this.props.match.params.id)
  }

  _showAll () {
    this.setState({ showAll: false })
    this.props.getBuyersFromBusiness(this.props.match.params.id, true)
  }

  _showLess () {
    this.setState({ showAll: true })
    this.props.getBuyersFromBusiness(this.props.match.params.id)
  }

  render () {
    const { listBuyersList, history, business, isLoadingBusiness, countAll, countAllEnquiry } = this.props
    return (
      <Wrapper>
        <Dimmer.Dimmable dimmed={isLoadingBusiness} style={{ height: '80vh' }}>
          <Dimmer inverted active={isLoadingBusiness}>
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid style={{ marginTop: 0 }}>
            <Grid.Row columns={3}>
              <Grid.Column width={business && business.businessName.length > 35 ? 7 : null}>
                {listBuyersList && business && countAllEnquiry ? (
                  <Header
                    style={{ marginTop: '5px' }}
                    as="h3"
                    content={`${business.businessName} / ${listBuyersList.length} out of ${countAll}`}
                  />
                ) : (
                  <Header as="h3" content={'0 record'} />
                )}
              </Grid.Column>
              <Grid.Column style={{ paddingLeft: '0px' }}>
                {listBuyersList && business && countAllEnquiry && !this.state.showAll ? (
                  <Header
                    style={{ marginTop: '5px', paddingLeft: '0px' }}
                    as="h3"
                    content={`+ ${countAllEnquiry - countAll} Waiting for CA (Not in the below list) `}
                  />
                ) : null}
              </Grid.Column>
              <Grid.Column floated="right">
                {this.state.showAll ? (
                  <Button color="twitter" onClick={() => this._showAll()} size="small" floated="right">
                    <Icon name="zoom" />
                    Show all
                  </Button>
                ) : (
                  <Button color="orange" onClick={() => this._showLess()} size="small" floated="right">
                    <Icon name="cut" />
                    Show Due Tasks Only
                  </Button>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {listBuyersList && listBuyersList.length > 0 ? (
            <Grid padded="horizontally" style={{ marginTop: 0 }}>
              <Grid.Row>
                <Table color="blue" celled inverted selectable size="small" compact>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Buyer</Table.HeaderCell>
                      <Table.HeaderCell>Log</Table.HeaderCell>
                      <Table.HeaderCell>Date Created</Table.HeaderCell>
                      <Table.HeaderCell>Follow up Date</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {listBuyersList.map(buyersList => (
                      <Table.Row
                        active
                        key={buyersList.id}
                        onClick={() => history.push(`/buyer/${buyersList.id}/business/${this.props.match.params.id}`)}
                      >
                        <Table.Cell
                          warning={
                            !buyersList.BuyerLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD') &&
                                (buyersList.caReceived || buyersList.scanfilePath !== '')
                              )
                            }, false)
                          }
                        >
                          {buyersList.firstName} {buyersList.surname}
                        </Table.Cell>
                        <Table.Cell
                          warning={
                            !buyersList.BuyerLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD') &&
                                (buyersList.caReceived || buyersList.scanfilePath !== '')
                              )
                            }, false)
                          }
                        >
                          {buyersList.BuyerLog.map((item, index) => {
                            if (item.followUpStatus === 'Pending') return item.text
                          })}
                          {/* {buyersList.BuyerLog[0].text} */}
                        </Table.Cell>
                        <Table.Cell
                          warning={
                            !buyersList.BuyerLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD') &&
                                (buyersList.caReceived || buyersList.scanfilePath !== '')
                              )
                            }, false)
                          }
                        >
                          {buyersList.BuyerLog[0]
                            ? moment(buyersList.BuyerLog[0].dateTimeCreated).format('DD/MM/YYYY')
                            : ''}
                        </Table.Cell>
                        <Table.Cell
                          warning={
                            !buyersList.BuyerLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD') &&
                                (buyersList.caReceived || buyersList.scanfilePath !== '')
                              )
                            }, false)
                          }
                        >
                          {buyersList.BuyerLog[0] ? moment(buyersList.BuyerLog[0].followUp).format('DD/MM/YYYY') : ''}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Grid.Row>
            </Grid>
          ) : null}
          <Grid style={{ marginTop: 0 }}>
            <Grid.Column>
              <Button color="green" onClick={() => history.push('/buyer')} size="small" floated="left">
                <Icon name="backward" />
                Return to Business
              </Button>
            </Grid.Column>
          </Grid>
        </Dimmer.Dimmable>
      </Wrapper>
    )
  }
}

BuyerListPage.propTypes = {
  getBuyersFromBusiness: PropTypes.func,
  match: PropTypes.object,
  listBuyersList: PropTypes.array,
  history: PropTypes.object,
  getBusinessFromBuyer: PropTypes.func,
  business: PropTypes.object,
  isLoadingBusiness: PropTypes.bool,
  countAll: PropTypes.number,
  countAllEnquiry: PropTypes.number
}

const mapDispatchToProps = dispatch => bindActionCreators({ getBuyersFromBusiness, getBusinessFromBuyer }, dispatch)

const mapStateToProps = state => ({
  listBuyersList: state.buyer.getBuyersFromBusiness.array,
  countAll: state.buyer.getBuyersFromBusiness.countAll,
  business: state.buyer.getBusinessFromBuyer.object,
  countAllEnquiry: state.buyer.getBusinessFromBuyer.countAllEnquiry,
  isLoadingBusiness: state.buyer.getBusinessFromBuyer.isLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerListPage)
