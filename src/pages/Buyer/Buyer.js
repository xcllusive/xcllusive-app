import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { Table, Icon, Button, Input, Grid } from 'semantic-ui-react'

import { TypesModal, openModal } from '../../redux/ducks/modal'
import { getBuyerBusinesses } from '../../redux/ducks/buyer'
import NewBusinessForm from '../../components/forms/NewBusinessForm'
import Wrapper from '../../components/content/Wrapper'

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

  _locked (date) {
    // date = moment(date).format('YYYYMMDD')
    date = moment(date, 'YYYYMMDD')
    date = date.diff(moment(Date.now()), 'day')
    var daysLeft = 'Not Yet'
    if (date <= -25 && date > -30) {
      daysLeft = date + 30 + ' days left'
    }
    if (date <= -30) {
      daysLeft = 'Score Overdue: Locked'
      // this.setState({ lockedBusiness: true })
    }

    return daysLeft
  }

  render () {
    const { history, businessesForSale, businessesUnderOffer } = this.props

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
          <Grid.Row>
            <Grid.Column width={4}>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder="Find buyers..."
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder="Find businesses..."
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <h2>
              <b>
                <div align="left"> Businesses For Sale </div>
              </b>
            </h2>
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
                      // onClick={
                      //   !this.state.lockedBusiness
                      //     ? () =>
                      //       history.push(`buyer/business/${item.business.id}`)
                      //     : null
                      // }
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
                      {moment(item.business.daysOnTheMarket).fromNow()}
                    </Table.Cell>
                    <Table.Cell>
                      {item.lastScore && item.lastScore.dateTimeCreated
                        ? moment(item.lastScore.dateTimeCreated).fromNow()
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
                    <Table.Cell>
                      {item.lastScore &&
                      item.lastScore.dateSent &&
                      item.lastScore.dateTimeCreated
                        ? this._locked(moment(item.lastScore.dateTimeCreated))
                        : '-'}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <h2>
              <b>
                <div align="left"> Businesses Under Offer </div>
              </b>
            </h2>
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
                      {moment(item.business.daysOnTheMarket).fromNow()}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
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
  openModal: PropTypes.func
}

const mapStateToProps = state => ({
  businessesForSale: state.buyer.getBuyerBusinessesForSale.array,
  businessesUnderOffer: state.buyer.getBuyerBusinessesUnderOffer.array
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerPage)
