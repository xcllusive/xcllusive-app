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
  // Dimmer,
  // Loader,
  Pagination
} from 'semantic-ui-react'

import {
  listAppraisalRegister,
  removeAppraisalRegister
} from '../../../redux/ducks/appraisalRegister'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'

class AppraisalRegisters extends Component {
  componentDidMount () {
    // this.props.listAppraisalRegister('perceivedPrice', 5)
  }

  _toggleModalConfirm = (id, registerType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Appraisal Register',
        text: 'Are you sure you want to delete appraisal register?',
        id,
        registerType
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this._removeAppraisalRegister(
            isConfirmed.id,
            isConfirmed.registerType
          )
        }
      }
    })
  }

  _removeAppraisalRegister = async (id, registerType) => {
    await this.props.removeAppraisalRegister(id)
    this.props.listAppraisalRegister(registerType)
  }

  _editAppraisal = (appraisalRegister, appraisalRegisterType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_EDIT_APPRAISAL_REGISTER, {
      title: 'Edit Appraisal Register',
      appraisalRegister,
      appraisalRegisterType
    })
  }

  _newAppraisal = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_APPRAISAL_REGISTER, {
      title: 'New Appraisal Register'
    })
  }

  _handlePaginationChange = (e, { activePage }, appraisalRegisterType) => {
    this.props.listAppraisalRegister(appraisalRegisterType, 5, activePage)
  }

  render () {
    // const { isLoadingFinancialInfoSource } = this.props
    return (
      <Wrapper>
        {/* <Dimmer.Dimmable
          dimmed={isLoadingFinancialInfoSource}
          style={{ height: '80vh' }}
        > */}
        {/* <Dimmer inverted active={isLoadingFinancialInfoSource}>
            <Loader>Loading</Loader>
          </Dimmer> */}
        <Grid padded="horizontally">
          <Grid.Row columns={1}>
            <Grid.Column floated="right" width={2}>
              <Button
                onClick={this._newAppraisal}
                color="facebook"
                size="small"
              >
                <Icon name="add" />
                New Register
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as="h5" attached="top">
                Financial Information Source
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
                  {this.props.financialInfoSourceOptions.array.map(
                    financialInfoSourceOptions => {
                      return (
                        <Table.Row active key={financialInfoSourceOptions.id}>
                          <Table.Cell>
                            {financialInfoSourceOptions.id}
                          </Table.Cell>
                          <Table.Cell>
                            {financialInfoSourceOptions.label}
                          </Table.Cell>
                          <Table.Cell>
                            <Icon
                              link
                              name="edit"
                              onClick={() =>
                                this._editAppraisal(
                                  financialInfoSourceOptions,
                                  'enquiries'
                                )
                              }
                            />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() =>
                                this._toggleModalConfirm(
                                  financialInfoSourceOptions.id,
                                  'enquiries'
                                )
                              }
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    }
                  )}
                </Table.Body>
              </Table>
              <Pagination
                size="mini"
                onPageChange={(e, data) =>
                  this._handlePaginationChange(e, data, 'enquiries')
                }
                defaultActivePage={
                  this.props.financialInfoSourceOptions.activePage
                }
                totalPages={this.props.financialInfoSourceOptions.pages}
                firstItem={null}
                lastItem={null}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* </Dimmer.Dimmable> */}
      </Wrapper>
    )
  }
}

AppraisalRegisters.propTypes = {
  removeAppraisalRegister: PropTypes.func,
  financialInfoSourceOptions: PropTypes.object,
  openModal: PropTypes.func,
  listAppraisalRegister: PropTypes.func,
  isLoadingPerceivedPrice: PropTypes.bool,
  isLoadingFinancialInfoSource: PropTypes.bool
}

const mapStateToProps = state => ({
  isLoading: state.business.get.isLoading,
  financialInfoSourceOptions: state.appraisalRegister.get.financialInfoSource,
  createAppraisalRegister: state.appraisalRegister.create.isCreated,
  updateAppraisalRegister: state.appraisalRegister.update.isUpdated,
  deleteAppraisalRegister: state.appraisalRegister.delete.isDeleted,
  isLoadingFinancialInfoSource:
    state.appraisalRegister.get.financialInfoSource.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listAppraisalRegister,
      removeAppraisalRegister,
      openModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppraisalRegisters)
