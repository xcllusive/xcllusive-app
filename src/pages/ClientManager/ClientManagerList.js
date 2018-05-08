import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

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
import { getBusinesses, getBusiness } from '../../redux/ducks/business'
import { getLog, clearBuyerLog } from '../../redux/ducks/buyerLog'
import {
  enquiryBusiness,
  sendCa,
  sendIm,
  caReceived,
  emailBuyer,
  requestOwnersApproval,
  sendEnquiryToOwner
} from '../../redux/ducks/clientManager'

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
      buyerLog: null,
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

    if (
      this.props.businessObject !== nextProps.businessObject &&
      nextProps.businessObject
    ) {
      this._renderBusiness(nextProps.businessObject)
    }
  }

  componentDidMount () {
    this.props.getBuyers()
    this.props.getBusinesses(false, 5)
    //  this.props.getLog()
  }

  _backToSearch = () => {
    this._renderBuyer(null)
    this.props.clearBuyerLog()
  }

  _renderBuyer = buyer => {
    this.setState({ buyer })
  }

  _renderBusiness = business => {
    this.setState({ business })
  }

  _getBusinessObject = id => {
    this.props.getBusiness(id)
  }

  _renderBuyerLog = buyerLog => {
    this.props.getLog(this.state.buyer.id)
    this.setState({ buyerLog })
  }

  _toggleModalSendEnquiryToOwner = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Send Enquiry to Owner',
        text: 'Are you sure you want to send the enquiry to owner?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.sendEnquiryToOwner(
            this.state.buyer.id,
            this.state.business.id
          )
        }
      }
    })
  }

  _toggleModalEmailBuyer = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Email Buyer',
        text: 'Are you sure you want to send an email to buyer?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.emailBuyer(this.state.buyer.id, this.state.business.id)
        }
      }
    })
  }

  _toggleModalEnquiryBusiness = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Enquiry Business',
        text: 'Do you want to enquiry this business for the selected buyer?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.enquiryBusiness(
            this.state.buyer.id,
            this.state.business.id
          )
        }
      }
    })
  }

  _toggleModalRequestOwnersApproval = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Request Owners Approval',
        text: 'Are you sure you want request owners for approval?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.requestOwnersApproval(
            this.state.buyer.id,
            this.state.business.id
          )
        }
      }
    })
  }

  _toggleModalSendCa = caSent => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Send CA',
        text: caSent
          ? 'CA already sent. Do you want to send again?'
          : 'Are you sure you want to send the CA?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.sendCa(this.state.buyer.id, this.state.business.id)
        }
      }
    })
  }

  _toggleModalSendIm = caSent => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Send IM',
        text: 'Are you sure you want to send the IM?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.sendIm(this.state.buyer.id, this.state.business.id)
        }
      }
    })
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
    this.timer = setTimeout(() => this.props.getBusinesses(value, 5), 1000)
  }

  _toggleModal = (modal, buyer) => {
    this.setState(prevState => ({
      [modal]: !prevState[modal],
      buyer: prevState.buyer
    }))
  }

  _toggleModalCaReceived = () => {
    if (this.state.buyer && this.state.buyer.caReceived) {
      this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
        options: {
          title: 'CA Received',
          text: 'CA already received. Do you want to upload again?'
        },
        onConfirm: isConfirmed => {
          if (isConfirmed) {
            this.props.openModal(TypesModal.MODAL_TYPE_UPLOAD_FILE, {
              options: {
                title: 'Upload CA'
              },
              onConfirm: isConfirmed => {
                if (isConfirmed) {
                  this.props.caReceived(
                    this.state.file,
                    this.state.buyer.id,
                    this.state.business.id
                  )
                }
              },
              handleFileUpload: e => {
                const file = e.target.files[0]
                this.setState({ file })
              }
            })
          }
        }
      })
    } else {
      this.props.openModal(TypesModal.MODAL_TYPE_UPLOAD_FILE, {
        options: {
          title: 'Upload CA'
        },
        onConfirm: isConfirmed => {
          if (isConfirmed) {
            this.props.caReceived(
              this.state.file,
              this.state.buyer.id,
              this.state.business.id
            )
          }
        },
        handleFileUpload: e => {
          const file = e.target.files[0]
          this.setState({ file })
        }
      })
    }
  }

  _openFile = url => {
    if (url) {
      window.open(url, '_blank')
    }
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
      listBuyerLogList,
      isLoadingSendCa,
      isLoadingSendIm,
      isLoadingCaReceived,
      isLoadingEmailBuyer,
      isLoadingEnquiryBusiness,
      isLoadingRequestOwnersApproval,
      isLoadingSendEnquiryToOwner
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
                  <div align="left"> Buyer</div>
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
                    <Button
                      size="small"
                      color="grey"
                      onClick={() =>
                        this._openFile(this.state.buyer.attachmentUrl)
                      }
                    >
                      <Icon name="folder open outline" />
                      Open CA
                    </Button>
                    <Button
                      size="small"
                      color="blue"
                      onClick={() => this._toggleModalCaReceived()}
                      disabled={!this.state.business || isLoadingCaReceived}
                      loading={isLoadingCaReceived}
                    >
                      <Icon name="mail" />
                      CA Received
                    </Button>
                    <Button
                      size="small"
                      color="blue"
                      disabled={!this.state.business || isLoadingSendCa}
                      loading={isLoadingSendCa}
                      onClick={() =>
                        this._toggleModalSendCa(this.state.buyer.caSent)
                      }
                    >
                      <Icon name="send" />
                      Send CA
                    </Button>
                    <Button
                      size="small"
                      color="blue"
                      onClick={() => this._toggleModalSendIm()}
                      disabled={
                        !this.state.buyer.caReceived ||
                        !this.state.business ||
                        !this.state.business.notifyOwner ||
                        this.state.business.stageId === 5 || // Under Offer
                        this.state.business.productId === 2 // Seller Assist
                      }
                      loading={isLoadingSendIm}
                    >
                      <Icon name="send" />
                      Send IM
                    </Button>
                    <Button
                      size="small"
                      color="green"
                      onClick={() => this._backToSearch()}
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
              {this.state.business && this.state.business.id ? (
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
                      {this.state.business.productId === 2 ? (
                        <Table.Row>
                          <Table.HeaderCell>Product</Table.HeaderCell>
                          <Table.Cell>Seller Assist</Table.Cell>
                        </Table.Row>
                      ) : null}
                    </Table.Body>
                  </Table>
                  <Grid.Column floated="left" width={2}>
                    <Button
                      size="small"
                      color="grey"
                      onClick={() => this._toggleModalEnquiryBusiness()}
                      disabled={!this.state.buyer || isLoadingEnquiryBusiness}
                      loading={isLoadingEnquiryBusiness}
                    >
                      <Icon name="write" />
                      Enquiry Business
                    </Button>
                    <Button
                      size="small"
                      color="blue"
                      onClick={() => this._toggleModalRequestOwnersApproval()}
                      disabled={
                        !this.state.buyer ||
                        isLoadingRequestOwnersApproval ||
                        (!this.state.buyer.caReceived &&
                          !this.state.business.notifyOwner)
                      }
                      loading={isLoadingRequestOwnersApproval}
                    >
                      <Icon name="mail" />
                      Request Owners Approval
                    </Button>
                    <Button
                      size="small"
                      color="blue"
                      disabled={
                        !this.state.buyer ||
                        isLoadingSendEnquiryToOwner ||
                        !this.state.buyer.caReceived ||
                        !this.state.business.notifyOwner ||
                        this.state.business.productId !== 2
                      }
                      loading={isLoadingSendEnquiryToOwner}
                      onClick={() => this._toggleModalSendEnquiryToOwner()}
                    >
                      <Icon name="send" />
                      Send Enquiry to Owner
                    </Button>
                    <Button
                      size="small"
                      color="blue"
                      disabled={
                        !this.state.buyer ||
                        isLoadingEmailBuyer ||
                        this.state.business.stageId !== 5
                      }
                      onClick={() => this._toggleModalEmailBuyer()}
                      loading={isLoadingEmailBuyer}
                    >
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
              <Button
                size="small"
                color="blue"
                onClick={() => this._renderBuyerLog(this.state.buyer)}
              >
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
            <Dimmer.Dimmable dimmed>
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
                      key={buyerLog.id}
                      onClick={() =>
                        this._getBusinessObject(buyerLog.business_id)
                      }
                    >
                      <Table.Cell>{`BS${buyerLog.business_id}`}</Table.Cell>
                      <Table.Cell>{buyerLog.Business.businessName}</Table.Cell>
                      <Table.Cell>{buyerLog.text}</Table.Cell>
                      <Table.Cell>
                        {moment(buyerLog.followUp).format('DD-MM-YYYY - HH:mm')}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Dimmer.Dimmable>
          ) : null}
        </Grid.Column>
      </Wrapper>
    )
  }
}

ClientManagerList.propTypes = {
  history: PropTypes.object,
  openModal: PropTypes.func,
  isLoadingEnquiryBusiness: PropTypes.bool,
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
  sendCa: PropTypes.func,
  isLoadingSendCa: PropTypes.bool,
  isLoadingSendIm: PropTypes.bool,
  sendIm: PropTypes.func,
  isLoadingCaReceived: PropTypes.bool,
  caReceived: PropTypes.func,
  isLoadingEmailBuyer: PropTypes.bool,
  emailBuyer: PropTypes.func,
  isLoadingRequestOwnersApproval: PropTypes.bool,
  requestOwnersApproval: PropTypes.func,
  isLoadingSendEnquiryToOwner: PropTypes.bool,
  sendEnquiryToOwner: PropTypes.func,
  businessObject: PropTypes.object,
  getBusiness: PropTypes.func,
  clearBuyerLog: PropTypes.func
}

const mapStateToProps = state => ({
  isLoadingBuyerList: state.buyer.getAll.isLoading,
  isLoadingBusinessList: state.business.getAll.isLoading,
  listBuyerList: state.buyer.getAll.array,
  listBusinessList: state.business.getAll.array,
  isUpdatedBuyer: state.buyer.update.isUpdated,
  buyerUpdated: state.buyer.update.buyer,
  isLoadingBuyerLog: state.buyerLog.get.isLoading,
  listBuyerLogList: state.buyerLog.get.array,
  isLoadingSendCa: state.clientManager.sentCa.isLoading,
  isLoadingSendIm: state.clientManager.sentIm.isLoading,
  isLoadingCaReceived: state.clientManager.caReceived.isLoading,
  isLoadingEmailBuyer: state.clientManager.emailBuyer.isLoading,
  isLoadingEnquiryBusiness: state.clientManager.enquired.isLoading,
  isLoadingRequestOwnersApproval:
    state.clientManager.requestOwnersApproval.isLoading,
  isLoadingSendEnquiryToOwner: state.clientManager.sendEnquiryToOwner.isLoading,
  businessObject: state.business.get.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      enquiryBusiness,
      getBuyers,
      getBusinesses,
      getLog,
      sendCa,
      sendIm,
      caReceived,
      emailBuyer,
      requestOwnersApproval,
      sendEnquiryToOwner,
      getBusiness,
      clearBuyerLog
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ClientManagerList)
