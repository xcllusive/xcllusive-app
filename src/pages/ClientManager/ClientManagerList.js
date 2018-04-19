import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Table, Icon, Button, Input, Grid } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import NewBuyerForm from '../../components/forms/NewBuyerForm'
import NewBusinessForm from '../../components/forms/NewBusinessForm'
import EditBuyerForm from '../../components/forms/EditBuyerForm'

import { TypesModal, openModal } from '../../redux/ducks/modal'
import enquiryBusiness from '../../redux/ducks/clientManager'

import Wrapper from '../../components/content/Wrapper'

class ClientManagerList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpenBuyer: false,
      modalOpenBusiness: false,
      modalOpenEditBuyer: false
    }
  }

  _toggleModalConfirm = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM_DELETE, {
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
  };

  _enquiryBusiness = () => {
    this.props.enquiryBusiness()
  };

  _toggleModal = modal => {
    this.setState(prevState => ({
      [modal]: !prevState[modal]
    }))
  };

  render () {
    const {
      modalOpenBuyer,
      modalOpenBusiness,
      modalOpenEditBuyer
    } = this.state

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
                action={{ icon: 'search' }}
                placeholder="Find buyers..."
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
                action={{ icon: 'search' }}
                placeholder="Find businesses..."
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
                  <Table.Row>
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                </Table.Body>
              </Table>
              <Table size="small" basic="very" compact>
                <Table.Body>
                  <Table.Row>
                    <Table.HeaderCell>BuyerID</Table.HeaderCell>
                    <Table.Cell
                      onClick={() => this._toggleModal('modalOpenEditBuyer')}
                      selectable
                    >
                      <Icon link name="search" />
                      B0001
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell color="red">Name</Table.HeaderCell>
                    <Table.Cell>Cayo Test</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.Cell>
                      Middle Boat Harbour, The Esplanade Lakes Entrance VIC 3909
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.Cell>296-16-79</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.Cell>test@test.com.au</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>CA sent</Table.HeaderCell>
                    <Table.Cell>Yes</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>CA returned</Table.HeaderCell>
                    <Table.Cell>No</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Grid.Column floated="left" width={2}>
                <Button size="small" color="grey">
                  <Icon name="folder open outline" />
                  Open CA
                </Button>
              </Grid.Column>
              <br />
              <Grid.Column floated="left" width={2}>
                <Button size="small" color="blue">
                  <Icon name="mail" />
                  CA Received
                </Button>
                <Button size="small" color="blue">
                  <Icon name="send" />
                  Send CA
                </Button>
                <Button size="small" color="blue">
                  <Icon name="send" />
                  Send IM
                </Button>
                <Button size="small" color="green">
                  <Icon name="backward" />
                  Back to Search
                </Button>
              </Grid.Column>
            </Grid.Column>
            <Grid.Column>
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
                  <Table.Row>
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                </Table.Body>
              </Table>
              <Table size="small" basic="very" compact>
                <Table.Body>
                  <Table.Row>
                    <Table.HeaderCell>BusinessID</Table.HeaderCell>
                    <Table.Cell>BS0001</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell color="red">Name</Table.HeaderCell>
                    <Table.Cell>Ferrymans Seafood Cafe</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.Cell>
                      Middle Boat Harbour, The Esplanade Lakes Entrance VIC 3909
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Industry</Table.HeaderCell>
                    <Table.Cell>Restaurant</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.Cell>$1000000.00</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    <Table.Cell>bla bla bla</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Stage</Table.HeaderCell>
                    <Table.Cell>bla bla bla</Table.Cell>
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
              </Grid.Column>
              <br />
              <br />
              <Grid.Column floated="left" width={2}>
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
                <Button size="small" color="green">
                  <Icon name="backward" />
                  Back to Search
                </Button>
              </Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
        <br />
        <Grid.Column floated="left" width={2}>
          <Button size="small" color="blue">
            <Icon name="talk" />
            Show Log
          </Button>
          <Button size="small" color="green">
            <Icon name="edit" />
            Edit Log
          </Button>
        </Grid.Column>
        <br />
        <Grid.Column>
          <Table size="small" compact color="blue" celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Wrapper>
    )
  }
}

ClientManagerList.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  openModal: PropTypes.func,
  enquiryBusiness: PropTypes.func
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      enquiryBusiness
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ClientManagerList)
