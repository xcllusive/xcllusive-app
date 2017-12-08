import React, { Component } from 'react';
import {
  Header,
  Segment,
  Statistic,
  Grid,
  Form,
  Radio,
  Table,
  Button
} from 'semantic-ui-react';
import BusinessDetail from '../../components/BusinessDetail';

const agent = [
  { key: 'Z', text: 'Zoran', value: 'Zoran' },
  { key: 'C', text: 'Cayo', value: 'Cayo' }
];

const businessStage = [
  { key: 'U', text: 'Under Offer', value: 'UnderOffer' },
  { key: 'F', text: 'For Sale', value: 'ForSale' }
];

const businessType = [
  { key: 'T', text: 'Transport', value: 'Transport' },
  { key: 'E', text: 'Export', value: 'Export' }
];
const industry = [
  { key: 'U', text: 'Car', value: 'Car' },
  { key: 'F', text: 'Fashion', value: 'Fashion' }
];
const ownerTime = [
  { key: '1', text: '< 5 days', value: '1' },
  { key: '2', text: '5 days', value: '2' }
];
const rating = [
  { key: '1', text: '1. Awesome', value: '1' },
  { key: '2', text: '2. Good', value: '2' }
];

const array = [
  {
    businessID: 'BS2000',
    dataLog: '01/12/2017',
    logText: 'Send IM to Buyer B001',
    FollowUpStatus: 'Pending'
  },
  {
    businessID: 'BS2001',
    dataLog: '02/12/2017',
    logText: 'Send IM to Buyer B111',
    FollowUpStatus: 'Done'
  },
  {
    businessID: 'BS2002',
    dataLog: '03/12/2017',
    logText: 'Send IM to Buyer B1234',
    FollowUpStatus: 'Pending'
  },
  {
    businessID: 'BS2003',
    dataLog: '04/12/2017',
    logText: 'Send IM to Buyer B1010',
    FollowUpStatus: 'Done'
  },
  {
    businessID: 'BS2004',
    dataLog: '05/12/2017',
    logText: 'Send IM to Buyer B4321',
    FollowUpStatus: 'Done'
  }
];

class BusinessEditPage extends Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });

  //handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <div>
        <Statistic.Group size={'mini'} widths="7">
          <Statistic color="orange">
            <Statistic.Value>Business Name</Statistic.Value>
            <Statistic.Label>Business ID</Statistic.Label>
          </Statistic>
          <Statistic color="blue">
            <Statistic.Value>1,000,000</Statistic.Value>
            <Statistic.Label>$</Statistic.Label>
          </Statistic>
          <Statistic color="blue">
            <Statistic.Value>Business Sale</Statistic.Value>
            <Statistic.Label>Type of Business Sale</Statistic.Label>
          </Statistic>
          <Statistic color="blue">
            <Statistic.Value>100</Statistic.Value>
            <Statistic.Label>Enquiries</Statistic.Label>
          </Statistic>
          <Statistic color="blue">
            <Statistic.Value>10</Statistic.Value>
            <Statistic.Label>Days on the market</Statistic.Label>
          </Statistic>
          <Statistic color="blue">
            <Statistic.Value>5</Statistic.Value>
            <Statistic.Label>Last Feedback Score</Statistic.Label>
          </Statistic>
          <Statistic color="green">
            <Statistic.Value>Under Offer</Statistic.Value>
          </Statistic>
        </Statistic.Group>
        <Segment size={'mini'} inverted tertiary color="black" clearing>
          <Header color="white" as="h4" floated="left">
            {' '}
            Business Detail{' '}
          </Header>
          <Header color="white" as="h4" floated="right">
            {' '}
            Enquiry Date: 06/12/2017{' '}
          </Header>
        </Segment>
        <Grid celled divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color="teal" textAlign="center" size="medium">
                Main Details
              </Header>
              <BusinessDetail />
              <Form>
                <Form.Input
                  label="Listing Agent"
                  placeholder="Zoran Sarabaca"
                  readOnly
                />
                <Form.Button primary>Reassign Business</Form.Button>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Header color="teal" textAlign="center" size="medium">
                Other Details
              </Header>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Business name (Secondary name)"
                    placeholder="Insert another business name"
                  />
                  <Form.Input
                    label="ABN"
                    placeholder="Insert ABN of the business name"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Street"
                    placeholder="Insert a street name"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input label="Suburb" placeholder="Insert a last name" />
                  <Form.Input label="Suburb" placeholder="Insert a last name" />
                  <Form.Input
                    label="Post code"
                    placeholder="Insert a post code"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input label="Website" placeholder="Insert a website" />
                  <Form.Input label="Fax" placeholder="Insert a fax" />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Select
                    label="Agent"
                    options={agent}
                    placeholder="Agent"
                  />
                  <Form.Select
                    label="Business Stage"
                    options={businessStage}
                    placeholder="Business Stage"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Select
                    label="Business Type"
                    options={businessType}
                    placeholder="Business Type"
                  />
                  <Form.Select
                    label="Industry"
                    options={industry}
                    placeholder="Industry"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Select
                    label="Owner's time"
                    options={ownerTime}
                    placeholder="Owner's time"
                  />
                  <Form.Select
                    label="Rating"
                    options={rating}
                    placeholder="Rating"
                  />
                </Form.Group>
                <Form.Checkbox
                  label="Notify Owner for IM request"
                  defaultChecked
                />
                <Form.Group inline>
                  <label>Type of Business Sale: </label>
                  <Form.Field
                    control={Radio}
                    toggle
                    label="Business Sale"
                    value="BS"
                    checked={this.state.value === 'BS'}
                    onChange={this.handleChange}
                  />
                  <Form.Field
                    control={Radio}
                    toggle
                    label="Seller Assist"
                    value="SA"
                    checked={this.state.value === 'SA'}
                    onChange={this.handleChange}
                  />
                  <Form.Field
                    control={Radio}
                    toggle
                    label="Franchise Sale"
                    value="FS"
                    checked={this.state.value === 'FS'}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group inline>
                  <label>Eligible for 120 Day Guarantee? </label>
                  <Form.Field
                    control={Radio}
                    toggle
                    label="Yes"
                    value="Yes"
                    checked={this.state.value === 'Yes'}
                    onChange={this.handleChange}
                  />
                  <Form.Field
                    control={Radio}
                    toggle
                    label="No"
                    value="No"
                    checked={this.state.value === 'No'}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group inline>
                  <Form.Button color="green">Appraisal Management</Form.Button>
                  <Form.Button floated="right" color="red">
                    SAVE
                  </Form.Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header color="teal" textAlign="center" size="medium">
                Communication Logs
              </Header>
              <Button color="facebook" content="New Communication" />
              <Table color="grey" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Data</Table.HeaderCell>
                    <Table.HeaderCell>Log</Table.HeaderCell>
                    <Table.HeaderCell>Follow Up Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {array.map(item => {
                    return (
                      <Table.Row active key={item.businessID}>
                        <Table.Cell>{item.dataLog}</Table.Cell>
                        <Table.Cell>{item.logText}</Table.Cell>
                        <Table.Cell>{item.FollowUpStatus}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Form>
            <Form.Group inline>
              <Form.Input
                label="Created By"
                placeholder="Zoran Sarabaca"
                readOnly
              />
              <Form.Input
                label="Creation Date"
                placeholder="08/12/2017"
                readOnly
              />
              <Form.Input
                label="Modified By"
                placeholder="Cayo Bayestorff"
                readOnly
              />
              <Form.Input
                label="Modified Date"
                placeholder="09/12/2017"
                readOnly
              />
              <Form.Button floated="right" color="red">
                SAVE
              </Form.Button>
            </Form.Group>
          </Form>
        </Grid>
      </div>
    );
  }
}

export default BusinessEditPage;
