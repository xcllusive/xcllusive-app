import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Icon, Button, Input, Grid, Statistic } from 'semantic-ui-react'

import NewBusinessForm from '../../components/forms/NewBusinessForm'
import Wrapper from '../../components/Wrapper'

const array = [
  {
    businessID: 'BS2000',
    businessName: 'New Business',
    contactName: 'John Johnson',
    logText: 'testing',
    followUpDate: '01/01/2018'
  },
  {
    businessID: 'BS2001',
    businessName: 'Business 1',
    contactName: 'Peter Park',
    logText: 'business spider man',
    followUpDate: '01/01/2019'
  },
  {
    businessID: 'BS2002',
    businessName: 'Business 2',
    contactName: 'Zoran Sarabaca',
    logText: 'Zorans business',
    followUpDate: '01/01/2017'
  },
  {
    businessID: 'BS2003',
    businessName: 'Business 3',
    contactName: 'Steve Jobs',
    logText: 'Apple',
    followUpDate: '01/12/2018'
  },
  {
    businessID: 'BS2004',
    businessName: 'Business 4',
    contactName: 'FileMaker',
    logText: 'Filemaker server 12',
    followUpDate: '01/02/2018'
  }
]

class BusinessListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.isCreatedBusiness !== nextProps.isCreatedBusiness) {
      await this._toggleModal({})
      //  this.props.getUsers()
    }
  }

  _toggleModal = business => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      business
    }))
  }

  render () {
    return (
      <Wrapper>
        <NewBusinessForm
          modalOpen={this.state.modalOpen}
          toggleModal={this._toggleModal}
        />
        <Statistic.Group size={'mini'} color='blue' widths='6'>
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
        <Grid padded='horizontally'>
          <Grid.Row>
            <Grid.Column floated='left' textAlign='center' width={5}>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder='Find businesses...'
              />
            </Grid.Column>
            <Grid.Column floated='right' width={2}>
              <Button onClick={this._toggleModal} color='facebook'>
                <Icon name='add' />
                New Business
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <h2>
          <b>
            <div align='left'> FOR SALE </div>
          </b>
        </h2>
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
            {array.map(item => {
              return (
                <Table.Row
                  active
                  key={item.businessID}
                  onClick={() =>
                    this.props.history.push(
                      `${this.props.match.path}/${item.businessID}`
                    )
                  }
                >
                  <Table.Cell>{item.businessID}</Table.Cell>
                  <Table.Cell>{item.businessName}</Table.Cell>
                  <Table.Cell>{item.contactName}</Table.Cell>
                  <Table.Cell>{item.logText}</Table.Cell>
                  <Table.Cell>{item.followUpDate}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Wrapper>
    )
  }
}

BusinessListPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  isCreatedBusiness: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    isCreatedBusiness: state.business.isCreatedBusiness
  }
}

export default connect(mapStateToProps)(BusinessListPage)
