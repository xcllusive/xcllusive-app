import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Table,
  Icon,
  Button,
  Grid,
  Header,
  Dimmer,
  Loader,
  Pagination
} from 'semantic-ui-react'

import {
  getBuyerRegister,
  removeBuyerRegister
} from '../../../redux/ducks/buyerRegister'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'

class BuyerRegisters extends Component {
  componentDidMount () {
    this.props.getBuyerRegister(1)
  }

  _toggleModalConfirm = (id, buyerRegister) => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Buyer Register',
        text: 'Are you sure you want to delete buyer register?',
        id,
        buyerRegister
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this._removeBuyerRegister(isConfirmed.id, isConfirmed.buyerRegister)
        }
      }
    })
  }

  _removeBuyerRegister = async (id, buyerRegister) => {
    await this.props.removeBuyerRegister({ id, buyerRegister })
    this.props.getBuyerRegister(buyerRegister)
  }

  _editBuyer = (objectBuyerRegister, buyerRegister) => {
    this.props.openModal(TypesModal.MODAL_TYPE_EDIT_BUYER_REGISTER, {
      title: 'Edit Buyer Register',
      objectBuyerRegister,
      buyerRegister
    })
  }

  _newBuyer = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_BUYER_REGISTER, {
      title: 'New Buyer Register'
    })
  }

  _handlePaginationChange = (e, { activePage }, buyerRegisterType) => {
    this.props.getBuyerRegister(buyerRegisterType, 5, activePage)
  }

  render () {
    const { isLoadingBuyerRegister } = this.props
    return (
      <Wrapper>
        <Dimmer.Dimmable
          dimmed={isLoadingBuyerRegister}
          style={{ height: '80vh' }}
        >
          <Dimmer inverted active={isLoadingBuyerRegister}>
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid padded="horizontally">
            <Grid.Row columns={1}>
              <Grid.Column floated="right" width={2}>
                <Button onClick={this._newBuyer} color="facebook" size="small">
                  <Icon name="add" />
                  New Register
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header as="h5" attached="top">
                  Buyer Type
                </Header>
                <Table
                  compact
                  celled
                  inverted
                  selectable
                  color="blue"
                  size="small"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.typeOptions.array.map(typeOptions => {
                      return (
                        <Table.Row active key={typeOptions.id}>
                          <Table.Cell>{typeOptions.id}</Table.Cell>
                          <Table.Cell>{typeOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon
                              link
                              name="edit"
                              onClick={() => this._editBuyer(typeOptions, 1)}
                            />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() =>
                                this._toggleModalConfirm(typeOptions.id, 1)
                              }
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) =>
                    this._handlePaginationChange(e, data, 5)
                  }
                  defaultActivePage={this.props.typeOptions.activePage}
                  totalPages={this.props.typeOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Dimmer.Dimmable>
      </Wrapper>
    )
  }
}

BuyerRegisters.propTypes = {
  removeBuyerRegister: PropTypes.func,
  typeOptions: PropTypes.object,
  openModal: PropTypes.func,
  getBuyerRegister: PropTypes.func,
  isLoadingBuyerRegister: PropTypes.bool
}

const mapStateToProps = state => ({
  typeOptions: state.buyerRegister.get.type,
  createBuyerRegister: state.buyerRegister.create.isCreated,
  updateBuyerRegister: state.buyerRegister.update.isUpdated,
  deleteBuyerRegister: state.buyerRegister.delete.isDeleted,
  isLoadingBuyerRegister: state.buyerRegister.get.type.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBuyerRegister,
      removeBuyerRegister,
      openModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerRegisters)
