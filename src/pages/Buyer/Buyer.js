import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'

import { Table, Icon, Button, Grid, Dimmer, Loader, Header } from 'semantic-ui-react'

import { TypesModal, openModal, closeModal } from '../../redux/ducks/modal'
import { getBuyerBusinesses } from '../../redux/ducks/buyer'
import Wrapper from '../../components/content/Wrapper'
import { theme } from '../../styles'

class BuyerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lockedBusiness: false
    }
  }

  async componentDidMount () {
    await this.props.getBuyerBusinesses(false, 4)
    await this.props.getBuyerBusinesses(false, 5)
    await this.props.getBuyerBusinesses(false, 3)
  }

  _toggleModalGroupEmail = businessId => {
    this.props.openModal(TypesModal.MODAL_TYPE_GROUP_EMAIL, {
      options: {
        title: 'Prepare Group Email'
      },
      businessId
    })
  }

  _diffDays = date => {
    return moment().diff(date, 'day')
  }

  _locked = date => {
    const dateLocked = moment().diff(date, 'day')
    let daysLeft = 'Not Yet'
    if (dateLocked >= 25 && dateLocked < 30) {
      daysLeft = `${30 - dateLocked} days left`
      if (30 - dateLocked === 1) daysLeft = '1 day left'
    }
    if (dateLocked >= 30) {
      daysLeft = 'Score Overdue: Locked'
    }

    return daysLeft
  }

  _showMsg = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_SHOW_MSG, {
      options: {
        title: 'Alert:',
        content: 'Got it!',
        text:
          'This business has been automatically locked because the Buyer Feedback Score is overdue. To unlock this business record please complete a new buyer Feedback Score for this busines. Sorry, it should only take a few minutes.'
      }
    })
  }

  _isUserBusiness = () => {
    return _.includes(this.props.userRoles, 'BUSINESS_MENU')
  }

  _downloadIM (imUrl) {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Download IM',
        text: 'Are you sure you want to download the IM?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          window.open(`${imUrl}`, '_blank')
        }
      }
    })
  }

  _brokersWeeklyReport = business => {
    this.props.openModal(TypesModal.MODAL_TYPE_BROKERS_WEEKLY_REPORT, {
      title: 'Broker`s Weekly Report',
      business,
      callBack: isConfirmed => {
        this.props.getBuyerBusinesses(false, business.stageId)
      }
    })
  }

  _changeBrokersReportButtonColor (item) {
    if (item.lastBrokerReport && this._diffDays(item.lastBrokerReport.dateTimeCreated) < 3) {
      if (item.lastBrokerReport.stage === 'Exchanged') {
        if (
          item.lastBrokerReport.expectedSettlementDate &&
          this._diffDays(item.lastBrokerReport.expectedSettlementDate) < 0
        ) {
          return 'green'
        } else return 'instagram'
      } else return 'green'
    } else return 'instagram'
  }

  _goToBusinessPage (business) {
    this.props.history.push({
      pathname: `/business/${business.id}/from-buyer`,
      state: {
        previousPage: 'Buyer Menu',
        fromBuyerMenu: true
      }
    })
  }

  render () {
    const {
      history,
      businessesForSale,
      businessesUnderOffer,
      isLoadingForSale,
      isLoadingUnderOffer,
      isLoadingSalesMemo,
      businessesSalesMemo
    } = this.props
    return (
      <Wrapper>
        <Grid padded>
          {businessesForSale.length > 0 ? (
            <Fragment>
              <Header style={{ paddingLeft: '0px', marginTop: '10px', marginBottom: '0px' }} as="h2" textAlign="left">
                For Sale
              </Header>
              <Grid.Row style={{ paddingTop: 0 }}>
                <Dimmer.Dimmable dimmed={isLoadingForSale} style={{ width: '100%' }}>
                  <Dimmer inverted active={isLoadingForSale}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  <Table color="blue" celled inverted size="small" compact textAlign="center">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Business ID</Table.HeaderCell>
                        <Table.HeaderCell>Business Name</Table.HeaderCell>
                        <Table.HeaderCell>Follow Up Task</Table.HeaderCell>
                        <Table.HeaderCell>Send Group Email</Table.HeaderCell>
                        <Table.HeaderCell>Days On The Market</Table.HeaderCell>
                        <Table.HeaderCell>Days Since Generated</Table.HeaderCell>
                        <Table.HeaderCell>Last Score</Table.HeaderCell>
                        <Table.HeaderCell>Sent</Table.HeaderCell>
                        <Table.HeaderCell>Make New Score</Table.HeaderCell>
                        <Table.HeaderCell>Locked</Table.HeaderCell>
                        <Table.HeaderCell>IM</Table.HeaderCell>
                        <Table.HeaderCell>Broker`s Report</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {businessesForSale.map(item => (
                        <Table.Row active key={item.business.id}>
                          <Table.Cell textAlign="left">
                            <Grid>
                              <Grid.Row columns={2}>
                                <Grid.Column width={1}>
                                  <Icon link name="magnify" onClick={() => this._goToBusinessPage(item.business)} />
                                </Grid.Column>
                                <Grid.Column>{`BS${item.business.id}`}</Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Table.Cell>
                          <Table.Cell
                            textAlign="left"
                            selectable
                            onClick={
                              item.lastScore && this._diffDays(item.lastScore.dateSent) >= 30
                                ? () => this._showMsg()
                                : () => history.push(`buyer/business/${item.business.id}`)
                            }
                          >
                            <Icon
                              style={{
                                fontSize: '1.2em',
                                width: 'auto',
                                paddingLeft: '5px',
                                fontFamily: 'lato',
                                color: 'blue'
                              }}
                              link
                            >
                              {item.business.businessName}
                            </Icon>
                          </Table.Cell>
                          <Table.Cell>{item.countFollowUpTask}</Table.Cell>
                          <Table.Cell>
                            <Button
                              icon
                              size="small"
                              color="instagram"
                              onClick={() => this._toggleModalGroupEmail(item.business.id)}
                            >
                              <Icon name="mail" />
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            {item.business.daysOnTheMarket ? this._diffDays(item.business.daysOnTheMarket) : '-'}
                          </Table.Cell>
                          <Table.Cell
                            style={
                              item.lastScore &&
                              item.lastScore.dateTimeCreated &&
                              this._diffDays(item.lastScore.dateTimeCreated) >= 25
                                ? { color: theme.redColor }
                                : null
                            }
                          >
                            {item.lastScore && item.lastScore.dateTimeCreated
                              ? this._diffDays(item.lastScore.dateTimeCreated)
                              : '-'}
                          </Table.Cell>
                          <Table.Cell>{item.lastScore ? item.lastScore.total : '-'}</Table.Cell>
                          <Table.Cell>
                            {item.lastScore && item.lastScore.dateSent
                              ? moment(item.lastScore.dateSent).format('DD/MM/YYYY')
                              : '-'}
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              icon
                              size="small"
                              color="instagram"
                              onClick={() => history.push(`buyer/business/${item.business.id}/score-list`)}
                            >
                              <Icon name="star" />
                            </Button>
                          </Table.Cell>
                          <Table.Cell
                            style={
                              item.lastScore && item.lastScore.dateSent && this._diffDays(item.lastScore.dateSent) >= 25
                                ? { color: theme.redColor }
                                : null
                            }
                          >
                            {item.lastScore && item.lastScore.dateSent ? this._locked(item.lastScore.dateSent) : '-'}
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              icon
                              disabled={!item.business.imUrl}
                              color="instagram"
                              size="small"
                              onClick={() => this._downloadIM(item.business.imUrl)}
                            >
                              <Icon name="download" />
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              icon
                              color={this._changeBrokersReportButtonColor(item)}
                              size="small"
                              onClick={() => this._brokersWeeklyReport(item.business)}
                              // disabled={true}
                            >
                              <Icon name="edit outline" />
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Dimmer.Dimmable>
              </Grid.Row>
            </Fragment>
          ) : null}
          {businessesUnderOffer.length > 0 ? (
            <Fragment>
              <Header style={{ paddingLeft: '0px', marginTop: '0px', marginBottom: '0px' }} as="h2" textAlign="left">
                Under Offer
              </Header>
              <Grid.Row style={{ paddingTop: 0 }}>
                <Dimmer.Dimmable dimmed={isLoadingUnderOffer} style={{ width: '100%' }}>
                  <Dimmer inverted active={isLoadingUnderOffer}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  <Table color="blue" celled inverted size="small" compact textAlign="center">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Business ID</Table.HeaderCell>
                        <Table.HeaderCell>Business Name</Table.HeaderCell>
                        <Table.HeaderCell>Follow Up Task</Table.HeaderCell>
                        <Table.HeaderCell>Send Group Email</Table.HeaderCell>
                        <Table.HeaderCell>Days On The Market</Table.HeaderCell>
                        <Table.HeaderCell>Broker`s Report</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {businessesUnderOffer.map(item => (
                        <Table.Row active key={item.business.id}>
                          <Table.Cell textAlign="left">
                            <Grid>
                              <Grid.Row columns={2}>
                                <Grid.Column width={1}>
                                  <Icon link name="magnify" onClick={() => this._goToBusinessPage(item.business)} />
                                </Grid.Column>
                                <Grid.Column>{`BS${item.business.id}`}</Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Table.Cell>
                          <Table.Cell
                            textAlign="left"
                            selectable
                            onClick={() => history.push(`buyer/business/${item.business.id}`)}
                          >
                            <Icon
                              style={{
                                fontSize: '1.2em',
                                width: 'auto',
                                paddingLeft: '5px',
                                fontFamily: 'lato',
                                color: 'blue'
                              }}
                              link
                            >
                              {item.business.businessName}
                            </Icon>
                          </Table.Cell>
                          <Table.Cell>{item.countFollowUpTask}</Table.Cell>
                          <Table.Cell>
                            <Button
                              icon
                              size="small"
                              color={
                                item.lastBrokerReport && this._diffDays(item.lastBrokerReport.dateTimeCreated) > 3
                                  ? 'instagram'
                                  : 'green'
                              }
                              onClick={() => this._toggleModalGroupEmail(item.business.id)}
                            >
                              <Icon name="mail" />
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            {item.business.daysOnTheMarket ? this._diffDays(item.business.daysOnTheMarket) : '-'}
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              icon
                              color={this._changeBrokersReportButtonColor(item)}
                              size="small"
                              onClick={() => this._brokersWeeklyReport(item.business)}
                              // disabled={true}
                            >
                              <Icon name="edit outline" />
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Dimmer.Dimmable>
              </Grid.Row>
            </Fragment>
          ) : null}
          {businessesSalesMemo.length > 0 ? (
            <Fragment>
              <Header style={{ paddingLeft: '0px', marginTop: '0px', marginBottom: '0px' }} as="h2" textAlign="left">
                Sales Memo
              </Header>
              <Grid.Row style={{ paddingTop: 0 }}>
                <Dimmer.Dimmable dimmed={isLoadingSalesMemo} style={{ width: '100%' }}>
                  <Dimmer inverted active={isLoadingSalesMemo}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  <Table color="blue" celled inverted size="small" compact textAlign="center">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Business ID</Table.HeaderCell>
                        <Table.HeaderCell>Business Name</Table.HeaderCell>
                        <Table.HeaderCell>Owners</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Broker`s Report</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {businessesSalesMemo.map(item => (
                        <Table.Row active key={item.business.id}>
                          <Table.Cell textAlign="left">
                            <Grid>
                              <Grid.Row columns={2}>
                                <Grid.Column width={1}>
                                  <Icon link name="magnify" onClick={() => this._goToBusinessPage(item.business)} />
                                </Grid.Column>
                                <Grid.Column>{`BS${item.business.id}`}</Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Table.Cell>
                          <Table.Cell
                            textAlign="left"
                            selectable
                            // onClick={() =>
                            //   this._isUserBusiness() ? history.push(`/business/${item.business.id}`) : null
                            // }
                          >
                            <Icon
                              style={{
                                fontSize: '1.2em',
                                width: 'auto',
                                paddingLeft: '5px',
                                fontFamily: 'lato',
                                color: 'blue'
                              }}
                              // link
                            >
                              {item.business.businessName}
                            </Icon>
                          </Table.Cell>
                          <Table.Cell>
                            {item.business.firstNameV} {item.business.lastNameV}
                          </Table.Cell>
                          <Table.Cell>{item.business.vendorPhone1}</Table.Cell>
                          <Table.Cell>
                            <Button
                              icon
                              color={this._changeBrokersReportButtonColor(item)}
                              size="small"
                              onClick={() => this._brokersWeeklyReport(item.business)}
                              // disabled={true}
                            >
                              <Icon name="edit outline" />
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Dimmer.Dimmable>
              </Grid.Row>
            </Fragment>
          ) : null}
        </Grid>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getBuyerBusinesses, openModal, closeModal }, dispatch)

BuyerPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  getBuyerBusinesses: PropTypes.func,
  businessesForSale: PropTypes.array,
  businessesUnderOffer: PropTypes.array,
  openModal: PropTypes.func,
  isLoadingUnderOffer: PropTypes.bool,
  isLoadingForSale: PropTypes.bool,
  businessesSalesMemo: PropTypes.array,
  isLoadingSalesMemo: PropTypes.bool,
  userRoles: PropTypes.array,
  closeModal: PropTypes.func
}

const mapStateToProps = state => ({
  businessesForSale: state.buyer.getBuyerBusinessesForSale.array,
  isLoadingForSale: state.buyer.getBuyerBusinessesForSale.isLoading,
  businessesUnderOffer: state.buyer.getBuyerBusinessesUnderOffer.array,
  isLoadingUnderOffer: state.buyer.getBuyerBusinessesUnderOffer.isLoading,
  businessesSalesMemo: state.buyer.getBuyerBusinessesSalesMemo.array,
  isLoadingSalesMemo: state.buyer.getBuyerBusinessesSalesMemo.isLoading,
  userRoles: state.auth.user.roles
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerPage)
