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
import {
  getBusinessesSold,
  saveSelectedList,
  getSelectedList,
  addSelectedList,
  removeSelectedList
} from '../../../redux/ducks/businessSold'
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
      colorArrow: 'green',
      isLoadingListSelected: false,
      sumTO: null,
      sumLastYearEbitda: null,
      sumPebitdaLastYear: null,
      sumSoldPrice: null,
      sumStockValue: null,
      sumAssetsValue: null,
      sumPriceStock: null,
      sumTOAvgYX: null,
      sumMEbitdaLastYear: null,
      sumMEbitdaAvg: null,
      sumMPebitdaLastYear: null,
      sumMPebitdaAvg: null,
      sumMEbitdaAvgWithStock: null
    }
  }

  componentDidMount () {
    this.props.getBusinessesSold(this.props.values)
    this.props.getSelectedList(this.props.appraisalObject.id)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.listSelected && nextProps.listSelected !== prevState.isLoadingListSelected) {
      var tempTO = 0
      var tempEbitdaAvg = 0
      var tempEbitdaLastYear = 0
      var tempEbitdaLastYearAdd = 0
      var tempPebitdaAvg = 0
      var tempSoldPrice = 0
      var tempStockValue = 0
      var tempAssetsValue = 0
      var tempPriceStock = 0
      var tempTOAvgYX = 0
      var tempMEbitdaLastYear = 0
      var tempMEbitdaLastYearAdd = 0
      var tempMEbitdaAvg = 0
      var tempMPebitdaLastYearAdd = 0
      var tempMPebitdaLastYear = 0
      var tempMPebitdaAvg = 0
      var tempMEbitdaLastYearWithStockAdd = 0
      var tempMEbitdaLastYearWithStock = 0
      var tempMEbitdaAvgWithStock = 0
      var tempMPebitdaLastYearWithStockAdd = 0
      var tempMPebitdaLastYearWithStock = 0
      var tempMPebitdaAvgWithStock = 0
      var tempPebitdaLastYearAdd = 0
      var tempPebitdaLastYear = 0

      nextProps.listSelected.forEach(function (item) {
        /* T/O */
        tempTO = item.latestFullYearTotalRevenue + tempTO

        /* EBITDA Avg */
        var count = 0
        var totalYear = 0
        if (item.year4 > 0) {
          count = count + 1
          totalYear = totalYear + item.year4
        }
        if (item.year3 > 0) {
          count = count + 1
          totalYear = totalYear + item.year3
        }
        if (item.year2 > 0) {
          count = count + 1
          totalYear = totalYear + item.year2
        }
        if (item.year1 > 0) {
          totalYear = totalYear + item.year1
          count = count + 1
        }
        var ebitdaAvg = 0
        ebitdaAvg = totalYear / count
        tempEbitdaAvg = ebitdaAvg - item.agreedWageForWorkingOwners + tempEbitdaAvg

        /* PEBITDA Avg */
        tempPebitdaAvg = ebitdaAvg - item.agreedWageForWorkingOwners + item.agreedWageForMainOwner + tempPebitdaAvg

        /* Multiplier EBITDA Avg */
        tempMEbitdaAvg = item.soldPrice / (ebitdaAvg - item.agreedWageForWorkingOwners) + tempMEbitdaAvg

        /* Multiplier PEBITDA Avg */
        tempMPebitdaAvg =
          item.soldPrice / (ebitdaAvg - item.agreedWageForWorkingOwners + item.agreedWageForMainOwner) + tempMPebitdaAvg

        /* Multiplier EBITDA Avg with Stock */
        tempMEbitdaAvgWithStock =
          (item.soldPrice + item.stockValue) / (ebitdaAvg - item.agreedWageForWorkingOwners) + tempMEbitdaAvgWithStock

        /* Multiplier PEBITDA Avg with Stock */
        tempMPebitdaAvgWithStock =
          item.soldPrice /
            (ebitdaAvg - item.agreedWageForWorkingOwners + item.agreedWageForMainOwner + item.stockValue) +
          tempMPebitdaAvgWithStock

        /* EBITDA Last Year */
        var went = false
        if (item.year4 > 0) {
          tempEbitdaLastYearAdd = item.year4 - item.agreedWageForWorkingOwners

          /* PEBITDA Last Year */
          tempPebitdaLastYearAdd = item.year4 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner)

          /* Multiplier EBITDA Last Year */
          tempMEbitdaLastYearAdd = item.soldPrice / (item.year4 - item.agreedWageForWorkingOwners)

          /* Multiplier PEBITDA Last Year */
          tempMPebitdaLastYearAdd =
            item.soldPrice / (item.year4 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner))

          /* Multiplier EBITDA Last Year With Stock */
          tempMEbitdaLastYearWithStockAdd =
            (item.soldPrice + item.stockValue) / (item.year4 - item.agreedWageForWorkingOwners)

          /* Multiplier PEBITDA Last Year with Stock */
          tempMPebitdaLastYearWithStockAdd =
            item.soldPrice /
            (item.year4 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner) + item.stockValue)

          went = true
        }
        if (item.year3 > 0 && !went) {
          tempEbitdaLastYearAdd = item.year3 - item.agreedWageForWorkingOwners

          /* PEBITDA Last Year */
          tempPebitdaLastYearAdd = item.year3 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner)

          /* Multiplier EBITDA Last Year */
          tempMEbitdaLastYearAdd = item.soldPrice / (item.year3 - item.agreedWageForWorkingOwners)

          /* Multiplier PEBITDA Last Year */
          tempMPebitdaLastYearAdd =
            item.soldPrice / (item.year3 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner))

          /* Multiplier EBITDA Last Year With Stock */
          tempMEbitdaLastYearWithStockAdd =
            (item.soldPrice + item.stockValue) / (item.year3 - item.agreedWageForWorkingOwners)

          /* Multiplier PEBITDA Last Year with Stock */
          tempMPebitdaLastYearWithStockAdd =
            item.soldPrice /
            (item.year3 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner) + item.stockValue)

          went = true
        }
        if (item.year2 > 0 && !went) {
          tempEbitdaLastYearAdd = item.year2 - item.agreedWageForWorkingOwners

          /* PEBITDA Last Year */
          tempPebitdaLastYearAdd = item.year2 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner)

          /* Multiplier EBITDA Last Year */
          tempMEbitdaLastYearAdd = item.soldPrice / (item.year2 - item.agreedWageForWorkingOwners)

          /* Multiplier PEBITDA Last Year */
          tempMPebitdaLastYearAdd =
            item.soldPrice / (item.year2 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner))

          /* Multiplier EBITDA Last Year With Stock */
          tempMEbitdaLastYearWithStockAdd =
            (item.soldPrice + item.stockValue) / (item.year2 - item.agreedWageForWorkingOwners)

          /* Multiplier PEBITDA Last Year with Stock */
          tempMPebitdaLastYearWithStockAdd =
            item.soldPrice /
            (item.year2 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner) + item.stockValue)

          went = true
        }
        if (item.year1 > 0 && !went) {
          tempEbitdaLastYearAdd = item.year1 - item.agreedWageForWorkingOwners

          /* PEBITDA Last Year */
          tempPebitdaLastYearAdd = item.year1 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner)

          /* Multiplier EBITDA Last Year */
          tempMEbitdaLastYearAdd = item.soldPrice / (item.year1 - item.agreedWageForWorkingOwners)

          /* Multiplier PEBITDA Last Year */
          tempMPebitdaLastYearAdd =
            item.soldPrice / (item.year1 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner))

          /* Multiplier EBITDA Last Year With Stock */
          tempMEbitdaLastYearWithStockAdd =
            (item.soldPrice + item.stockValue) / (item.year1 - item.agreedWageForWorkingOwners)

          /* Multiplier PEBITDA Last Year with Stock */
          tempMPebitdaLastYearWithStockAdd =
            item.soldPrice /
            (item.year1 - (item.agreedWageForWorkingOwners - item.agreedWageForMainOwner) + item.stockValue)

          went = true
        }

        /* Sold Price */
        tempSoldPrice = item.soldPrice + tempSoldPrice

        /* Stock Value */
        tempStockValue = item.stockValue + tempStockValue

        /* Assets Value */
        tempAssetsValue = item.assetValue + tempAssetsValue

        /* Price inc. Stock */
        tempPriceStock = item.soldPrice + item.stockValue + tempPriceStock

        /* T/O AVG Y X */
        tempTOAvgYX = item.soldPrice / item.latestFullYearTotalRevenue + tempTOAvgYX

        /* EBITDA Last Year */
        tempEbitdaLastYear = tempEbitdaLastYear + tempEbitdaLastYearAdd

        /* PEBITDA Last Year */
        tempPebitdaLastYear = tempPebitdaLastYearAdd + tempPebitdaLastYear

        /* Multiplier EBITDA Last Year */
        tempMEbitdaLastYear = tempMEbitdaLastYearAdd + tempMEbitdaLastYear

        /* Multiplier PEBITDA Last Year */
        tempMPebitdaLastYear = tempMPebitdaLastYearAdd + tempMPebitdaLastYear

        /* Multiplier EBITDA Last Year With Stock */
        tempMEbitdaLastYearWithStock = tempMEbitdaLastYearWithStockAdd + tempMEbitdaLastYearWithStock

        /* Multiplier PEBITDA Last Year With Stock */
        tempMPebitdaLastYearWithStock = tempMPebitdaLastYearWithStockAdd + tempMPebitdaLastYearWithStock
      })

      return {
        sumTO: tempTO,
        sumEbitdaLastYear: tempEbitdaLastYear,
        sumEbitdaAvg: tempEbitdaAvg,
        sumPebitdaLastYear: tempPebitdaLastYear,
        sumPebitdaAvg: tempPebitdaAvg,
        sumSoldPrice: tempSoldPrice,
        sumStockValue: tempStockValue,
        sumAssetsValue: tempAssetsValue,
        sumPriceStock: tempPriceStock,
        sumTOAvgYX: tempTOAvgYX,
        sumMEbitdaLastYear: tempMEbitdaLastYear,
        sumMEbitdaAvg: tempMEbitdaAvg,
        sumMPebitdaLastYear: tempMPebitdaLastYear,
        sumMPebitdaAvg: tempMPebitdaAvg,
        sumMEbitdaLastYearWithStock: tempMEbitdaLastYearWithStock,
        sumMEbitdaAvgWithStock: tempMEbitdaAvgWithStock,
        sumMPebitdaLastYearWithStock: tempMPebitdaLastYearWithStock,
        sumMPebitdaAvgWithStock: tempMPebitdaAvgWithStock
      }
    }
    return null
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
    this.props.saveSelectedList(this.props.listSelected, this.props.appraisalObject.id)
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
    if (this.props.listSelected.length > 9) {
      this._showMsg('10Business')
      return
    }
    if (this.props.listSelected.length === 0) {
      this.props.addSelectedList(objectBusinessSold)
    } else {
      if (!_.find(this.props.listSelected, o => o.id === objectBusinessSold.id)) {
        this.props.addSelectedList(objectBusinessSold)
      } else this._showMsg('added')
    }
  }

  _toggleModalConfirmDelete = idSelected => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Item',
        text: 'Are you sure you want to remove from the list?'
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          this.props.removeSelectedList(idSelected)
        }
      }
    })
  }

  _showMsg = message => {
    this.props.openModal(TypesModal.MODAL_TYPE_SHOW_MSG, {
      options: {
        title: 'Alert:',
        content: 'Got it!',
        text:
          message === 'added'
            ? 'You have already added this business to the list!'
            : 'You can only add 10 businesses in this list!'
      }
    })
  }

  _turnOver = businessSold => {
    return businessSold.soldPrice / businessSold.latestFullYearTotalRevenue
  }

  _ebitdaLastYear = businessSold => {
    if (businessSold.year4 > 0) return businessSold.year4 - businessSold.agreedWageForWorkingOwners
    if (businessSold.year3 > 0) return businessSold.year3 - businessSold.agreedWageForWorkingOwners
    if (businessSold.year2 > 0) return businessSold.year2 - businessSold.agreedWageForWorkingOwners
    if (businessSold.year1 > 0) return businessSold.year1 - businessSold.agreedWageForWorkingOwners
  }

  _ebitdaAvg = businessSold => {
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

    return totalYear / count - businessSold.agreedWageForWorkingOwners
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

  _pebitdaLastYear = businessSold => {
    if (businessSold.year4 > 0) {
      return businessSold.year4 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner)
    }
    if (businessSold.year3 > 0) {
      return businessSold.year3 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner)
    }
    if (businessSold.year2 > 0) {
      return businessSold.year2 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner)
    }
    if (businessSold.year1 > 0) {
      return businessSold.year1 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner)
    }
  }

  _pebitdaAvg = businessSold => {
    return this._ebitdaAvg(businessSold) + businessSold.agreedWageForMainOwner
  }

  _multiplierEbitdaLastYear = businessSold => {
    return businessSold.soldPrice / this._ebitdaLastYear(businessSold)
  }

  _multiplierEbitdaAvg = businessSold => {
    return businessSold.soldPrice / this._ebitdaAvg(businessSold)
  }

  _multiplierPebitdaLastYear = businessSold => {
    return businessSold.soldPrice / this._pebitdaLastYear(businessSold)
  }

  _multiplierPebitdaAvg = businessSold => {
    return businessSold.soldPrice / this._pebitdaAvg(businessSold)
  }

  _multiplierEbitdaLastYearWithStock = businessSold => {
    return (businessSold.soldPrice + businessSold.stockValue) / this._ebitdaLastYear(businessSold)
  }

  _multiplierEbitdaAvgWithStock = businessSold => {
    return (businessSold.soldPrice + businessSold.stockValue) / this._ebitdaAvg(businessSold)
  }

  _multiplierPebitdaLastYearWithStock = businessSold => {
    return businessSold.soldPrice / (this._pebitdaLastYear(businessSold) + businessSold.stockValue)
  }

  _multiplierPebitdaAvgWithStock = businessSold => {
    return businessSold.soldPrice / (this._pebitdaAvg(businessSold) + businessSold.stockValue)
  }

  render () {
    const { values, errors, touched, listBusinessesSold, isLoadingBusinessesSold, listSelected } = this.props
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
          <Table color="blue" celled size="small" compact inverted striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} textAlign="center" colSpan="11">
                  Sold Business Information
                </Table.HeaderCell>
                <Table.HeaderCell color="red" textAlign="center" colSpan="5">
                  Multiplier
                </Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} color="red" textAlign="center" colSpan="4">
                  Multiplier with Stock
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center" colSpan="3">
                  Notes
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell rowSpan="1">Business Type</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">T/O</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">EBITDA Last year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">EBITDA Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">PEBITDA Last Year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">PEBITDA Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">Trend</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">Sold Price</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">Stock Value</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">Assets Value</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">Price with Stock</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">T/O</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">EBITDA Last Year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">EBITDA Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">PEBITDA Last Year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">PEBITDA Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="3">EBITDA Last Year with Stock</Table.HeaderCell>
                <Table.HeaderCell rowSpan="3">EBITDA Avg with Stock</Table.HeaderCell>
                <Table.HeaderCell rowSpan="3">PEBITDA Last Year with Stock</Table.HeaderCell>
                <Table.HeaderCell rowSpan="3">PEBITDA Avg with Stock</Table.HeaderCell>
                <Table.HeaderCell rowSpan="4">Terms of Deal</Table.HeaderCell>
                <Table.HeaderCell rowSpan="4">Special Notes</Table.HeaderCell>
                <Table.HeaderCell rowSpan="4">Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {listSelected.map(selectedList => (
                <Table.Row active key={selectedList.id}>
                  <Table.Cell>{selectedList.businessType}</Table.Cell>
                  <Table.Cell>{numeral(selectedList.latestFullYearTotalRevenue).format('$0,0')}</Table.Cell>
                  <Table.Cell>{numeral(this._ebitdaLastYear(selectedList)).format('$0,0')}</Table.Cell>
                  <Table.Cell>{numeral(this._ebitdaAvg(selectedList)).format('$0,0')}</Table.Cell>
                  <Table.Cell>{numeral(this._pebitdaLastYear(selectedList)).format('$0,0')}</Table.Cell>
                  <Table.Cell>{numeral(this._pebitdaAvg(selectedList)).format('$0,0')}</Table.Cell>
                  <Table.Cell>
                    <Icon color={this._colorArrow(selectedList)} name={this._nameArrow(selectedList)} />
                  </Table.Cell>
                  <Table.Cell>{numeral(selectedList.soldPrice).format('$0,0')}</Table.Cell>
                  <Table.Cell>{numeral(selectedList.stockValue).format('$0,0')}</Table.Cell>
                  <Table.Cell>{numeral(selectedList.assetValue).format('$0,0')}</Table.Cell>
                  <Table.Cell>{numeral(selectedList.soldPrice + selectedList.stockValue).format('$0,0')}</Table.Cell>
                  <Table.Cell>{numeral(this._turnOver(selectedList)).format('0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(this._multiplierEbitdaLastYear(selectedList)).format('0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(this._multiplierEbitdaAvg(selectedList)).format('0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(this._multiplierPebitdaLastYear(selectedList)).format('0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(this._multiplierPebitdaAvg(selectedList)).format('0,0.[99]')}</Table.Cell>
                  <Table.Cell>
                    {numeral(this._multiplierEbitdaLastYearWithStock(selectedList)).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(this._multiplierEbitdaAvgWithStock(selectedList)).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(this._multiplierPebitdaLastYearWithStock(selectedList)).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(this._multiplierPebitdaAvgWithStock(selectedList)).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>{selectedList.termsOfDeal} </Table.Cell>
                  <Table.Cell>{selectedList.specialNotes} </Table.Cell>
                  <Table.Cell>
                    <Button icon onClick={() => this._toggleModalConfirmDelete(selectedList)}>
                      <Icon link color="red" name="trash" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row active>
                <Table.Cell>
                  <b>SUMMARY</b>
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumTO ? (
                    <b>{numeral(this.state.sumTO / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumEbitdaLastYear ? (
                    <b>{numeral(this.state.sumEbitdaLastYear / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumEbitdaAvg ? (
                    <b>{numeral(this.state.sumEbitdaAvg / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumPebitdaLastYear ? (
                    <b>{numeral(this.state.sumPebitdaLastYear / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumPebitdaAvg ? (
                    <b>{numeral(this.state.sumPebitdaAvg / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell />
                <Table.Cell>
                  {this.state.sumSoldPrice ? (
                    <b>{numeral(this.state.sumSoldPrice / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumStockValue ? (
                    <b>{numeral(this.state.sumStockValue / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumAssetsValue ? (
                    <b>{numeral(this.state.sumAssetsValue / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumPriceStock ? (
                    <b>{numeral(this.state.sumPriceStock / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumTOAvgYX ? (
                    <b>{numeral(this.state.sumTOAvgYX / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumMEbitdaLastYear ? (
                    <b>{numeral(this.state.sumMEbitdaLastYear / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumMEbitdaAvg ? (
                    <b>{numeral(this.state.sumMEbitdaAvg / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumMPebitdaLastYear ? (
                    <b>{numeral(this.state.sumMPebitdaLastYear / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumMPebitdaAvg ? (
                    <b>{numeral(this.state.sumMPebitdaAvg / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumMEbitdaLastYearWithStock ? (
                    <b>{numeral(this.state.sumMEbitdaLastYearWithStock / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumMEbitdaAvgWithStock ? (
                    <b>{numeral(this.state.sumMEbitdaAvgWithStock / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumMPebitdaLastYearWithStock ? (
                    <b>{numeral(this.state.sumMPebitdaLastYearWithStock / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumMPebitdaAvgWithStock ? (
                    <b>{numeral(this.state.sumMPebitdaAvgWithStock / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
              </Table.Row>
            </Table.Footer>
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
            <Table color="blue" celled inverted size="small" compact selectable structured collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} textAlign="center" colSpan="11">
                    Sold Business Information
                  </Table.HeaderCell>
                  <Table.HeaderCell color="red" textAlign="center" colSpan="5">
                    Multiplier
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} color="red" textAlign="center" colSpan="4">
                    Multiplier with Stock
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" colSpan="2">
                    Notes
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell rowSpan="1">Business Type</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">T/O</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">EBITDA Last year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">EBITDA Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">PEBITDA Last Year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">PEBITDA Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Trend</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Sold Price</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Stock Value</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Assets Value</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Price with Stock</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">T/O</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">EBITDA Last Year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">EBITDA Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">PEBITDA Last Year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">PEBITDA Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">EBITDA Last Year with Stock</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">EBITDA Avg with Stock</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">PEBITDA Last Year with Stock</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">PEBITDA Avg with Stock</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="4">Terms of Deal</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="4">Special Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listBusinessesSold.map(businessSold => (
                  <Table.Row active key={businessSold.id} onClick={() => this._addToSelectedList(businessSold)}>
                    <Table.Cell>{businessSold.businessType}</Table.Cell>
                    <Table.Cell>{numeral(businessSold.latestFullYearTotalRevenue).format('$0,0')}</Table.Cell>
                    <Table.Cell>{numeral(this._ebitdaLastYear(businessSold)).format('$0,0')}</Table.Cell>
                    <Table.Cell>{numeral(this._ebitdaAvg(businessSold)).format('$0,0')}</Table.Cell>
                    <Table.Cell>{numeral(this._pebitdaLastYear(businessSold)).format('$0,0')}</Table.Cell>
                    <Table.Cell>{numeral(this._pebitdaAvg(businessSold)).format('$0,0')}</Table.Cell>
                    <Table.Cell>
                      <Icon color={this._colorArrow(businessSold)} name={this._nameArrow(businessSold)} />
                    </Table.Cell>
                    <Table.Cell>{numeral(businessSold.soldPrice).format('$0,0')}</Table.Cell>
                    <Table.Cell>{numeral(businessSold.stockValue).format('$0,0')}</Table.Cell>
                    <Table.Cell>{numeral(businessSold.assetValue).format('$0,0')}</Table.Cell>
                    <Table.Cell>{numeral(businessSold.soldPrice + businessSold.stockValue).format('$0,0')}</Table.Cell>
                    <Table.Cell>{numeral(this._turnOver(businessSold)).format('0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._multiplierEbitdaLastYear(businessSold)).format('0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._multiplierEbitdaAvg(businessSold)).format('0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._multiplierPebitdaLastYear(businessSold)).format('0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._multiplierPebitdaAvg(businessSold)).format('0,0.[99]')}</Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierEbitdaLastYearWithStock(businessSold)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierEbitdaAvgWithStock(businessSold)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierPebitdaLastYearWithStock(businessSold)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierPebitdaAvgWithStock(businessSold)).format('0,0.[99]')}
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
  getSelectedList: PropTypes.func,
  listSelected: PropTypes.array,
  addSelectedList: PropTypes.func,
  removeSelectedList: PropTypes.func,
  isLoadingListSelected: PropTypes.bool
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
    isLoadingBusinessesSold: state.businessSold.getAll.isLoading,
    listSelected: state.businessSold.getList.array,
    isLoadingListSelected: state.businessSold.getList.isLoading
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAppraisal,
      getBusinessesSold,
      openModal,
      saveSelectedList,
      getSelectedList,
      addSelectedList,
      removeSelectedList
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
  })(ComparableDataPage)
)
