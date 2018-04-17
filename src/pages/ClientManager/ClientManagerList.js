import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Table, Icon, Button, Input, Grid } from 'semantic-ui-react'

import NewBuyerForm from '../../components/forms/NewBuyerForm'
import NewBusinessForm from '../../components/forms/NewBusinessForm'

import Wrapper from '../../components/content/Wrapper'

class ClientManagerList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpenBuyer: false,
      modalOpenBusiness: false
    }
  }

  _toggleModal = modal => {
    this.setState(prevState => ({
      [modal]: !prevState[modal]
    }))
  };

  render () {
    const { modalOpenBuyer, modalOpenBusiness } = this.state

    return (
      <Wrapper>
        {modalOpenBuyer ? (
          <NewBuyerForm
            modalOpen={modalOpenBuyer}
            toggleModal={() => this._toggleModal('modalOpenBuyer')}
          />
        ) : null}
        {modalOpenBusiness ? (
          <NewBusinessForm
            modalOpen={modalOpenBusiness}
            toggleModal={() => this._toggleModal('modalOpenBusiness')}
          />
        ) : null}
        <Grid padded="horizontally">
          <Grid.Row columns={2}>
            <Grid.Column floated="left" width={2}>
              <Button
                onClick={() => this._toggleModal('modalOpenBuyer')}
                color="facebook"
              >
                <Icon name="add" />
                New Buyer
              </Button>
            </Grid.Column>
            <Grid.Column floated="left" width={2}>
              <Button
                onClick={() => this._toggleModal('modalOpenBusiness')}
                color="facebook"
              >
                <Icon name="add" />
                New Business
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column floated="left" width={5}>
              <h3>
                <b>
                  <div align="left"> Buyer </div>
                </b>
              </h3>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder="Find buyers..."
              />
            </Grid.Column>
            <Grid.Column floated="left" width={5}>
              <h3>
                <b>
                  <div align="left"> Business </div>
                </b>
              </h3>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder="Find businesses..."
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Buyer ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
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
