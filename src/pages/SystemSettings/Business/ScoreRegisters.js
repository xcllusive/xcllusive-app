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
  getScoreRegister,
  removeScoreRegister
} from '../../../redux/ducks/scoreRegister'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'

class ScoreRegisters extends Component {
  componentDidMount () {
    this.props.getScoreRegister(1)
  }

  _toggleModalConfirm = (id, registerType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Score Register',
        text: 'Are you sure you want to delete score register?',
        id,
        registerType
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this._removeScoreRegister(isConfirmed.id, isConfirmed.registerType)
        }
      }
    })
  }

  _removeScoreRegister = async (id, registerType) => {
    await this.props.removeScoreRegister({ id, registerType })
    this.props.getScoreRegister(registerType)
  }

  _editScore = (scoreRegister, scoreRegisterType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_EDIT_SCORE_REGISTER, {
      title: 'Edit Score Register',
      scoreRegister,
      scoreRegisterType
    })
  }

  _newScore = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_SCORE_REGISTER, {
      title: 'New Business Register'
    })
  }

  _handlePaginationChange = (e, { activePage }, scoreRegisterType) => {
    this.props.getScoreRegister(scoreRegisterType, 5, activePage)
  }

  render () {
    return (
      <Wrapper>
        <Grid padded="horizontally">
          <Grid.Row columns={1}>
            <Grid.Column floated="right" width={2}>
              <Button onClick={this._newScore} color="facebook" size="small">
                <Icon name="add" />
                New Register
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as="h5" attached="top">
                Perceived Price from Buyers
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
                  {this.props.perceivedPriceOptions.array.map(
                    perceivedPriceOptions => {
                      return (
                        <Table.Row active key={perceivedPriceOptions.id}>
                          <Table.Cell>{perceivedPriceOptions.id}</Table.Cell>
                          <Table.Cell>{perceivedPriceOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon
                              link
                              name="edit"
                              onClick={() =>
                                this._editScore(perceivedPriceOptions, 1)
                              }
                            />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() =>
                                this._toggleModalConfirm(
                                  perceivedPriceOptions.value,
                                  1
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
                  this._handlePaginationChange(e, data, 1)
                }
                defaultActivePage={this.props.perceivedPriceOptions.activePage}
                totalPages={this.props.perceivedPriceOptions.pages}
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

ScoreRegisters.propTypes = {
  removeScoreRegister: PropTypes.func,
  perceivedPriceOptions: PropTypes.object,
  openModal: PropTypes.func,
  getScoreRegister: PropTypes.func
}

const mapStateToProps = state => ({
  isLoading: state.business.get.isLoading,
  perceivedPriceOptions: state.scoreRegister.get.perceivedPrice,
  createScoreRegister: state.scoreRegister.create.isCreated,
  updateScoreRegister: state.scoreRegister.update.isUpdated,
  deleteScoreRegister: state.scoreRegister.delete.isDeleted
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getScoreRegister,
      removeScoreRegister,
      openModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreRegisters)
