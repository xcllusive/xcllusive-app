import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import _ from 'lodash'
import { Grid, Form, Button, Segment } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { activityRequestControlPerUser } from '../../../redux/ducks/reports'
import { getBrokersPerRegion, setBrokerAccountName } from '../../../redux/ducks/broker'
import { mapArrayToValuesForDropdown } from '../../../utils/sharedFunctionArray'
import { getUserLogged } from '../../../redux/ducks/user'
import { getOfficeRegister } from '../../../redux/ducks/officeRegister'
import { BarChart, Bar, XAxis, Tooltip, CartesianGrid, YAxis, Legend } from 'recharts'

class DailyActivityReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      listOfIdOfAnalysts: []
    }
  }

  async componentDidMount () {
    if (!this.props.keepActivityRequestRecords) {
      await this.props.getOfficeRegister()
      await this.props.getUserLogged()
    } else {
      // this.setState({ data: this.props.keepActivityRequestRecords.dataGraph })
    }

    const officeOfUserLogged = _.find(this.props.officeOptions, o => o.id === this.props.user.officeId)
    if (!this.props.user.levelOfInfoAccess) {
      this.props.setFieldValue('officeRegion', officeOfUserLogged.id)
      this.props.getBrokersPerRegion(officeOfUserLogged.id)
    }
    this.props.brokerAccountNameRestored &&
      this.props.setFieldValue('brokerAccountName', this.props.brokerAccountNameRestored)
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

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)

    if (name === 'officeRegion') {
      this.props.getBrokersPerRegion(value)
    }
    if (name === 'brokerAccountName') {
      this.props.setBrokerAccountName(value)
    }
  }

  _confirmReports = async (officeId, userIdSelected, dateFrom, dateTo, dataGraph) => {
    console.log(dataGraph)
    await this.props.activityRequestControlPerUser(
      officeId,
      userIdSelected,
      moment(dateFrom).format('YYYY/MM/DD'),
      moment(dateTo).format('YYYY/MM/DD'),
      dataGraph
    )

    this.setState({
      data: this.props.arrayUserControlActivity
    })
  }

  _handleBarClick = () => {
    console.log('test')
  }

  render () {
    const { values, arrayUserControlActivity, officeOptions, user, isLoadingBroker, brokersPerRegion } = this.props
    return (
      <Wrapper>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Form.Group>
                  <Form.Field
                    style={{
                      marginTop: '5px'
                    }}
                  >
                    <Form.Select
                      label="Select One Office"
                      name="officeRegion"
                      options={mapArrayToValuesForDropdown(officeOptions)}
                      value={values.officeRegion}
                      onChange={this._handleSelectChange}
                      disabled={user && !user.levelOfInfoAccess}
                    />
                  </Form.Field>
                  {brokersPerRegion.length > 0 ? (
                    <Form.Field
                      style={{
                        marginTop: '5px'
                      }}
                    >
                      <Form.Select
                        label="Select One User"
                        options={brokersPerRegion}
                        name="brokerAccountName"
                        autoComplete="brokerAccountName"
                        value={values.brokerAccountName}
                        onChange={this._handleSelectChange}
                        loading={isLoadingBroker}
                      />
                    </Form.Field>
                  ) : null}
                  {values.brokerAccountName > 0 ? (
                    <Fragment>
                      <Form.Field>
                        <label
                          style={{
                            marginTop: '5px',
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
                            marginTop: '5px',
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
                      <Form.Field style={{ marginTop: '30px' }}>
                        <Button
                          positive
                          icon="checkmark"
                          labelPosition="right"
                          content="Confirm"
                          onClick={() =>
                            this._confirmReports(
                              values.officeRegion,
                              values.brokerAccountName,
                              values.dateFrom,
                              values.dateTo,
                              this.state.data
                            )
                          }
                        />
                      </Form.Field>
                    </Fragment>
                  ) : null}
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        <Segment style={{ paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' }} size="small">
          <Grid>
            {arrayUserControlActivity ? (
              <BarChart
                width={600}
                height={300}
                data={this.state.data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateCreated" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalRequests" stackId="a" fill="#8884d8" onClick={this._handleBarClick} />
              </BarChart>
            ) : null}
          </Grid>
        </Segment>
      </Wrapper>
    )
  }
}

DailyActivityReports.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  activityRequestControlPerUser: PropTypes.func,
  arrayUserControlActivity: PropTypes.array,
  getBrokersPerRegion: PropTypes.func,
  getUserLogged: PropTypes.func,
  getOfficeRegister: PropTypes.func,
  officeOptions: PropTypes.array,
  user: PropTypes.object,
  brokersPerRegion: PropTypes.array,
  brokerAccountNameRestored: PropTypes.number,
  isLoadingBroker: PropTypes.bool,
  setBrokerAccountName: PropTypes.func,
  keepActivityRequestRecords: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    officeRegion: props.keepActivityRequestRecords ? props.keepActivityRequestRecords.officeId : '',
    brokerAccountName: props.keepActivityRequestRecords ? props.keepActivityRequestRecords.brokerAccountName : '',
    dateFrom: props.keepActivityRequestRecords
      ? moment(new Date(props.keepActivityRequestRecords.dateFrom))
      : moment().startOf('month'),
    dateTo: props.keepActivityRequestRecords ? moment(new Date(props.keepActivityRequestRecords.dateTo)) : moment(),
    dataGraph: props.keepActivityRequestRecords ? props.keepActivityRequestRecords.dataGraph : ''
  }
}

const mapStateToProps = state => ({
  arrayUserControlActivity: state.reports.getActivityRequestControl.object,
  officeOptions: state.officeRegister.get.array,
  brokerAccountNameRestored: state.broker.brokerAccountName,
  isLoadingBroker: state.broker.getBrokersPerRegion.isLoading,
  brokersPerRegion: state.broker.getBrokersPerRegion.array,
  user: state.user.getLogged.object,
  keepActivityRequestRecords: state.reports.keepActivityRequestRecords
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getBrokersPerRegion, activityRequestControlPerUser, getUserLogged, getOfficeRegister, setBrokerAccountName },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(DailyActivityReports)
)
