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
  Loader,
  Button
} from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal } from '../../../redux/ducks/appraisal'
import { OptionsPriceSelectBuyer } from '../../../constants/OptionsPriceSelect'
import { getBusinessesSold, saveSelectedList, getSelectedList } from '../../../redux/ducks/businessSold'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import numeral from 'numeral'

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
      trendOptions: ['up', 'down', 'steady'],
      inputSearch: '',
      selectedList: [],
      nameArrow: '',
      colorArrow: 'green'
    }
  }

  componentDidMount () {
    this.props.getBusinessesSold(this.props.values)
    // this.props.getSelectedList(this.state.selectedList, this.props.appraisalObject.id)
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
    // this.props.saveSelectedList(this.state.selectedList, this.props.appraisalObject.id)
  }

  async _handleSelectChange (data) {
    await this.props.setFieldValue(data.name, data.value)
    this.props.getBusinessesSold(this.props.values)
  }

  async _handleChangeCheckBox (data) {
    this.setState({
      optionsSearch: {
        ...this.state.optionsSearch,
        [data.value]: !this.state.optionsSearch[data.value]
      }
    })
    if (!this.state.optionsSearch[data.value] && data.value === 'up') {
      this.state.trendOptions.push('up')
    }
    if (this.state.optionsSearch[data.value] && data.value === 'up') {
      _.remove(this.state.trendOptions, item => item === 'up')
    }
    if (!this.state.optionsSearch[data.value] && data.value === 'down') {
      this.state.trendOptions.push('down')
    }
    if (this.state.optionsSearch[data.value] && data.value === 'down') {
      _.remove(this.state.trendOptions, item => item === 'down')
    }
    if (!this.state.optionsSearch[data.value] && data.value === 'steady') {
      this.state.trendOptions.push('steady')
    }
    if (this.state.optionsSearch[data.value] && data.value === 'steady') {
      _.remove(this.state.trendOptions, item => item === 'steady')
    }
    await this.props.setFieldValue('trend', this.state.trendOptions)
    this.props.getBusinessesSold(this.props.values)
  }

  _onSearch = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)

    this.setState({
      inputSearch: value
    })
    this.props.setFieldValue('businessType', value)

    this.timer = setTimeout(() => this.props.getBusinessesSold(this.props.values), 1000)
  }

  _addToSelectedList = objectBusinessSold => {
    if (this.state.selectedList.length === 0) {
      this.setState(prevState => ({
        selectedList: [...prevState.selectedList, objectBusinessSold]
      }))
    } else {
      if (!_.find(this.state.selectedList, o => o.id === objectBusinessSold.id)) {
        this.setState(prevState => ({
          selectedList: [...prevState.selectedList, objectBusinessSold]
        }))
      } else this._showMsg()
    }

    // var res = Object.entries(this.state.selectedList).map(value => value)
  }

  _toggleModalConfirmDelete = idSelected => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Item',
        text: 'Are you sure you want to remove from the list?'
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          this.setState(prevState => ({
            selectedList: [..._.remove(this.state.selectedList, item => item.id !== idSelected)]
          }))
        }
      }
    })
  }

  _showMsg = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_SHOW_MSG, {
      options: {
        title: 'Alert:',
        content: 'Got it!',
        text: 'You have already added this business to the list!'
      }
    })
  }

  _lastYearEbita = businessSold => {
    if (businessSold.year4 > 0) return businessSold.year4
    if (businessSold.year3 > 0) return businessSold.year3
    if (businessSold.year2 > 0) return businessSold.year2
    if (businessSold.year1 > 0) return businessSold.year1
  }

  _averageEbita = businessSold => {
    let count = 0
    let totalYear = 0

    if (businessSold.year4 > 0) {
      count = count + 1
      totalYear = totalYear + businessSold.year4
    }
    if (businessSold.year3 > 0) {
      count = count + 1
      totalYear = totalYear + businessSold.year3
    }
    if (businessSold.year2 > 0) {
      count = count + 1
      totalYear = totalYear + businessSold.year2
    }
    if (businessSold.year1 > 0) {
      totalYear = totalYear + businessSold.year1
      count = count + 1
    }

    return totalYear / count
  }

  _trendArrows = businessSold => {
    if (businessSold.trend === 'up') {
      this.setState({ nameArrow: 'arrow up', colorArrow: 'green' })
    }
    console.log(this.state.nameArrow, this.state.colorArrow)
  }

  _colorArrow = businessSold => {
    if (businessSold.trend === 'up') {
      return 'green'
    }
    if (businessSold.trend === 'down') {
      return 'red'
    }
    if (businessSold.trend === 'steady') {
      return 'yellow'
    }
  }

  _nameArrow = businessSold => {
    if (businessSold.trend === 'up') {
      return 'arrow up'
    }
    if (businessSold.trend === 'down') {
      return 'arrow down'
    }
    if (businessSold.trend === 'steady') {
      return 'arrow right'
    }
  }

  render () {
    const { values, errors, touched, listBusinessesSold, isLoadingBusinessesSold } = this.props
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
          <Segment style={{ backgroundColor: 'aliceblue' }}>
            <Header as="h3" textAlign="center">
              Filters
            </Header>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  label="Last Businesses Sold"
                  name="lastBusiness"
                  autoComplete="lastBusiness"
                  options={lastBusinessOptions}
                  value={values.lastBusiness}
                  onChange={async (e, data) => {
                    this._handleSelectChange(data)
                  }}
                />
                {errors.lastBusiness &&
                  touched.lastBusiness && <Label basic color="red" pointing content={errors.lastBusiness} />}
              </Form.Field>
              <Form.Field width={5}>
                <Form.Input
                  fluid
                  icon="search"
                  label="Business Type"
                  name="businessType"
                  placeholder="Ex: Coffee, Restaurant..."
                  loading={this.state.isLoadingBusinessesSold}
                  onChange={this._onSearch}
                  value={this.state.inputSearch}
                />
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
                  onChange={async (e, data) => {
                    this._handleSelectChange(data)
                  }}
                />
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label="Price To"
                  options={priceOptions}
                  name="priceTo"
                  autoComplete="priceTo"
                  value={values.priceTo}
                  onChange={async (e, data) => {
                    this._handleSelectChange(data)
                  }}
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
                  onChange={async (e, data) => {
                    this._handleChangeCheckBox(data)
                  }}
                  // onChange={this._handleChangeCheckBox}
                />
                <Icon style={{ marginLeft: '-12px', marginRight: '20px' }} name="arrow up" color="green" />
                <Checkbox
                  as={CheckboxFormatted}
                  label="Down"
                  name="trend"
                  value="down"
                  checked={this.state.optionsSearch.down === true}
                  // onChange={this._handleChangeCheckBox}
                  onChange={async (e, data) => {
                    this._handleChangeCheckBox(data)
                  }}
                />
                <Icon style={{ marginLeft: '-12px', marginRight: '20px' }} name="arrow down" color="red" />
                <Checkbox
                  label="Steady"
                  name="trend"
                  value="steady"
                  checked={this.state.optionsSearch.steady === true}
                  // onChange={this._handleChangeCheckBox}
                  onChange={async (e, data) => {
                    this._handleChangeCheckBox(data)
                  }}
                />
                <Icon style={{ marginLeft: '5px' }} name="arrow right" color="yellow" />
              </Grid.Column>
            </Form.Group>
          </Segment>
        </Form>
        <Segment style={{ backgroundColor: 'darkgrey' }}>
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
                <Table.HeaderCell>Sold Price</Table.HeaderCell>
                <Table.HeaderCell>Stock Value</Table.HeaderCell>
                <Table.HeaderCell>Assets Value</Table.HeaderCell>
                <Table.HeaderCell>Price inc. Stock</Table.HeaderCell>
                <Table.HeaderCell>T/O Avr Y X</Table.HeaderCell>
                <Table.HeaderCell>Last Y X</Table.HeaderCell>
                <Table.HeaderCell>Last + Stock X</Table.HeaderCell>
                <Table.HeaderCell>Avg EBITA X</Table.HeaderCell>
                <Table.HeaderCell>Avg EBITA + Stock X</Table.HeaderCell>
                <Table.HeaderCell>Terms Of Deal</Table.HeaderCell>
                <Table.HeaderCell>Special Notes</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.selectedList.map(selectedList => (
                <Table.Row active key={selectedList.id}>
                  <Table.Cell>{selectedList.businessType}</Table.Cell>
                  <Table.Cell>{numeral(selectedList.latestFullYearTotalRevenue).format('$0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(this._averageEbita(selectedList)).format('$0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(this._lastYearEbita(selectedList)).format('$0,0.[99]')}</Table.Cell>
                  <Table.Cell>
                    <Icon color={this._colorArrow(selectedList)} name={this._nameArrow(selectedList)} />
                  </Table.Cell>
                  <Table.Cell>{numeral(selectedList.soldPrice).format('$0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(selectedList.stockValue).format('$0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(selectedList.assetValue).format('$0,0.[99]')}</Table.Cell>
                  <Table.Cell>
                    {numeral(selectedList.soldPrice + selectedList.stockValue).format('$0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(selectedList.soldPrice / selectedList.latestFullYearTotalRevenue).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(selectedList.soldPrice / this._lastYearEbita(selectedList)).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(
                      (selectedList.soldPrice + selectedList.stockValue) / this._lastYearEbita(selectedList)
                    ).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(selectedList.soldPrice / this._averageEbita(selectedList)).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(
                      (selectedList.soldPrice + selectedList.stockValue) / this._averageEbita(selectedList)
                    ).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>{selectedList.termsOfDeal} </Table.Cell>
                  <Table.Cell>{selectedList.specialNotes} </Table.Cell>
                  <Table.Cell>
                    <Button icon onClick={() => this._toggleModalConfirmDelete(selectedList.id)}>
                      <Icon link color="red" name="trash" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
        <Segment style={{ backgroundColor: 'linen' }}>
          <Header as="h3" textAlign="center">
            Database`s List
          </Header>
          <Dimmer.Dimmable dimmed={isLoadingBusinessesSold} style={{ width: '100%' }}>
            <Dimmer inverted active={isLoadingBusinessesSold}>
              <Loader>Loading</Loader>
            </Dimmer>
            <Table color="blue" celled inverted size="small" compact selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Business Type</Table.HeaderCell>
                  <Table.HeaderCell>T/O</Table.HeaderCell>
                  <Table.HeaderCell>Average EBITA</Table.HeaderCell>
                  <Table.HeaderCell>Last year EBITA</Table.HeaderCell>
                  <Table.HeaderCell>Trend</Table.HeaderCell>
                  <Table.HeaderCell>Sold Price</Table.HeaderCell>
                  <Table.HeaderCell>Stock Value</Table.HeaderCell>
                  <Table.HeaderCell>Assets Value</Table.HeaderCell>
                  <Table.HeaderCell>Price inc. Stock</Table.HeaderCell>
                  <Table.HeaderCell>T/O Avr Y X</Table.HeaderCell>
                  <Table.HeaderCell>Last Y X</Table.HeaderCell>
                  <Table.HeaderCell>Last + Stock X</Table.HeaderCell>
                  <Table.HeaderCell>Avg EBITA X</Table.HeaderCell>
                  <Table.HeaderCell>Avg EBITA + Stock X</Table.HeaderCell>
                  <Table.HeaderCell>Terms Of Deal</Table.HeaderCell>
                  <Table.HeaderCell>Special Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listBusinessesSold.map(businessSold => (
                  <Table.Row active key={businessSold.id} onClick={() => this._addToSelectedList(businessSold)}>
                    <Table.Cell>{businessSold.businessType}</Table.Cell>
                    <Table.Cell>{numeral(businessSold.latestFullYearTotalRevenue).format('$0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._averageEbita(businessSold)).format('$0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._lastYearEbita(businessSold)).format('$0,0.[99]')}</Table.Cell>
                    <Table.Cell>
                      <Icon color={this._colorArrow(businessSold)} name={this._nameArrow(businessSold)} />
                    </Table.Cell>
                    <Table.Cell>{numeral(businessSold.soldPrice).format('$0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(businessSold.stockValue).format('$0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(businessSold.assetValue).format('$0,0.[99]')}</Table.Cell>
                    <Table.Cell>
                      {numeral(businessSold.soldPrice + businessSold.stockValue).format('$0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(businessSold.soldPrice / businessSold.latestFullYearTotalRevenue).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(businessSold.soldPrice / this._lastYearEbita(businessSold)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(
                        (businessSold.soldPrice + businessSold.stockValue) / this._lastYearEbita(businessSold)
                      ).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(businessSold.soldPrice / this._averageEbita(businessSold)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(
                        (businessSold.soldPrice + businessSold.stockValue) / this._averageEbita(businessSold)
                      ).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>{businessSold.termsOfDeal} </Table.Cell>
                    <Table.Cell>{businessSold.specialNotes} </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Dimmer.Dimmable>
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
  isLoadingBusinessesSold: PropTypes.bool,
  saveSelectedList: PropTypes.func,
  getSelectedList: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  lastBusiness: 20,
  businessType: '',
  priceFrom: 0,
  priceTo: 0,
  trend: ['up', 'down', 'steady']
})

const mapStateToProps = state => {
  return {
    listBusinessesSold: state.businessSold.getAll.array,
    isLoadingBusinessesSold: state.businessSold.getAll.isLoading
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateAppraisal, getBusinessesSold, openModal, saveSelectedList, getSelectedList },
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
  })(ComparableDataPage)
)
