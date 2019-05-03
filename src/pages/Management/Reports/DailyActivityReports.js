import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import _ from 'lodash'
import { Grid, Form, Button, Segment, Statistic, Header, Divider } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import {
  activityRequestControlPerUser,
  keepActivityRequestControlPerUser,
  getUsersPerRegion,
  setUserAccountName
} from '../../../redux/ducks/reports'
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
      this.setState({ data: this.props.keepActivityRequestRecords.dataGraph })
    }

    const officeOfUserLogged = _.find(this.props.officeOptions, o => o.id === this.props.user.officeId)
    if (!this.props.user.levelOfInfoAccess) {
      this.props.setFieldValue('officeRegion', officeOfUserLogged.id)
      this.props.getUsersPerRegion(officeOfUserLogged.id)
    }
    this.props.userAccountNameRestored &&
      this.props.setFieldValue('userAccountName', this.props.userAccountNameRestored)
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
      this.props.getUsersPerRegion(value)
    }
    if (name === 'userAccountName') {
      this.props.setUserAccountName(value)
    }
  }

  _confirmReports = async (officeId, userIdSelected, dateFrom, dateTo) => {
    await this.props.activityRequestControlPerUser(
      officeId,
      userIdSelected,
      moment(dateFrom).format('YYYY/MM/DD'),
      moment(dateTo).format('YYYY/MM/DD')
    )

    await this.setState({
      data: this.props.arrayUserControlActivity
    })

    this.props.keepActivityRequestControlPerUser(officeId, userIdSelected, dateFrom, dateTo, this.state.data)
  }

  _handleBarClick = e => {
    console.log('test')
  }

  render () {
    const {
      values,
      arrayUserControlActivity,
      officeOptions,
      user,
      isLoadingUser,
      usersPerRegion,
      maxTotalsPerDate,
      minTotalsPerDate,
      avgTotalsPerDate,
      maxTotalsAnalystsPerDate,
      avgTotalsAnalystsPerDate,
      maxTotalsBrokersPerDate,
      avgTotalsBrokersPerDate
    } = this.props
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
                  {usersPerRegion.length > 0 ? (
                    <Form.Field
                      style={{
                        marginTop: '5px'
                      }}
                    >
                      <Form.Select
                        label="Select One User"
                        options={usersPerRegion}
                        name="userAccountName"
                        autoComplete="userAccountName"
                        value={values.userAccountName}
                        onChange={this._handleSelectChange}
                        loading={isLoadingUser}
                      />
                    </Form.Field>
                  ) : null}
                  {values.userAccountName > 0 ? (
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
                              values.userAccountName,
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
        {this.state.data.length > 0 ? (
          <Segment
            style={{ background: 'rgba(185, 189, 193, 0.11)', paddingLeft: '0px', paddingRight: '0px' }}
            textAlign="center"
            size="small"
          >
            {arrayUserControlActivity ? (
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column style={{ marginTop: '10px' }} width={16}>
                          <Statistic.Group size="small" color="blue" widths={3}>
                            <Statistic>
                              <Statistic.Value>{maxTotalsPerDate}</Statistic.Value>
                              <Statistic.Label>Most</Statistic.Label>
                            </Statistic>
                            <Statistic>
                              <Statistic.Value>{minTotalsPerDate}</Statistic.Value>
                              <Statistic.Label>Least</Statistic.Label>
                            </Statistic>
                            <Statistic>
                              <Statistic.Value>{avgTotalsPerDate}</Statistic.Value>
                              <Statistic.Label>Average</Statistic.Label>
                            </Statistic>
                          </Statistic.Group>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <BarChart
                            width={800}
                            height={400}
                            data={this.state.data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="dateCreated" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalRequests" fill="#5584d5" onClick={this._handleBarClick} />
                          </BarChart>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column style={{ marginLeft: '100px' }} width={5}>
                    <Header color="red">All Users</Header>
                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <Divider horizontal>Analysts</Divider>
                          <Statistic.Group size="mini" color="green" widths={2}>
                            <Statistic>
                              <Statistic.Value>{maxTotalsAnalystsPerDate}</Statistic.Value>
                              <Statistic.Label>Most</Statistic.Label>
                            </Statistic>
                            <Statistic>
                              <Statistic.Value>{avgTotalsAnalystsPerDate}</Statistic.Value>
                              <Statistic.Label>Average</Statistic.Label>
                            </Statistic>
                          </Statistic.Group>
                        </Grid.Column>
                        <Grid.Column>
                          <Divider horizontal>Brokers</Divider>
                          <Statistic.Group size="mini" color="green" widths={2}>
                            <Statistic>
                              <Statistic.Value>{maxTotalsBrokersPerDate}</Statistic.Value>
                              <Statistic.Label>Most</Statistic.Label>
                            </Statistic>
                            <Statistic>
                              <Statistic.Value>{avgTotalsBrokersPerDate}</Statistic.Value>
                              <Statistic.Label>Average</Statistic.Label>
                            </Statistic>
                          </Statistic.Group>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : null}
          </Segment>
        ) : null}
      </Wrapper>
    )
  }
}

DailyActivityReports.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  activityRequestControlPerUser: PropTypes.func,
  arrayUserControlActivity: PropTypes.array,
  getUsersPerRegion: PropTypes.func,
  getUserLogged: PropTypes.func,
  getOfficeRegister: PropTypes.func,
  officeOptions: PropTypes.array,
  user: PropTypes.object,
  usersPerRegion: PropTypes.array,
  userAccountNameRestored: PropTypes.number,
  isLoadingUser: PropTypes.bool,
  setUserAccountName: PropTypes.func,
  keepActivityRequestRecords: PropTypes.object,
  keepActivityRequestControlPerUser: PropTypes.func,
  maxTotalsPerDate: PropTypes.number,
  minTotalsPerDate: PropTypes.number,
  avgTotalsPerDate: PropTypes.number,
  maxTotalsAnalystsPerDate: PropTypes.number,
  avgTotalsAnalystsPerDate: PropTypes.number,
  maxTotalsBrokersPerDate: PropTypes.number,
  avgTotalsBrokersPerDate: PropTypes.number
}

const mapPropsToValues = props => {
  return {
    officeRegion: props.keepActivityRequestRecords ? props.keepActivityRequestRecords.officeId : '',
    userAccountName: props.keepActivityRequestRecords ? props.keepActivityRequestRecords.userAccountName : '',
    dateFrom: props.keepActivityRequestRecords
      ? moment(new Date(props.keepActivityRequestRecords.dateFrom))
      : moment().startOf('month'),
    dateTo: props.keepActivityRequestRecords ? moment(new Date(props.keepActivityRequestRecords.dateTo)) : moment(),
    dataGraph: props.keepActivityRequestRecords ? props.keepActivityRequestRecords.dataGraph : ''
  }
}

const mapStateToProps = state => ({
  arrayUserControlActivity: state.reports.getActivityRequestControl.array,
  maxTotalsPerDate: state.reports.getActivityRequestControl.maxTotalsPerDate,
  minTotalsPerDate: state.reports.getActivityRequestControl.minTotalsPerDate,
  avgTotalsPerDate: state.reports.getActivityRequestControl.avgTotalsPerDate,
  maxTotalsAnalystsPerDate: state.reports.getActivityRequestControl.maxTotalsAnalystsPerDate,
  avgTotalsAnalystsPerDate: state.reports.getActivityRequestControl.avgTotalsAnalystsPerDate,
  maxTotalsBrokersPerDate: state.reports.getActivityRequestControl.maxTotalsBrokersPerDate,
  avgTotalsBrokersPerDate: state.reports.getActivityRequestControl.avgTotalsBrokersPerDate,
  officeOptions: state.officeRegister.get.array,
  userAccountNameRestored: state.reports.userAccountName,
  isLoadingUser: state.reports.getUsersPerRegion.isLoading,
  usersPerRegion: state.reports.getUsersPerRegion.array,
  user: state.user.getLogged.object,
  keepActivityRequestRecords: state.reports.keepActivityRequestRecords
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsersPerRegion,
      activityRequestControlPerUser,
      getUserLogged,
      getOfficeRegister,
      setUserAccountName,
      keepActivityRequestControlPerUser
    },
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
