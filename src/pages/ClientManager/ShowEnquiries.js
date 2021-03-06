import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Grid, Dimmer, Loader, Header, Statistic, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'

import { getAllEnquiries } from '../../redux/ducks/clientManager'

import Wrapper from '../../components/content/Wrapper'

class ShowEnquiries extends Component {
  constructor (props) {
    super(props)
    this.timer = null
    this.state = {
      inputSearch: ''
    }
  }

  componentDidMount () {
    this.props.getAllEnquiries(this.props.location.state.business)
  }

  _returnPage = business => {
    if (this.props.location.state.comingFrom === 'business') this.props.history.push(`/business/${business.id}`)
    if (this.props.location.state.comingFrom === 'clientManager') this.props.history.push('/clientManager')
  }

  render () {
    const { isLoadingEnquiries, enquiries, totalEnquiries, history } = this.props
    const { business, comingFrom } = this.props.location.state

    if (isLoadingEnquiries) {
      return (
        <Dimmer inverted active={isLoadingEnquiries}>
          <Loader inverted />
        </Dimmer>
      )
    }
    return (
      <Wrapper>
        <Grid style={{ marginTop: '10px' }}>
          <Grid.Row>
            <Grid.Column textAlign="left">
              <Button color="green" onClick={() => this._returnPage(business)} size="small" floated="left">
                <Icon name="backward" />
                {`Return to ${comingFrom === 'business' ? 'Business' : 'Client Manager'} `}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {enquiries && enquiries.length > 0 ? (
          <Fragment>
            <Header size="large" textAlign="center">
              {`${business.businessName} (BS${business.id})`}
            </Header>
            <Statistic.Group style={{ marginTop: '30px' }} size="mini" color="blue" widths={3}>
              <Statistic size="mini">
                <Statistic.Value>{`${business.firstNameV} ${business.lastNameV}`}</Statistic.Value>
                <Statistic.Label>Name</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{business.vendorEmail}</Statistic.Value>
                <Statistic.Label>Email</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{business.vendorPhone1}</Statistic.Value>
                <Statistic.Label>Phone</Statistic.Label>
              </Statistic>
            </Statistic.Group>
            <Statistic.Group style={{ marginTop: '10px' }} size="mini" color="blue" widths={1}>
              <Statistic>
                <Statistic.Value>{`${business.address1}, ${business.suburb}, ${business.state}, ${business.postCode}`}</Statistic.Value>
                <Statistic.Label>Address</Statistic.Label>
              </Statistic>
            </Statistic.Group>
            <Grid padded="horizontally">
              <Grid.Row>
                <Grid.Column>
                  <Header size="small" floated="right">
                    {`Total of Enquiries: ${totalEnquiries}`}
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Dimmer.Dimmable dimmed={isLoadingEnquiries} style={{ width: '100%' }}>
                <Dimmer inverted active={isLoadingEnquiries}>
                  <Loader>Loading</Loader>
                </Dimmer>
                <Grid.Row>
                  <Table color="blue" inverted celled selectable compact size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Date of Enquiry</Table.HeaderCell>
                        <Table.HeaderCell>CA Received</Table.HeaderCell>
                        <Table.HeaderCell>SM Sent</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {enquiries.map(enquirie => (
                        <Table.Row
                          active
                          key={enquirie.id}
                          onClick={() => history.push(`/buyer/${enquirie.Buyer.id}/business/${business.id}`)}
                        >
                          <Table.Cell>{`${enquirie.Buyer.firstName} ${enquirie.Buyer.surname}`}</Table.Cell>
                          <Table.Cell>{enquirie.Buyer.email}</Table.Cell>
                          <Table.Cell>{enquirie.Buyer.telephone1}</Table.Cell>
                          <Table.Cell> {moment(enquirie.dateTimeCreated).format('DD/MM/YYYY')}</Table.Cell>
                          <Table.Cell style={{ color: enquirie.Buyer.caReceived ? 'green' : 'red' }}>
                            {enquirie.Buyer.caReceived ? 'Yes' : 'No'}
                          </Table.Cell>
                          <Table.Cell style={{ color: enquirie.Buyer.smSent ? 'green' : 'red' }}>
                            {enquirie.Buyer.smSent ? 'Yes' : 'No'}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Grid.Row>
              </Dimmer.Dimmable>
            </Grid>
          </Fragment>
        ) : (
          <Header size="medium" textAlign="center">
            Ops... This business has no enquiries yet!
          </Header>
        )}
      </Wrapper>
    )
  }
}

ShowEnquiries.propTypes = {
  businesses: PropTypes.array,
  isCreated: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  getAllEnquiries: PropTypes.func,
  enquiries: PropTypes.array,
  isLoadingEnquiries: PropTypes.bool,
  totalEnquiries: PropTypes.number
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllEnquiries
    },
    dispatch
  )

const mapStateToProps = state => ({
  enquiries: state.clientManager.getAllEnquiries.array,
  isLoadingEnquiries: state.clientManager.getAllEnquiries.isLoading,
  totalEnquiries: state.clientManager.getAllEnquiries.totalEnquiries
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowEnquiries)
