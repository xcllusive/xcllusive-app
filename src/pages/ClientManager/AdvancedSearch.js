import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Segment, Header, Button, Dropdown, Radio, Grid } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../components/content/Wrapper'
import { openModal } from '../../redux/ducks/modal'
import { getUsers, getBrokers } from '../../redux/ducks/user'
import { getBusinessRegister } from '../../redux/ducks/businessRegister'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'
import { OptionsPriceSelectBuyer } from '../../constants/OptionsPriceSelect'
import { getBusinessesAdvancedSearch } from '../../redux/ducks/clientManager'

class AdvancedSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      priceOptions: OptionsPriceSelectBuyer
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
      ctcAnalysts
    } = this.props
    const { priceOptions } = this.state
    return (
      <Wrapper>
        <Segment style={{ backgroundColor: '#008eff26' }}>
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
            </Form.Group>
            <Form.Group>
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
                    name="broker"
                    fluid
                    search
                    selection
                    options={this._mapValuesToArray(usersBroker)}
                    value={values.broker}
                    onChange={this._handleSelectChange}
                    onSearchChange={this._handleSearchChange}
                  />
                  {errors.broker && touched.broker && <Label basic color="red" pointing content={errors.broker} />}
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
            <Grid>
              <Grid.Row>
                <Grid.Column style={{ textAlign: 'center' }}>
                  <Form.Field>
                    <Button
                      style={{ width: '200px' }}
                      positive
                      icon="search"
                      labelPosition="right"
                      content="Search"
                      loading={this.state.isLoadingBusinessesSold}
                      disabled={this.state.isLoadingBusinessesSold}
                      onClick={this._handleSearch}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
        <Segment style={{ backgroundColor: '#daf3e4' }} size="tiny">
          {/* <Table color="blue" celled inverted size="small" compact selectable structured collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} textAlign="center" colSpan="12">
                  Sold Business Information
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell rowSpan="1">Business Type</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {listSelected ? (
              <Table.Body>
                {listSelected.map(selectedList => (
                  <Table.Row active key={selectedList.id}>
                    <Table.Cell>
                      <Icon link name="search" onClick={() => window.open(`/business/${selectedList.business_id}`)} />
                      {selectedList.label ? selectedList.label : selectedList.BusinessType.label}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            ) : null}
          </Table>
         */}
        </Segment>
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
  getBusinessesAdvancedSearch: PropTypes.func
}

const mapPropsToValues = props => ({
  businessName: '',
  firstNameV: '',
  lastNameV: '',
  vendorEmail: '',
  vendoPhone1: '',
  suburb: '',
  postCode: '',
  businessType: '',
  businessProduct: '',
  industry: '',
  priceFrom: '',
  priceTo: '',
  listingAgent_id: '',
  listingAgentCtc_id: '',
  sourceId: '',
  stageId: '',
  ctcStageId: '',
  ctcSourceId: '',
  company: true
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
    ctcSourceOptions: state.businessRegister.get.ctcBusinessSource.array
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
