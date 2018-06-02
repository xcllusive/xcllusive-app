import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Header,
  Segment,
  Statistic,
  Grid,
  Form,
  Table,
  Button,
  Icon,
  Tab,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import moment from 'moment'
import Wrapper from '../../components/content/Wrapper'
import EditBusinessDetailForm from '../../components/forms/EditBusinessDetailForm'
import EditBusinessPriceForm from '../../components/forms/EditBusinessPriceForm'

import { getBusiness, cleanBusiness } from '../../redux/ducks/business'
import { getLogFromBusiness } from '../../redux/ducks/businessLog'

class BusinessEditPage extends Component {
  constructor (props) {
    super(props)
    this.handleChange = (e, { value }) => this.setState({ value })
  }

  componentWillReceiveProps (nextprops) {
    if (nextprops.error && this.props.error !== nextprops.error) {
      this.props.history.goBack()
    }
  }

  componentWillMount () {
    const { id } = this.props.match.params
    this.props.getBusiness(id)
    this.props.getLogFromBusiness(id)
  }

  shouldComponentUpdate (nextprops) {
    if (this.props.isLoading === nextprops.isLoading) return false

    return true
  }

  componentWillUnmount () {
    this.props.cleanBusiness()
  }

  render () {
    const { arrayLogsFromBusiness, isLoading, business } = this.props

    if (isLoading) {
      return (
        <Dimmer inverted active={this.props.isLoading}>
          <Loader inverted />
        </Dimmer>
      )
    }

    return (
      <Wrapper>
        <Grid>
          <Grid.Row
            style={{
              justifyContent: 'center',
              marginTop: '25px',
              marginBottom: 0,
              paddingBottom: 0
            }}
          >
            <Statistic.Group size="mini" widths={16}>
              <Statistic color="orange">
                <Statistic.Value>{this.props.business.id}</Statistic.Value>
                <Statistic.Label>Id</Statistic.Label>
              </Statistic>
              <Statistic color="orange">
                <Statistic.Value>
                  {this.props.business.businessName}
                </Statistic.Value>
                <Statistic.Label>Business Name</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>123131</Statistic.Value>
                <Statistic.Label>Price</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>123123123</Statistic.Value>
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
                <Statistic.Value>{this.props.business.stageId}</Statistic.Value>
                <Statistic.Label>Stage</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: 0 }}>
            <Tab
              style={{ width: '100%', padding: '0 15px' }}
              menu={{ secondary: true, pointing: true }}
              panes={[
                {
                  menuItem: 'Business Detail',
                  render: () => (
                    <Tab.Pane className="BusinessDetail" attached={false}>
                      <Segment size="mini" inverted color="blue">
                        <Grid>
                          <Grid.Row columns={2}>
                            <Grid.Column>
                              <Header as="h3" textAlign="left" inverted>
                                Business Detail
                              </Header>
                            </Grid.Column>
                            <Grid.Column>
                              <Header as="h4" floated="right" inverted>
                                Enquiry Date:{' '}
                                {moment(business.dateTimeCreated).format(
                                  'DD/MM/YYYY'
                                )}
                              </Header>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>
                      <EditBusinessDetailForm business={business} />
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: 'Pricing/Information',
                  render: () => (
                    <Tab.Pane attached={false}>
                      <EditBusinessPriceForm business={business} />
                    </Tab.Pane>
                  )
                }
              ]}
            />
          </Grid.Row>

          <Grid.Row style={{ justifyContent: 'flex-end', padding: '0 15px' }}>
            <Button
              color="facebook"
              onClick={() =>
                this.props.history.push(`${this.props.match.url}/log`)
              }
            >
              <Icon name="commenting" />
              New Communication
            </Button>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table size={'small'} color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Log</Table.HeaderCell>
                    <Table.HeaderCell>Follow Up</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {arrayLogsFromBusiness.map(logBusiness => {
                    return (
                      <Table.Row
                        active
                        key={logBusiness.id}
                        onClick={() =>
                          this.props.history.push(`${this.props.match.url}/log`)
                        }
                      >
                        <Table.Cell>{logBusiness.text}</Table.Cell>
                        <Table.Cell>
                          {moment(logBusiness.followUp).format('DD/MM/YYYY')}
                        </Table.Cell>
                        <Table.Cell>{logBusiness.followUpStatus}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ justifyContent: 'center' }}>
            <Form>
              <Form.Group inline>
                <Form.Input
                  label="Created By"
                  placeholder={`${business.CreatedBy.firstName} ${
                    business.CreatedBy.lastName
                  }`}
                  readOnly
                />
                <Form.Input
                  label="Creation Date"
                  placeholder={moment(
                    this.props.business.dateTimeCreated
                  ).format('DD/MM/YYYY - HH:mm')}
                  readOnly
                />
                <Form.Input
                  label="Modified By"
                  placeholder={`${business.ModifiedBy.firstName} ${
                    business.ModifiedBy.lastName
                  }`}
                  readOnly
                />
                <Form.Input
                  label="Modified Date"
                  placeholder={moment(
                    this.props.business.dateTimeModified
                  ).format('DD/MM/YYYY - HH:mm')}
                  readOnly
                />
              </Form.Group>
            </Form>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

BusinessEditPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  getBusiness: PropTypes.func,
  cleanBusiness: PropTypes.func,
  business: PropTypes.object,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  arrayLogsFromBusiness: PropTypes.array,
  getLogFromBusiness: PropTypes.func
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getBusiness, cleanBusiness, getLogFromBusiness },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.get.isLoading,
    business: state.business.get.object,
    error: state.business.get.error,
    arrayLogsFromBusiness: state.businessLog.get.array
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessEditPage)
