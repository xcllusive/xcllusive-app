import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Table, Segment } from 'semantic-ui-react'
import moment from 'moment'
import { openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'
import { getBrokersPerRegion, getBusinessesPerBroker } from '../../../redux/ducks/broker'

class BrokersWeeklyReports extends Component {
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
  componentDidMount () {}

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    if (name === 'dataRegion') {
      this.props.getBrokersPerRegion(value)
    }
    if (name === 'brokerAccountName') {
      this.props.getBusinessesPerBroker(value)
    }
  }

  _diffDays = date => {
    return moment().diff(date, 'day')
  }

  render () {
    const { values, brokersPerRegion, isLoadingBroker, businessesAndReport } = this.props
    const { dataRegion } = this.state
    return (
      <Wrapper>
        <Form>
          <Form.Group>
            <Form.Field>
              <Form.Select
                required
                label="Select One Region"
                name="dataRegion"
                options={dataRegion}
                value={values.dataRegion}
                onChange={this._handleSelectChange}
              />
            </Form.Field>
            {brokersPerRegion.length > 0 ? (
              <Form.Field>
                <Form.Select
                  required
                  label="Select One Broker"
                  options={brokersPerRegion}
                  name="brokerAccountName"
                  autoComplete="brokerAccountName"
                  value={values.brokerAccountName}
                  onChange={this._handleSelectChange}
                  loading={isLoadingBroker}
                />
              </Form.Field>
            ) : null}
          </Form.Group>
        </Form>
        {businessesAndReport.length > 0 ? (
          <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
                <Grid.Column
                  style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                >
                  <Table celled striped selectable compact size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Business Name</Table.HeaderCell>
                        <Table.HeaderCell>Text</Table.HeaderCell>
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {businessesAndReport.map(businessReport => {
                        return (
                          <Table.Row key={businessReport.business.id}>
                            <Table.Cell verticalAlign="top" width={2}>
                              <b>{businessReport.business.businessName}</b>
                            </Table.Cell>
                            <Table.Cell verticalAlign="top" width={7}>
                              {businessReport.reports ? businessReport.reports.text : ''}
                            </Table.Cell>
                            {/* <Table.Cell width={2}>
                              {businessReport.business.daysOnTheMarket
                                ? this._diffDays(businessReport.business.daysOnTheMarket)
                                : '-'}
                            </Table.Cell> */}
                            <Table.Cell width={4}>
                              <Grid celled="internally">
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    <b>Days On The Market:</b>
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                    {businessReport.business.daysOnTheMarket
                                      ? this._diffDays(businessReport.business.daysOnTheMarket)
                                      : '-'}
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    <b>No. of Enquiries:</b>
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                    52
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    <b>No. of Enquiries, 7 days:</b>
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                    45
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    <b>120 Guaranty</b>
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                    Yes
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    <b>No. of Pending Tasks</b>
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                    35
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={8}>
                                    <b>No. of New Logs</b>
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingBottom: '0px', paddingTop: '0px' }} width={5}>
                                    70
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Table.Cell>
                          </Table.Row>
                        )
                      })}
                    </Table.Body>
                  </Table>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        ) : null}
      </Wrapper>
    )
  }
}

BrokersWeeklyReports.propTypes = {
  values: PropTypes.object,
  openModal: PropTypes.func,
  setFieldValue: PropTypes.func,
  getBrokersPerRegion: PropTypes.func,
  brokersPerRegion: PropTypes.array,
  isLoadingBroker: PropTypes.bool,
  getBusinessesPerBroker: PropTypes.func,
  businessesAndReport: PropTypes.array
}

const mapPropsToValues = props => {
  return {
    dataRegion: '',
    brokerAccountName: 0
  }
}

const mapStateToProps = state => ({
  brokersPerRegion: state.broker.getBrokersPerRegion.array,
  isLoadingBroker: state.broker.getBrokersPerRegion.isLoading,
  businessesAndReport: state.broker.getBusinessesPerBroker.businessesAndReport
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getBrokersPerRegion,
      getBusinessesPerBroker
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(BrokersWeeklyReports)
)
