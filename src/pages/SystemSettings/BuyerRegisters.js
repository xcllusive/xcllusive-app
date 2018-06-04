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
  Pagination
} from 'semantic-ui-react'

import {
  getBusinessRegister,
  removeBusinessRegister
} from '../../redux/ducks/businessRegister'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import Wrapper from '../../components/content/Wrapper'

class BusinessRegisters extends Component {
  componentDidMount () {
    this.props.getBusinessRegister(1)
    this.props.getBusinessRegister(2)
    this.props.getBusinessRegister(3)
    this.props.getBusinessRegister(4)
    this.props.getBusinessRegister(5)
    this.props.getBusinessRegister(6)
    this.props.getBusinessRegister(7)
  }

  _toggleModalConfirm = (id, registerType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Business Register',
        text: 'Are you sure you want to delete business register?',
        id,
        registerType
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this._removeBusinessRegister(isConfirmed.id, isConfirmed.registerType)
        }
      }
    })
  }

  _removeBusinessRegister = async (id, registerType) => {
    await this.props.removeBusinessRegister({ id, registerType })
    this.props.getBusinessRegister(registerType)
  }

  _editBusiness = (businessRegister, businessRegisterType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_EDIT_BUSSINES_REGISTER, {
      title: 'Edit Business Register',
      businessRegister,
      businessRegisterType
    })
  }

  _newBusiness = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_BUSSINES_REGISTER, {
      title: 'New Business Register'
    })
  }

  _handlePaginationChange = (e, { activePage }, businessRegisterType) => {
    this.props.getBusinessRegister(businessRegisterType, 5, activePage)
  }

  render () {
    return (
      <Wrapper>
        <Grid padded="horizontally">
          <Grid.Row columns={1}>
            <Grid.Column floated="right" width={2}>
              <Button onClick={this._newBusiness} color="facebook" size="small">
                <Icon name="add" />
                New Register
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header as="h5" attached="top">
                Business Type
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
                            onClick={() => this._editBusiness(typeOptions, 5)}
                          />
                          <Icon
                            link
                            name="trash"
                            color="red"
                            onClick={() =>
                              this._toggleModalConfirm(typeOptions.value, 5)
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
      </Wrapper>
    )
  }
}

BusinessRegisters.propTypes = {
  removeBusinessRegister: PropTypes.func,
  sourceOptions: PropTypes.object,
  stageOptions: PropTypes.object,
  ratingOptions: PropTypes.object,
  productOptions: PropTypes.object,
  industryOptions: PropTypes.object,
  typeOptions: PropTypes.object,
  stageNotSignedOptions: PropTypes.object,
  stageNotWantOptions: PropTypes.object,
  openModal: PropTypes.func,
  getBusinessRegister: PropTypes.func
}

const mapStateToProps = state => ({
  isLoading: state.business.get.isLoading,
  sourceOptions: state.businessRegister.get.source,
  stageOptions: state.businessRegister.get.stage,
  ratingOptions: state.businessRegister.get.rating,
  productOptions: state.businessRegister.get.product,
  industryOptions: state.businessRegister.get.industry,
  stageNotSignedOptions: state.businessRegister.get.stageNotSigned,
  stageNotWantOptions: state.businessRegister.get.stageNotWant,
  typeOptions: state.businessRegister.get.type,
  createBusinessRegister: state.businessRegister.create.isCreated,
  updateBusinessRegister: state.businessRegister.update.isUpdated,
  deleteBusinessRegister: state.businessRegister.delete.isDeleted
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBusinessRegister,
      removeBusinessRegister,
      openModal
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(BusinessRegisters)
