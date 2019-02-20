import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Header, Segment, Button } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import { getMarketingReport } from '../../../redux/ducks/reports'
import Wrapper from '../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

class MarketingReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataRegion: [
        { key: 1, text: 'Adelaide Office', value: 'Adelaide Office' },
        { key: 2, text: 'Camberra Office', value: 'Camberra Office' },
        { key: 3, text: 'Cowra Office', value: 'Cowra Office' },
        { key: 4, text: 'Gosford Office', value: 'Gosford Office' },
        { key: 5, text: 'Melbourne Office', value: 'Melbourne Office' },
        { key: 6, text: 'Sydney Office', value: 'Sydney Office' },
        { key: 7, text: 'Queensland Office', value: 'Queensland Office' }
      ]
    }
  }
  async componentDidMount () {
    // // this.props.clearWeeklyReports()
    // if (
    //   (this.props.user && this.props.user.brokerAccountName) ||
    //   (this.props.location && this.props.location.state.keepRecords)
    // ) {
    //   this.props.setFieldValue('dataRegion', this.props.user.dataRegion)
    //   this.props.setFieldValue('brokerAccountName', this.props.user.brokerAccountName)
    // } else {
    // await this.props.getUserLogged()
    // this.props.setFieldValue('dataRegion', this.props.user.dataRegion)
    // if (this.props.brokersPerRegion <= 0) {
    //   this.props.getBrokersPerRegion(this.props.user.dataRegion)
    // }
    // this.props.brokerAccountNameRestored &&
    //   this.props.setFieldValue('brokerAccountName', this.props.brokerAccountNameRestored)
  }

  componentDidUpdate (nextProps) {
    // if (
    //   (this.props.isCreated && nextProps.isCreated !== this.props.isCreated) ||
    //   (this.props.isUpdated && nextProps.isUpdated !== this.props.isUpdated)
    // ) {
    //   this.props.getBusinessesPerBroker(this.props.values.brokerAccountName)
    // }
  }

  _handleDateFromChange = date => {
    if (moment(date).diff(moment(this.props.values.dateTo)) > 0) {
      this._showMsg('smaller')
    } else {
      this.props.setFieldValue('dateFrom', date)
    }
  }

  _handleDateToChange = date => {
    if (moment(this.props.values.dateFrom).isSameOrAfter(moment(date))) {
      this._showMsg('bigger')
    } else {
      this.props.setFieldValue('dateTo', date)
    }
  }

  _showMsg = message => {
    this.props.openModal(TypesModal.MODAL_TYPE_SHOW_MSG, {
      options: {
        title: 'Alert:',
        content: 'Got it!',
        text: message === 'bigger' ? 'Date To must be bigger than Date From' : 'Date From must be smaller than Date To'
      }
    })
  }

  _confirmReports = (dateFrom, dateTo) => {
    this.props.getMarketingReport(moment(dateFrom).format('YYYY/MM/DD'), moment(dateTo).format('YYYY/MM/DD'))
  }

  render () {
    const { values, leadsPerAnalyst } = this.props
    // const { dataRegion } = this.state
    console.log(leadsPerAnalyst)
    return (
      <Wrapper>
        <Form>
          <Grid>
            <Grid.Row style={{ paddingBottom: '0px' }} columns={2}>
              <Grid.Column>
                <Form.Group>
                  <label
                    style={{
                      marginLeft: '15px',
                      marginTop: '5px',
                      marginRight: '15px',
                      fontSize: '.92857143em',
                      color: 'rgba(0,0,0,.87)',
                      fontWeight: '700'
                    }}
                  >
                    Date From:
                  </label>
                  <Form.Field>
                    <DatePicker
                      selected={values.dateFrom}
                      onChange={this._handleDateFromChange}
                      popperPlacement="top-end"
                    />
                  </Form.Field>
                  <label
                    style={{
                      marginLeft: '15px',
                      marginTop: '5px',
                      marginRight: '15px',
                      fontSize: '.92857143em',
                      color: 'rgba(0,0,0,.87)',
                      fontWeight: '700'
                    }}
                  >
                    Date To:
                  </label>
                  <Form.Field>
                    <DatePicker
                      selected={values.dateTo}
                      onChange={this._handleDateToChange}
                      popperPlacement="top-end"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button
                      positive
                      icon="checkmark"
                      labelPosition="right"
                      content="Confirm"
                      onClick={() => this._confirmReports(values.dateFrom, values.dateTo)}
                    />
                  </Form.Field>
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        {leadsPerAnalyst && leadsPerAnalyst.length > 0 ? (
          <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
            <Fragment>
              <Header style={{ marginLeft: '10px' }} color="red">
                Leads Per Analyst
              </Header>
              <Grid padded="horizontally">
                <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
                  <Grid.Column
                    style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                  >
                    <Table celled striped selectable compact size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Office</Table.HeaderCell>
                          <Table.HeaderCell>Listing Agent</Table.HeaderCell>
                          <Table.HeaderCell>Total</Table.HeaderCell>
                          <Table.HeaderCell>Signed Up</Table.HeaderCell>
                          <Table.HeaderCell>Convertion Rate</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {leadsPerAnalyst.map(leadsPerAnalyst => {
                          return (
                            <Table.Row key={leadsPerAnalyst.listingAgent_id}>
                              <Table.Cell>{leadsPerAnalyst['listingAgent.dataRegion']}</Table.Cell>
                              <Table.Cell>{`${leadsPerAnalyst['listingAgent.firstName']} ${
                                leadsPerAnalyst['listingAgent.lastName']
                              }`}</Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Fragment>
          </Segment>
        ) : null}
      </Wrapper>
    )
  }
}

MarketingReports.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  openModal: PropTypes.func,
  getMarketingReport: PropTypes.func,
  leadsPerAnalyst: PropTypes.array
}

const mapPropsToValues = props => {
  return {
    dateFrom: moment(),
    dateTo: moment()
  }
}

const mapStateToProps = state => ({
  leadsPerAnalyst: state.reports.getMarketingReport.array
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getMarketingReport
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(MarketingReports)
)
