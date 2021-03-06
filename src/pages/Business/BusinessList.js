import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Input, Grid, Statistic, Dimmer, Loader, Header } from 'semantic-ui-react'
import moment from 'moment'

import {
  getBusinesses,
  createBusiness,
  getQtdeBusinessEachStagePerUser,
  getBusinessesPerUser
} from '../../redux/ducks/business'
import { getUserLogged } from '../../redux/ducks/user'

import { TypesModal, openModal, closeModal } from '../../redux/ducks/modal'

import Wrapper from '../../components/content/Wrapper'
import GridBusinessStage from '../../components/content/GridBusinessStage'

class BusinessListPage extends Component {
  constructor (props) {
    super(props)
    this.timer = null
    this.state = {
      inputSearch: '',
      stageSelected: 1,
      stageSelectedName: 'Potential Listing',
      showAll: true,
      orderByDateTimeCreatedDesc: true
    }
  }

  async componentDidMount () {
    await this.props.getBusinessesPerUser(false, this.state.stageSelected, true)
    this.props.getQtdeBusinessEachStagePerUser()
    this.props.getUserLogged()
  }

  _onSearch = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)
    this.setState({
      inputSearch: value
    })
    this.timer = setTimeout(
      () => this.props.getBusinessesPerUser(value, this.state.stageSelected, !!this.state.showAll),
      1000
    )
  }

  _newBusiness = company => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_BUSINESS, {
      title: company === 'Xcllusive' ? 'New Business for Xcllusive' : 'New Business for CTC',
      where: 'Business',
      history: this.props.history,
      company: company,
      onConfirm: async values => {
        if (values) {
          if (company === 'Xcllusive') {
            values.company = 1
          } else {
            values.company = 2
          }
          values.dateTimeAssignToAgent = moment().format('YYYY-MM-DD hh:mm:ss')
          values.dateTimeFirstOpenByAgent = moment().format('YYYY-MM-DD hh:mm:ss')
          await this.props.createBusiness(values)
          this.props.closeModal()
          await this.props.getBusinessesPerUser(false, this.state.stageSelected, true)
          this.props.getQtdeBusinessEachStagePerUser()
        }
      }
    })
  }

  _getBusinesses = (stage, name) => {
    if (stage === 4) this.props.getBusinessesPerUser(false, stage, false, this.state.orderByDateTimeCreatedDesc)
    else this.props.getBusinessesPerUser(false, stage, true)

    this.setState({
      stageSelected: stage,
      stageSelectedName: name,
      inputSearch: '',
      showAll: true
    })
  }

  _showAll () {
    this.setState({ showAll: false })
    this.props.getBusinessesPerUser(false, this.state.stageSelected, false, this.state.orderByDateTimeCreatedDesc)
  }

  _showLess () {
    this.setState({ showAll: true })
    this.props.getBusinessesPerUser(false, this.state.stageSelected, true, this.state.orderByDateTimeCreatedDesc)
  }

  _orderByDateTimeCreated = () => {
    this.props.getBusinessesPerUser(
      false,
      this.state.stageSelected,
      this.state.showAll,
      this.state.orderByDateTimeCreatedDesc
    )
    this.setState({
      orderByDateTimeCreatedDesc: !this.state.orderByDateTimeCreatedDesc
    })
  }

  render () {
    const {
      isLoadingBusinesses,
      isLoadingQtdeBusinesses,
      history,
      match,
      businesses,
      objectQtdeBusinessStage,
      totalLostRecontact,
      user
    } = this.props

    if (isLoadingBusinesses || isLoadingQtdeBusinesses) {
      return (
        <Dimmer inverted active={isLoadingBusinesses || isLoadingQtdeBusinesses}>
          <Loader inverted />
        </Dimmer>
      )
    }
    return (
      <Wrapper>
        <GridBusinessStage>
          <Statistic.Group size="mini" color="blue" widths={4}>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(1, 'Potential Listing')}>
              <Statistic.Value>
                {objectQtdeBusinessStage
                  ? `${objectQtdeBusinessStage.businessPotentialListingFilter} of ${
                    objectQtdeBusinessStage.businessPotentialListing
                  }`
                  : 0}
              </Statistic.Value>
              <Statistic.Value>{`+ ${totalLostRecontact} Lost to Recontact` || 0}</Statistic.Value>
              <Statistic.Label>Potential Listing</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(9, 'Appraisal')}>
              <Statistic.Value>
                {objectQtdeBusinessStage
                  ? `${objectQtdeBusinessStage.businessAppraisalFilter} of ${objectQtdeBusinessStage.businessAppraisal}`
                  : 0}
              </Statistic.Value>
              <Statistic.Label>Appraisal</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(4, 'For Sale')}>
              <Statistic.Value>{objectQtdeBusinessStage ? objectQtdeBusinessStage.businessForSale : 0}</Statistic.Value>
              <Statistic.Label>For Sale</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(8, 'Lost')}>
              <Statistic.Value>{objectQtdeBusinessStage ? objectQtdeBusinessStage.businessLost : 0}</Statistic.Value>
              <Statistic.Label>Lost</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </GridBusinessStage>
        <Grid padded="horizontally">
          <Grid.Row>
            <Grid.Column floated="left" textAlign="center" width={5}>
              <Input
                fluid
                icon="search"
                loading={this.state.isLoading}
                placeholder="Find businesses..."
                onChange={this._onSearch}
                value={this.state.inputSearch}
              />
            </Grid.Column>
            <Grid.Column floated="right" width={3}>
              <Button
                onClick={() => (user.listingAgent ? this._newBusiness('Xcllusive') : this._newBusiness('CTC'))}
                color="facebook"
                floated="right"
              >
                <Icon name="add" />
                New Business
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Dimmer.Dimmable dimmed={isLoadingBusinesses} style={{ width: '100%' }}>
            <Dimmer inverted active={isLoadingBusinesses}>
              <Loader>Loading</Loader>
            </Dimmer>
            <Grid.Row>
              <Header>
                <Header size="small" style={{ paddingTop: '10px' }} floated="left">
                  {this.state.stageSelectedName}
                </Header>
                <Header style={{ paddingTop: '5px' }} floated="right">
                  {this.state.showAll ? (
                    <Button color="twitter" onClick={() => this._showAll()} size="small" floated="right">
                      <Icon name="zoom" />
                      Show all
                    </Button>
                  ) : (
                    <Button color="orange" onClick={() => this._showLess()} size="small" floated="right">
                      <Icon name="cut" />
                      Show Due Tasks Only
                    </Button>
                  )}
                </Header>
              </Header>
              {businesses ? (
                <Table color="blue" inverted celled selectable compact size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Icon
                          link
                          name={this.state.orderByDateTimeCreatedDesc ? 'arrow down' : 'arrow up'}
                          onClick={() => this._orderByDateTimeCreated()}
                        />
                        Date Created
                      </Table.HeaderCell>
                      <Table.HeaderCell>Business ID</Table.HeaderCell>
                      <Table.HeaderCell>Business Name</Table.HeaderCell>
                      <Table.HeaderCell>Contact Name</Table.HeaderCell>
                      <Table.HeaderCell>Log Text</Table.HeaderCell>
                      <Table.HeaderCell>Follow Up Date</Table.HeaderCell>
                      <Table.HeaderCell>Time</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {businesses.map(business => (
                      <Table.Row active key={business.id} onClick={() => history.push(`${match.path}/${business.id}`)}>
                        <Table.Cell
                          style={{
                            backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                          }}
                          warning={
                            !business.BusinessLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                              )
                            }, false)
                          }
                        >
                          {business.dateTimeCreated === null
                            ? moment(business.dateTimeModified).format('DD/MM/YYYY')
                            : moment(business.dateTimeCreated).format('DD/MM/YYYY')}
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                          }}
                          warning={
                            !business.BusinessLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                              )
                            }, false)
                          }
                        >{`BS${business.id}`}</Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                          }}
                          warning={
                            !business.BusinessLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                              )
                            }, false)
                          }
                        >
                          {business.businessName}
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                          }}
                          warning={
                            !business.BusinessLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                              )
                            }, false)
                          }
                        >{`${business.firstNameV} ${business.lastNameV}`}</Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                          }}
                          warning={
                            !business.BusinessLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                              )
                            }, false)
                          }
                        >
                          {business.BusinessLog[0].text}
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                          }}
                          warning={
                            !business.BusinessLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                              )
                            }, false)
                          }
                        >
                          {moment(business.BusinessLog[0].followUp).format('DD/MM/YYYY')}
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: business.stageId === 8 && this.state.stageSelected === 1 ? '#bbf5bb' : null
                          }}
                          warning={
                            !business.BusinessLog.reduce((last, log) => {
                              if (last === true) {
                                return true
                              }
                              return (
                                log.followUpStatus === 'Pending' &&
                                moment(log.followUp).format('YYYY/MM/DD') <= moment(new Date()).format('YYYY/MM/DD')
                              )
                            }, false)
                          }
                        >
                          {business.BusinessLog[0].time}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : null}
            </Grid.Row>
          </Dimmer.Dimmable>
        </Grid>
      </Wrapper>
    )
  }
}

BusinessListPage.propTypes = {
  businesses: PropTypes.array,
  isCreated: PropTypes.bool,
  isLoadingBusinesses: PropTypes.bool,
  getBusinesses: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  openModal: PropTypes.func,
  createBusiness: PropTypes.func,
  getQtdeBusinessEachStagePerUser: PropTypes.func,
  objectQtdeBusinessStage: PropTypes.object,
  getBusinessesPerUser: PropTypes.func,
  closeModal: PropTypes.func,
  isLoadingQtdeBusinesses: PropTypes.bool,
  totalLostRecontact: PropTypes.number,
  getUserLogged: PropTypes.func,
  user: PropTypes.object
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBusinesses,
      openModal,
      createBusiness,
      getQtdeBusinessEachStagePerUser,
      getBusinessesPerUser,
      closeModal,
      getUserLogged
    },
    dispatch
  )

const mapStateToProps = state => ({
  isCreated: state.business.create.isCreated,
  // businesses: state.business.getAll.array,
  businesses: state.business.getAllPerUser.array.rows,
  totalLostRecontact: state.business.getAllPerUser.array.totalLostRecontact,
  isLoadingBusinesses: state.business.getAllPerUser.isLoading,
  isLoadingQtdeBusinesses: state.business.getQtdeBusinessStageUser.isLoading,
  objectQtdeBusinessStage: state.business.getQtdeBusinessStageUser.object,
  user: state.user.getLogged.object
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessListPage)
