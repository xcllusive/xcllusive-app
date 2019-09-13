import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Grid, Header, Dimmer, Loader, Pagination } from 'semantic-ui-react'
import { listIssue, removeIssue } from '../../../redux/ducks/issue'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'

class IssueRegisters extends Component {
  async componentDidMount () {
    await this.props.listIssue()
  }

  _toggleModalConfirm = (id, registerType) => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Issue',
        text: 'Are you sure you want to delete issue?',
        id,
        registerType
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this._removeIssue(isConfirmed.id, isConfirmed.registerType)
        }
      }
    })
  }

  _removeIssue = async id => {
    await this.props.removeIssue({ id })
    this.props.listIssue()
  }

  _editIssue = issue => {
    this.props.openModal(TypesModal.MODAL_ISSUE_REGISTER, {
      title: 'Edit Issue',
      issue,
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          this.props.listIssue()
        }
      }
    })
  }

  _newBusiness = () => {
    this.props.openModal(TypesModal.MODAL_ISSUE_REGISTER, {
      title: 'New Issue',
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          this.props.listIssue()
        }
      }
    })
  }

  _handlePaginationChange = (e, { activePage }) => {
    this.props.listIssue(5, activePage)
  }

  render () {
    const { isLoadingSource } = this.props
    return (
      <Wrapper>
        <Dimmer.Dimmable dimmed={isLoadingSource} style={{ marginLeft: '15px' }}>
          <Dimmer inverted active={isLoadingSource}>
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid padded="horizontally">
            <Grid.Row columns={1}>
              <Grid.Column floated="right" width={2}>
                <Button onClick={this._newBusiness} color="facebook" size="small">
                  <Icon name="add" />
                  New Issue
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} widths="equal">
              <Grid.Column>
                <Header as="h5" attached="top">
                  CTC - Issues
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
                    {this.props.issueOptions.map(issueOptions => {
                      return (
                        <Table.Row active key={issueOptions.id}>
                          <Table.Cell>{issueOptions.id}</Table.Cell>
                          <Table.Cell>{issueOptions.label}</Table.Cell>
                          <Table.Cell>
                            <Icon link name="edit" onClick={() => this._editIssue(issueOptions, 1)} />
                            <Icon
                              link
                              name="trash"
                              color="red"
                              onClick={() => this._toggleModalConfirm(issueOptions.id, 1)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data)}
                  defaultActivePage={this.props.issueActivePage}
                  totalPages={this.props.issuePages}
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

IssueRegisters.propTypes = {
  removeIssue: PropTypes.func,
  issueOptions: PropTypes.array,
  openModal: PropTypes.func,
  listIssue: PropTypes.func,
  isLoadingSource: PropTypes.bool,
  issuePages: PropTypes.number,
  issueActivePage: PropTypes.number
}

const mapStateToProps = state => ({
  isLoading: state.business.get.isLoading,
  issueOptions: state.issue.get.array,
  issuePages: state.issue.get.pages,
  issueActivePage: state.issue.get.activePage,
  createIssue: state.issue.create.isCreated,
  updateIssue: state.issue.update.isUpdated,
  deleteIssue: state.issue.delete.isDeleted,
  isLoadingSource: state.issue.get.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listIssue,
      removeIssue,
      openModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueRegisters)
