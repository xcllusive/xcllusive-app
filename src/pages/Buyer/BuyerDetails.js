import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { Form, Segment, Header, Table, Grid, Icon } from 'semantic-ui-react'

import { getBuyer } from '../../redux/ducks/buyer'
import { getLog } from '../../redux/ducks/buyerLog'

import Wrapper from '../../components/content/Wrapper'

class BuyerDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.props.getBuyer(this.props.match.params.id)
    this.props.getLog(this.props.match.params.id)
  }

  render () {
    const { listBuyerLogList } = this.props
    return (
      <Wrapper>
        <Form>
          <Segment size="mini" inverted color="green">
            <Header as="h3">Buyer Details</Header>
          </Segment>
          <Grid celled="internally" divided>
            <Grid.Row>
              <Grid.Column width={5}>
                <Form.Group>
                  <Form.Input
                    width={8}
                    label="First Name"
                    readOnly
                    value={this.props.buyer.firstName}
                  />
                  <Form.Input
                    width={8}
                    label="Last Name"
                    readOnly
                    value={this.props.buyer.surname}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    width={16}
                    label="Email"
                    readOnly
                    icon={
                      <Icon
                        name="mail"
                        inverted
                        circular
                        link
                        onClick={() =>
                          window.open(`mailto:${this.props.buyer.email}`)
                        }
                      />
                    }
                    value={this.props.buyer.email}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    width={16}
                    label="Street"
                    readOnly
                    value={
                      this.props.buyer.streetName
                        ? this.props.buyer.streetName
                        : ''
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    width={8}
                    label="Suburb"
                    readOnly
                    value={
                      this.props.buyer.suburb ? this.props.buyer.suburb : ''
                    }
                  />
                  <Form.Input
                    width={4}
                    label="State"
                    readOnly
                    value={
                      this.props.buyer.state ? this.props.buyer.state : null
                    }
                  />
                  <Form.Input
                    width={4}
                    label="Post Code"
                    readOnly
                    value={
                      this.props.buyer.postCode ? this.props.buyer.postCode : ''
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    width={16}
                    label="Telephone"
                    readOnly
                    value={
                      this.props.buyer.telephone1
                        ? this.props.buyer.telephone1
                        : ''
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    width={8}
                    label="Source"
                    readOnly
                    value={this.props.buyer.buyerSource}
                  />
                  <Form.Input
                    width={8}
                    label="Price To"
                    readOnly
                    value={
                      this.props.buyer.priceTo ? this.props.buyer.priceTo : ''
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.TextArea
                    width={16}
                    label="Notes"
                    readOnly
                    // value={this.props.buyer.buyerNotes}
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column width={11}>
                <Header>Attached Business Log</Header>
                <Table color="blue" celled inverted selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Business Name</Table.HeaderCell>
                      <Table.HeaderCell>Log</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {listBuyerLogList.map(buyerLog => (
                      <Table.Row
                        active
                        key={buyerLog.id}
                        // onClick={() =>
                        //   this._getBusinessObject(buyerLog.business_id)
                        // }
                      >
                        <Table.Cell>
                          {buyerLog.Business.businessName}
                        </Table.Cell>
                        <Table.Cell>{buyerLog.text}</Table.Cell>
                        <Table.Cell>
                          {moment(buyerLog.followUp).format(
                            'DD/MM/YYYY - HH:mm'
                          )}
                        </Table.Cell>
                        <Table.Cell>{buyerLog.followUpStatus}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBuyer, getLog }, dispatch)

BuyerDetails.propTypes = {
  getBuyer: PropTypes.func,
  match: PropTypes.object,
  buyer: PropTypes.object,
  listBuyerLogList: PropTypes.array,
  getLog: PropTypes.func
}

const mapStateToProps = state => ({
  buyer: state.buyer.get.object,
  listBuyerLogList: state.buyerLog.get.array
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerDetails)
