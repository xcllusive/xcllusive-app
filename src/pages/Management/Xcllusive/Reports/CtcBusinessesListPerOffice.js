import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Table, Segment, Header, Button, Icon } from 'semantic-ui-react'
import Wrapper from '../../../../components/content/Wrapper'
import { getCtcBusinessesPerOffice } from '../../../../redux/ducks/reports'
import moment from 'moment'

class CtcBusinessesListPerOffice extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    if (this.props.savedRecords) {
      this.props.getCtcBusinessesPerOffice(
        this.props.match.params.dataRegion,
        moment(new Date(this.props.savedRecords.dateFrom)).format('YYYY/MM/DD 00:00:00'),
        moment(new Date(this.props.savedRecords.dateTo)).format('YYYY/MM/DD 23:59:59')
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

  render () {
    const { businessesLeads } = this.props
    const { officeObject } = this.props.location.state
    return (
      <Wrapper>
        <Header style={{ marginTop: '10px' }} textAlign="center">
          {officeObject['listingAgent.dataRegion']}
        </Header>
        <Grid>
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
        <Segment style={{ paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' }} size="small">
          <Fragment>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Header style={{ marginLeft: '10px' }} as="h4" color="blue" textAlign="left">
                    Leads
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header style={{ marginRight: '10px' }} as="h4" color="red" textAlign="right">
                    Total: {officeObject.count}
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {businessesLeads ? (
              <Table celled striped selectable compact size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Business ID</Table.HeaderCell>
                    <Table.HeaderCell>Business Name</Table.HeaderCell>
                    <Table.HeaderCell>Vendor Name</Table.HeaderCell>
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
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            ) : null}
          </Fragment>
        </Segment>
      </Wrapper>
    )
  }
}

CtcBusinessesListPerOffice.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
  getCtcBusinessesPerOffice: PropTypes.func,
  businessesLeads: PropTypes.array,
  match: PropTypes.object,
  savedRecords: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    brokerAccountName: 0
  }
}

const mapStateToProps = state => ({
  businessesLeads: state.reports.getCtcBusinessesOffice.object.listBusinessesDateCreated,
  savedRecords: state.reports.keepMarketingRecords.records
})

const mapDispatchToProps = dispatch => bindActionCreators({ getCtcBusinessesPerOffice }, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(CtcBusinessesListPerOffice)
)
