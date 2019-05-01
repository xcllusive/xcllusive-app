import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Button } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { activityRequestControl } from '../../../redux/ducks/reports'

class DailyActivityReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listOfIdOfAnalysts: []
    }
  }

  componentDidMount = () => {}

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

  _confirmReports = (dateFrom, dateTo) => {
    this.props.activityRequestControl(moment(dateFrom).format('YYYY/MM/DD'), moment(dateTo).format('YYYY/MM/DD'))
  }

  render () {
    const { values } = this.props
    return (
      <Wrapper>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Form.Group style={{ marginLeft: '20px' }}>
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
                      onClick={() => this._confirmReports(values.dateFrom, values.dateTo)}
                    />
                  </Form.Field>
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Wrapper>
    )
  }
}

DailyActivityReports.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  activityRequestControl: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    dateFrom: props.savedRecords ? moment(new Date(props.savedRecords.dateFrom)) : moment().startOf('month'),
    dateTo: props.savedRecords ? moment(new Date(props.savedRecords.dateTo)) : moment()
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({ activityRequestControl }, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(DailyActivityReports)
)
