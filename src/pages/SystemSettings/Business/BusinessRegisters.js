import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Grid, Header, Dimmer, Loader, Pagination } from 'semantic-ui-react'
import { getBusinessRegister, removeBusinessRegister } from '../../../redux/ducks/businessRegister'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'

class BusinessRegisters extends Component {
  async componentDidMount () {
    await this.props.getBusinessRegister(1)
    await this.props.getBusinessRegister(2)
    await this.props.getBusinessRegister(3)
    await this.props.getBusinessRegister(4)
    await this.props.getBusinessRegister(5)
    await this.props.getBusinessRegister(6)
    await this.props.getBusinessRegister(7)
    await this.props.getBusinessRegister(8)
    await this.props.getBusinessRegister(9)
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
    this.props.openModal(TypesModal.MODAL_TYPE_EDIT_BUSINESS_REGISTER, {
      title: 'Edit Business Register',
      businessRegister,
      businessRegisterType
    })
  }

  _newBusiness = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_BUSINESS_REGISTER, {
      title: 'New Business Register'
    })
  }

  _handlePaginationChange = (e, { activePage }, businessRegisterType) => {
    this.props.getBusinessRegister(businessRegisterType, 5, activePage)
  }

  render () {
    const {
      isLoadingSource,
      isLoadingIndustry,
      isLoadingProduct,
      isLoadingRating,
      isLoadingStage,
      isLoadingStageNotSigned,
      isLoadingStageNotWant,
      isLoadingType,
      isLoadingCtcBusinessSource
    } = this.props
    return (
      <Wrapper>
        <Dimmer.Dimmable
          dimmed={
            isLoadingSource ||
            isLoadingIndustry ||
            isLoadingProduct ||
            isLoadingRating ||
            isLoadingSource ||
            isLoadingStage ||
            isLoadingStageNotSigned ||
            isLoadingStageNotWant ||
            isLoadingType ||
            isLoadingCtcBusinessSource
          }
          style={{ marginLeft: '15px' }}
        >
          <Dimmer
            inverted
            active={
              isLoadingSource ||
              isLoadingIndustry ||
              isLoadingProduct ||
              isLoadingRating ||
              isLoadingSource ||
              isLoadingStage ||
              isLoadingStageNotSigned ||
              isLoadingStageNotWant ||
              isLoadingType ||
              isLoadingCtcBusinessSource
            }
          >
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid padded="horizontally">
            <Grid.Row columns={1}>
              <Grid.Column floated="right" width={2}>
                <Button onClick={this._newBusiness} color="facebook" size="small">
                  <Icon name="add" />
                  New Register
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} widths="equal">
              <Grid.Column>
                <Header as="h5" attached="top">
                  Xcllusive - Business Source
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.sourceOptions.array.map(sourceOptions => {
                      return (
                        <Table.Row active key={sourceOptions.id}>
                          <Table.Cell>{sourceOptions.id}</Table.Cell>
                          <Table.Cell>{sourceOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon link name="edit" onClick={() => this._editBusiness(sourceOptions, 1)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(sourceOptions.id, 1)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 1)}
                  defaultActivePage={this.props.sourceOptions.activePage}
                  totalPages={this.props.sourceOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h5" attached="top">
                  CTC - Business Source
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.ctcSourceOptions.array.map(ctcSourceOptions => {
                      return (
                        <Table.Row active key={ctcSourceOptions.id}>
                          <Table.Cell>{ctcSourceOptions.id}</Table.Cell>
                          <Table.Cell>{ctcSourceOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon link name="edit" onClick={() => this._editBusiness(ctcSourceOptions, 6)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(ctcSourceOptions.id, 6)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 6)}
                  defaultActivePage={this.props.ctcSourceOptions.activePage}
                  totalPages={this.props.ctcSourceOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h5" attached="top">
                  Business Rating
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.ratingOptions.array.map(ratingOptions => {
                      return (
                        <Table.Row active key={ratingOptions.id}>
                          <Table.Cell>{ratingOptions.id}</Table.Cell>
                          <Table.Cell>{ratingOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon link name="edit" onClick={() => this._editBusiness(ratingOptions, 2)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(ratingOptions.id, 2)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 2)}
                  defaultActivePage={this.props.ratingOptions.activePage}
                  totalPages={this.props.ratingOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header as="h5" attached="top">
                  Business Product
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.productOptions.array.map(productOptions => {
                      return (
                        <Table.Row active key={productOptions.id}>
                          <Table.Cell>{productOptions.id}</Table.Cell>
                          <Table.Cell>{productOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon link name="edit" onClick={() => this._editBusiness(productOptions, 3)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(productOptions.id, 3)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 3)}
                  defaultActivePage={this.props.productOptions.activePage}
                  totalPages={this.props.productOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h5" attached="top">
                  Business Industry
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.industryOptions.array.map(industryOptions => {
                      return (
                        <Table.Row active key={industryOptions.id}>
                          <Table.Cell>{industryOptions.id}</Table.Cell>
                          <Table.Cell>{industryOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon link name="edit" onClick={() => this._editBusiness(industryOptions, 4)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(industryOptions.id, 4)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 4)}
                  defaultActivePage={this.props.industryOptions.activePage}
                  totalPages={this.props.industryOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h5" attached="top">
                  Business Type
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
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
                            <Icon link name="edit" onClick={() => this._editBusiness(typeOptions, 5)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(typeOptions.id, 5)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 5)}
                  defaultActivePage={this.props.typeOptions.activePage}
                  totalPages={this.props.typeOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header as="h5" attached="top">
                  Business Stage
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.stageOptions.array.map(stageOptions => {
                      return (
                        <Table.Row active key={stageOptions.id}>
                          <Table.Cell>{stageOptions.id}</Table.Cell>
                          <Table.Cell>{stageOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon link name="edit" onClick={() => this._editBusiness(stageOptions, 7)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(stageOptions.id, 7)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 7)}
                  defaultActivePage={this.props.stageOptions.activePage}
                  totalPages={this.props.stageOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h5" attached="top">
                  Stage Not Signed
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.stageNotSignedOptions.array.map(stageNotSignedOptions => (
                      <Table.Row active key={stageNotSignedOptions.id}>
                        <Table.Cell>{stageNotSignedOptions.id}</Table.Cell>
                        <Table.Cell>{stageNotSignedOptions.label}</Table.Cell>
                        <Table.Cell>
                          <Icon link name="edit" onClick={() => this._editBusiness(stageNotSignedOptions, 8)} />
                          <Icon
                            link
                            name="trash"
                            color="red"
                            onClick={() => this._toggleModalConfirm(stageNotSignedOptions.id, 8)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 8)}
                  defaultActivePage={this.props.stageNotSignedOptions.activePage}
                  totalPages={this.props.stageNotSignedOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h5" attached="top">
                  Stage Not Want
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.stageNotWantOptions.array.map(stageNotWantOptions => {
                      return (
                        <Table.Row active key={stageNotWantOptions.id}>
                          <Table.Cell>{stageNotWantOptions.id}</Table.Cell>
                          <Table.Cell>{stageNotWantOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon link name="edit" onClick={() => this._editBusiness(stageNotWantOptions, 9)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(stageNotWantOptions.id, 9)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 9)}
                  defaultActivePage={this.props.stageNotWantOptions.activePage}
                  totalPages={this.props.stageNotWantOptions.pages}
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
  ctcSourceOptions: PropTypes.object,
  openModal: PropTypes.func,
  getBusinessRegister: PropTypes.func,
  isLoadingSource: PropTypes.bool,
  isLoadingIndustry: PropTypes.bool,
  isLoadingProduct: PropTypes.bool,
  isLoadingRating: PropTypes.bool,
  isLoadingStage: PropTypes.bool,
  isLoadingStageNotSigned: PropTypes.bool,
  isLoadingStageNotWant: PropTypes.bool,
  isLoadingType: PropTypes.bool,
  isLoadingCtcBusinessSource: PropTypes.bool
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
  ctcSourceOptions: state.businessRegister.get.ctcBusinessSource,
  typeOptions: state.businessRegister.get.type,
  createBusinessRegister: state.businessRegister.create.isCreated,
  updateBusinessRegister: state.businessRegister.update.isUpdated,
  deleteBusinessRegister: state.businessRegister.delete.isDeleted,
  isLoadingSource: state.businessRegister.get.source.isLoading,
  isLoadingRating: state.businessRegister.get.rating.isLoading,
  isLoadingProduct: state.businessRegister.get.product.isLoading,
  isLoadingIndustry: state.businessRegister.get.industry.isLoading,
  isLoadingType: state.businessRegister.get.type.isLoading,
  isLoadingStage: state.businessRegister.get.stage.isLoading,
  isLoadingStageNotSigned: state.businessRegister.get.stageNotSigned.isLoading,
  isLoadingStageNotWant: state.businessRegister.get.stageNotWant.isLoading,
  isLoadingCtcBusinessSource: state.businessRegister.get.ctcBusinessSource.isLoading
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessRegisters)
