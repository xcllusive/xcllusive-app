import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Table,
  Icon,
  Button,
  Input,
  Grid,
  Dimmer,
  Loader
} from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import NewBuyerForm from '../../components/forms/NewBuyerForm'
import NewBusinessForm from '../../components/forms/NewBusinessForm'
import EditBuyerForm from '../../components/forms/EditBuyerForm'

import { TypesModal, openModal } from '../../redux/ducks/modal'
import { getBuyers } from '../../redux/ducks/buyer'
import { getBusinesses } from '../../redux/ducks/business'
import { getLog } from '../../redux/ducks/buyerLog'
import { enquiryBusiness, sendCa } from '../../redux/ducks/clientManager'

import Wrapper from '../../components/content/Wrapper'

class ClientManagerList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpenBuyer: false,
      modalOpenBusiness: false,
      modalOpenEditBuyer: false,
      buyer: null,
      business: null,
      inputSearchBuyer: '',
      inputSearchBusiness: ''
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (
      this.props.isUpdatedBuyer !== nextProps.isUpdatedBuyer &&
      nextProps.isUpdatedBuyer
    ) {
      await this._toggleModal('modalOpenEditBuyer')
      this.setState({
        buyer: nextProps.buyerUpdated
      })
    }
  }

  componentDidMount () {
    this.props.getBuyers()
    this.props.getBusinesses(false, 1)
    //  this.props.getLog()
  }

  _renderBuyer = buyer => {
    this.setState({ buyer })
  }

  _renderBusiness = business => {
    this.setState({ business })
  }

  _toggleModalConfirm = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Enquiry Business',
        text: 'Are you sure you want to enquiry this business?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this._enquiryBusiness() //  buyerID, businessID
        }
      }
    })
  }

  _sendCA = () => {
    this.props.sendCa(this.state.buyer.id, this.state.business.id)
  }

  _toggleModalSendCA = caSent => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Send CA',
        text: caSent
          ? 'CA already sent. Do you want to send again?'
          : 'Are you sure you want to send the CA?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this._sendCA() //  buyerID, businessID
        }
      }
    })
  }

  _enquiryBusiness = () => {
    this.props.enquiryBusiness()
  }

  _onSearchBuyer = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)

    this.setState({
      inputSearchBuyer: value,
      buyer: null
    })
    this.timer = setTimeout(() => this.props.getBuyers(value), 1000)
  }

  _onSearchBusiness = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)

    this.setState({
      inputSearchBusiness: value,
      business: null
    })
    this.timer = setTimeout(() => this.props.getBusinesses(value, 1), 1000)
  }

  _toggleModal = (modal, buyer) => {
    this.setState(prevState => ({
      [modal]: !prevState[modal],
      buyer: prevState.buyer
    }))
  }

  _openTest = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_UPLOAD_FILE, {
      options: {
        title: 'Upload CA'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          console.log(this.state)
          // this.props.actions.uploadRequest({
          //   file: this.state.file,
          //   name: 'Awesome Cat Pic'
          // })
        }
      },
      handleFileUpload: e => {
        const file = e.target.files[0]
        this.setState({ file })
      }
    })
  }

  render () {
    const { modalOpenBuyer, modalOpenBusiness, modalOpenEditBuyer } = this.state
    const {
      listBuyerList,
      listBusinessList,
      isLoadingBuyerList,
      isLoadingBusinessList,
      history,
      isLoadingBuyerLog,
      listBuyerLogList
    } = this.props
    return (
      <Wrapper>
        {modalOpenBuyer ? (
          <NewBuyerForm
            modalOpen={modalOpenBuyer}
            toggleModal={() => this._toggleModal('modalOpenBuyer')}
          />
        ) : null}
        {modalOpenBusiness ? (
          <NewBusinessForm
            modalOpen={modalOpenBusiness}
            toggleModal={() => this._toggleModal('modalOpenBusiness')}
          />
        ) : null}
        {modalOpenEditBuyer ? (
          <EditBuyerForm
            modalOpen={modalOpenEditBuyer}
            toggleModal={() => this._toggleModal('modalOpenEditBuyer')}
            buyer={this.state.buyer}
          />
        ) : null}
        <Grid padded="horizontally">
          <Grid.Row columns={4}>
            <Grid.Column floated="left" width={4}>
              <h3>
                <b>
                  <div align="left"> Buyer </div>
                </b>
              </h3>
              <Input
                fluid
                icon="search"
                loading={isLoadingBuyerList}
                placeholder="Find buyers..."
                onChange={this._onSearchBuyer}
                value={this.state.inputSearchBuyer}
              />
            </Grid.Column>
            <Grid.Column floated="right">
              <br />
              <br />
              <Button
                size="small"
                onClick={() => this._toggleModal('modalOpenBuyer')}
                color="facebook"
              >
                <Icon name="add" />
                New Buyer
              </Button>
            </Grid.Column>
            <Grid.Column floated="left" width={4}>
              <h3>
                <b>
                  <div align="left"> Business </div>
                </b>
              </h3>
              <Input
                fluid
                icon="search"
                loading={isLoadingBusinessList}
                placeholder="Find businesses..."
                onChange={this._onSearchBusiness}
                value={this.state.inputSearchBusiness}
              />
            </Grid.Column>
            <Grid.Column>
              <br />
              <br />
              <Button
                size="small"
                onClick={() => this._toggleModal('modalOpenBusiness')}
                color="facebook"
              >
                <Icon name="add" />
                New Business
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              {!this.state.buyer ? (
                <Dimmer.Dimmable dimmed>
                  <Dimmer inverted active={isLoadingBuyerList}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  <Table
                    size="small"
                    compact
                    color="blue"
                    celled
                    inverted
                    selectable
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {listBuyerList.map(buyer => (
                        <Table.Row
                          active
                          key={buyer.id}
                          onClick={() => this._renderBuyer(buyer)}
                        >
                          <Table.Cell>
                            {buyer.firstName} {buyer.surname}
                          </Table.Cell>
                          <Table.Cell>{buyer.telephone1}</Table.Cell>
                          <Table.Cell>{buyer.email}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Dimmer.Dimmable>
              ) : null}
              {this.state.buyer ? (
                <Fragment>
                  <Table size="small" basic="very" compact>
                    <Table.Body>
                      <Table.Row>
                        <Table.HeaderCell>BuyerID</Table.HeaderCell>
                        <Table.Cell
                          onClick={() =>
                            this._toggleModal(
                              'modalOpenEditBuyer',
                              this.state.buyer
                            )
                          }
                          selectable
                        >
                          <Icon link name="search" />
                          {`B${this.state.buyer.id}`}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell color="red">Name</Table.HeaderCell>
                        <Table.Cell>
                          {this.state.buyer.firstName}{' '}
                          {this.state.buyer.surname}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.Cell>
                          {this.state.buyer.streetName},{' '}
                          {this.state.buyer.suburb} {this.state.buyer.state}{' '}
                          {this.state.buyer.postCode}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.Cell>{this.state.buyer.telephone1}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.Cell>{this.state.buyer.email}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>CA sent</Table.HeaderCell>
                        <Table.Cell>
                          {this.state.buyer.caSent ? 'Yes' : 'No'}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>CA returned</Table.HeaderCell>
                        <Table.Cell>
                          {this.state.buyer.caReceived ? 'Yes' : 'No'}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Grid.Column floated="left" width={2}>
                    <Button size="small" color="grey">
                      <Icon name="folder open outline" />
                      Open CA
                    </Button>
                    <Button
                      size="small"
                      color="blue"
                      onClick={() => this._openTest()}
                    >
                      <Icon name="mail" />
                      CA Received
                    </Button>
                    <Button
                      size="small"
                      color="blue"
                      disabled={!this.state.business}
                      onClick={() =>
                        this._toggleModalSendCA(this.state.buyer.caSent)
                      }
                    >
                      <Icon name="send" />
                      Send CA
                    </Button>
                    <Button
                      size="small"
                      color="blue"
                      disabled={!this.state.business}
                    >
                      <Icon name="send" />
                      Send IM
                    </Button>
                    <Button
                      size="small"
                      color="green"
                      onClick={() => this._renderBuyer(null)}
                    >
                      <Icon name="backward" />
                      Back to Search
                    </Button>
                  </Grid.Column>
                </Fragment>
              ) : null}
            </Grid.Column>
            <Grid.Column>
              {!this.state.business ? (
                <Dimmer.Dimmable dimmed>
                  <Dimmer inverted active={isLoadingBusinessList}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  <Table
                    size="small"
                    compact
                    color="blue"
                    celled
                    inverted
                    selectable
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {listBusinessList.map(business => (
                        <Table.Row
                          active
                          key={business.id}
                          onClick={() => this._renderBusiness(business)}
                        >
                          <Table.Cell>{`BS${business.id}`}</Table.Cell>
                          <Table.Cell>{business.businessName}</Table.Cell>
                          <Table.Cell>{business.listedPrice}</Table.Cell>
                          <Table.Cell>{business.description}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Dimmer.Dimmable>
              ) : null}
              {this.state.business ? (
                <Fragment>
                  <Table size="small" basic="very" compact>
                    <Table.Body>
                      <Table.Row>
                        <Table.HeaderCell>BusinessID</Table.HeaderCell>
                        <Table.Cell
                          onClick={() =>
                            history.push(`business/${this.state.business.id}`)
                          }
                          selectable
                        >
                          <Icon link name="search" />
                          {`BS${this.state.business.id}`}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell color="red">Name</Table.HeaderCell>
                        <Table.Cell>
                          {this.state.business.businessName}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.Cell>
                          {this.state.business.address1} {','}{' '}
                          {this.state.business.suburb}{' '}
                          {this.state.business.state}{' '}
                          {this.state.business.postCode}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>Industry</Table.HeaderCell>
                        <Table.Cell>
                          {this.state.business.industryId}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.Cell>
                          {this.state.business.listedPrice}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                        <Table.Cell>
                          {this.state.business.description}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>Stage</Table.HeaderCell>
                        <Table.Cell>{this.state.business.stageId}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Grid.Column floated="left" width={2}>
                    <Button
                      size="small"
                      color="grey"
                      onClick={() => this._toggleModalConfirm()}
                    >
                      <Icon name="write" />
                      Enquiry Business
                    </Button>
                    <Button size="small" color="blue">
                      <Icon name="mail" />
                      Request Owners Approval
                    </Button>
                    <Button size="small" color="blue">
                      <Icon name="send" />
                      Send Enquiry to Owner
                    </Button>
                    <Button size="small" color="blue">
                      <Icon name="mail" />
                      Email Buyer
                    </Button>
                    <Button
                      size="small"
                      color="green"
                      onClick={() => this._renderBusiness(null)}
                    >
                      <Icon name="backward" />
                      Back to Search
                    </Button>
                  </Grid.Column>
                </Fragment>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
        <br />
        <Grid.Column floated="left" width={2}>
          {this.state.buyer ? (
            <Fragment>
              <Button size="small" color="blue">
                <Icon name="talk" />
                Show Log
              </Button>
              <Button size="small" color="green">
                <Icon name="edit" />
                Edit Log
              </Button>
            </Fragment>
          ) : null}
        </Grid.Column>
        <Grid.Column>
          {this.state.buyer ? (
            <Fragment>
              <Dimmer inverted active={isLoadingBuyerLog}>
                <Loader>Loading</Loader>
              </Dimmer>
              <Table
                size="small"
                compact
                color="blue"
                celled
                inverted
                selectable
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Business</Table.HeaderCell>
                    <Table.HeaderCell>Log</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {listBuyerLogList.map(buyerLog => (
                    <Table.Row
                      active
                      key={buyerLog.buyerID}
                      onClick={() => this._renderBusiness(buyerLog.businessID)}
                    >
                      <Table.Cell>{`BS${buyerLog.buyerID}`}</Table.Cell>
                      <Table.Cell>{buyerLog.businessID}</Table.Cell>
                      <Table.Cell>{buyerLog.text}</Table.Cell>
                      <Table.Cell>{buyerLog.followUp}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Fragment>
          ) : null}
        </Grid.Column>
      </Wrapper>
    )
  }
}

ClientManagerList.propTypes = {
  history: PropTypes.object,
  openModal: PropTypes.func,
  enquiryBusiness: PropTypes.func,
  listBuyerList: PropTypes.array,
  listBusinessList: PropTypes.array,
  getBuyers: PropTypes.func,
  isLoadingBuyerList: PropTypes.bool,
  isLoadingBusinessList: PropTypes.bool,
  isUpdatedBuyer: PropTypes.bool,
  getBusinesses: PropTypes.func,
  buyerUpdated: PropTypes.object,
  isLoadingBuyerLog: PropTypes.bool,
  getLog: PropTypes.func,
  listBuyerLogList: PropTypes.array,
  sendCa: PropTypes.func
}

const mapStateToProps = state => ({
  isLoadingBuyerList: state.buyer.getAll.isLoading,
  isLoadingBusinessList: state.business.getAll.isLoading,
  listBuyerList: state.buyer.getAll.array,
  listBusinessList: state.business.getAll.array,
  isUpdatedBuyer: state.buyer.update.isUpdated,
  buyerUpdated: state.buyer.update.buyer,
  isLoadingBuyerLog: state.buyerLog.get.isLoading,
  listBuyerLogList: state.buyerLog.get.array
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      enquiryBusiness,
      getBuyers,
      getBusinesses,
      getLog,
      sendCa
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ClientManagerList)
