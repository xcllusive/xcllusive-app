import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, Icon, Button, Grid, Header, Dimmer, Loader } from 'semantic-ui-react'

import { getOfficeRegister, removeOfficeRegister } from '../../../redux/ducks/officeRegister'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'

class OfficeRegisters extends Component {
  componentDidMount () {
    this.props.getOfficeRegister()
  }

  _toggleModalConfirm = id => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Office Register',
        text: 'Are you sure you want to delete office register?',
        id
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this._removeOfficeRegister(isConfirmed.id, isConfirmed.officeRegister)
        }
      }
    })
  }

  _removeOfficeRegister = async id => {
    await this.props.removeOfficeRegister({ id })
    this.props.getOfficeRegister()
  }

  _editOffice = objectOfficeRegister => {
    this.props.openModal(TypesModal.MODAL_TYPE_OFFICE_REGISTER, {
      title: 'Edit Office Register',
      objectOfficeRegister
    })
  }

  _newOffice = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_OFFICE_REGISTER, {
      title: 'New Office Register'
    })
  }

  // _handlePaginationChange = (e, { activePage }, officeRegisterType) => {
  //   this.props.getOfficeRegister(5, activePage)
  // }

  render () {
    const { isLoadingOfficeRegister, officeOptions } = this.props
    return (
      <Wrapper>
        <Dimmer.Dimmable dimmed={isLoadingOfficeRegister} style={{ height: '80vh' }}>
          <Dimmer inverted active={isLoadingOfficeRegister}>
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid padded="horizontally">
            <Grid.Row columns={1}>
              <Grid.Column floated="right" width={2}>
                <Button onClick={this._newOffice} color="facebook" size="small">
                  <Icon name="add" />
                  New Register
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                <Header as="h5" attached="top">
                  Office Registered
                </Header>
                <Table compact celled inverted selectable color="blue" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                      <Table.HeaderCell>Address</Table.HeaderCell>
                      <Table.HeaderCell>Phone</Table.HeaderCell>
                      <Table.HeaderCell>License</Table.HeaderCell>
                      <Table.HeaderCell>ABN</Table.HeaderCell>
                      <Table.HeaderCell>Settings</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {officeOptions.map(officeOptions => {
                      return (
                        <Table.Row active key={officeOptions.id}>
                          <Table.Cell>{officeOptions.id}</Table.Cell>
                          <Table.Cell>{officeOptions.label}</Table.Cell>
                          <Table.Cell>{officeOptions.address}</Table.Cell>
                          <Table.Cell>{officeOptions.phoneNumber}</Table.Cell>
                          <Table.Cell>{officeOptions.license}</Table.Cell>
                          <Table.Cell>{officeOptions.abn}</Table.Cell>
                          <Table.Cell>
                            <Icon link name="edit" onClick={() => this._editOffice(officeOptions, 1)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(officeOptions.id, 1)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                {/* <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 1)}
                  defaultActivePage={this.props.typeOptions.activePage}
                  totalPages={this.props.typeOptions.pages}
                  firstItem={null}
                  lastItem={null}
                /> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Dimmer.Dimmable>
      </Wrapper>
    )
  }
}

OfficeRegisters.propTypes = {
  removeOfficeRegister: PropTypes.func,
  officeOptions: PropTypes.array,
  openModal: PropTypes.func,
  getOfficeRegister: PropTypes.func,
  isLoadingOfficeRegister: PropTypes.bool
}

const mapStateToProps = state => ({
  officeOptions: state.officeRegister.get.array,
  createOfficeRegister: state.officeRegister.create.isCreated,
  updateOfficeRegister: state.officeRegister.update.isUpdated,
  deleteOfficeRegister: state.officeRegister.delete.isDeleted,
  isLoadingOfficeRegister: state.officeRegister.get.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOfficeRegister,
      removeOfficeRegister,
      openModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficeRegisters)
