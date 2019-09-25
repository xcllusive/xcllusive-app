import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Table, Segment, Header, Button, Icon, Dimmer, Loader } from 'semantic-ui-react'
import Wrapper from '../../../../components/content/Wrapper'
import { getBusinessesPerAnalystSource } from '../../../../redux/ducks/reports'
import moment from 'moment'
import numeral from 'numeral'

class BusinessesListPerAnalystSource extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showHideLeads: true,
      showHideSignedUp: true
    }
  }
  componentDidMount () {
    if (this.props.savedRecords) {
      this.props.getBusinessesPerAnalystSource(
        this.props.match.params.id,
        moment(this.props.savedRecords.dateFrom).format('YYYY/MM/DD 00:00:00'),
        moment(this.props.savedRecords.dateTo).format('YYYY/MM/DD 23:59:59'),
        this.props.location.state.type,
        this.props.location.state.officeId
      )
    }
  }

  _goToBusinessPage (business) {
    this.props.history.push({
      pathname: `/business/${business.id}`,
      state: {
        previousPage: 'Marketing Report'
      }
    })
  }

  _backToMarketingReport () {
    this.props.history.goBack()
  }

  _avgFirstContact = businessesLeads => {
    let total = 0
    businessesLeads.map(item => {
      if (item.dateTimeFirstOpenByAgent) {
        total = total + moment(item.dateTimeFirstOpenByAgent).diff(moment(item.dateTimeAssignToAgent), 'hour')
      } else {
        if (item.dateTimeAssignToAgent) {
          total = total + moment(new Date()).diff(moment(item.dateTimeAssignToAgent), 'hour')
        }
      }
    })

    return numeral(total / businessesLeads.length).format('0,0.[99]')
  }

  _diffTillToday = business => {
    return moment(new Date()).diff(moment(business.dateTimeAssignToAgent), 'hour')
  }

  _showHideTable = (showHide, type) => {
    if (type === 'leads') this.setState({ showHideLeads: !!showHide })
    if (type === 'signedUp') this.setState({ showHideSignedUp: !!showHide })
  }

  render () {
    const { businessesLeads, businessesSignedUp, isLoadingReports } = this.props
    const { leadsObject, type } = this.props.location.state
    return (
      <Wrapper>
        <Dimmer.Dimmable dimmed={isLoadingReports}>
          <Dimmer inverted active={isLoadingReports}>
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid style={{ marginTop: '10px' }}>
            <Grid.Row columns={1}>
              <Grid.Column floated="left">
                <Header>
                  <Button size="small" color="green" onClick={() => this._backToMarketingReport()}>
                    <Icon name="backward" />
                    Back to Marketing Report
                  </Button>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header textAlign="center">
            {type === 'analyst'
              ? `${leadsObject.firstName} ${leadsObject.lastName}`
              : type === 'source'
                ? `${leadsObject.sourceLabel} (${leadsObject.dataRegion})`
                : leadsObject.sourceLabel}
          </Header>
          <Grid>
            <Grid.Row style={{ paddingTop: '0px', paddingBottom: '0px' }} columns={1}>
              <Grid.Column>
                {this.state.showHideLeads ? (
                  <Button floated="right" size="small" color="blue" onClick={() => this._showHideTable(false, 'leads')}>
                    <Icon name="hide" />
                    Hide Table
                  </Button>
                ) : (
                  <Button floated="right" size="small" color="green" onClick={() => this._showHideTable(true, 'leads')}>
                    <Icon name="unhide" />
                    Show Table
                  </Button>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Segment style={{ paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' }} size="small">
            <Fragment>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Header style={{ marginLeft: '10px' }} as="h4" color="blue" textAlign="left">
                      {type === 'analyst' || type === 'source' ? 'Leads' : 'Engaged'}
                    </Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Header style={{ marginRight: '10px' }} as="h4" color="red" textAlign="right">
                      Total:
                      {type === 'analyst' || type === 'source'
                        ? leadsObject.totalLeads
                        : type === 'totalSource'
                          ? leadsObject.count
                          : leadsObject.totalPerSource}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {businessesLeads && this.state.showHideLeads ? (
                <Table celled striped selectable compact size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Business ID</Table.HeaderCell>
                      <Table.HeaderCell>Business Name</Table.HeaderCell>
                      <Table.HeaderCell>Vendor Name</Table.HeaderCell>
                      <Table.HeaderCell>First Contact</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {businessesLeads.map(business => {
                      return (
                        <Table.Row key={business.id}>
                          <Table.Cell>
                            <Grid>
                              <Grid.Row columns={2}>
                                <Grid.Column width={1}>
                                  <Icon link name="magnify" onClick={() => this._goToBusinessPage(business)} />
                                </Grid.Column>
                                <Grid.Column>{`BS${business.id}`}</Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Table.Cell>
                          <Table.Cell>{business.businessName}</Table.Cell>
                          <Table.Cell>{`${business.firstNameV} ${business.lastNameV} `}</Table.Cell>
                          <Table.Cell>
                            {business.dateTimeAssignToAgent
                              ? business.dateTimeFirstOpenByAgent
                                ? moment(business.dateTimeFirstOpenByAgent).diff(
                                  moment(business.dateTimeAssignToAgent),
                                  'hour'
                                ) < 1
                                  ? 'Less than 1 hour'
                                  : `${moment(business.dateTimeFirstOpenByAgent).diff(
                                    moment(business.dateTimeAssignToAgent),
                                    'hour'
                                  )} hours`
                                : `Has not opened yet [ ${this._diffTillToday(business)} hours ] `
                              : ''}
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell />
                      <Table.HeaderCell />
                      <Table.HeaderCell>{this._avgFirstContact(businessesLeads)}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              ) : null}
            </Fragment>
          </Segment>
          <Grid>
            <Grid.Row style={{ paddingTop: '0px', paddingBottom: '0px' }} columns={1}>
              <Grid.Column>
                {this.state.showHideSignedUp ? (
                  <Button
                    floated="right"
                    size="small"
                    color="blue"
                    onClick={() => this._showHideTable(false, 'signedUp')}
                  >
                    <Icon name="hide" />
                    Hide Table
                  </Button>
                ) : (
                  <Button
                    floated="right"
                    size="small"
                    color="green"
                    onClick={() => this._showHideTable(true, 'signedUp')}
                  >
                    <Icon name="unhide" />
                    Show Table
                  </Button>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Segment style={{ paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' }} size="small">
            <Fragment>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Header style={{ marginLeft: '10px' }} as="h4" color="blue" textAlign="left">
                      {type === 'analyst' || type === 'source' ? 'Signed Up' : 'Sold'}
                    </Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Header style={{ marginRight: '10px' }} as="h4" color="red" textAlign="right">
                      Total:{' '}
                      {type === 'analyst'
                        ? leadsObject.signed
                        : type === 'source'
                          ? leadsObject.totalSignedUp
                          : leadsObject.countBusinessSold}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {businessesLeads && this.state.showHideSignedUp ? (
                <Table celled striped selectable compact size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Business ID</Table.HeaderCell>
                      <Table.HeaderCell>Business Name</Table.HeaderCell>
                      <Table.HeaderCell>Vendor Name</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {businessesSignedUp.map((business, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <Grid>
                              <Grid.Row columns={2}>
                                <Grid.Column width={1}>
                                  <Icon link name="magnify" onClick={() => this._goToBusinessPage(business)} />
                                </Grid.Column>
                                <Grid.Column>{`BS${business.id}`}</Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Table.Cell>
                          <Table.Cell>{business.businessName}</Table.Cell>
                          <Table.Cell>{`${business.firstNameV} ${business.lastNameV} `}</Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
              ) : null}
            </Fragment>
          </Segment>
        </Dimmer.Dimmable>
      </Wrapper>
    )
  }
}

BusinessesListPerAnalystSource.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
  getBusinessesPerAnalystSource: PropTypes.func,
  businessesLeads: PropTypes.array,
  businessesSignedUp: PropTypes.array,
  match: PropTypes.object,
  savedRecords: PropTypes.object,
  isLoadingReports: PropTypes.bool
}

const mapPropsToValues = props => {
  return {
    brokerAccountName: 0
  }
}

const mapStateToProps = (state, props) => {
  return {
    businessesLeads: state.reports.getBusinessesAnalystSource.object.listBusinessesDateCreated,
    businessesSignedUp: state.reports.getBusinessesAnalystSource.object.listBusinessIMSold,
    isLoadingReports: state.reports.getBusinessesAnalystSource.isLoading,
    savedRecords:
      props.location.state.type === 'analyst' ||
      props.location.state.type === 'source' ||
      props.location.state.type === 'totalSource'
        ? state.reports.keepMarketingRecords.records
        : state.reports.keepSoldBySourceRecords.records
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getBusinessesPerAnalystSource }, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(BusinessesListPerAnalystSource)
)
