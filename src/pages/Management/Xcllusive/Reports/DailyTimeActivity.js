import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import Wrapper from '../../../../components/content/Wrapper'
import { Header, Grid, Button, Icon, Segment } from 'semantic-ui-react'
import { getDailyTimeActivityReport } from '../../../../redux/ducks/reports'
import moment from 'moment'
import { BarChart, Bar, XAxis, Tooltip, CartesianGrid, YAxis, Legend } from 'recharts'

class DailyTimeActivityReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      dateFormatted: null
    }
  }

  async componentDidMount () {
    await this.props.getDailyTimeActivityReport(
      this.props.location.state.data.userId_logged,
      this.props.location.state.data.dateCreated
    )
    const date = moment(this.props.location.state.data.dateCreated).format('YYYY-DD-MM')
    this.setState({ dateFormatted: date })
  }

  _backToWeeklyReport () {
    this.props.history.goBack()
  }

  render () {
    const { arrayDailyTimeReport, userAnalised } = this.props
    const { data } = this.props.location.state
    return (
      <Wrapper>
        <Header style={{ marginTop: '10px' }} textAlign="center">
          Daily Time Activity Report
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column floated="left">
              <Header>
                <Button size="small" color="green" onClick={() => this._backToWeeklyReport()}>
                  <Icon name="backward" />
                  Back to Weekly Report
                </Button>
              </Header>
            </Grid.Column>
          </Grid.Row>
          {arrayDailyTimeReport.length > 0 ? (
            <Grid.Row>
              <Grid.Column>
                <Segment
                  style={{ background: 'rgba(185, 189, 193, 0.11)', paddingLeft: '0px', paddingRight: '0px' }}
                  textAlign="center"
                  size="small"
                >
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Header as="h2">{`${userAnalised.firstName} ${userAnalised.lastName}`}</Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header as="h2">{`${data.dateCreated} - ${moment(this.state.dateFormatted).format(
                          'dddd'
                        )}`}</Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <BarChart
                          width={1000}
                          height={500}
                          data={arrayDailyTimeReport}
                          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="activity" fill="#5584d5" onClick={this._handleBarClick} />
                        </BarChart>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          ) : null}
        </Grid>
      </Wrapper>
    )
  }
}

DailyTimeActivityReports.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  getDailyTimeActivityReport: PropTypes.func,
  arrayDailyTimeReport: PropTypes.array,
  userAnalised: PropTypes.object
}

const mapPropsToValues = props => {
  return {}
}

const mapStateToProps = state => ({
  arrayDailyTimeReport: state.reports.getDailyTimeActivityReport.array,
  userAnalised: state.reports.getDailyTimeActivityReport.user
})

const mapDispatchToProps = dispatch => bindActionCreators({ getDailyTimeActivityReport }, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(DailyTimeActivityReports)
)
