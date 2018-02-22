import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Input, Grid, Statistic, Dimmer, Loader, Header } from 'semantic-ui-react'

import { getBusinesses } from '../../redux/ducks/business'

import NewBusinessForm from '../../components/forms/NewBusinessForm'
import Wrapper from '../../components/content/Wrapper'
import GridBusinessStage from '../../components/content/GridBusinessStage'

class BusinessListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      inputSearch: ''
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.isCreatedBusiness !== nextProps.isCreatedBusiness) {
      await this._toggleModal({})
      this.props.getBusinesses()
    }
  }

  componentWillMount () {
    this.props.getBusinesses()
    this.timer = null
  }

  _onSearch = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)

    this.setState({
      inputSearch: value
    })

    this.timer = setTimeout(() => this.props.getBusinesses(value), 1000)
  }

  _toggleModal = business => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      business
    }))
  }

  render () {
    const {
      isLoading,
      history,
      match
    } = this.props

    return (
      <Wrapper>
        <NewBusinessForm
          modalOpen={this.state.modalOpen}
          toggleModal={this._toggleModal}
        />
        <GridBusinessStage>
          <Statistic.Group size='mini' color='blue' widths={6}>
            <Statistic>
              <Statistic.Value>10</Statistic.Value>
              <Statistic.Label>Potencial Listing</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>20</Statistic.Value>
              <Statistic.Label>Listing Negotiation</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>30</Statistic.Value>
              <Statistic.Label>Sales Memo</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>40</Statistic.Value>
              <Statistic.Label>For Sale</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>50</Statistic.Value>
              <Statistic.Label>Sold</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>60</Statistic.Value>
              <Statistic.Label>Withdrawn</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </GridBusinessStage>
        <Grid padded='horizontally'>
          <Grid.Row>
            <Grid.Column floated='left' textAlign='center' width={5}>
              <Input
                fluid
                icon='search'
                loading={this.state.isLoading}
                placeholder='Find businesses...'
                onChange={this._onSearch}
                value={this.state.inputSearch}
              />
            </Grid.Column>
            <Grid.Column floated='right' width={2}>
              <Button onClick={this._toggleModal} color='facebook'>
                <Icon name='add' />
                New Business
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Dimmer inverted active={isLoading}>
              <Loader inverted />
            </Dimmer>
            <Header>FOR SALE</Header>
            <Table color='blue' celled inverted selectable>
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
                {
                  this.props.businesses.map(business => {
                    return (
                      <Table.Row
                        active
                        key={business.id}
                        onClick={() =>
                          history.push(
                            `${match.path}/${business.id}`
                          )
                        }
                      >
                        <Table.Cell>{`BS${business.id}`}</Table.Cell>
                        <Table.Cell>{business.businessName}</Table.Cell>
                        <Table.Cell>{`${business.firstNameV} ${business.lastNameV}`}</Table.Cell>
                        <Table.Cell>{''}</Table.Cell>
                        <Table.Cell>{''}</Table.Cell>
                      </Table.Row>
                    )
                  })
                }
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
  isCreatedBusiness: PropTypes.bool,
  getBusinesses: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  isLoading: PropTypes.bool
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBusinesses }, dispatch)
}

const mapStateToProps = state => {
  return {
    isCreatedBusiness: state.business.isCreatedBusiness,
    isLoading: state.business.isLoadingGetBusinesses,
    businesses: state.business.businesses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessListPage)
