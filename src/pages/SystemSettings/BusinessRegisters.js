import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, Icon, Button, Grid } from 'semantic-ui-react'

import { getBusinessRegister, removeBusinessRegister } from '../../redux/ducks/businessRegister'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import Wrapper from '../../components/content/Wrapper'

class BusinessRegisters extends Component {
  // async componentWillReceiveProps (nextProps) {
  //   if (this.props.createBusinessRegister !== nextProps.createBusinessRegister && nextProps.createBusinessRegister) {
  //     this.props.getBusiness()
  //   }
  //   if (this.props.updateBusinessRegister !== nextProps.updateBusinessRegister && nextProps.updateBusinessRegister) {
  //     this.props.getBusiness()
  //   }
  //   if (this.props.deleteBusinessRegister !== nextProps.deleteBusinessRegister && nextProps.deleteBusinessRegister) {
  //     this.props.getBusiness()
  //   }
  // }

  componentDidMount () {
    this.props.getBusinessRegister(1)
    this.props.getBusinessRegister(2)
    this.props.getBusinessRegister(3)
    this.props.getBusinessRegister(4)
    this.props.getBusinessRegister(5)
    this.props.getBusinessRegister(6)
    this.props.getBusinessRegister(7)
  }

  _toggleModalConfirmDelete = (id, registerType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM_DELETE, {
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
  };

  _removeBusinessRegister = (id, registerType) => {
    this.props.removeBusinessRegister({ id, registerType })
  };

  _editBusiness = (businessRegister, businessRegisterType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_EDIT_BUSSINES_REGISTER, {
      title: 'Edit Business Register',
      businessRegister,
      businessRegisterType
    })
  };

  _newBusiness = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_BUSSINES_REGISTER, {
      title: 'New Business Register'
    })
  };

  render () {
    return (
      <Wrapper>
        <Grid padded="horizontally">
          <Grid.Row columns={1}>
            <Grid.Column floated="right" width={2}>
              <Button onClick={() => this._toggleModal(false, false)} color="facebook">
                <Icon name="add" />
                New Register
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated="left" width={4}>
              <h5>
                <b>
                  <div align="left"> Business Source </div>
                </b>
              </h5>
            </Grid.Column>
            <Grid.Column floated="left" width={4}>
              <h5>
                <b>
                  <div align="left"> Business Rating </div>
                </b>
              </h5>
            </Grid.Column>
            <Grid.Column floated="left" width={4}>
              <h5>
                <b>
                  <div align="left"> Business Product </div>
                </b>
              </h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.sourceOptions.map(sourceOptions => {
                    return (
                      <Table.Row active key={sourceOptions.key}>
                        <Table.Cell>{sourceOptions.value}</Table.Cell>
                        <Table.Cell>{sourceOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon link name="edit" onClick={() => this._editBusiness(sourceOptions, 1)} />
                          <Icon link name="trash" color="red" onClick={() => this._toggleModalConfirmDelete(sourceOptions.value, 1)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.ratingOptions.map(ratingOptions => {
                    return (
                      <Table.Row active key={ratingOptions.key}>
                        <Table.Cell>{ratingOptions.value}</Table.Cell>
                        <Table.Cell>{ratingOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon link name="edit" onClick={() => this._editBusiness(ratingOptions, 2)} />
                          <Icon link name="trash" color="red" onClick={() => this._toggleModalConfirmDelete(ratingOptions.value, 2)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.productOptions.map(productOptions => {
                    return (
                      <Table.Row active key={productOptions.key}>
                        <Table.Cell>{productOptions.value}</Table.Cell>
                        <Table.Cell>{productOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon link name="edit" onClick={() => this._editBusiness(productOptions, 3)} />
                          <Icon link name="trash" color="red" onClick={() => this._toggleModalConfirmDelete(productOptions.value, 3)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated="left" width={5}>
              <h5>
                <b>
                  <div align="left"> Business Industry </div>
                </b>
              </h5>
            </Grid.Column>
            <Grid.Column floated="left" width={5}>
              <h5>
                <b>
                  <div align="left"> Business Type </div>
                </b>
              </h5>
            </Grid.Column>
            <Grid.Column floated="left" width={5}>
              <h5>
                <b>
                  <div align="left"> Business Owner`s Time </div>
                </b>
              </h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.industryOptions.map(industryOptions => {
                    return (
                      <Table.Row active key={industryOptions.key}>
                        <Table.Cell>{industryOptions.value}</Table.Cell>
                        <Table.Cell>{industryOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon link name="edit" onClick={() => this._editBusiness(industryOptions, 4)} />
                          <Icon link name="trash" color="red" onClick={() => this._toggleModalConfirmDelete(industryOptions.value, 4)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.typeOptions.map(typeOptions => {
                    return (
                      <Table.Row active key={typeOptions.key}>
                        <Table.Cell>{typeOptions.value}</Table.Cell>
                        <Table.Cell>{typeOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon link name="edit" onClick={() => this._editBusiness(typeOptions, 5)} />
                          <Icon link name="trash" color="red" onClick={() => this._toggleModalConfirmDelete(typeOptions.value, 5)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.ownersTimeOptions.map(ownersTimeOptions => {
                    return (
                      <Table.Row active key={ownersTimeOptions.key}>
                        <Table.Cell>{ownersTimeOptions.value}</Table.Cell>
                        <Table.Cell>{ownersTimeOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon link name="edit" onClick={() => this._editBusiness(ownersTimeOptions, 6)} />
                          <Icon link name="trash" color="red" onClick={() => this._toggleModalConfirmDelete(ownersTimeOptions.value, 6)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated="left" width={4}>
              <h5>
                <b>
                  <div align="left"> Business Stage </div>
                </b>
              </h5>
            </Grid.Column>
            <Grid.Column floated="left" width={4}>
              <h5>
                <b>
                  <div align="left"> Stage Not Signed </div>
                </b>
              </h5>
            </Grid.Column>
            <Grid.Column floated="left" width={4}>
              <h5>
                <b>
                  <div align="left"> Stage Not Want </div>
                </b>
              </h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.stageOptions.map(stageOptions => {
                    return (
                      <Table.Row active key={stageOptions.key}>
                        <Table.Cell>{stageOptions.value}</Table.Cell>
                        <Table.Cell>{stageOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon link name="edit" onClick={() => this._editBusiness(stageOptions, 7)} />
                          <Icon link name="trash" color="red" onClick={() => this._toggleModalConfirmDelete(stageOptions.value, 7)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.stageNotSignedOptions.map(stageNotSignedOptions => (
                    <Table.Row active key={stageNotSignedOptions.key}>
                      <Table.Cell>{stageNotSignedOptions.value}</Table.Cell>
                      <Table.Cell>{stageNotSignedOptions.text}</Table.Cell>
                      <Table.Cell>
                        <Icon link name="edit" onClick={() => this._editBusiness(stageNotSignedOptions, 8)} />
                        <Icon link name="trash" color="red" onClick={() => this._toggleModalConfirmDelete(stageNotSignedOptions.value, 8)} />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.stageNotWantOptions.map(stageNotWantOptions => {
                    return (
                      <Table.Row active key={stageNotWantOptions.key}>
                        <Table.Cell>{stageNotWantOptions.value}</Table.Cell>
                        <Table.Cell>{stageNotWantOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon link name="edit" onClick={() => this._editBusiness(stageNotWantOptions, 9)} />
                          <Icon link name="trash" color="red" onClick={() => this._toggleModalConfirmDelete(stageNotWantOptions.value, 9)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

BusinessRegisters.propTypes = {
  removeBusinessRegister: PropTypes.func,
  stageOptions: PropTypes.array,
  sourceOptions: PropTypes.array,
  ratingOptions: PropTypes.array,
  productOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  typeOptions: PropTypes.array,
  ownersTimeOptions: PropTypes.array,
  // createBusinessRegister: PropTypes.bool,
  // updateBusinessRegister: PropTypes.bool,
  // deleteBusinessRegister: PropTypes.bool,
  stageNotSignedOptions: PropTypes.array,
  stageNotWantOptions: PropTypes.array,
  openModal: PropTypes.func,
  getBusinessRegister: PropTypes.func
}

const mapStateToProps = state => ({
  isLoading: state.business.get.isLoading,
  stageOptions: state.businessRegister.get.stage.array,
  sourceOptions: state.businessRegister.get.source.array,
  ratingOptions: state.businessRegister.get.rating.array,
  productOptions: state.businessRegister.get.product.array,
  industryOptions: state.businessRegister.get.industry.array,
  typeOptions: state.businessRegister.get.type.array,
  ownersTimeOptions: state.businessRegister.get.ownersTime.array,
  createBusinessRegister: state.businessRegister.create.isCreated,
  updateBusinessRegister: state.businessRegister.update.isUpdated,
  deleteBusinessRegister: state.businessRegister.delete.isDeleted,
  stageNotSignedOptions: state.business.get.stageNotSignedOptions,
  stageNotWantOptions: state.business.get.stageNotWantOptions
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
