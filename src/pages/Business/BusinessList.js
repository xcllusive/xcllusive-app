import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Input, Grid, Statistic, Dimmer, Loader, Header } from 'semantic-ui-react'

import {
  getBusinesses,
  createBusiness,
  getQtdeBusinessEachStagePerUser,
  getBusinessesPerUser
} from '../../redux/ducks/business'

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
      stageSelectedName: 'Potential Listing'
    }
  }

  async componentDidMount () {
    // await this.props.getBusinesses(false, this.state.stageSelected, false)
    await this.props.getBusinessesPerUser(false, this.state.stageSelected, false)
    this.props.getQtdeBusinessEachStagePerUser()
  }

  // static async getDerivedStateFromProps (nextProps) {
  //   if (nextProps.isCreated && this.props.isCreated !== nextProps.isCreated) {
  //     // await this._toggleModal({})
  //     // must close the new business modal
  //     this.props.getBusinesses(false, this.state.stageSelected, true)
  //   }
  // }

  _onSearch = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)
    this.setState({
      inputSearch: value
    })
    this.timer = setTimeout(() => this.props.getBusinessesPerUser(value, this.state.stageSelected, true), 1000)
  }

  _newBusiness = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_BUSINESS, {
      title: 'New Business',
      where: 'Business',
      onConfirm: async values => {
        if (values) {
          await this.props.createBusiness(values)
          this.props.closeModal()
          await this.props.getBusinessesPerUser(false, this.state.stageSelected, false)
          this.props.getQtdeBusinessEachStagePerUser()
        }
      }
    })
  }

  _getBusinesses = (stage, name) => {
    this.props.getBusinessesPerUser(false, stage, false)
    this.setState({
      stageSelected: stage,
      stageSelectedName: name,
      inputSearch: ''
    })
  }

  render () {
    const { isLoading, history, match, businesses, objectQtdeBusinessStage } = this.props

    if (isLoading) {
      return (
        <Dimmer inverted active={isLoading}>
          <Loader inverted />
        </Dimmer>
      )
    }

    return (
      <Wrapper>
        <GridBusinessStage>
          <Statistic.Group size="mini" color="blue" widths={3}>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(1, 'Potential Listing')}>
              <Statistic.Value>
                {objectQtdeBusinessStage ? objectQtdeBusinessStage.businessPotentialListing : 0}
              </Statistic.Value>
              <Statistic.Label>Potential Listing</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(9, 'Appraisal')}>
              <Statistic.Value>
                {objectQtdeBusinessStage ? objectQtdeBusinessStage.businessAppraisal : 0}
              </Statistic.Value>
              <Statistic.Label>Appraisal</Statistic.Label>
            </Statistic>
            <Statistic style={{ cursor: 'pointer' }} onClick={() => this._getBusinesses(4, 'For Sale')}>
              <Statistic.Value>{objectQtdeBusinessStage ? objectQtdeBusinessStage.businessForSale : 0}</Statistic.Value>
              <Statistic.Label>For Sale</Statistic.Label>
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
              <Button onClick={this._newBusiness} color="facebook" floated="right">
                <Icon name="add" />
                New Business
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Header>{this.state.stageSelectedName}</Header>
            <Table color="blue" celled inverted selectable compact size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Business ID</Table.HeaderCell>
                  <Table.HeaderCell>Business Name</Table.HeaderCell>
                  <Table.HeaderCell>Contact Name</Table.HeaderCell>
                  <Table.HeaderCell>Log Text</Table.HeaderCell>
                  <Table.HeaderCell>Follow Up date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {businesses.map(business => (
                  <Table.Row active key={business.id} onClick={() => history.push(`${match.path}/${business.id}`)}>
                    <Table.Cell>{`BS${business.id}`}</Table.Cell>
                    <Table.Cell>{business.businessName}</Table.Cell>
                    <Table.Cell>{`${business.firstNameV} ${business.lastNameV}`}</Table.Cell>
                    <Table.Cell>{''}</Table.Cell>
                    <Table.Cell>{''}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

BusinessListPage.propTypes = {
  businesses: PropTypes.array,
  isCreated: PropTypes.bool,
  isLoading: PropTypes.bool,
  getBusinesses: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  openModal: PropTypes.func,
  createBusiness: PropTypes.func,
  getQtdeBusinessEachStagePerUser: PropTypes.func,
  objectQtdeBusinessStage: PropTypes.object,
  getBusinessesPerUser: PropTypes.func,
  closeModal: PropTypes.func
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getBusinesses, openModal, createBusiness, getQtdeBusinessEachStagePerUser, getBusinessesPerUser, closeModal },
    dispatch
  )

const mapStateToProps = state => ({
  isCreated: state.business.create.isCreated,
  isLoading: state.business.getAll.isLoading,
  // businesses: state.business.getAll.array,
  businesses: state.business.getAllPerUser.array,
  objectQtdeBusinessStage: state.business.getQtdeBusinessStageUser.object
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessListPage)
