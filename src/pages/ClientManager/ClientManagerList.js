import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Table, Icon, Button, Input, Grid } from 'semantic-ui-react'

import NewBuyerForm from '../../components/forms/NewBuyerForm'

import Wrapper from '../../components/content/Wrapper'

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

class ClientManagerList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  _toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }))
  }

  render () {
    const { modalOpen } = this.state

    return (
      <Wrapper>
        {modalOpen ? (
          <NewBuyerForm
            modalOpen={modalOpen}
            toggleModal={this._toggleModal}
          />
        ) : null}
        <Grid padded='horizontally'>
          <Grid.Row columns={2}>
            <Grid.Column floated='left' width={2}>
              <Button
                onClick={() => this._toggleModal()}
                color='facebook'>
                <Icon name='add' />
                  New Buyer
              </Button>
            </Grid.Column>
            <Grid.Column floated='left' width={2}>
              <Button onClick={() => this._toggleModal(true)} color='facebook'>
                <Icon name='add' />
                  New Business
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column floated='left' width={5}>
              <h3><b><div align='left'> Buyer </div></b></h3>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder='Find buyers...'
              />
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h3><b><div align='left'> Business </div></b></h3>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder='Find businesses...'
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Buyer ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {array.map(item => {
                    return (
                      <Table.Row
                        active
                        key={item.buyerID}
                        onClick={() => this.props.history.push(
                          `${this.props.match.path}/${item.buyerID}`
                        )}>
                        <Table.Cell>{item.buyerID}</Table.Cell>
                        <Table.Cell>{item.buyerName}</Table.Cell>
                        <Table.Cell>{item.phone}</Table.Cell>
                        <Table.Cell>{item.email}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {array.map(item => {
                    return (
                      <Table.Row
                        active
                        key={item.businessID}
                        onClick={() => this.props.history.push(
                          `${this.props.match.path}/${item.businessID}`
                        )}>
                        <Table.Cell>{item.businessID}</Table.Cell>
                        <Table.Cell>{item.businessName}</Table.Cell>
                        <Table.Cell>{item.price}</Table.Cell>
                        <Table.Cell>{item.notes}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

ClientManagerList.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}

export default ClientManagerList
