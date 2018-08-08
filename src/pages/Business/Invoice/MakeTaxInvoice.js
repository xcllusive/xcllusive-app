import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
// import numeral from 'numeral'
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
  Table
} from 'semantic-ui-react'

import { getBusiness } from '../../../redux/ducks/business'
import { getInvoiceTemplate } from '../../../redux/ducks/invoiceTemplates'

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
      ]
    }
    this.quillRef = null
    this.reactQuillRef = null
  }

  componentDidMount () {
    this.props.getBusiness(this.props.match.params.id)
    this.props.getInvoiceTemplate(this.props.match.params.idAgreement)
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
      objectBusinessIsLoading
    } = this.props
    return (
      <Wrapper loading={objectBusinessIsLoading || objectInvoiceIsLoading}>
        <Form>
          <Grid celled="internally" divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h2" content="Tax Invoice" />
                <Segment>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <ReactQuill
                        readOnly
                        // value={values.header}
                        onChange={this._handleChangeHeader}
                        style={{ height: '15vh' }}
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
                        // value={values.ref}
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
                    <Form.Field>
                      <ReactQuill
                        // value={values.header}
                        onChange={this._handleChangeHeader}
                        style={{ height: '10vh' }}
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
                            // value={values.amount}
                            onChange={handleChange}
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
                          <Form.Input readOnly label="GST" />
                        </Form.Field>
                        <Form.Field width={6}>
                          <Form.Input
                            label="Total $"
                            name="total"
                            autoComplete="total"
                            // value={values.total}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.total &&
                            touched.total && (
                            <Label
                              basic
                              pointing
                              color="red"
                              content={errors.total}
                            />
                          )}
                        </Form.Field>
                      </Form.Group>
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button
                  color="green"
                  onClick={() => history.push(`/business/${objectBusiness.id}`)}
                  size="small"
                  floated="left"
                >
                  <Icon name="backward" />
                  Back to Business
                </Button>
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
                  <Icon name="edit" />
                  Preview Agreement
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Header>{this.state.stageSelectedName}</Header>
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
                  {/* {businesses.map(business => ( */}
                  <Table.Row
                    active
                    // key={business.id}
                    // onClick={() =>
                    //   history.push(`${match.path}/${business.id}`)
                    // }
                  >
                    <Table.Cell>{'1CafeZoran'}</Table.Cell>
                    <Table.Cell>{'testing'}</Table.Cell>
                    <Table.Cell>{'3,500.00'}</Table.Cell>
                    <Table.Cell>{'08/08/2018'}</Table.Cell>
                  </Table.Row>
                  {/* ))} */}
                </Table.Body>
              </Table>
            </Grid.Row>
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
  getInvoiceTemplate: PropTypes.func,
  objectInvoiceTemplate: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  objectBusinessIsLoading: PropTypes.bool,
  objectInvoiceIsLoading: PropTypes.bool
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

const mapPropsToValues = props => ({})

const mapStateToProps = state => ({
  objectBusiness: state.business.get.object,
  objectBusinessIsLoading: state.business.get.isLoading,
  objectInvoiceTemplate: state.agreementTemplates.get.object,
  objectInvoiceIsLoading: state.invoiceTemplates.get.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBusiness,
      getInvoiceTemplate
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
