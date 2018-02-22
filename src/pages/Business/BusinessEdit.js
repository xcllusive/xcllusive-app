import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Header,
  Segment,
  Statistic,
  Grid,
  Form,
  Table,
  Button,
  Icon,
  Tab
} from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'
import EditBusinessDetailForm from '../../components/forms/EditBusinessDetailForm'

const panes = [
  {
    menuItem: 'Business Detail',
    render: () => (
      <Tab.Pane className='BusinessDetail' attached={false}>
        <Segment size='mini' inverted color='blue'>
          <Header as='h3' textAlign='left'>
            Business Detail
          </Header>
          <Header as='h6' floated='right'>
            Enquiry Date: 06/12/2017
          </Header>
        </Segment>
        <EditBusinessDetailForm />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Pricing/Information',
    render: () => (
      <Tab.Pane attached={false}>
        <Grid celled divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment size='mini' inverted color='blue'>
                <Header as='h6' textAlign='left'>
                  Business Pricing
                </Header>
                <Header as='h6' floated='right'>
                  (For Sale)
                </Header>
              </Segment>
              <Form size='tiny'>
                <Form.Group widths='equal'>
                  <Form.Input label='Listed Price' />
                  <Form.Input label='Current Price' />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='Engagement Fee' />
                  <Form.Input label='Commission %' />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='Minimum Com $' />
                  <Form.Input label='Appraisal High $' />
                  <Form.Input label='Appraisal Low $' />
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Segment size='mini' inverted color='blue'>
                <Header as='h6' textAlign='left'>
                  Sales Information
                </Header>
                <Header as='h6' floated='right'>
                  (Deposit and Sold)
                </Header>
              </Segment>
              <Form size='tiny'>
                <Form.Group widths='equal'>
                  <Form.Input label='Deposit Taken $' readOnly />
                  <Form.Input label='Dep. Taken Date' readOnly />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='Commission $' readOnly />
                  <Form.Input label='Settlement Date' readOnly />
                  <Form.Input label='Sold Price' readOnly />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='Attached Purchaser' readOnly />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.TextArea label='Search Notes' />
                  <Form.TextArea label='Conclusion Notes' />
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    )
  }
]

const array = [
  {
    businessID: 'BS2000',
    logID: '0001',
    dataLog: '01/12/2017',
    logText: 'Send IM to Buyer B001',
    FollowUpStatus: 'Pending'
  },
  {
    businessID: 'BS2000',
    logID: '0002',
    dataLog: '02/12/2017',
    logText: 'Send IM to Buyer B111',
    FollowUpStatus: 'Done'
  },
  {
    businessID: 'BS2000',
    logID: '0003',
    dataLog: '03/12/2017',
    logText: 'Send IM to Buyer B1234',
    FollowUpStatus: 'Pending'
  },
  {
    businessID: 'BS2000',
    logID: '0004',
    dataLog: '04/12/2017',
    logText: 'Send IM to Buyer B1010',
    FollowUpStatus: 'Done'
  },
  {
    businessID: 'BS2000',
    logID: '0005',
    dataLog: '05/12/2017',
    logText: 'Send IM to Buyer B4321',
    FollowUpStatus: 'Done'
  }
]

class BusinessEditPage extends Component {
  constructor (props) {
    super(props)
    this.handleChange = (e, { value }) => this.setState({ value })
  }

  componentWillMount () {
    console.log(this.props.match.params.id)
  }

  render () {
    return (
      <Wrapper>
        <Statistic.Group size='mini' widths={7}>
          <Statistic color='orange'>
            <Statistic.Value>Business Name</Statistic.Value>
            <Statistic.Label>Business ID</Statistic.Label>
          </Statistic>
          <Statistic color='blue'>
            <Statistic.Value>1,000,000</Statistic.Value>
            <Statistic.Label>Price</Statistic.Label>
          </Statistic>
          <Statistic color='blue'>
            <Statistic.Value>Business Sale</Statistic.Value>
            <Statistic.Label>Type of Business Sale</Statistic.Label>
          </Statistic>
          <Statistic color='blue'>
            <Statistic.Value>100</Statistic.Value>
            <Statistic.Label>Enquiries</Statistic.Label>
          </Statistic>
          <Statistic color='blue'>
            <Statistic.Value>10</Statistic.Value>
            <Statistic.Label>Days on the market</Statistic.Label>
          </Statistic>
          <Statistic color='blue'>
            <Statistic.Value>5</Statistic.Value>
            <Statistic.Label>Last Feedback Score</Statistic.Label>
          </Statistic>
          <Statistic color='green'>
            <Statistic.Value>Under Offer</Statistic.Value>
          </Statistic>
        </Statistic.Group>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        <Grid celled divided='vertically'>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Button floated='left' color='facebook'>
                <Icon name='commenting' />
                New Communication
              </Button>
              <Table size={'small'} color='blue' celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>LogID</Table.HeaderCell>
                    <Table.HeaderCell>Data</Table.HeaderCell>
                    <Table.HeaderCell>Log</Table.HeaderCell>
                    <Table.HeaderCell>Follow Up Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {array.map(item => {
                    return (
                      <Table.Row
                        active
                        key={item.logID}
                        onClick={() =>
                          this.props.history.push(
                            `${this.props.match.path}/${item.businessID}/${
                              item.logID
                            }`
                          )
                        }
                      >
                        <Table.Cell>{item.logID}</Table.Cell>
                        <Table.Cell>{item.dataLog}</Table.Cell>
                        <Table.Cell>{item.logText}</Table.Cell>
                        <Table.Cell>{item.FollowUpStatus}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Form>
            <Form.Group inline>
              <Form.Input
                label='Created By'
                placeholder='Zoran Sarabaca'
                readOnly
              />
              <Form.Input
                label='Creation Date'
                placeholder='08/12/2017'
                readOnly
              />
              <Form.Input
                label='Modified By'
                placeholder='Cayo Bayestorff'
                readOnly
              />
              <Form.Input
                label='Modified Date'
                placeholder='09/12/2017'
                readOnly
              />
            </Form.Group>
          </Form>
        </Grid>
      </Wrapper>
    )
  }
}

BusinessEditPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}

export default BusinessEditPage
