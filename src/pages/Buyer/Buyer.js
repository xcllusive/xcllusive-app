import React, { Component } from 'react';

import { Table, Icon, Button, Input, Grid } from 'semantic-ui-react';

import Wrapper from '../../components/Wrapper';

const arrayForSale = [
  {
    businessID: 'BS2000',
    businessName: 'New Business',
    followUpTask: '29',
    sendGroupEmail: ' ',
    dayOnTheMarket: '100',
    daysSinceGenerated: '50',
    lastScore: '65',
    sent: 'Yes',
    makeNewScore: ' ',
    record: 'Score Overdue: Locked'
  },
  {
    businessID: 'BS2001',
    businessName: 'Business 1',
    followUpTask: '15',
    sendGroupEmail: ' ',
    dayOnTheMarket: '30',
    daysSinceGenerated: '10',
    lastScore: '27',
    sent: 'No',
    makeNewScore: ' ',
    record: ''
  },
  {
    businessID: 'BS2002',
    businessName: 'Business 2',
    followUpTask: '45',
    sendGroupEmail: ' ',
    dayOnTheMarket: '120',
    daysSinceGenerated: '80',
    lastScore: '59',
    sent: 'Yes',
    makeNewScore: ' ',
    record: 'Score Overdue: Locked'
  }
];

const arrayunderOffer = [
  {
    businessID: 'BS2030',
    businessName: 'New Business',
    followUpTask: '9',
    sendGroupEmail: ' ',
    dayOnTheMarket: '10'
  }
];

const arrayBrokersProgress = [
  {
    businessID: 'BS2024',
    businessName: 'Business Test',
    daysSinceGenerated: '500',
    imCompleted: '100.00%',
    imStatus: 'In progress',
    broker: 'Jim Lund'
  },
  {
    businessID: 'BS2030',
    businessName: 'Testing Buss',
    daysSinceGenerated: '300',
    imCompleted: '51.80%',
    imStatus: 'In progress',
    broker: 'Nick Wolski'
  },
  {
    businessID: 'BS2030',
    businessName: 'Business Hello',
    daysSinceGenerated: '100',
    imCompleted: '100.00%',
    imStatus: 'Rejected',
    broker: 'Peter George'
  },
  {
    businessID: 'BS2030',
    businessName: 'New Business',
    daysSinceGenerated: '500',
    imCompleted: '75.65%',
    imStatus: 'In progress',
    broker: 'Mark'
  },
  {
    businessID: 'BS2030',
    businessName: 'New Business',
    daysSinceGenerated: '500',
    imCompleted: '00.00%',
    imStatus: 'In progress',
    broker: 'Zoran'
  }
];

const arrayIMWaitingApproval = [
  {
    businessID: 'BS2064',
    businessName: 'New Business',
    daysSinceGenerated: '',
    imCompleted: '27.30%',
    imStatus: "Waiting for Owner's Approval"
  }
];

class BuyerPage extends Component {
  render() {
    return (
      <Wrapper>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={4}>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder="Find buyers..."
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder="Find businesses..."
              />
            </Grid.Column>
            <Grid.Column width={2} floated="right">
              <Button color="facebook" onClick={() => this._toggleModal(true)}>
                <Icon name="add" />
                New Buyer
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <h2>
              <b>
                <div align="left"> Businesses For Sale </div>
              </b>
            </h2>
            <Table color="blue" celled inverted selectable size={'small'}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Business ID</Table.HeaderCell>
                  <Table.HeaderCell>Business Name</Table.HeaderCell>
                  <Table.HeaderCell>Follow Up Task</Table.HeaderCell>
                  <Table.HeaderCell>Send Group Email</Table.HeaderCell>
                  <Table.HeaderCell>Days On The Market</Table.HeaderCell>
                  <Table.HeaderCell>Days Since Generated</Table.HeaderCell>
                  <Table.HeaderCell>Last Score</Table.HeaderCell>
                  <Table.HeaderCell>Sent</Table.HeaderCell>
                  <Table.HeaderCell>Make New Score</Table.HeaderCell>
                  <Table.HeaderCell>2 Record's</Table.HeaderCell>
                  <Table.HeaderCell>IM's</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {arrayForSale.map(forSale => {
                  return (
                    <Table.Row
                      active
                      key={forSale.businessID}
                      onClick={() =>
                        this.props.history.push(
                          `${this.props.match.path}/${forSale.businessID}`
                        )
                      }
                    >
                      <Table.Cell>{forSale.businessID}</Table.Cell>
                      <Table.Cell>{forSale.businessName}</Table.Cell>
                      <Table.Cell>{forSale.followUpTask}</Table.Cell>
                      <Table.Cell>
                        <Button size="small" color="instagram">
                          <Icon name="mail" />
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{forSale.dayOnTheMarket}</Table.Cell>
                      <Table.Cell>{forSale.daysSinceGenerated}</Table.Cell>
                      <Table.Cell>{forSale.lastScore}</Table.Cell>
                      <Table.Cell>{forSale.sent}</Table.Cell>
                      <Table.Cell>
                        <Button size={'small'} color={'instagram'}>
                          <Icon name="star" />
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{forSale.record}</Table.Cell>
                      <Table.Cell>
                        <Button size={'small'} color={'instagram'}>
                          <Icon name="file pdf outline" />
                          PDF
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <h2>
              <b>
                <div align="left"> Businesses Under Offer </div>
              </b>
            </h2>
            <Table color={'blue'} celled inverted selectable size={'small'}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Business ID</Table.HeaderCell>
                  <Table.HeaderCell>Business Name</Table.HeaderCell>
                  <Table.HeaderCell>Follow Up Task</Table.HeaderCell>
                  <Table.HeaderCell>Send Group Email</Table.HeaderCell>
                  <Table.HeaderCell>Days On The Market</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {arrayunderOffer.map(underOffer => {
                  return (
                    <Table.Row
                      active
                      key={underOffer.businessID}
                      onClick={() =>
                        this.props.history.push(
                          `${this.props.match.path}/${underOffer.businessID}`
                        )
                      }
                    >
                      <Table.Cell>{underOffer.businessID}</Table.Cell>
                      <Table.Cell>{underOffer.businessName}</Table.Cell>
                      <Table.Cell>{underOffer.followUpTask}</Table.Cell>
                      <Table.Cell>
                        <Button size={'small'} color={'instagram'}>
                          <Icon name="mail" />
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{underOffer.dayOnTheMarket}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <h2>
              <b>
                <div align="left"> IM Waiting for Approval </div>
              </b>
            </h2>
            <Table color={'blue'} celled inverted selectable size={'small'}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Business ID</Table.HeaderCell>
                  <Table.HeaderCell>Business Name</Table.HeaderCell>
                  <Table.HeaderCell>Days Since Generated</Table.HeaderCell>
                  <Table.HeaderCell>IM Completed</Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell>IM Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {arrayIMWaitingApproval.map(IMWaitingApproval => {
                  return (
                    <Table.Row
                      active
                      key={IMWaitingApproval.businessID}
                      onClick={() =>
                        this.props.history.push(
                          `${this.props.match.path}/${
                            IMWaitingApproval.businessID
                          }`
                        )
                      }
                    >
                      <Table.Cell>{IMWaitingApproval.businessID}</Table.Cell>
                      <Table.Cell>{IMWaitingApproval.businessName}</Table.Cell>
                      <Table.Cell>
                        {IMWaitingApproval.daysSinceGenerated}
                      </Table.Cell>
                      <Table.Cell>{IMWaitingApproval.imCompleted}</Table.Cell>
                      <Table.Cell>
                        <Button size={'small'} color={'instagram'}>
                          <Icon name="file pdf outline" />
                          PDF
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{IMWaitingApproval.imStatus}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <h2>
              <b>
                <div align="left">Broker's IMs in Progress</div>
              </b>
            </h2>
            <Table color={'blue'} celled inverted selectable size={'small'}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Business ID</Table.HeaderCell>
                  <Table.HeaderCell>Business Name</Table.HeaderCell>
                  <Table.HeaderCell>Days Since Generated</Table.HeaderCell>
                  <Table.HeaderCell>IM Completed</Table.HeaderCell>
                  <Table.HeaderCell>IM Status</Table.HeaderCell>
                  <Table.HeaderCell>Broker</Table.HeaderCell>
                  <Table.HeaderCell>IM's</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {arrayBrokersProgress.map(brokersProgress => {
                  return (
                    <Table.Row
                      active
                      key={brokersProgress.businessID}
                      onClick={() =>
                        this.props.history.push(
                          `${this.props.match.path}/${
                            brokersProgress.businessID
                          }`
                        )
                      }
                    >
                      <Table.Cell>{brokersProgress.businessID}</Table.Cell>
                      <Table.Cell>{brokersProgress.businessName}</Table.Cell>
                      <Table.Cell>
                        {brokersProgress.daysSinceGenerated}
                      </Table.Cell>
                      <Table.Cell>{brokersProgress.imCompleted}</Table.Cell>
                      <Table.Cell>{brokersProgress.imStatus}</Table.Cell>
                      <Table.Cell>{brokersProgress.broker}</Table.Cell>
                      <Table.Cell>
                        <Button size={'small'} color={'instagram'}>
                          <Icon name="file pdf outline" />
                          PDF
                        </Button>
                        <Button size={'small'} color={'instagram'}>
                          <Icon name="edit" />
                          Edit IM
                        </Button>
                        <Button size={'small'} color={'yellow'}>
                          <Icon name="warning sign" />
                        </Button>
                        <Button size={'small'} color={'youtube'}>
                          Amend IM
                        </Button>
                        <Button size={'small'} color={'green'}>
                          Send IM for approval
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Wrapper>
    );
  }
}

export default BuyerPage;
