import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Button, Header, Segment, Radio } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import { exportBuyers } from '../../../redux/ducks/systemSettings'
import Wrapper from '../../../components/content/Wrapper'
import moment from 'moment'

class Buyers extends Component {
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

  _exportBuyers = values => {
    this.props.exportBuyers(
      moment(values.dateFrom).format('YYYY-MM-DD 00:00:00'),
      moment(values.dateTo).format('YYYY-MM-DD 23:59:59'),
      values.company
    )
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const { values, isLoading } = this.props
    return (
      <Wrapper>
        <Segment>
          <Header textAlign="center" color="red">
            Exporting Buyers
          </Header>
          <Form>
            <Grid>
              <Grid.Row style={{ paddingBottom: '0px' }}>
                <Grid.Column>
                  <Form.Group>
                    <Form.Field
                      control={Radio}
                      label="Xcllusive Businesses"
                      name="company"
                      onChange={this._handleChangeCheckBox}
                      checked={values.company}
                    />
                    <Form.Field
                      control={Radio}
                      label="CTC Businesses"
                      name="company"
                      onChange={this._handleChangeCheckBox}
                      checked={!values.company}
                    />
                  </Form.Group>
                  <Form.Group>
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
                      <DatePicker selected={values.dateFrom} onChange={this._handleDateFromChange} />
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
                      <DatePicker selected={values.dateTo} onChange={this._handleDateToChange} />
                    </Form.Field>
                    <Form.Field style={{ marginTop: '25px' }}>
                      <Button
                        positive
                        icon="checkmark"
                        labelPosition="right"
                        loading={isLoading}
                        content="Export"
                        onClick={() => this._exportBuyers(values)}
                      />
                    </Form.Field>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </Wrapper>
    )
  }
}

Buyers.propTypes = {
  values: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  setFieldValue: PropTypes.func,
  openModal: PropTypes.func,
  match: PropTypes.func,
  exportBuyers: PropTypes.func,
  isLoading: PropTypes.bool
}

const mapPropsToValues = props => {
  return {
    dateFrom: moment().startOf('month'),
    dateTo: moment(),
    company: true
  }
}

const mapStateToProps = state => ({
  isLoading: state.systemSettings.exportBuyers.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      exportBuyers
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(Buyers)
)
