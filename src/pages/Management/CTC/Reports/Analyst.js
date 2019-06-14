import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import {
  Grid,
  Form,
  Button,
  Statistic,
  Dimmer,
  Loader,
  Table,
  Segment,
  Header,
  Icon,
  Dropdown
} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TypesModal, openModal } from '../../../../redux/ducks/modal'
import Wrapper from '../../../../components/content/Wrapper'
import { getAllAnalysts, getQtdeBusinessesStagePerUser, getAnalystReport } from '../../../../redux/ducks/CTC/reports'
import GridBusinessStage from '../../../../components/content/GridBusinessStage'
import moment from 'moment'
// import { CSVDownload } from 'react-csv'

class AnalystReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isGotUser: true
    }
  }
  componentDidMount () {
    if (!this.props.arrayBusinesses) this.props.getAllAnalysts()
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
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

  _confirmReports = async (values, stageId, fromButton = false) => {
    if (fromButton) {
      await this.props.getQtdeBusinessesStagePerUser(
        values.analyst,
        moment(values.dateFrom).format('YYYY/MM/DD 00:00:00'),
        moment(values.dateTo).format('YYYY/MM/DD 23:59:59')
      )
    }
    this.props.getAnalystReport(
      values.analyst,
      moment(values.dateFrom).format('YYYY/MM/DD 00:00:00'),
      moment(values.dateTo).format('YYYY/MM/DD 23:59:59'),
      stageId
    )
  }

  _goToBusinessPage (business) {
    this.props.history.push({
      pathname: `/business/${business.id}`,
      state: {
        previousPage: 'Analyst Report'
      }
    })
  }

  _showStageLabel (keepAnalystParams) {
    let label = ''
    if (keepAnalystParams.stageId === 2) label = 'New'
    if (keepAnalystParams.stageId === 3) label = 'Cold'
    if (keepAnalystParams.stageId === 4) label = 'Potential'
    if (keepAnalystParams.stageId === 5) label = 'Hot'
    return label
  }

  render () {
    const { values, arrayAnalysts, arrayBusinesses, isLoadingReports, qtdeBusinesses, keepAnalystParams } = this.props
    return (
      <Wrapper>
        <Form>
          <Grid>
            <Grid.Row style={{ paddingBottom: '0px' }}>
              <Grid.Column>
                <Form.Group>
                  {/* <CSVLink data={this.state.csvData}>Download me</CSVLink>; */}
                  {/* <CSVDownload data={this.state.csvData} target="_blank" />; */}
                  <Form.Field width={3}>
                    <label>Select One Analyst</label>
                    <Dropdown
                      name="analyst"
                      placeholder="Analyst"
                      fluid
                      search
                      selection
                      options={arrayAnalysts}
                      value={values.analyst}
                      onChange={this._handleSelectChange}
                      onSearchChange={this._handleSearchChange}
                    />
                  </Form.Field>
                  {values.analyst !== '' ? (
                    <Fragment>
                      <Form.Field>
                        <label
                          style={{
                            marginRight: '15px',
                            fontSize: '.92857143em',
                            color: 'rgba(0,0,0,.87)',
                            fontWeight: '700'
                          }}
                        >
                          Date From:
                        </label>
                        <DatePicker
                          selected={values.dateFrom}
                          onChange={this._handleDateFromChange}
                          popperPlacement="top-end"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label
                          style={{
                            marginRight: '15px',
                            fontSize: '.92857143em',
                            color: 'rgba(0,0,0,.87)',
                            fontWeight: '700'
                          }}
                        >
                          Date To:
                        </label>
                        <DatePicker
                          selected={values.dateTo}
                          onChange={this._handleDateToChange}
                          popperPlacement="top-end"
                        />
                      </Form.Field>
                      <Form.Field style={{ marginTop: '25px' }}>
                        <Button
                          positive
                          icon="checkmark"
                          labelPosition="right"
                          content="Confirm"
                          onClick={() => this._confirmReports(values, 2, true)}
                        />
                      </Form.Field>
                    </Fragment>
                  ) : null}
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        <Dimmer.Dimmable dimmed={isLoadingReports} style={{ height: '80vh' }}>
          <Dimmer inverted active={isLoadingReports}>
            <Loader>Loading</Loader>
          </Dimmer>
          {arrayBusinesses ? (
            <Fragment>
              <GridBusinessStage>
                <Statistic.Group size="mini" color="blue" widths={6}>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 2)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessNew : 0}</Statistic.Value>
                    <Statistic.Label>New</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 3)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessCold : 0}</Statistic.Value>
                    <Statistic.Label>Cold</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 4)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessPotential : 0}</Statistic.Value>
                    <Statistic.Label>Potential</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 5)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessHot : 0}</Statistic.Value>
                    <Statistic.Label>Hot</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 6)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessEngaged : 0}</Statistic.Value>
                    <Statistic.Label>Engaged</Statistic.Label>
                  </Statistic>
                  <Statistic style={{ cursor: 'pointer' }} onClick={() => this._confirmReports(values, 7)}>
                    <Statistic.Value>{qtdeBusinesses ? qtdeBusinesses.businessLost : 0}</Statistic.Value>
                    <Statistic.Label>Lost</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </GridBusinessStage>
              {keepAnalystParams && arrayBusinesses.length > 0 ? (
                <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
                  <Header style={{ marginLeft: '10px' }} color="red">
                    {this._showStageLabel(keepAnalystParams)}
                  </Header>
                  <Table celled striped selectable compact size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell width={2}>Business ID</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Business Name</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Contact Name</Table.HeaderCell>
                        <Table.HeaderCell width={8}>Log Text</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Follow Up Date</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {arrayBusinesses.map(business => (
                        <Table.Row key={business.id}>
                          <Table.Cell>
                            <Grid>
                              <Grid.Row columns={2}>
                                <Grid.Column width={2}>
                                  <Icon link name="magnify" onClick={() => this._goToBusinessPage(business)} />
                                </Grid.Column>
                                <Grid.Column style={{ paddingLeft: '0px' }}>{`BS${business.id}`}</Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Table.Cell>
                          <Table.Cell>{business.businessName}</Table.Cell>
                          <Table.Cell>{`${business.firstNameV} ${business.lastNameV}`}</Table.Cell>
                          <Table.Cell>{business.BusinessLog[0].text}</Table.Cell>
                          <Table.Cell>{moment(business.BusinessLog[0].followUp).format('DD/MM/YYYY')}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Segment>
              ) : null}
            </Fragment>
          ) : null}
        </Dimmer.Dimmable>
      </Wrapper>
    )
  }
}

AnalystReports.propTypes = {
  values: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  setFieldValue: PropTypes.func,
  getAllAnalysts: PropTypes.func,
  arrayAnalysts: PropTypes.array,
  openModal: PropTypes.func,
  getAnalystReport: PropTypes.func,
  arrayBusinesses: PropTypes.array,
  isLoadingReports: PropTypes.bool,
  match: PropTypes.func,
  getQtdeBusinessesStagePerUser: PropTypes.func,
  qtdeBusinesses: PropTypes.object,
  keepAnalystParams: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    analyst: props.keepAnalystParams ? props.keepAnalystParams.analystId : '',
    dateFrom: props.keepAnalystParams ? moment(new Date(props.keepAnalystParams.dateFrom)) : moment().startOf('month'),
    dateTo: props.keepAnalystParams ? moment(new Date(props.keepAnalystParams.dateTo)) : moment()
  }
}

const mapStateToProps = state => ({
  arrayAnalysts: state.reportsCtc.getAllAnalysts.array,
  arrayBusinesses: state.reportsCtc.getAnalystReports.array,
  isLoadingReports: state.reportsCtc.getAnalystReports.isLoading,
  qtdeBusinesses: state.reportsCtc.getQtdeBusinessesStagePerUser.qtde,
  keepAnalystParams: state.reportsCtc.keepAnalystParams
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllAnalysts,
      openModal,
      getAnalystReport,
      getQtdeBusinessesStagePerUser
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(AnalystReports)
)
