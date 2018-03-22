import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, Icon, Button, Grid } from 'semantic-ui-react'

import { getBusiness, removeBusinessRegister } from '../../redux/ducks/business'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import Wrapper from '../../components/content/Wrapper'
import NewBusinessRegisterForm from '../../components/forms/NewBusinessRegisterForm'

class BusinessRegisters extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      editBusinessRegister: false,
      registerType: null,
      modalConfirmDeleteOpen: false
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.createBusinessRegister !== nextProps.createBusinessRegister && nextProps.createBusinessRegister) {
      await this._toggleModal(false, false)
      this.props.getBusiness()
    }
    if (this.props.updateBusinessRegister !== nextProps.updateBusinessRegister && nextProps.updateBusinessRegister) {
      await this._toggleModal(false, false)
      this.props.getBusiness()
    }
    if (this.props.deleteBusinessRegister !== nextProps.deleteBusinessRegister && nextProps.deleteBusinessRegister) {
      this.props.getBusiness()
    }
  }

  componentDidMount () {
    this.props.getBusiness()
  }

  _toggleModal = (editBusinessRegister, registerType) => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      editBusinessRegister,
      registerType
    }))
  }

  _toggleModalConfirmDelete = (id, registerType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM_DELETE, {
      options: {
        title: 'Delete Business Register',
        text: 'Are you sure you want to delete business register?',
        id,
        registerType
      },
      onConfirm: (isConfirmed) => {
        if (isConfirmed) {
          this._removeBusinessRegister(isConfirmed.id, isConfirmed.registerType)
        }
      }
    })
  }

  _removeBusinessRegister = (id, registerType) => {
    this.props.removeBusinessRegister({ id, registerType })
    this.setState(prevState => ({
      modalConfirmDeleteOpen: !prevState.modalConfirmDeleteOpen,
      idBusinessRegisterTodelete: null
    }))
  }

  render () {
    return (
      <Wrapper>
        {
          this.state.modalOpen ? (
            <NewBusinessRegisterForm
              modalOpen={this.state.modalOpen}
              toggleModal={this._toggleModal}
              editBusinessRegister={this.state.editBusinessRegister}
              registerType={this.state.registerType}
            />
          ) : null
        }
        <Grid padded='horizontally'>
          <Grid.Row columns={1}>
            <Grid.Column floated='right' width={2}>
              <Button onClick={() => this._toggleModal(false, false)} color='facebook'>
                <Icon name='add' />
                  New Register
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated='left' width={4}>
              <h5><b><div align='left'> Business Source </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={4}>
              <h5><b><div align='left'> Business Rating </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={4}>
              <h5><b><div align='left'> Business Product </div></b></h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
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
                      <Table.Row active key={sourceOptions.key} >
                        <Table.Cell>{sourceOptions.value}</Table.Cell>
                        <Table.Cell>{sourceOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon
                            link
                            name='edit'
                            onClick={() => this._toggleModal(sourceOptions, 1)} />
                          <Icon
                            link
                            name='trash'
                            color='red'
                            onClick={() => this._toggleModalConfirmDelete(sourceOptions.value, 1)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
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
                          <Icon
                            link
                            name='edit'
                            onClick={() => this._toggleModal(ratingOptions, 2)} />
                          <Icon
                            link
                            name='trash'
                            color='red'
                            onClick={() => this._toggleModalConfirmDelete(ratingOptions.value, 2)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
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
                          <Icon
                            link
                            name='edit'
                            onClick={() => this._toggleModal(productOptions, 3)} />
                          <Icon
                            link
                            name='trash'
                            color='red'
                            onClick={() => this._toggleModalConfirmDelete(productOptions.value, 3)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Industry </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Type </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Owner's Time </div></b></h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
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
                          <Icon
                            link
                            name='edit'
                            onClick={() => this._toggleModal(industryOptions, 4)} />
                          <Icon
                            link
                            name='trash'
                            color='red'
                            onClick={() => this._toggleModalConfirmDelete(industryOptions.value, 4)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
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
                          <Icon
                            link
                            name='edit'
                            onClick={() => this._toggleModal(typeOptions, 5)} />
                          <Icon
                            link
                            name='trash'
                            color='red'
                            onClick={() => this._toggleModalConfirmDelete(typeOptions.value, 5)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
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
                          <Icon
                            link
                            name='edit'
                            onClick={() => this._toggleModal(ownersTimeOptions, 6)} />
                          <Icon
                            link
                            name='trash'
                            color='red'
                            onClick={() => this._toggleModalConfirmDelete(ownersTimeOptions.value, 6)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated='left' width={4}>
              <h5><b><div align='left'> Business Stage </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={4}>
              <h5><b><div align='left'> Stage Not Signed </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={4}>
              <h5><b><div align='left'> Stage Not Want </div></b></h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
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
                          <Icon
                            link
                            name='edit'
                            onClick={() => this._toggleModal(stageOptions, 7)} />
                          <Icon
                            link
                            name='trash'
                            color='red'
                            onClick={() => this._toggleModalConfirmDelete(stageOptions.value, 7)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.stageNotSignedOptions.map(stageNotSignedOptions => {
                    return (
                      <Table.Row active key={stageNotSignedOptions.key}>
                        <Table.Cell>{stageNotSignedOptions.value}</Table.Cell>
                        <Table.Cell>{stageNotSignedOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon
                            link
                            name='edit'
                            onClick={() => this._toggleModal(stageNotSignedOptions, 8)} />
                          <Icon
                            link
                            name='trash'
                            color='red'
                            onClick={() => this._toggleModalConfirmDelete(stageNotSignedOptions.value, 8)} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
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
                          <Icon
                            link
                            name='edit'
                            onClick={() => this._toggleModal(stageNotWantOptions, 9)} />
                          <Icon
                            link
                            name='trash'
                            color='red'
                            onClick={() => this._toggleModalConfirmDelete(stageNotWantOptions.value, 9)} />
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
  getBusiness: PropTypes.func,
  removeBusinessRegister: PropTypes.func,
  stageOptions: PropTypes.array,
  sourceOptions: PropTypes.array,
  ratingOptions: PropTypes.array,
  productOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  typeOptions: PropTypes.array,
  ownersTimeOptions: PropTypes.array,
  createBusinessRegister: PropTypes.bool,
  updateBusinessRegister: PropTypes.bool,
  deleteBusinessRegister: PropTypes.bool,
  stageNotSignedOptions: PropTypes.array,
  stageNotWantOptions: PropTypes.array,
  openModal: PropTypes.func
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.get.isLoading,
    stageOptions: state.business.get.stageOptions,
    sourceOptions: state.business.get.sourceOptions,
    ratingOptions: state.business.get.ratingOptions,
    productOptions: state.business.get.productOptions,
    industryOptions: state.business.get.industryOptions,
    typeOptions: state.business.get.typeOptions,
    ownersTimeOptions: state.business.get.ownersTimeOptions,
    createBusinessRegister: state.business.createBusinessRegister.isCreated,
    updateBusinessRegister: state.business.updateBusinessRegister.isUpdated,
    deleteBusinessRegister: state.business.deleteBusinessRegister.isDeleted,
    stageNotSignedOptions: state.business.get.stageNotSignedOptions,
    stageNotWantOptions: state.business.get.stageNotWantOptions
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBusiness, removeBusinessRegister, openModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessRegisters)
