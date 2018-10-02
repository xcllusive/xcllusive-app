import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import _ from 'lodash'
import {
  Message,
  Step,
  Form,
  Label,
  Segment,
  Checkbox,
  Grid,
  Icon,
  Table,
  Header,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal } from '../../../redux/ducks/appraisal'
import { OptionsPriceSelectBuyer } from '../../../constants/OptionsPriceSelect'
import { getBusinessesSold } from '../../../redux/ducks/businessSold'

const CheckboxFormatted = styled.div`
  padding-right: 1em;
`

class ComparableDataPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastBusinessOptions: [
        { key: 1, text: '10 Businesses', value: 10 },
        { key: 2, text: '20 Businesses', value: 20 },
        { key: 3, text: '50 Businesses', value: 50 }
      ],
      priceOptions: OptionsPriceSelectBuyer,
      optionsSearch: {
        up: true,
        down: true,
        steady: true
      },
      trendOptions: ['up', 'down', 'steady']
    }
  }

  async componentDidMount () {
    // await this.props.setFieldValue('trend', this.state.trendOptions)
    this.props.getBusinessesSold(this.props.values)
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    this.props.getBusinessesSold(this.props.values)
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.setState({
      optionsSearch: {
        ...this.state.optionsSearch,
        [value]: !this.state.optionsSearch[value]
      }
    })
    if (!this.state.optionsSearch[value] && value === 'up') {
      this.state.trendOptions.push('up')
    }
    if (this.state.optionsSearch[value] && value === 'up') {
      _.remove(this.state.trendOptions, item => item === 'up')
    }
    if (!this.state.optionsSearch[value] && value === 'down') {
      this.state.trendOptions.push('down')
    }
    if (this.state.optionsSearch[value] && value === 'down') {
      _.remove(this.state.trendOptions, item => item === 'down')
    }
    if (!this.state.optionsSearch[value] && value === 'steady') {
      this.state.trendOptions.push('steady')
    }
    if (this.state.optionsSearch[value] && value === 'steady') {
      _.remove(this.state.trendOptions, item => item === 'steady')
    }
  }

  render () {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      listBusinessesSold,
      isLoadingBusinessesSold
    } = this.props
    const { priceOptions, lastBusinessOptions } = this.state
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step active icon="balance scale" title="Step 4" description="Comparable Data" />
          <Message info size="large">
            <p>We need to write some instructions here for comparable data</p>
          </Message>
        </Step.Group>
        <Form>
          <Segment>
            <Header as="h3" textAlign="center">
              Filters
            </Header>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  label="Last Business Sold"
                  options={lastBusinessOptions}
                  name="lastBusiness"
                  autoComplete="lastBusiness"
                  value={values.lastBusiness}
                  // onChange={this._handleSelectChange}
                  onChange={async value => {
                    this.props.setFieldValue('lastBusiness', value)
                    console.log(value)
                    await Promise.resolve()
                    await this.props.getBusinessesSold(this.props.values)
                  }}
                />
                {errors.lastBusiness &&
                  touched.lastBusiness && <Label basic color="red" pointing content={errors.lastBusiness} />}
              </Form.Field>
              <Form.Field width={8}>
                <Form.Input
                  label="Business Type"
                  name="businessType"
                  autoComplete="businessType"
                  value={values.businessType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessType &&
                  touched.businessType && <Label basic color="red" pointing content={errors.businessType} />}
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
              <label style={{ fontSize: '.92857143em', color: 'rgba(0,0,0,.87)', fontWeight: '700' }}>Trend</label>
              <Grid.Column style={{ marginTop: '30px' }} width={5} verticalAlign="middle">
                <Checkbox
                  as={CheckboxFormatted}
                  label="Up"
                  name="trend"
                  value="up"
                  checked={this.state.optionsSearch.up === true}
                  onChange={this._handleChangeCheckBox}
                />
                <Icon style={{ marginLeft: '-12px', marginRight: '20px' }} name="arrow up" color="green" />
                <Checkbox
                  as={CheckboxFormatted}
                  label="Down"
                  name="trend"
                  value="down"
                  checked={this.state.optionsSearch.down === true}
                  onChange={this._handleChangeCheckBox}
                />
                <Icon style={{ marginLeft: '-12px', marginRight: '20px' }} name="arrow down" color="red" />
                <Checkbox
                  label="Steady"
                  name="trend"
                  value="steady"
                  checked={this.state.optionsSearch.steady === true}
                  onChange={this._handleChangeCheckBox}
                />
                <Icon style={{ marginLeft: '5px' }} name="arrow right" color="yellow" />
              </Grid.Column>
            </Form.Group>
          </Segment>
        </Form>
        <Segment>
          <Header as="h3" textAlign="center">
            Database`s List
          </Header>
          <Dimmer.Dimmable dimmed={isLoadingBusinessesSold} style={{ width: '100%' }}>
            <Dimmer inverted active={isLoadingBusinessesSold}>
              <Loader>Loading</Loader>
            </Dimmer>
            <Table color="blue" celled inverted size="small" compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Business Type</Table.HeaderCell>
                  <Table.HeaderCell>T/O</Table.HeaderCell>
                  <Table.HeaderCell>Average EBITA</Table.HeaderCell>
                  <Table.HeaderCell>Last year EBITA</Table.HeaderCell>
                  <Table.HeaderCell>Trend</Table.HeaderCell>
                  <Table.HeaderCell>Stock Value</Table.HeaderCell>
                  <Table.HeaderCell>Assets Value</Table.HeaderCell>
                  <Table.HeaderCell>Price inc. Stock</Table.HeaderCell>
                  <Table.HeaderCell>T/O Avr Y X</Table.HeaderCell>
                  <Table.HeaderCell>Last Y X</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listBusinessesSold.map(businessSold => (
                  <Table.Row active key={businessSold.id}>
                    <Table.Cell>{businessSold.businessType}</Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Dimmer.Dimmable>
        </Segment>
        <Segment>
          <Header as="h3" textAlign="center">
            Your Selected List
          </Header>
          <Table color="blue" celled inverted size="small" compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Business Type</Table.HeaderCell>
                <Table.HeaderCell>T/O</Table.HeaderCell>
                <Table.HeaderCell>Average EBITA</Table.HeaderCell>
                <Table.HeaderCell>Last year EBITA</Table.HeaderCell>
                <Table.HeaderCell>Trend</Table.HeaderCell>
                <Table.HeaderCell>Stock Value</Table.HeaderCell>
                <Table.HeaderCell>Assets Value</Table.HeaderCell>
                <Table.HeaderCell>Price inc. Stock</Table.HeaderCell>
                <Table.HeaderCell>T/O Avr Y X</Table.HeaderCell>
                <Table.HeaderCell>Last Y X</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* {businessesUnderOffer.map(item => ( */}
              <Table.Row active>
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
              </Table.Row>
              {/* ))} */}
            </Table.Body>
          </Table>
        </Segment>
      </Wrapper>
    )
  }
}

ComparableDataPage.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  business: PropTypes.object,
  openModal: PropTypes.func,
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func,
  getBusinessesSold: PropTypes.func,
  listBusinessesSold: PropTypes.array,
  isLoadingBusinessesSold: PropTypes.bool
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  lastBusiness: 20,
  businessType: props.appraisalObject ? props.appraisalObject.businessType : '',
  priceFrom: props.appraisalObject ? props.appraisalObject.priceFrom : '',
  priceTo: props.appraisalObject ? props.appraisalObject.priceTo : ''
})

const mapStateToProps = state => {
  return {
    listBusinessesSold: state.businessSold.getAll.array,
    isLoadingBusinessesSold: state.businessSold.getAll.isLoading
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateAppraisal, getBusinessesSold }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(ComparableDataPage)
)
