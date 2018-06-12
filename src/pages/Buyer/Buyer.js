import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Table, Icon, Button, Input, Grid } from 'semantic-ui-react'

import { TypesModal, openModal } from '../../redux/ducks/modal'
import { getBusinesses } from '../../redux/ducks/business'
import NewBusinessForm from '../../components/forms/NewBusinessForm'
import Wrapper from '../../components/content/Wrapper'

const arrayunderOffer = [
  {
    businessID: 'BS2030',
    businessName: 'New Business',
    followUpTask: '9',
    sendGroupEmail: ' ',
    dayOnTheMarket: '10'
  }
]

class BuyerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  componentWillMount () {
    this.props.getBusinesses(false, [4, 5])
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
        // text: 'Are you sure you want to send an email to buyer?'
      },
      businessId
      // buyerId: this.props.match.params.idBuyer,
      // email: this.props.buyer.email
    })
  }

  render () {
    const { history, businesses } = this.props

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
                  <Table.HeaderCell>2 Record`s</Table.HeaderCell>
                  <Table.HeaderCell>IM`s</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {businesses.map(business => (
                  <Table.Row active key={business.id}>
                    <Table.Cell>{`BS${business.id}`}</Table.Cell>
                    <Table.Cell
                      selectable
                      onClick={() =>
                        history.push(`buyer/business/${business.id}`)
                      }
                    >
                      {business.businessName}
                    </Table.Cell>
                    <Table.Cell>{}</Table.Cell>
                    <Table.Cell>
                      <Button
                        size="small"
                        color="instagram"
                        onClick={() => this._toggleModalGroupEmail(business.id)}
                      >
                        <Icon name="mail" />
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{}</Table.Cell>
                    <Table.Cell>{}</Table.Cell>
                    <Table.Cell>{}</Table.Cell>
                    <Table.Cell>{}</Table.Cell>
                    <Table.Cell>
                      <Button
                        size="small"
                        color="instagram"
                        onClick={() =>
                          history.push(
                            `buyer/business/${business.id}/score-list`
                          )
                        }
                      >
                        <Icon name="star" />
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{}</Table.Cell>
                    <Table.Cell>
                      <Button size="small" color="instagram">
                        <Icon name="file pdf outline" />
                        PDF
                      </Button>
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
            <Table color="blue" celled inverted selectable size="small">
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
                {arrayunderOffer.map(underOffer => (
                  <Table.Row
                    active
                    key={underOffer.businessID}
                    onClick={() =>
                      this.props.history.push(
                        `${this.props.match.path}/${underOffer.businessID}`
                      )
                    }
                  >
                    <Table.Cell>{underOffer.businessID}</Table.Cell>
                    <Table.Cell>{underOffer.businessName}</Table.Cell>
                    <Table.Cell>{underOffer.followUpTask}</Table.Cell>
                    <Table.Cell>
                      <Button size="small" color="instagram">
                        <Icon name="mail" />
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{underOffer.dayOnTheMarket}</Table.Cell>
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
  bindActionCreators({ getBusinesses, openModal }, dispatch)

BuyerPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  getBusinesses: PropTypes.func,
  businesses: PropTypes.array,
  openModal: PropTypes.func
}

const mapStateToProps = state => ({
  isCreated: state.business.create.isCreated,
  isLoading: state.business.getAll.isLoading,
  businesses: state.business.getAll.array
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerPage)
