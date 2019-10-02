import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import numeral from 'numeral'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import {
  Form,
  Label,
  Segment,
  Header,
  Button,
  Dropdown,
  Radio,
  Grid,
  Table,
  Icon,
  Dimmer,
  Loader,
  Divider,
  Pagination
} from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../components/content/Wrapper'
import { openModal, TypesModal } from '../../redux/ducks/modal'
import { getUsers, getBrokers } from '../../redux/ducks/user'
import { getBusinessRegister } from '../../redux/ducks/businessRegister'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'
import { OptionsPriceSelectBuyer } from '../../constants/OptionsPriceSelect'
import { getBusinessesAdvancedSearch } from '../../redux/ducks/clientManager'

class AdvancedSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      priceOptions: OptionsPriceSelectBuyer,
      inUse: false
    }
  }

  async componentDidMount () {
    await this.props.getUsers()
    await this.props.getBusinessRegister(1, 1000)
    await this.props.getBusinessRegister(3, 1000)
    await this.props.getBusinessRegister(5, 1000)
    await this.props.getBusinessRegister(6, 1000)
    await this.props.getBusinessRegister(7, 1000)
    await this.props.getBusinessRegister(10, 1000)
    await this.props.getBrokers()
  }

  _mapValuesToArray = array => {
    if (array.length > 0) {
      return array.map((item, index) => ({
        key: index,
        text: `${item.firstName} ${item.lastName}`,
        value: item.id
      }))
    }
    return [{ key: 1, text: 'No users found', value: null }]
  }

  _handleCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleChangeCheckBox = async (e, { name }) => {
    await this.props.setFieldValue(name, !this.props.values[name])

    if (this.props.values.company) {
      this.props.setFieldValue('ctcStageId', '')
      this.props.setFieldValue('ctcSourceId', '')
      this.props.setFieldValue('listingAgentCtc_id', '')
    } else {
      this.props.setFieldValue('stageId', '')
      this.props.setFieldValue('sourceId', '')
      this.props.setFieldValue('listingAgent_id', '')
    }
  }

  _handleSearch = () => {
    this.props.getBusinessesAdvancedSearch(this.props.values)
    this.setState({
      inUse: true
    })
  }

  _handlePaginationChange = (e, { activePage }) => {
    this.props.getBusinessesAdvancedSearch(this.props.values, 50, activePage)
  }

  _handleClear = () => {
    window.location.reload()
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

  render () {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      typeOptions,
      productOptions,
      usersBroker,
      xcllusiveAnalysts,
      sourceOptions,
      stageOptions,
      ctcStageOptions,
      ctcSourceOptions,
      ctcAnalysts,
      businessesList,
      isLoadingList,
      isFound,
      activePageList,
      pagesList,
      totalBusiness
    } = this.props
    const { priceOptions, inUse } = this.state
    return (
      <Wrapper>
        <Segment style={{ marginTop: '10px', backgroundColor: '#008eff26' }} size="tiny">
          <Header as="h3" textAlign="center">
            Advanced Search
          </Header>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="Business name"
                  name="businessName"
                  autoComplete="businessName"
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessName && touched.businessName && (
                  <Label basic color="red" pointing content={errors.businessName} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="First name"
                  name="firstNameV"
                  autoComplete="firstNameV"
                  value={values.firstNameV}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstNameV && touched.firstNameV && (
                  <Label basic color="red" pointing content={errors.firstNameV} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Last name"
                  name="lastNameV"
                  autoComplete="lastNameV"
                  value={values.lastNameV}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastNameV && touched.lastNameV && (
                  <Label basic color="red" pointing content={errors.lastNameV} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="Email"
                  name="vendorEmail"
                  autoComplete="vendorEmail"
                  value={values.vendorEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorEmail && touched.vendorEmail && (
                  <Label basic color="red" pointing content={errors.vendorEmail} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Telephone"
                  name="vendorPhone1"
                  autoComplete="vendorPhone1"
                  value={values.vendorPhone1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone1 && touched.vendorPhone1 && (
                  <Label basic color="red" pointing content={errors.vendorPhone1} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Suburb"
                  name="suburb"
                  autoComplete="suburb"
                  value={values.suburb}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.suburb && touched.suburb && <Label basic color="red" pointing content={errors.suburb} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Post Code"
                  name="postCode"
                  autoComplete="postCode"
                  value={values.postCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.postCode && touched.postCode && <Label basic color="red" pointing content={errors.postCode} />}
              </Form.Field>
            </Form.Group>
            <Divider style={{ marginTop: '30px', paddingBottom: '10px' }}></Divider>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Business Type</label>
                <Dropdown
                  name="businessType"
                  fluid
                  search
                  selection
                  options={mapArrayToValuesForDropdown(typeOptions)}
                  value={values.businessType}
                  onChange={this._handleSelectChange}
                  onSearchChange={this._handleSearchChange}
                />
                {errors.businessType && touched.businessType && (
                  <Label basic color="red" pointing content={errors.businessType} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Industry"
                  name="industry"
                  autoComplete="industry"
                  value={values.industry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.industry && touched.industry && <Label basic color="red" pointing content={errors.industry} />}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label="Product"
                  options={mapArrayToValuesForDropdown(productOptions)}
                  name="businessProduct"
                  autoComplete="businessProduct"
                  value={values.businessProduct}
                  onChange={this._handleSelectChange}
                />
                {errors.businessProduct && touched.businessProduct && (
                  <Label basic color="red" pointing content={errors.businessProduct} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label="Price From"
                  options={priceOptions}
                  name="priceFrom"
                  autoComplete="priceFrom"
                  value={values.priceFrom}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label="Price To"
                  options={priceOptions}
                  name="priceTo"
                  autoComplete="priceTo"
                  value={values.priceTo}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
            </Form.Group>
            <Divider style={{ marginTop: '30px', paddingBottom: '10px' }}></Divider>
            <Form.Group>
              <Form.Field
                style={{ marginLeft: '10px', marginTop: '35px' }}
                control={Radio}
                label="Only Xcllusive"
                name="company"
                onChange={this._handleChangeCheckBox}
                checked={values.company}
              />
              <Form.Field
                style={{ marginLeft: '10px', marginTop: '35px' }}
                control={Radio}
                label="Only CTC"
                name="company"
                onChange={this._handleChangeCheckBox}
                checked={!values.company}
              />
              {usersBroker ? (
                <Form.Field width={3}>
                  <label>Broker</label>
                  <Dropdown
                    name="brokerAccountName"
                    fluid
                    search
                    selection
                    options={this._mapValuesToArray(usersBroker)}
                    value={values.brokerAccountName}
                    onChange={this._handleSelectChange}
                    onSearchChange={this._handleSearchChange}
                  />
                  {errors.brokerAccountName && touched.brokerAccountName && (
                    <Label basic color="red" pointing content={errors.brokerAccountName} />
                  )}
                </Form.Field>
              ) : null}
              {values.company ? (
                <Fragment>
                  <Form.Field width={4}>
                    <label>Listing Agent</label>
                    <Dropdown
                      name="listingAgent_id"
                      fluid
                      search
                      selection
                      options={this._mapValuesToArray(xcllusiveAnalysts)}
                      value={values.listingAgent_id}
                      onChange={this._handleSelectChange}
                      onSearchChange={this._handleSearchChange}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <Form.Select
                      style={{ backgroundColor: '#fffca2a8' }}
                      label="Business Stage"
                      options={mapArrayToValuesForDropdown(stageOptions)}
                      name="stageId"
                      value={values.stageId}
                      onChange={this._handleSelectChange}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <label>Source</label>
                    <Dropdown
                      name="sourceId"
                      fluid
                      search
                      selection
                      options={mapArrayToValuesForDropdown(sourceOptions)}
                      value={values.sourceId}
                      onChange={this._handleSelectChange}
                      onSearchChange={this._handleSearchChange}
                    />
                  </Form.Field>
                </Fragment>
              ) : (
                <Fragment>
                  <Form.Field width={4}>
                    <label>Listing Agent</label>
                    <Dropdown
                      name="listingAgentCtc_id"
                      fluid
                      search
                      selection
                      options={this._mapValuesToArray(ctcAnalysts)}
                      value={values.listingAgentCtc_id}
                      onChange={this._handleSelectChange}
                      onSearchChange={this._handleSearchChange}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <Form.Select
                      style={{ backgroundColor: '#fffca2a8' }}
                      label="Business Stage"
                      options={mapArrayToValuesForDropdown(ctcStageOptions)}
                      name="ctcStageId"
                      value={values.ctcStageId}
                      onChange={this._handleSelectChange}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <label>Source</label>
                    <Dropdown
                      name="ctcSourceId"
                      fluid
                      search
                      selection
                      options={mapArrayToValuesForDropdown(ctcSourceOptions)}
                      value={values.ctcSourceId}
                      onChange={this._handleSelectChange}
                      onSearchChange={this._handleSearchChange}
                    />
                  </Form.Field>
                </Fragment>
              )}
            </Form.Group>
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
                <DatePicker selected={values.dateFrom} onChange={this._handleDateFromChange} />
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
                <DatePicker selected={values.dateTo} onChange={this._handleDateToChange} />
              </Form.Field>
            </Form.Group>

            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column style={{ textAlign: 'right' }}>
                  <Form.Field>
                    <Button
                      style={{ width: '200px' }}
                      positive
                      icon="search"
                      labelPosition="right"
                      content="Search"
                      loading={isLoadingList}
                      onClick={this._handleSearch}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column style={{ textAlign: 'right' }}>
                  <Form.Field>
                    <Button
                      size="small"
                      color="yellow"
                      icon="eraser"
                      labelPosition="right"
                      content="Clear"
                      onClick={() => this._handleClear()}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
        {businessesList && businessesList.length > 0 ? (
          <Segment style={{ backgroundColor: '#daf3e4' }} size="small">
            <Dimmer.Dimmable dimmed>
              <Dimmer inverted active={isLoadingList}>
                <Loader>Loading</Loader>
              </Dimmer>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column textAlign="left">
                    <Header style={{ marginTop: '10px' }} as="h4">
                      Businesses Found: {totalBusiness}
                    </Header>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Pagination
                      size="mini"
                      onPageChange={(e, data) => this._handlePaginationChange(e, data)}
                      defaultActivePage={activePageList}
                      totalPages={pagesList}
                      firstItem={null}
                      lastItem={null}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Table size="small" compact color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Vendor Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Suburb</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Industry</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Listing Agent</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Broker</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {businessesList.map(business => (
                    <Table.Row onClick={() => window.open(`/business/${business.id}`)} active key={business.id}>
                      <Table.Cell>
                        <Icon link name="search" onClick={() => window.open(`/business/${business.id}`)} />
                        {business.id}
                      </Table.Cell>
                      <Table.Cell>{business.businessName}</Table.Cell>
                      <Table.Cell>{business.vendorName}</Table.Cell>
                      <Table.Cell>{business.suburb}</Table.Cell>
                      <Table.Cell>{business.industry}</Table.Cell>
                      <Table.Cell>{numeral(business.price).format('$0,0')}</Table.Cell>
                      <Table.Cell>{business.analystName}</Table.Cell>
                      <Table.Cell>{business.brokerName}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Dimmer.Dimmable>
          </Segment>
        ) : (
          <Fragment>
            <Dimmer.Dimmable dimmed>
              <Dimmer inverted active={isLoadingList}>
                <Loader>Loading</Loader>
              </Dimmer>
              {inUse && isFound ? (
                <Header as="h4" textAlign="center">
                  Ops... no records found!
                </Header>
              ) : null}
            </Dimmer.Dimmable>
          </Fragment>
        )}
      </Wrapper>
    )
  }
}

AdvancedSearch.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  openModal: PropTypes.func,
  typeOptions: PropTypes.array,
  productOptions: PropTypes.array,
  userLogged: PropTypes.array,
  usersBroker: PropTypes.array,
  xcllusiveAnalysts: PropTypes.array,
  getUsers: PropTypes.func,
  sourceOptions: PropTypes.array,
  stageOptions: PropTypes.array,
  getBusinessRegister: PropTypes.func,
  getBrokers: PropTypes.func,
  ctcStageOptions: PropTypes.array,
  ctcSourceOptions: PropTypes.array,
  ctcAnalysts: PropTypes.array,
  getBusinessesAdvancedSearch: PropTypes.func,
  businessesList: PropTypes.array,
  isLoadingList: PropTypes.bool,
  isFound: PropTypes.bool,
  activePageList: PropTypes.number,
  pagesList: PropTypes.number,
  totalBusiness: PropTypes.number
}

const mapPropsToValues = props => ({
  businessName: '',
  firstNameV: '',
  lastNameV: '',
  vendorEmail: '',
  vendorPhone1: '',
  suburb: '',
  postCode: '',
  businessType: '',
  businessProduct: '',
  industry: '',
  priceFrom: '',
  priceTo: '',
  brokerAccountName: '',
  listingAgent_id: '',
  listingAgentCtc_id: '',
  sourceId: '',
  stageId: '',
  ctcStageId: '',
  ctcSourceId: '',
  company: true
  // dateFrom: moment(),
  // dateTo: moment()
})

const mapStateToProps = state => {
  return {
    productOptions: state.businessRegister.get.product.array,
    typeOptions: state.businessRegister.get.type.array,
    stageOptions: state.businessRegister.get.stage.array,
    xcllusiveAnalysts: state.user.get.xcllusiveAnalysts,
    ctcAnalysts: state.user.get.ctcAnalysts,
    usersBroker: state.user.getBrokers.array,
    sourceOptions: state.businessRegister.get.source.array,
    ctcStageOptions: state.businessRegister.get.ctcStage.array,
    ctcSourceOptions: state.businessRegister.get.ctcBusinessSource.array,
    businessesList: state.clientManager.getBusinessesAdvancedSearch.array,
    isLoadingList: state.clientManager.getBusinessesAdvancedSearch.isLoading,
    activePageList: state.clientManager.getBusinessesAdvancedSearch.activePage,
    pagesList: state.clientManager.getBusinessesAdvancedSearch.pages,
    isFound: state.clientManager.getBusinessesAdvancedSearch.isFound,
    totalBusiness: state.clientManager.getBusinessesAdvancedSearch.totalBusiness
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      openModal,
      getUsers,
      getBusinessRegister,
      getBrokers,
      getBusinessesAdvancedSearch
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(AdvancedSearch)
)
