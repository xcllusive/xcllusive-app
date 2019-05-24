import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Input, Grid, Statistic, Dimmer, Loader, Header } from 'semantic-ui-react'
import moment from 'moment'

import { getBusinesses, createBusiness } from '../../redux/ducks/business'
import { getCtcBusinessesPerUser, getCtcQtdeBusinessEachStagePerUser } from '../../redux/ducks/CTC/business'
import { getUserLogged } from '../../redux/ducks/user'

import { TypesModal, openModal, closeModal } from '../../redux/ducks/modal'

import Wrapper from '../../components/content/Wrapper'
import GridBusinessStage from '../../components/content/GridBusinessStage'

class CtcBusinessList extends Component {
  constructor (props) {
    super(props)
    this.timer = null
    this.state = {
      inputSearch: '',
      stageSelected: 2,
      stageSelectedName: 'New',
      showAll: true
    }
  }

  async componentDidMount () {
    await this.props.getCtcBusinessesPerUser(false, this.state.stageSelected, true)
    this.props.getCtcQtdeBusinessEachStagePerUser()
    this.props.getUserLogged()
  }

  _onSearch = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)
    this.setState({
      inputSearch: value
    })
    this.timer = setTimeout(
      () => this.props.getCtcBusinessesPerUser(value, this.state.stageSelected, !!this.state.showAll),
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
          await this.props.createBusiness(values)
          this.props.closeModal()
          await this.props.getCtcBusinessesPerUser(false, this.state.stageSelected, true)
          this.props.getCtcQtdeBusinessEachStagePerUser()
        }
      }
    })
  }

  _getBusinesses = (stage, name) => {
    this.props.getCtcBusinessesPerUser(false, stage, true)

    this.setState({
      stageSelected: stage,
      stageSelectedName: name,
      inputSearch: '',
      showAll: true
    })
  }

  _showAll () {
    this.setState({ showAll: false })
    this.props.getCtcBusinessesPerUser(false, this.state.stageSelected, false)
  }

  _showLess () {
    this.setState({ showAll: true })
    this.props.getCtcBusinessesPerUser(false, this.state.stageSelected, true)
  }

  render () {
    const {
      isLoadingBusinesses,
      isLoadingQtdeBusinesses,
      history,
      match,
      businesses,
      objectQtdeBusinessStage,
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
          <Statistic.Group size="mini" color="blue" widths={6}>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(2, 'New')}>
              <Statistic.Value>
                {objectQtdeBusinessStage
                  ? `${objectQtdeBusinessStage.businessNewFilter} of ${objectQtdeBusinessStage.businessNew}`
                  : 0}
              </Statistic.Value>
              <Statistic.Label>New</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(3, 'Cold')}>
              <Statistic.Value>
                {objectQtdeBusinessStage
                  ? `${objectQtdeBusinessStage.businessColdFilter} of ${objectQtdeBusinessStage.businessCold}`
                  : 0}
              </Statistic.Value>
              <Statistic.Label>Cold</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(4, 'Potential')}>
              <Statistic.Value>
                {objectQtdeBusinessStage ? objectQtdeBusinessStage.businessPotential : 0}
              </Statistic.Value>
              <Statistic.Label>Potential</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(5, 'Hot')}>
              <Statistic.Value>{objectQtdeBusinessStage ? objectQtdeBusinessStage.businessHot : 0}</Statistic.Value>
              <Statistic.Label>Hot</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(6, 'Engaged')}>
              <Statistic.Value>{objectQtdeBusinessStage ? objectQtdeBusinessStage.businessEngaged : 0}</Statistic.Value>
              <Statistic.Label>Engaged</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(7, 'Lost')}>
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
                      <Table.HeaderCell>Business ID</Table.HeaderCell>
                      <Table.HeaderCell>Business Name</Table.HeaderCell>
                      <Table.HeaderCell>Contact Name</Table.HeaderCell>
                      <Table.HeaderCell>Log Text</Table.HeaderCell>
                      <Table.HeaderCell>Follow Up Date</Table.HeaderCell>
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

CtcBusinessList.propTypes = {
  businesses: PropTypes.array,
  isCreated: PropTypes.bool,
  isLoadingBusinesses: PropTypes.bool,
  getBusinesses: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  openModal: PropTypes.func,
  createBusiness: PropTypes.func,
  getCtcQtdeBusinessEachStagePerUser: PropTypes.func,
  objectQtdeBusinessStage: PropTypes.object,
  getCtcBusinessesPerUser: PropTypes.func,
  closeModal: PropTypes.func,
  isLoadingQtdeBusinesses: PropTypes.bool,
  getUserLogged: PropTypes.func,
  user: PropTypes.object
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBusinesses,
      openModal,
      createBusiness,
      getCtcQtdeBusinessEachStagePerUser,
      getCtcBusinessesPerUser,
      closeModal,
      getUserLogged
    },
    dispatch
  )

const mapStateToProps = state => ({
  isCreated: state.business.create.isCreated,
  // businesses: state.business.getAll.array,
  businesses: state.ctcBusiness.getCtcAllPerUser.array.rows,
  isLoadingBusinesses: state.ctcBusiness.getCtcAllPerUser.isLoading,
  isLoadingQtdeBusinesses: state.ctcBusiness.getCtcQtdeBusinessStageUser.isLoading,
  objectQtdeBusinessStage: state.ctcBusiness.getCtcQtdeBusinessStageUser.object,
  user: state.user.getLogged.object
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CtcBusinessList)
