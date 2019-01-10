import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label, Grid } from 'semantic-ui-react'
import * as Yup from 'yup'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { closeModal } from '../../redux/ducks/modal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { getLastWeeklyReport, createWeeklyReport, updateWeeklyReport } from '../../redux/ducks/broker'
import numeral from 'numeral'

class ModalBrokersWeeklyReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modules: {
        toolbar: [[{}], ['', '', '', '', ''], [{}, {}, {}, {}], ['', ''], ['']]
      },
      formats: ['', '', '', '', '', '', '', '', '', '', ''],
      stage: [
        { key: 1, text: 'Info Memorandum', value: 'Info Memorandum' },
        { key: 2, text: 'On The Market', value: 'On The Market' },
        { key: 3, text: 'Under Offer', value: 'Under Offer' },
        { key: 4, text: 'Exchanged', value: 'Exchanged' },
        { key: 5, text: 'Withdrawn', value: 'Withdrawn' },
        { key: 6, text: 'Sold', value: 'Sold' }
      ],
      expectedPrice: 0,
      exchanged: false
    }
    this.quillRef = null
    this.reactQuillRef = null
  }
  componentDidMount () {
    this.props.getLastWeeklyReport(this.props.business.id)
    this._attachQuillRefs()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.lastWeeklyReport && nextProps.lastWeeklyReport.expectedPrice !== prevState.expectedPrice) {
      var expectedPrice = numeral(nextProps.values.expectedPrice).format('$0,0.[99]')
    }
    if (nextProps.lastWeeklyReport && nextProps.lastWeeklyReport.commissionPrice !== prevState.commissionPrice) {
      var commissionPrice = numeral(nextProps.values.commissionPrice).format('$0,0.[99]')
    }
    return {
      expectedPrice: expectedPrice || prevState.expectedPrice,
      commissionPrice: commissionPrice || prevState.commissionPrice
    }
  }

  _numberFormat = (e, { name, value }) => {
    const myNumeral = numeral(value)
    const numberFormated = myNumeral.format('$0,0.[99]')
    this.props.setFieldValue(name, myNumeral.value())
    this.setState({ [name]: numberFormated })
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    if (value === 'Exchanged') {
      this.setState({ exchanged: true })
      if (this.props.lastWeeklyReport && !moment(this.props.lastWeeklyReport.expectedSettlementDate).isValid()) {
        this.props.setFieldValue('expectedSettlementDate', null)
      }
    } else {
      this.setState({ exchanged: false })
      this.props.setFieldValue('expectedSettlementDate', null)
    }
  }

  _handleDateChange = date => {
    this.props.setFieldValue('expectedSettlementDate', date)
  }

  _handleChangeRadio = (e, { value }) => {
    this.props.setFieldValue('progressDiscussion', value)
    if (value === 'Yes') {
      this.props.setFieldValue('progressDiscussionYes', value)
    } else {
      this.props.setFieldValue('progressDiscussionNo', value)
    }
  }

  _convertHtmlToRightText = html => {
    let htmlConverted = html.replace(/<style([\s\S]*?)<\/style>/gi, '')
    htmlConverted = htmlConverted.replace(/<script([\s\S]*?)<\/script>/gi, '')
    htmlConverted = htmlConverted.replace(/<\/div>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<\/li>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<li>/gi, '  *  ')
    htmlConverted = htmlConverted.replace(/<\/ul>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<\/p>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<br\s*[\\/]?>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<[^>]+>/gi, '')
    htmlConverted = htmlConverted.replace(/<p>/gi, '')
    htmlConverted = htmlConverted.replace(/<\/p>/gi, '')

    return encodeURIComponent(htmlConverted)
  }

  _handleConfirm = async isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    // this.props.values.text = this._convertHtmlToRightText(this.props.values.text)
    if (this.props.lastWeeklyReport) {
      const comparingDate = moment().diff(this.props.lastWeeklyReport.dateTimeCreated, 'day')
      if (comparingDate >= 3 || this.props.lastWeeklyReport.stage === '') {
        await this.props.createWeeklyReport(this.props.values)
      } else {
        await this.props.updateWeeklyReport(this.props.values)
      }
      this.props.closeModal()
    } else {
      await this.props.createWeeklyReport(this.props.values)
      this.props.closeModal()
    }
  }

  _attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (!this.reactQuillRef || typeof this.reactQuillRef.getEditor !== 'function') {
      return false
    }
    // Skip if Quill reference is defined:
    if (this.quillRef !== null) return false

    const quillRef = this.reactQuillRef.getEditor()
    if (quillRef !== null) this.quillRef = quillRef
  }

  _handleChangeBody = value => {
    this.props.setFieldValue('text', value)
  }

  render () {
    const {
      values,
      handleBlur,
      errors,
      touched,
      isSubmitting,
      isValid,
      isLoading,
      title,
      closeModal,
      handleChange
    } = this.props
    console.log(this.props.values)
    return (
      <Modal open dimmer={'blurring'} onClose={() => this._handleConfirm(false)}>
        <Modal.Header align="center">{title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column textAlign="right">
                  <label
                    style={{
                      marginRight: '148px',
                      fontSize: '.92857143em',
                      color: 'rgba(0,0,0,.87)',
                      fontWeight: '700'
                    }}
                  >
                    Date
                  </label>
                  <Form.Field>
                    <DatePicker disabled={true} selected={values.dateTimeCreated} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/* <Form.Group>
              <h5 style={{ fontSize: '.92857143em', paddingLeft: '8px' }}>Text (max. 400 characters)</h5>
            </Form.Group> */}
            <Form.Group widths="equal">
              <Form.Field>
                <Form.TextArea
                  label="Text"
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // spellCheck
                />
              </Form.Field>
              {/* <Form.Field style={{ height: '20vh' }}>
                <ReactQuill
                  ref={el => {
                    this.reactQuillRef = el
                  }}
                  value={values.text}
                  onChange={this._handleChangeBody}
                  style={{ height: '80%' }}
                  modules={this.state.modules}
                  formats={this.state.formats}
                />
              </Form.Field> */}
            </Form.Group>
            <Form.Group style={{ marginBottom: '0px', marginLeft: '2px' }}>
              <b>Have you had a business selling progress discussion with the vendor in the last 7 days? </b>
            </Form.Group>
            <Form.Group style={{ marginTop: '5px', marginBottom: '0px' }}>
              <Form.Radio
                label="Yes"
                value={values.progressDiscussionYes === '' ? 'Yes' : values.progressDiscussionYes}
                checked={values.progressDiscussion === 'Yes'}
                onChange={this._handleChangeRadio}
              />
            </Form.Group>
            <Form.Group>
              <Form.Radio
                label="No"
                value={values.progressDiscussionNo === '' ? 'No' : values.progressDiscussionNo}
                checked={values.progressDiscussion === 'No'}
                onChange={this._handleChangeRadio}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  label="Stage"
                  name="stage"
                  options={this.state.stage}
                  value={values.stage}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              {this.state.exchanged ||
              (this.props.lastWeeklyReport &&
                this.props.lastWeeklyReport.stage === 'Exchanged' &&
                moment().diff(this.props.lastWeeklyReport.dateTimeCreated, 'day') <= 3) ? (
                  <Fragment>
                    <Form.Field>
                      <Form.Input
                        label="Expected Price"
                        name="expectedPrice"
                        autoComplete="expectedPrice"
                        value={this.state.expectedPrice}
                        onChange={this._numberFormat}
                        onBlur={handleBlur}
                      />
                      {errors.expectedPrice && touched.expectedPrice && (
                        <Label basic color="red" pointing content={errors.expectedPrice} />
                      )}
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        label="Expected Commission"
                        name="expectedCommission"
                        autoComplete="expectedCommission"
                        value={this.state.expectedCommission}
                        onChange={this._numberFormat}
                        onBlur={handleBlur}
                      />
                      {errors.expectedCommission && touched.expectedCommission && (
                        <Label basic color="red" pointing content={errors.expectedCommission} />
                      )}
                    </Form.Field>
                    <Form.Field>
                      <label
                        style={{
                          marginRight: '78px',
                          fontSize: '.92857143em',
                          color: 'rgba(0,0,0,.87)',
                          fontWeight: '700'
                        }}
                      >
                      Expected Settlement Date
                      </label>
                      <DatePicker
                        style={{ marginTop: '5px' }}
                        selected={values.expectedSettlementDate}
                        onChange={this._handleDateChange}
                      />
                    </Form.Field>
                  </Fragment>
                ) : null}
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
          <Button
            color="green"
            type="submit"
            disabled={
              isSubmitting || !isValid || (values.progressDiscussion !== 'Yes' && values.progressDiscussion !== 'No')
            }
            loading={isLoading}
            onClick={this._handleConfirm}
          >
            <Icon name="save" />
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalBrokersWeeklyReport.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  title: PropTypes.string,
  business: PropTypes.object,
  closeModal: PropTypes.func,
  getLastWeeklyReport: PropTypes.func,
  lastWeeklyReport: PropTypes.object,
  createWeeklyReport: PropTypes.func,
  updateWeeklyReport: PropTypes.func
}

const mapPropsToValues = props => {
  if (props.lastWeeklyReport) {
    const comparingDate = moment().diff(props.lastWeeklyReport.dateTimeCreated, 'day')
    if (comparingDate >= 3 || props.lastWeeklyReport.stage === '') {
      return {
        id: null,
        business_id: props.business.id,
        dateTimeCreated: moment(),
        text: '',
        expectedPrice: 0,
        expectedCommission: 0,
        expectedSettlementDate: null,
        stage: ''
      }
    }
  }

  return {
    id: props.lastWeeklyReport ? props.lastWeeklyReport.id : null,
    business_id: props.business.id,
    dateTimeCreated: props.lastWeeklyReport ? moment(props.lastWeeklyReport.dateTimeCreated) : moment(),
    text: props.lastWeeklyReport ? props.lastWeeklyReport.text : '',
    expectedPrice: props.lastWeeklyReport ? props.lastWeeklyReport.expectedPrice : 0,
    expectedCommission: props.lastWeeklyReport ? props.lastWeeklyReport.expectedCommission : 0,
    expectedSettlementDate: props.lastWeeklyReport ? moment(props.lastWeeklyReport.expectedSettlementDate) : null,
    stage: props.lastWeeklyReport ? props.lastWeeklyReport.stage : '',
    progressDiscussionYes:
      props.lastWeeklyReport && props.lastWeeklyReport.progressDiscussion === 'Yes'
        ? props.lastWeeklyReport.progressDiscussion
        : '',
    progressDiscussionNo:
      props.lastWeeklyReport && props.lastWeeklyReport.progressDiscussion === 'No'
        ? props.lastWeeklyReport.progressDiscussion
        : '',
    progressDiscussion: props.lastWeeklyReport ? props.lastWeeklyReport.progressDiscussion : ''
  }
}

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required('Text is required.')
    .max(400, 'Text require max 400 characters.'),
  stage: Yup.string().required()
})

const mapStateToProps = state => ({
  isLoading: state.buyer.update.isLoading,
  lastWeeklyReport: state.broker.getLastWeeklyReport.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeModal, getLastWeeklyReport, createWeeklyReport, updateWeeklyReport }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(ModalBrokersWeeklyReport)
)
