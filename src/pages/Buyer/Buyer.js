import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { Table, Icon, Button, Grid, Dimmer, Loader } from 'semantic-ui-react'

import { TypesModal, openModal } from '../../redux/ducks/modal'
import { getBuyerBusinesses } from '../../redux/ducks/buyer'
import NewBusinessForm from '../../components/forms/NewBusinessForm'
import Wrapper from '../../components/content/Wrapper'
import { theme } from '../../styles'

class BuyerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      lockedBusiness: false
    }
  }

  componentWillMount () {
    this.props.getBuyerBusinesses(false, 4)
    this.props.getBuyerBusinesses(false, 5)
  }

  _toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }))
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

  render () {
    const {
      history,
      businessesForSale,
      businessesUnderOffer,
      isLoadingForSale,
      isLoadingUnderOffer
    } = this.props

    const { modalOpen } = this.state
    return (
      <Wrapper>
        {modalOpen ? (
          <NewBusinessForm
            modalOpen={modalOpen}
            toggleModal={this._toggleModal}
          />
        ) : null}
        <Grid padded>
          <Grid.Row style={{ paddingBottom: 0 }}>
            <h2>
              <b>
                <div align="left"> Businesses For Sale </div>
              </b>
            </h2>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: 0 }}>
            <Dimmer.Dimmable
              dimmed={isLoadingForSale}
              style={{ width: '100%' }}
            >
              <Dimmer inverted active={isLoadingForSale}>
                <Loader>Loading</Loader>
              </Dimmer>
              <Table color="blue" celled inverted size="small" compact>
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
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {businessesForSale.map(item => (
                    <Table.Row active key={item.business.id}>
                      <Table.Cell>{`BS${item.business.id}`}</Table.Cell>
                      <Table.Cell
                        selectable
                        onClick={
                          item.lastScore &&
                          item.lastScore.dateTimeCreated &&
                          this._diffDays(item.lastScore.dateTimeCreated) >= 30
                            ? () => alert('Test')
                            : () =>
                              history.push(
                                `buyer/business/${item.business.id}`
                              )
                        }
                      >
                        {item.business.businessName}
                      </Table.Cell>
                      <Table.Cell>{item.countFollowUpTask}</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon
                          size="small"
                          color="instagram"
                          onClick={() =>
                            this._toggleModalGroupEmail(item.business.id)
                          }
                        >
                          <Icon name="mail" />
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        {this._diffDays(item.business.daysOnTheMarket)}
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
                      <Table.Cell>
                        {item.lastScore ? item.lastScore.total : '-'}
                      </Table.Cell>
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
                          onClick={() =>
                            history.push(
                              `buyer/business/${item.business.id}/score-list`
                            )
                          }
                        >
                          <Icon name="star" />
                        </Button>
                      </Table.Cell>
                      <Table.Cell
                        style={
                          item.lastScore &&
                          item.lastScore.dateSent &&
                          item.lastScore.dateTimeCreated &&
                          this._diffDays(item.lastScore.dateTimeCreated) >= 25
                            ? { color: theme.redColor }
                            : null
                        }
                      >
                        {item.lastScore &&
                        item.lastScore.dateSent &&
                        item.lastScore.dateTimeCreated
                          ? this._locked(item.lastScore.dateTimeCreated)
                          : '-'}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Dimmer.Dimmable>
          </Grid.Row>
          <Grid.Row style={{ paddingBottom: 0 }}>
            <h2>
              <b>
                <div align="left"> Businesses Under Offer </div>
              </b>
            </h2>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: 0 }}>
            <Dimmer.Dimmable
              dimmed={isLoadingUnderOffer}
              style={{ width: '100%' }}
            >
              <Dimmer inverted active={isLoadingUnderOffer}>
                <Loader>Loading</Loader>
              </Dimmer>
              <Table color="blue" celled inverted size="small" compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Business ID</Table.HeaderCell>
                    <Table.HeaderCell>Business Name</Table.HeaderCell>
                    <Table.HeaderCell>Follow Up Task</Table.HeaderCell>
                    <Table.HeaderCell>Send Group Email</Table.HeaderCell>
                    <Table.HeaderCell>Days On The Market</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {businessesUnderOffer.map(item => (
                    <Table.Row active key={item.business.id}>
                      <Table.Cell>{`BS${item.business.id}`}</Table.Cell>
                      <Table.Cell
                        selectable
                        onClick={() =>
                          history.push(`buyer/business/${item.business.id}`)
                        }
                      >
                        {item.business.businessName}
                      </Table.Cell>
                      <Table.Cell>{item.countFollowUpTask}</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon
                          size="small"
                          color="instagram"
                          onClick={() =>
                            this._toggleModalGroupEmail(item.business.id)
                          }
                        >
                          <Icon name="mail" />
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        {this._diffDays(item.business.daysOnTheMarket)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Dimmer.Dimmable>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBuyerBusinesses, openModal }, dispatch)

BuyerPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  getBuyerBusinesses: PropTypes.func,
  businessesForSale: PropTypes.array,
  businessesUnderOffer: PropTypes.array,
  openModal: PropTypes.func,
  isLoadingUnderOffer: PropTypes.bool,
  isLoadingForSale: PropTypes.bool
}

const mapStateToProps = state => ({
  businessesForSale: state.buyer.getBuyerBusinessesForSale.array,
  isLoadingForSale: state.buyer.getBuyerBusinessesForSale.isLoading,
  businessesUnderOffer: state.buyer.getBuyerBusinessesUnderOffer.array,
  isLoadingUnderOffer: state.buyer.getBuyerBusinessesUnderOffer.isLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerPage)
