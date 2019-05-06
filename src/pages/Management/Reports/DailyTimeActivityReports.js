import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import Wrapper from '../../../components/content/Wrapper'
import { Header, Grid, Button, Icon, Segment } from 'semantic-ui-react'
import { getDailyTimeActivityReport } from '../../../redux/ducks/reports'
// import moment from 'moment'
import { BarChart, Bar, XAxis, Tooltip, CartesianGrid, YAxis, Legend } from 'recharts'

class DailyTimeActivityReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  async componentDidMount () {
    await this.props.getDailyTimeActivityReport(
      this.props.location.state.data.userId_logged,
      this.props.location.state.data.dateCreated
    )
  }

  _backToWeeklyReport () {
    this.props.history.goBack()
  }

  render () {
    const { arraydailyTimeReport } = this.props
    // const { data } = this.props.location.state
    console.log(arraydailyTimeReport)
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
          {arraydailyTimeReport.length > 0 ? (
            <Grid.Row>
              <Grid.Column>
                <Segment
                  style={{ background: 'rgba(185, 189, 193, 0.11)', paddingLeft: '0px', paddingRight: '0px' }}
                  textAlign="center"
                  size="small"
                >
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <BarChart
                          width={700}
                          height={400}
                          data={arraydailyTimeReport}
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
  arraydailyTimeReport: PropTypes.array
}

const mapPropsToValues = props => {
  return {}
}

const mapStateToProps = state => ({
  arraydailyTimeReport: state.reports.getDailyTimeActivityReport.array
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
