import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Table, Grid, Header, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'

import { theme } from '../../../styles'
import Wrapper from '../../../components/content/Wrapper'

import { createAppraisal, getAppraisals, removeAppraisal, duplicateAppraisal } from '../../../redux/ducks/appraisal'
import { TypesModal, openModal } from '../../../redux/ducks/modal'

class AppraisalListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getAppraisals(this.props.location.state.business.id)
  }

  _newAppraisal () {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Creating Appraisal',
        text: 'Are you sure you want to create a new appraisal for this business?'
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.createAppraisal(this.props.values)
          this.props.history.push({
            pathname: 'appraisalMenu',
            state: {
              business: this.props.location.state.business,
              isLoadingCreating: this.props.isLoadingCreating,
              appraisalObject: this.props.createdAppraisal
            }
          })
        }
      }
    })
  }

  _deleteAppraisal (id) {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Creating Appraisal',
        text: 'Are you sure you want to delete the appraisal? Once you have delete you can not get back.'
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.removeAppraisal(id)
          this.props.getAppraisals(this.props.location.state.business.id)
        }
      }
    })
  }

  _calcPercCompleted = props => {
    return (
      props.percBusinessDetail +
      props.percAbout +
      props.percCustomersSuppliers +
      props.percPremisesEnployees +
      props.percOwnershipFinalNotes +
      props.percBusinessAnalysis +
      props.percFinancialAnalysis +
      props.percComparableData +
      props.percPricing +
      props.percNotesAndAssumptions
    )
  }

  _duplicateAppraisal = id => {
    // It needs to talk to zoran to define how we gonna make it
    // this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
    //   options: {
    //     title: 'Duplicating Appraisal',
    //     text: 'Are you sure you want to duplicate this appraisal?'
    //   },
    //   onConfirm: async isConfirmed => {
    //     if (isConfirmed) {
    //       await this.props.duplicateAppraisal(id)
    //       this.props.getAppraisals(this.props.location.state.business.id)
    //     }
    //   }
    // })
  }

  render () {
    const { history, listAppraisalList } = this.props
    const { business } = this.props.location.state
    return (
      <Wrapper>
        <Grid style={{ marginTop: 0 }}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as="h2" color="blue" content={`Appraisal Log: ${business.businessName}`} />
            </Grid.Column>
            <Grid.Column>
              <Button color={theme.buttonNew} onClick={() => this._newAppraisal()} size="small" floated="right">
                <Icon name="add" />
                New Appraisal
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {listAppraisalList.length > 0 ? (
          <Grid padded="horizontally" style={{ marginTop: 0 }}>
            <Grid.Row>
              <Table color="blue" celled inverted selectable size="small" compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Created</Table.HeaderCell>
                    <Table.HeaderCell>Appr. Low</Table.HeaderCell>
                    <Table.HeaderCell>Appr. High</Table.HeaderCell>
                    <Table.HeaderCell>% Completed</Table.HeaderCell>
                    <Table.HeaderCell>Sent</Table.HeaderCell>
                    <Table.HeaderCell>Resend</Table.HeaderCell>
                    <Table.HeaderCell>Duplicate</Table.HeaderCell>
                    <Table.HeaderCell>Downloaded</Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {listAppraisalList.map((listAppraisal, key) => (
                    <Table.Row active key={listAppraisal.id}>
                      <Table.Cell>{moment(listAppraisal.dateTimeCreated).format('DD/MM/YYYY')}</Table.Cell>
                      <Table.Cell>TBD with Zoran</Table.Cell>
                      <Table.Cell>TBD with Zoran</Table.Cell>
                      <Table.Cell>
                        {listAppraisal.completed === 100 ? 'Completed' : `${listAppraisal.completed}%`}
                      </Table.Cell>
                      <Table.Cell>
                        {listAppraisal.sentDate ? moment(listAppraisal.sentDate).format('DD/MM/YYYY') : 'No'}
                      </Table.Cell>
                      <Table.Cell />
                      <Table.Cell>
                        <Button disabled icon onClick={() => this._duplicateAppraisal(listAppraisal.id)}>
                          <Icon link size="large" name="copy" />
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{listAppraisal.downloaded ? 'Yes' : 'No'}</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon
                          disabled={listAppraisal.sentDate !== null}
                          onClick={() =>
                            history.push({
                              pathname: 'appraisalMenu',
                              state: {
                                business: this.props.location.state.business,
                                isLoadingCreating: this.props.isLoadingCreating,
                                appraisalObject: listAppraisal
                              }
                            })
                          }
                        >
                          <Icon link size="large" name="edit" />
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button icon onClick={() => this._deleteAppraisal(listAppraisal.id)}>
                          <Icon link color="red" size="large" name="trash" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Row>
          </Grid>
        ) : null}
        <Grid style={{ marginTop: 0 }}>
          <Grid.Column>
            <Button color="green" onClick={() => history.push(`/business/${business.id}`)} size="small" floated="left">
              <Icon name="backward" />
              Return to Business
            </Button>
          </Grid.Column>
        </Grid>
      </Wrapper>
    )
  }
}

AppraisalListPage.propTypes = {
  values: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  getBusiness: PropTypes.func,
  location: PropTypes.object,
  createAppraisal: PropTypes.func,
  openModal: PropTypes.func,
  isLoadingCreating: PropTypes.bool,
  getAppraisals: PropTypes.func,
  listAppraisalList: PropTypes.array,
  removeAppraisal: PropTypes.func,
  createdAppraisal: PropTypes.object,
  percPricing: PropTypes.number,
  duplicateAppraisal: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    business_id: props.location.state.business.id ? props.location.state.business.id : null
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createAppraisal, openModal, getAppraisals, removeAppraisal, duplicateAppraisal }, dispatch)

const mapStateToProps = state => ({
  isLoadingCreating: state.appraisal.create.isLoading,
  listAppraisalList: state.appraisal.getAll.array,
  createdAppraisal: state.appraisal.create.appraisal,
  percPricing: state.appraisal.getCalcCompleteSteps.confirm.confirmPricing.completedPerc
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true
  })(AppraisalListPage)
)
