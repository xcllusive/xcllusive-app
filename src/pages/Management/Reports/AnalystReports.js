import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'
import { getAllAnalysts, getAnalystReport } from '../../../redux/ducks/reports'
import moment from 'moment'

class AnalystReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isGotUser: true
    }
  }
  componentDidMount () {
    this.props.getAllAnalysts()
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

  _confirmReports = values => {
    console.log(values)
    this.props.getAnalystReport(
      values.analyst,
      moment(values.dateFrom).format('YYYY/MM/DD'),
      moment(values.dateTo).format('YYYY/MM/DD')
    )
  }

  render () {
    const { values, arrayAnalysts } = this.props
    return (
      <Wrapper>
        <Form>
          <Grid>
            <Grid.Row style={{ paddingBottom: '0px' }} columns={2}>
              <Grid.Column>
                <Form.Group>
                  <Form.Field>
                    <Form.Select
                      required
                      label="Select One Analyst"
                      name="analyst"
                      options={arrayAnalysts}
                      value={values.analyst}
                      onChange={this._handleSelectChange}
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
                          onClick={() => this._confirmReports(values)}
                        />
                      </Form.Field>
                    </Fragment>
                  ) : null}
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        {/* <Dimmer.Dimmable dimmed={isLoadingReports} style={{ height: '80vh' }}>
          <Dimmer inverted active={isLoadingReports}>
            <Loader>Loading</Loader>
          </Dimmer>
        </Dimmer.Dimmable> */}
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
  getAnalystReport: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    analyst: '',
    dateFrom: moment().startOf('month'),
    dateTo: moment()
  }
}

const mapStateToProps = state => ({
  arrayAnalysts: state.reports.getAllAnalysts.array
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllAnalysts,
      openModal,
      getAnalystReport
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
