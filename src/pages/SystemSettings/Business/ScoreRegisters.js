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
  listScoreRegister,
  removeScoreRegister
} from '../../../redux/ducks/scoreRegister'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'

class ScoreRegisters extends Component {
  componentDidMount () {
    this.props.listScoreRegister('perceivedPrice', 5)
    this.props.listScoreRegister('infoTransMomen', 5)
    this.props.listScoreRegister('currentInterest', 5)
    this.props.listScoreRegister('perceivedRisk', 5)
    this.props.listScoreRegister('enquiries', 5)
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
    await this.props.removeScoreRegister(id)
    this.props.listScoreRegister(registerType)
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
      title: 'New Score Register'
    })
  }

  _handlePaginationChange = (e, { activePage }, scoreRegisterType) => {
    this.props.listScoreRegister(scoreRegisterType, 5, activePage)
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
                Enquiries
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
                    <Table.HeaderCell>Score</Table.HeaderCell>
                    <Table.HeaderCell>Text for Report</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.enquiriesOptions.array.map(enquiriesOptions => {
                    return (
                      <Table.Row active key={enquiriesOptions.id}>
                        <Table.Cell>{enquiriesOptions.label}</Table.Cell>
                        <Table.Cell>{enquiriesOptions.textReport}</Table.Cell>
                        <Table.Cell>{enquiriesOptions.weight}</Table.Cell>
                        <Table.Cell>
                          <Icon
                            link
                            name="edit"
                            onClick={() =>
                              this._editScore(enquiriesOptions, 'enquiries')
                            }
                          />
                          <Icon
                            link
                            name="trash"
                            color="red"
                            onClick={() =>
                              this._toggleModalConfirm(
                                enquiriesOptions.id,
                                'enquiries'
                              )
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
                  this._handlePaginationChange(e, data, 'enquiries')
                }
                defaultActivePage={this.props.enquiriesOptions.activePage}
                totalPages={this.props.enquiriesOptions.pages}
                firstItem={null}
                lastItem={null}
              />
            </Grid.Column>
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
                    <Table.HeaderCell>Select Options</Table.HeaderCell>
                    <Table.HeaderCell>Text for Report</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.perceivedPriceOptions.array.map(
                    perceivedPriceOptions => {
                      return (
                        <Table.Row active key={perceivedPriceOptions.id}>
                          <Table.Cell>{perceivedPriceOptions.label}</Table.Cell>
                          <Table.Cell>
                            {perceivedPriceOptions.textReport}
                          </Table.Cell>
                          <Table.Cell>
                            {perceivedPriceOptions.weight}
                          </Table.Cell>
                          <Table.Cell>
                            <Icon
                              link
                              name="edit"
                              onClick={() =>
                                this._editScore(
                                  perceivedPriceOptions,
                                  'perceivedPrice'
                                )
                              }
                            />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() =>
                                this._toggleModalConfirm(
                                  perceivedPriceOptions.id,
                                  'perceivedPrice'
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
                  this._handlePaginationChange(e, data, 'perceivedPrice')
                }
                defaultActivePage={this.props.perceivedPriceOptions.activePage}
                totalPages={this.props.perceivedPriceOptions.pages}
                firstItem={null}
                lastItem={null}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as="h5" attached="top">
                Information / Transparency / Momentum
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
                    <Table.HeaderCell>Select Options</Table.HeaderCell>
                    <Table.HeaderCell>Text for Report</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.infoTransMomenOptions.array.map(
                    infoTransMomenOptions => {
                      return (
                        <Table.Row active key={infoTransMomenOptions.id}>
                          <Table.Cell>{infoTransMomenOptions.label}</Table.Cell>
                          <Table.Cell>
                            {infoTransMomenOptions.textReport}
                          </Table.Cell>
                          <Table.Cell>
                            {infoTransMomenOptions.weight}
                          </Table.Cell>
                          <Table.Cell>
                            <Icon
                              link
                              name="edit"
                              onClick={() =>
                                this._editScore(
                                  infoTransMomenOptions,
                                  'infoTransMomen'
                                )
                              }
                            />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() =>
                                this._toggleModalConfirm(
                                  infoTransMomenOptions.id,
                                  'infoTransMomen'
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
                  this._handlePaginationChange(e, data, 'infoTransMomen')
                }
                defaultActivePage={this.props.infoTransMomenOptions.activePage}
                totalPages={this.props.infoTransMomenOptions.pages}
                firstItem={null}
                lastItem={null}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as="h5" attached="top">
                Current Interest
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
                    <Table.HeaderCell>Select Options</Table.HeaderCell>
                    <Table.HeaderCell>Text for Report</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.currentInterestOptions.array.map(
                    currentInterestOptions => {
                      return (
                        <Table.Row active key={currentInterestOptions.id}>
                          <Table.Cell>
                            {currentInterestOptions.label}
                          </Table.Cell>
                          <Table.Cell>
                            {currentInterestOptions.textReport}
                          </Table.Cell>
                          <Table.Cell>
                            {currentInterestOptions.weight}
                          </Table.Cell>
                          <Table.Cell>
                            <Icon
                              link
                              name="edit"
                              onClick={() =>
                                this._editScore(
                                  currentInterestOptions,
                                  'currentInterest'
                                )
                              }
                            />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() =>
                                this._toggleModalConfirm(
                                  currentInterestOptions.id,
                                  'currentInterest'
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
                  this._handlePaginationChange(e, data, 'currentInterest')
                }
                defaultActivePage={this.props.currentInterestOptions.activePage}
                totalPages={this.props.currentInterestOptions.pages}
                firstItem={null}
                lastItem={null}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as="h5" attached="top">
                Buyer Perceived Risk
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
                    <Table.HeaderCell>Select Options</Table.HeaderCell>
                    <Table.HeaderCell>Text for Report</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.perceivedRiskOptions.array.map(
                    perceivedRiskOptions => {
                      return (
                        <Table.Row active key={perceivedRiskOptions.id}>
                          <Table.Cell>{perceivedRiskOptions.label}</Table.Cell>
                          <Table.Cell>
                            {perceivedRiskOptions.textReport}
                          </Table.Cell>
                          <Table.Cell>{perceivedRiskOptions.weight}</Table.Cell>
                          <Table.Cell>
                            <Icon
                              link
                              name="edit"
                              onClick={() =>
                                this._editScore(
                                  perceivedRiskOptions,
                                  'perceivedRisk'
                                )
                              }
                            />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() =>
                                this._toggleModalConfirm(
                                  perceivedRiskOptions.id,
                                  'perceivedRisk'
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
                  this._handlePaginationChange(e, data, 'perceivedRisk')
                }
                defaultActivePage={this.props.perceivedRiskOptions.activePage}
                totalPages={this.props.perceivedRiskOptions.pages}
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
  infoTransMomenOptions: PropTypes.object,
  currentInterestOptions: PropTypes.object,
  perceivedRiskOptions: PropTypes.object,
  enquiriesOptions: PropTypes.object,
  openModal: PropTypes.func,
  listScoreRegister: PropTypes.func
}

const mapStateToProps = state => ({
  isLoading: state.business.get.isLoading,
  perceivedPriceOptions: state.scoreRegister.get.perceivedPrice,
  infoTransMomenOptions: state.scoreRegister.get.infoTransMomen,
  currentInterestOptions: state.scoreRegister.get.currentInterest,
  perceivedRiskOptions: state.scoreRegister.get.perceivedRisk,
  enquiriesOptions: state.scoreRegister.get.enquiries,
  createScoreRegister: state.scoreRegister.create.isCreated,
  updateScoreRegister: state.scoreRegister.update.isUpdated,
  deleteScoreRegister: state.scoreRegister.delete.isDeleted
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listScoreRegister,
      removeScoreRegister,
      openModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreRegisters)
