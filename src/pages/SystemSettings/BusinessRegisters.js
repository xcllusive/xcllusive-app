import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Table, Icon, Button, Grid } from 'semantic-ui-react'

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

class BusinessRegisters extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  _toggleModal (value) {
    this.setState({
      modalOpen: value
    })
  }

  render () {
    return (
      <Wrapper>
        <Grid padded='horizontally'>
          <Grid.Row columns={1}>
            <Grid.Column floated='left' width={2}>
              <Button onClick={() => this._toggleModal(true)} color='facebook'>
                <Icon name='add' />
                  New Register
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Source </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Rating </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Product </div></b></h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {array.map(item => {
                    return (
                      <Table.Row active >
                        <Table.Cell>{'ID'}</Table.Cell>
                        <Table.Cell>{'LABEL'}</Table.Cell>
                        <Table.Cell>
                          <Icon key={item.buyerID}
                            onClick={() => this.props.history.push(`${this.props.match.path}/${item.buyerID}`)}
                            color='red' name='trash' />
                          <Icon color='green' name='edit' />
                        </Table.Cell>
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
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
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
                        <Table.Cell>{'ID'}</Table.Cell>
                        <Table.Cell>{'LABEL'}</Table.Cell>
                        <Table.Cell>{'EDIT/DELETE'}</Table.Cell>
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
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
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
                        <Table.Cell>{'ID'}</Table.Cell>
                        <Table.Cell>{'LABEL'}</Table.Cell>
                        <Table.Cell>{'EDIT/DELETE'}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Industry </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Type </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Owner's Time </div></b></h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color='blue' celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
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
                        <Table.Cell>{'ID'}</Table.Cell>
                        <Table.Cell>{'LABEL'}</Table.Cell>
                        <Table.Cell>{'EDIT/DELETE'}</Table.Cell>
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
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
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
                        <Table.Cell>{'ID'}</Table.Cell>
                        <Table.Cell>{'LABEL'}</Table.Cell>
                        <Table.Cell>{'EDIT/DELETE'}</Table.Cell>
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
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
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
                        <Table.Cell>{'ID'}</Table.Cell>
                        <Table.Cell>{'LABEL'}</Table.Cell>
                        <Table.Cell>{'EDIT/DELETE'}</Table.Cell>
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

BusinessRegisters.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}

export default BusinessRegisters
