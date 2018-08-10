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

import { getBusiness } from '../../../redux/ducks/business'
import { getInvoiceTemplateState } from '../../../redux/ducks/invoiceTemplates'
import { getInvoices, getLastInvoice } from '../../../redux/ducks/invoice'

import Wrapper from '../../../components/content/Wrapper'

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
      formatsDetails: []
    }
    this.quillRef = null
    this.reactQuillRef = null
  }

  componentDidMount () {
    this.props.getBusiness(this.props.match.params.id)
    this.props.getInvoiceTemplateState(this.props.location.state)
    this.props.getInvoices(this.props.match.params.id)
    this.props.getLastInvoice(this.props.match.params.id)
  }

  componentDidUpdate () {
    this._attachQuillRefs()
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

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleChangeDescription = value => {
    this.props.setFieldValue('description', value)
  }

  _calculateTotal = (e, { name, value }) => {
    // const total = numeral(
    //   numeral(value).value() + (numeral(value).value() * 10) / 100
    // ).format('0,0.00')

    this.props.setFieldValue(name, value)
    // this.props.setFieldValue('total', total)
  }

  render () {
    const {
      objectInvoiceTemplate,
      values,
      handleBlur,
      handleChange,
      errors,
      touched,
      objectBusiness,
      history,
      objectInvoiceIsLoading,
      objectBusinessIsLoading,
      listInvoices
      // objectLastInvoice
    } = this.props
    const { state } = this.state
    return (
      <Wrapper loading={objectBusinessIsLoading || objectInvoiceIsLoading}>
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
                        // value={values.ref}
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
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.date &&
                        touched.date && (
                        <Label
                          basic
                          pointing
                          color="red"
                          content={errors.date}
                        />
                      )}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.TextArea
                      label="To"
                      name="to"
                      autoComplete="to"
                      // value={values.to}
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
                    />
                    {/* {errors.state &&
                      touched.state && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.state}
                      />
                    )} */}
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
                  color="red"
                  onClick={() =>
                    history.push({
                      pathname: `/business/${objectBusiness.id}/agreement/${
                        objectInvoiceTemplate.id
                      }/preview`,
                      state: { business: objectBusiness, values }
                    })
                  }
                  size="small"
                  floated="right"
                >
                  <Icon name="save" />
                  Save and Send
                </Button>
                <Button
                  color="green"
                  onClick={() => history.push(`/business/${objectBusiness.id}`)}
                  size="small"
                  floated="left"
                >
                  <Icon name="backward" />
                  Back to Business
                </Button>
                <Button color="facebook" size="small" floated="right">
                  <Icon name="add" />
                  New
                </Button>
              </Grid.Column>
            </Grid.Row>
            {listInvoices ? (
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
                        // onClick={() =>
                        //   history.push(`${match.path}/${business.id}`)
                        // }
                      >
                        <Table.Cell>{invoices.ref}</Table.Cell>
                        <Table.Cell>{invoices.description}</Table.Cell>
                        <Table.Cell>{invoices.amount}</Table.Cell>
                        <Table.Cell>
                          {moment(invoices.date).format('DD/MM/YYYY')}
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
  getBusiness: PropTypes.func,
  objectBusiness: PropTypes.object,
  values: PropTypes.object,
  getInvoiceTemplateState: PropTypes.func,
  objectInvoiceTemplate: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  objectBusinessIsLoading: PropTypes.bool,
  objectInvoiceIsLoading: PropTypes.bool,
  location: PropTypes.object,
  setFieldValue: PropTypes.func,
  getInvoices: PropTypes.func,
  listInvoices: PropTypes.array,
  getLastInvoice: PropTypes.func,
  objectLastInvoice: PropTypes.object
}

const validationSchema = Yup.object().shape({
  firstNameV: Yup.string().required('First Name is required!'),
  lastNameV: Yup.string().required('Last Name is required!'),
  vendorPhone1: Yup.string().required('Phone is required!'),
  businessABN: Yup.string().required('ABN/ACN is required!'),
  address: Yup.string().required('Address is required!'),
  listedPrice: Yup.number('Number')
    .min(0)
    .integer()
    .required('Listed Price is required!'),
  appraisalHigh: Yup.number().required('Appraisal High is required!'),
  appraisalLow: Yup.number().required('Appraisal Low is required!'),
  engagementFee: Yup.number().required('Engagement Fee is required!'),
  commissionPerc: Yup.number().required('Commission Perc is required!'),
  commissionDiscount: Yup.number().required('Commission Discount is required!'),
  introductionParties: Yup.string()
    .required('Introduction Parties is required!')
    .max(300, 'Sorry! you have exceed the area limit of this field.'),
  commissionProperty: Yup.number().required('Comission is required!'),
  addressProperty: Yup.string()
    .required('Address is required!')
    .max(300, 'Sorry! you have exceed the area limit of this field.'),
  priceProperty: Yup.number().required('Price is required!')
})

const mapPropsToValues = props => ({
  officeDetails: props.objectLastInvoice
    ? props.objectLastInvoice.officeDetails
    : props.objectInvoiceTemplate
      ? props.objectInvoiceTemplate.officeDetails
      : '',

  description: props.objectInvoiceTemplate
    ? props.objectInvoiceTemplate.description
    : '',
  date: moment().format('DD/MM/YYYY'),
  gst: '$ 10%',
  amount: 1500,
  total: props.objectLastInvoice ? props.objectLastInvoice.total : 0
  // state: props.location.state
})

const mapStateToProps = state => ({
  objectBusiness: state.business.get.object,
  objectBusinessIsLoading: state.business.get.isLoading,
  objectInvoiceTemplate: state.invoiceTemplates.get.object,
  objectInvoiceIsLoading: state.invoiceTemplates.get.isLoading,
  listInvoices: state.invoice.getAll.array,
  objectLastInvoice: state.invoice.getLastInvoice.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBusiness,
      getInvoiceTemplateState,
      getInvoices,
      getLastInvoice
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
    enableReinitialize: true
  })(MakeTaxInvoice)
)
