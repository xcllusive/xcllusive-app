import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import numeral from 'numeral'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import {
  Form,
  Header,
  Grid,
  Segment,
  Button,
  Icon,
  Label,
  Table,
  Message
} from 'semantic-ui-react'

import {
  getInvoiceTemplateState,
  getInvoiceTemplateChangeState
} from '../../../redux/ducks/invoiceTemplates'
import {
  getInvoices,
  getLastInvoice,
  createInvoice,
  getInvoice,
  clearInvoice,
  updateInvoice
} from '../../../redux/ducks/invoice'
import { TypesModal, openModal } from '../../../redux/ducks/modal'

import Wrapper from '../../../components/content/Wrapper'
import { theme } from '../../../styles'

class MakeTaxInvoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      state: [
        { key: '1', text: 'ACT', value: 'ACT' },
        { key: '2', text: 'NT', value: 'NT' },
        { key: '3', text: 'NSW', value: 'NSW' },
        { key: '4', text: 'QLD', value: 'QLD' },
        { key: '5', text: 'SA', value: 'SA' },
        { key: '6', text: 'TAS', value: 'TAS' },
        { key: '7', text: 'VIC', value: 'VIC' },
        { key: '8', text: 'WA', value: 'WA' }
      ],
      text: '',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
          ],
          ['link', 'image'],
          ['clean']
        ]
      },
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image'
      ],
      modulesDetails: {
        toolbar: []
      },
      formatsDetails: [],
      newInvoice: false,
      currentInvoice: null
    }
    this.quillRef = null
    this.reactQuillRef = null
  }

  componentDidMount () {
    this.props.getInvoiceTemplateState(this.props.location.state.business.state)
    this.props.getInvoices(this.props.match.params.id)
    this.props.getLastInvoice(this.props.match.params.id)
  }

  componentDidUpdate () {
    this._attachQuillRefs()
  }

  componentWillUnmount () {
    this.props.clearInvoice()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.objectLastInvoice && !prevState.currentInvoice) {
      return {
        currentInvoice: nextProps.objectLastInvoice
      }
    }
    return null
  }

  _attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (
      !this.reactQuillRef ||
      typeof this.reactQuillRef.getEditor !== 'function'
    ) {
      return false
    }
    // Skip if Quill reference is defined:
    if (this.quillRef !== null) return false

    const quillRef = this.reactQuillRef.getEditor()
    if (quillRef !== null) this.quillRef = quillRef
  }

  _handleSelectChange = async (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    await this.props.getInvoiceTemplateChangeState(value)
    await this.props.setFieldValue(
      'officeDetails',
      this.props.objectInvoiceTemplateChangeState
        ? this.props.objectInvoiceTemplateChangeState.officeDetails
        : ''
    )
    await this.props.setFieldValue(
      'bankDetails',
      this.props.objectInvoiceTemplateChangeState
        ? this.props.objectInvoiceTemplateChangeState.bankDetails
        : ''
    )
  }

  _handleChangeDescription = value => {
    this.props.setFieldValue('description', value)
  }

  _calculateTotal = (e, { name, value }) => {
    const total = numeral(
      numeral(value).value() + (numeral(value).value() * 10) / 100
    ).format('0,0.00')

    this.props.setFieldValue(name, value)
    this.props.setFieldValue('total', total)
  }

  _newInvoice = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Tax Invoice',
        text: 'Are you sure you want to make a new invoice?'
      },
      onConfirm: isConfirmed => {
        this.props.setFieldValue('id', null)
        this.props.setFieldValue(
          'officeDetails',
          this.props.objectInvoiceTemplate.officeDetails
        )
        this.props.setFieldValue('ref', '')
        this.props.setFieldValue('date', moment().format('DD/MM/YYYY'))
        this.props.setFieldValue(
          'to',
          `${this.props.location.state.business.businessName} - ${
            this.props.location.state.business.address1
          } - ${this.props.location.state.business.suburb} - ${
            this.props.location.state.business.state
          } - ${this.props.location.state.business.postCode}`
        )
        this.props.setFieldValue(
          'description',
          this.props.objectInvoiceTemplate.description
        )
        this.props.setFieldValue('amount', null)
        this.props.setFieldValue('total', 0.0)
        this.props.setFieldValue(
          'state',
          this.props.location.state.business.state
        )

        this.setState({ newInvoice: true })
      }
    })
  }

  _saveSendInvoice = async () => {
    if (this.state.newInvoice || this.props.listInvoices.length === 0) {
      await this.props.createInvoice(
        this.props.values,
        this.props.location.state.business.id
      )
    } else {
      await this.props.updateInvoice(this.props.values)
    }
    this.props.getInvoices(this.props.match.params.id)

    this.setState({ newInvoice: false })
  }

  _getInvoice = async invoice => {
    await this.props.getInvoice(invoice.id)

    this.setState({ currentInvoice: invoice })
    this.setState({ newInvoice: false })
  }

  render () {
    const {
      values,
      handleBlur,
      handleChange,
      errors,
      touched,
      history,
      objectInvoiceIsLoading,
      listInvoices,
      isCreateLoading,
      isUpdateLoading,
      isValid
    } = this.props
    const { state, currentInvoice, newInvoice } = this.state
    return (
      <Wrapper loading={objectInvoiceIsLoading}>
        <Form>
          <Grid celled="internally" divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h2" content="Tax Invoice" />
                <Segment>
                  <Form.Group widths="equal">
                    <Form.Field style={{ height: '15vh' }}>
                      <ReactQuill
                        readOnly
                        value={values.officeDetails}
                        style={{ height: '12vh' }}
                        modules={this.state.modulesDetails}
                        formats={this.state.formatsDetails}
                      />
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" content="Details" />
                <Segment>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.Input
                        readOnly
                        label="Ref."
                        name="ref"
                        autoComplete="ref"
                        value={values.ref}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.ref &&
                        touched.ref && (
                        <Label
                          basic
                          pointing
                          color="red"
                          content={errors.ref}
                        />
                      )}
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        readOnly
                        label="Date"
                        name="date"
                        autoComplete="date"
                        value={values.dateCreated}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.dateCreated &&
                        touched.dateCreated && (
                        <Label
                          basic
                          pointing
                          color="red"
                          content={errors.dateCreated}
                        />
                      )}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.TextArea
                      // className="editable"
                      label="To"
                      name="to"
                      autoComplete="to"
                      disabled={
                        !!(
                          currentInvoice &&
                          currentInvoice.dateSent &&
                          !newInvoice
                        )
                      }
                      value={values.to}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" content="Description" />
                <Segment>
                  <Form.Group widths="equal">
                    <Form.Field style={{ height: '12vh' }}>
                      <ReactQuill
                        value={values.description}
                        onChange={this._handleChangeDescription}
                        style={{ height: '9vh' }}
                        modules={this.state.modules}
                        formats={this.state.formats}
                        readOnly={
                          !!(
                            currentInvoice &&
                            currentInvoice.dateSent &&
                            !newInvoice
                          )
                        }
                      />
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" content="Values $" />
                <Segment>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.Group>
                        <Form.Field width={6}>
                          <Form.Input
                            label="Amount $"
                            name="amount"
                            autoComplete="amount"
                            value={numeral(values.amount).format('0,0.00')}
                            onChange={this._calculateTotal}
                            onBlur={handleBlur}
                            disabled={
                              !!(
                                currentInvoice &&
                                currentInvoice.dateSent &&
                                !newInvoice
                              )
                            }
                          />
                          {errors.amount &&
                            touched.amount && (
                            <Label
                              basic
                              pointing
                              color="red"
                              content={errors.amount}
                            />
                          )}
                        </Form.Field>
                        <Form.Field width={4}>
                          <Form.Input readOnly label="GST" value={values.gst} />
                        </Form.Field>
                        <Form.Field width={6}>
                          <Form.Input
                            readOnly
                            label="Total $"
                            name="total"
                            autoComplete="total"
                            value={values.total}
                          />
                        </Form.Field>
                      </Form.Group>
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Group>
                  <Form.Field width={8}>
                    <Form.Select
                      label="State"
                      name="state"
                      options={state}
                      autoComplete="state"
                      value={values.state}
                      onChange={this._handleSelectChange}
                      disabled={
                        !!(
                          currentInvoice &&
                          currentInvoice.dateSent &&
                          !newInvoice
                        )
                      }
                    />
                  </Form.Field>
                  <Message info size="small">
                    <p>
                      When you change the state it automatically changes the
                      office and bank details on the invoice.
                    </p>
                  </Message>
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button
                  color={theme.buttonSave}
                  onClick={this._saveSendInvoice}
                  size="small"
                  floated="right"
                  loading={isCreateLoading || isUpdateLoading}
                  disabled={
                    !isValid ||
                    !!(currentInvoice && currentInvoice.dateSent && !newInvoice)
                  }
                >
                  <Icon name="save" />
                  Save and Send
                </Button>
                <Button
                  color={theme.buttonBack}
                  onClick={() =>
                    history.push(
                      `/business/${this.props.location.state.business.id}`
                    )
                  }
                  size="small"
                  floated="left"
                >
                  <Icon name="backward" />
                  Back to Business
                </Button>
                <Button
                  color={theme.buttonNew}
                  size="small"
                  floated="right"
                  onClick={this._newInvoice}
                >
                  <Icon name="add" />
                  New
                </Button>
              </Grid.Column>
            </Grid.Row>
            {listInvoices.length ? (
              <Grid.Row>
                <Table
                  color="blue"
                  celled
                  inverted
                  selectable
                  compact
                  size="small"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Ref.</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                      <Table.HeaderCell>Amount $</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {listInvoices.map(invoices => (
                      <Table.Row
                        active
                        key={invoices.id}
                        onClick={() => this._getInvoice(invoices)}
                      >
                        <Table.Cell>{invoices.ref}</Table.Cell>
                        <Table.Cell>{invoices.description}</Table.Cell>
                        <Table.Cell>
                          {numeral(invoices.amount).format('0,0.00')}
                        </Table.Cell>
                        <Table.Cell>
                          {moment(invoices.dateTimeCreated).format(
                            'DD/MM/YYYY'
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Grid.Row>
            ) : null}
          </Grid>
        </Form>
      </Wrapper>
    )
  }
}

MakeTaxInvoice.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  buyer: PropTypes.object,
  values: PropTypes.object,
  getInvoiceTemplateState: PropTypes.func,
  objectInvoiceTemplate: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  objectInvoiceIsLoading: PropTypes.bool,
  location: PropTypes.object,
  setFieldValue: PropTypes.func,
  getInvoices: PropTypes.func,
  listInvoices: PropTypes.array,
  getLastInvoice: PropTypes.func,
  objectLastInvoice: PropTypes.object,
  openModal: PropTypes.func,
  createInvoice: PropTypes.func,
  getInvoice: PropTypes.func,
  objectInvoice: PropTypes.object,
  clearInvoice: PropTypes.func,
  updateInvoice: PropTypes.func,
  getInvoiceTemplateChangeState: PropTypes.func,
  objectInvoiceTemplateChangeState: PropTypes.object,
  isCreateLoading: PropTypes.bool,
  isUpdateLoading: PropTypes.bool,
  isValid: PropTypes.bool
}

const validationSchema = Yup.object().shape({
  to: Yup.string().required('To is required'),
  description: Yup.string().required('Description is required!'),
  amount: Yup.number('Only numbers, please!')
})

const mapPropsToValues = props => {
  if (props && props.objectLastInvoice && !props.objectInvoice) {
    return {
      id: props.objectLastInvoice.id,
      businessId: props.location.state.business.id,
      officeDetails: props.objectLastInvoice.officeDetails,
      bankDetails: props.objectLastInvoice.officeDetails,
      ref: props.objectLastInvoice.ref,

      /* Details */
      dateCreated: moment(props.objectLastInvoice.dateTimeCreated).format(
        'DD/MM/YYYY'
      ),
      to: props.objectLastInvoice.to,

      /* Description */
      description: props.objectLastInvoice.description,

      /* Values */
      gst: '$ 10%',
      amount: props.objectLastInvoice.amount,
      total: props.objectLastInvoice.total,

      /* State */
      state: props.objectLastInvoice.state
    }
  } else if (props && props.objectInvoice) {
    return {
      id: props.objectInvoice.id,
      businessId: props.location.state.business.id,
      officeDetails: props.objectInvoice.officeDetails,
      bankDetails: props.objectInvoice.officeDetails,
      ref: props.objectInvoice.ref,

      /* Details */
      dateCreated: moment(props.objectInvoice.dateTimeCreated).format(
        'DD/MM/YYYY'
      ),
      to: props.objectInvoice.to,

      /* Description */
      description: props.objectInvoice.description,

      /* Values */
      gst: '$ 10%',
      amount: props.objectInvoice.amount,
      total: props.objectInvoice.total,

      /* State */
      state: props.objectInvoice.state
    }
  } else {
    return {
      id: '',
      businessId: props.location ? props.location.state.business.id : '',
      officeDetails: props.objectInvoiceTemplate
        ? props.objectInvoiceTemplate.officeDetails
        : '',
      bankDetails: props.objectInvoiceTemplate
        ? props.objectInvoiceTemplate.bankDetails
        : '',
      ref: '',

      /* Details */
      dateCreated: moment().format('DD/MM/YYYY'),
      to: props.location.state.business
        ? `${props.location.state.business.businessName} - ${
          props.location.state.business.address1
        } - ${props.location.state.business.suburb} - ${
          props.location.state.business.state
        } - ${props.location.state.business.postCode}`
        : '',

      /* Description */
      description: props.objectInvoiceTemplate
        ? props.objectInvoiceTemplate.description
        : '',
      /* Values */
      gst: '$ 10%',
      amount: 0.0,
      total: 0,

      /* State */
      state: props.location.state.business
        ? props.location.state.business.state
        : ''
    }
  }
}

const mapStateToProps = state => ({
  objectInvoiceTemplate: state.invoiceTemplates.get.object,
  objectInvoiceIsLoading: state.invoiceTemplates.get.isLoading,
  listInvoices: state.invoice.getAll.array,
  objectLastInvoice: state.invoice.getLastInvoice.object,
  objectInvoice: state.invoice.get.object,
  objectInvoiceTemplateChangeState:
    state.invoiceTemplates.getChangeState.object,
  isCreateLoading: state.invoice.create.isLoading,
  isUpdateLoading: state.invoice.update.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInvoiceTemplateState,
      getInvoices,
      getLastInvoice,
      openModal,
      createInvoice,
      getInvoice,
      clearInvoice,
      updateInvoice,
      getInvoiceTemplateChangeState
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true,
    isInitialValid: true
  })(MakeTaxInvoice)
)
