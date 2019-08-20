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
  Button,
  Dropdown,
  Radio,
  Popup
} from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal, getAppraisal } from '../../../redux/ducks/appraisal'
import { OptionsPriceSelectBuyer, OptionsStockValue } from '../../../constants/OptionsPriceSelect'
import {
  getBusinessesSold,
  saveSelectedList,
  getSelectedList,
  addSelectedList,
  removeSelectedList,
  getBusinessTypeAny
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
        { key: 3, text: '50 Businesses', value: 50 },
        { key: 4, text: 'Show All', value: 49 }
      ],
      priceOptions: OptionsPriceSelectBuyer,
      stockValueOptions: OptionsStockValue,
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
      sumMTO: null,
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
    this.props.getBusinessTypeAny()
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
      var tempMTO = 0
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

        /* MULTIPLIER T/O */
        tempMTO = item.soldPrice / item.latestFullYearTotalRevenue + tempMTO

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
        sumMTO: tempMTO,
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

  async componentWillUnmount () {
    if (this.props.appraisalObject.comparableDataSelectedList !== null) {
      const mergeObjects = this._assignObject()
      if (this.props.appraisalObject.confirmPricing && this._hasTheListBeenChanged()) {
        mergeObjects.confirmPricing = false
      }
      await this.props.updateAppraisal(mergeObjects)
      if (this.props.appraisalObject.confirmPricing && this._hasTheListBeenChanged()) {
        this.props.getAppraisal(this.props.appraisalObject.id)
      }

      this.props.saveSelectedList(this.props.listSelected, this.props.appraisalObject.id)
    }
  }

  _hasTheListBeenChanged () {
    const currentList = this.props.listSelected.map(item => {
      return item.id
    })
    const savedList = JSON.parse(this.props.appraisalObject.comparableDataSelectedList).sort(function (a, b) {
      return a - b
    })

    if (!_.isEqual(currentList, savedList)) return true
    else return false
  }

  _handleCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _assignObject () {
    const objectSum = {
      sumMEbitdaLastYear: numeral(this.state.sumMEbitdaLastYear / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', ''),
      sumMEbitdaAvg: numeral(this.state.sumMEbitdaAvg / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', ''),
      sumMPebitdaLastYear: numeral(this.state.sumMPebitdaLastYear / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', ''),
      sumMPebitdaAvg: numeral(this.state.sumMPebitdaAvg / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', ''),
      sumMEbitdaLastYearWithStock: numeral(this.state.sumMEbitdaLastYearWithStock / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', ''),
      sumMEbitdaAvgWithStock: numeral(this.state.sumMEbitdaAvgWithStock / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', ''),
      sumMPebitdaLastYearWithStock: numeral(this.state.sumMPebitdaLastYearWithStock / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', ''),
      sumMPebitdaAvgWithStock: numeral(this.state.sumMPebitdaAvgWithStock / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', ''),
      sumMTO: numeral(this.state.sumMTO / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', ''),
      sumAssetsValue: numeral(this.state.sumAssetsValue / this.props.listSelected.length)
        .format('0,0.[99]')
        .replace(',', '')
    }
    return Object.assign(this.props.values, objectSum)
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  async _handleChangeCheckBoxTrend (data) {
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
    // this.props.getBusinessesSold(this.props.values)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
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

  _handleSearch = () => {
    this.props.getBusinessesSold(this.props.values)
  }

  _checkBusinessAlreadySelected = id => {
    // for (let i = 0; i < this.props.listSelected.length; i++) {
    //   console.log('test')
    // }
    const test = _.find(this.props.listSelected, o => {
      return o.id === id
    })

    return test
  }

  render () {
    const {
      values,
      errors,
      touched,
      listBusinessesSold,
      isLoadingBusinessesSold,
      listSelected,
      typeOptions,
      handleChange
    } = this.props
    const { priceOptions, lastBusinessOptions, stockValueOptions } = this.state
    // console.log(listSelected)
    return (
      <Wrapper>
        <Segment style={{ backgroundColor: '#ffe7a273', marginTop: '0px' }} size="small">
          <Step.Group size="large">
            <Step active icon="balance scale" title="Step 5" description="Comparable Data" />
            <Message style={{ marginTop: '0px' }} info size="large">
              <p>
                Using the search function, enter in suitable criteria to generate a list of suggested comparable sales.
                Select the businesses that you think are most appropriate to use or delete by clicking the bin icon.
              </p>
            </Message>
          </Step.Group>
        </Segment>
        <Form>
          <Segment style={{ backgroundColor: '#008eff26' }}>
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
                  onChange={this._handleSelectChange}
                />
                {errors.lastBusiness && touched.lastBusiness && (
                  <Label basic color="red" pointing content={errors.lastBusiness} />
                )}
              </Form.Field>
              <Form.Field width={4}>
                <label>Business Type</label>
                <Dropdown
                  name="businessType"
                  placeholder="Business Type"
                  fluid
                  search
                  selection
                  loading={this.state.isLoadingBusinessesSold}
                  options={typeOptions}
                  value={values.businessType}
                  onChange={this._handleSelectChange}
                />
                {errors.businessType && touched.businessType && (
                  <Label basic color="red" pointing content={errors.businessType} />
                )}
              </Form.Field>
              <Form.Field width={3}>
                <Form.Input
                  label="Industry"
                  name="industry"
                  placeholder="Type anything to match..."
                  autoComplete="industry"
                  value={values.industry}
                  onChange={handleChange}
                />
                {errors.industry && touched.industry && <Label basic color="red" pointing content={errors.industry} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  label="PEBITDA From"
                  options={priceOptions}
                  name="pebitdaFrom"
                  autoComplete="pebitdaFrom"
                  value={values.pebitdaFrom}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label="PEBITDA To"
                  options={priceOptions}
                  name="pebitdaTo"
                  autoComplete="pebitdaTo"
                  value={values.pebitdaTo}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              <Form.Field
                style={{ marginLeft: '10px', marginTop: '35px' }}
                control={Radio}
                label="Last Year"
                name="pebitdaLastYearOrAvg"
                onChange={this._handleChangeCheckBox}
                checked={values.pebitdaLastYearOrAvg}
              />
              <Form.Field
                style={{ marginLeft: '10px', marginTop: '35px' }}
                control={Radio}
                label="Avg"
                name="pebitdaLastYearOrAvg"
                onChange={this._handleChangeCheckBox}
                checked={!values.pebitdaLastYearOrAvg}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  label="EBITDA From"
                  options={priceOptions}
                  name="ebitdaFrom"
                  autoComplete="ebitdaFrom"
                  value={values.ebitdaFrom}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label="EBITDA To"
                  options={priceOptions}
                  name="ebitdaTo"
                  autoComplete="ebitdaTo"
                  value={values.ebitdaTo}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              <Form.Field
                style={{ marginLeft: '10px', marginTop: '35px' }}
                control={Radio}
                label="Last Year"
                name="ebitdaLastYearOrAvg"
                onChange={this._handleChangeCheckBox}
                checked={values.ebitdaLastYearOrAvg}
              />
              <Form.Field
                style={{ marginLeft: '10px', marginTop: '35px' }}
                control={Radio}
                label="Avg"
                name="ebitdaLastYearOrAvg"
                onChange={this._handleChangeCheckBox}
                checked={!values.ebitdaLastYearOrAvg}
              />
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
                  onChange={async (e, data) => {
                    this._handleChangeCheckBoxTrend(data)
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
                    this._handleChangeCheckBoxTrend(data)
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
                    this._handleChangeCheckBoxTrend(data)
                  }}
                />
                <Icon style={{ marginLeft: '5px' }} name="arrow right" color="yellow" />
              </Grid.Column>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  label="Stock Value"
                  options={stockValueOptions}
                  name="stockValue"
                  autoComplete="stockValue"
                  value={values.stockValue}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              <Form.Field style={{ marginTop: '22px', marginLeft: '50px' }}>
                <Button
                  positive
                  icon="search"
                  labelPosition="right"
                  content="Search"
                  loading={this.state.isLoadingBusinessesSold}
                  disabled={this.state.isLoadingBusinessesSold}
                  onClick={this._handleSearch}
                />
              </Form.Field>
            </Form.Group>
          </Segment>
        </Form>
        <Segment style={{ backgroundColor: '#daf3e4' }} size="tiny">
          <Header style={{ marginBottom: '0px' }} as="h4" textAlign="right">
            (E) = EBITDA / (P) = PEBITDA
          </Header>
          <Header style={{ marginTop: '0px' }} as="h3" textAlign="center">
            Your Selected List
          </Header>
          <Table color="blue" celled inverted size="small" compact selectable structured collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} textAlign="center" colSpan="12">
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
                <Table.HeaderCell rowSpan="1">Industry</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">T/O</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">(E) Last Year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">(E) Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">(P) Last Year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">(P) Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">Trend</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">Sold Price</Table.HeaderCell>
                <Table.HeaderCell rowSpan="1">Stock Value</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">Assets Value</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">Price w. Stock</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">T/O</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">(E) Last Year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">(E) Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">(P) Last Year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">(P) Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="3">(E) Last Year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="3">(E) Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="3">(P) Last Year</Table.HeaderCell>
                <Table.HeaderCell rowSpan="3">(P) Avg</Table.HeaderCell>
                <Table.HeaderCell rowSpan="4" />
                <Table.HeaderCell rowSpan="4">Delete</Table.HeaderCell>
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
                    <Table.Cell>{selectedList.industry.substr(0, 10)}</Table.Cell>
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
                    <Table.Cell>{numeral(this._turnOver(selectedList).toFixed(1)).format('0,0.[99]')}</Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierEbitdaLastYear(selectedList).toFixed(1)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierEbitdaAvg(selectedList).toFixed(1)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierPebitdaLastYear(selectedList).toFixed(1)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierPebitdaAvg(selectedList).toFixed(1)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierEbitdaLastYearWithStock(selectedList).toFixed(1)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierEbitdaAvgWithStock(selectedList).toFixed(1)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierPebitdaLastYearWithStock(selectedList).toFixed(1)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(this._multiplierPebitdaAvgWithStock(selectedList).toFixed(1)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {selectedList.termsOfDeal ? (
                        <Popup
                          content={selectedList.termsOfDeal}
                          trigger={<Button size="mini" color="green" icon="comment outline" />}
                        />
                      ) : null}
                      {selectedList.specialNotes ? (
                        <Popup
                          content={selectedList.specialNotes}
                          trigger={<Button size="mini" color="olive" icon="comment outline" />}
                        />
                      ) : null}
                    </Table.Cell>
                    <Table.Cell>
                      <Button icon onClick={() => this._toggleModalConfirmDelete(selectedList)}>
                        <Icon link color="red" name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            ) : null}
            <Table.Footer>
              <Table.Row active>
                <Table.Cell>
                  <b>SUMMARY</b>
                </Table.Cell>
                <Table.Cell />
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
                  {this.state.sumMTO ? (
                    <b>{numeral(this.state.sumMTO / listSelected.length).format('0,0.[99]')}</b>
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
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
        <Segment style={{ backgroundColor: '#008eff26' }} size="tiny">
          <Header as="h3" textAlign="center">
            Database`s List
          </Header>
          <Dimmer.Dimmable dimmed={isLoadingBusinessesSold}>
            <Dimmer inverted active={isLoadingBusinessesSold}>
              <Loader>Loading</Loader>
            </Dimmer>
            <Table color="blue" celled inverted size="small" compact selectable structured collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} textAlign="center" colSpan="12">
                    Sold Business Information
                  </Table.HeaderCell>
                  <Table.HeaderCell color="red" textAlign="center" colSpan="5">
                    Multiplier
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} color="red" textAlign="center" colSpan="4">
                    Multiplier with Stock
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" colSpan="1">
                    Notes
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell rowSpan="1" width={2}>
                    Business Type
                  </Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Industry</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">T/O</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">(E) Last Year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">(E) Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">(P) Last Year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">(P) Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Trend</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Sold Price</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Stock Value</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Assets Value</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Price</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">T/O</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">(E) Last Year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">(E) Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">(P) Last Year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">(P) Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">(E) Last Year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">(E) Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">(P) Last Year</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">(P) Avg</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="4" />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listBusinessesSold &&
                  listBusinessesSold.map(businessSold => (
                    <Table.Row active key={businessSold.id} onClick={() => this._addToSelectedList(businessSold)}>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        <Icon link name="search" onClick={() => window.open(`/business/${businessSold.business_id}`)} />
                        {businessSold.label}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        {businessSold.industry.substr(0, 10)}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        {numeral(businessSold.latestFullYearTotalRevenue).format('$0,0')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        {numeral(this._ebitdaLastYear(businessSold)).format('$0,0')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        {numeral(this._ebitdaAvg(businessSold)).format('$0,0')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._pebitdaLastYear(businessSold)).format('$0,0')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        {numeral(this._pebitdaAvg(businessSold)).format('$0,0')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        <Icon color={this._colorArrow(businessSold)} name={this._nameArrow(businessSold)} />
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(businessSold.soldPrice).format('$0,0')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        {numeral(businessSold.stockValue).format('$0,0')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        {numeral(businessSold.assetValue).format('$0,0')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        {numeral(businessSold.soldPrice + businessSold.stockValue).format('$0,0')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._turnOver(businessSold).toFixed(1)).format('0,0.[99]')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._multiplierEbitdaLastYear(businessSold).toFixed(1)).format('0,0.[99]')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._multiplierEbitdaAvg(businessSold).toFixed(1)).format('0,0.[99]')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._multiplierPebitdaLastYear(businessSold).toFixed(1)).format('0,0.[99]')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._multiplierPebitdaAvg(businessSold).toFixed(1)).format('0,0.[99]')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._multiplierEbitdaLastYearWithStock(businessSold).toFixed(1)).format('0,0.[99]')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._multiplierEbitdaAvgWithStock(businessSold).toFixed(1)).format('0,0.[99]')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._multiplierPebitdaLastYearWithStock(businessSold).toFixed(1)).format('0,0.[99]')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : '#c5bfbf'
                        }}
                      >
                        {numeral(this._multiplierPebitdaAvgWithStock(businessSold).toFixed(1)).format('0,0.[99]')}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          backgroundColor: this._checkBusinessAlreadySelected(businessSold.id) ? '#f9a815bd' : null
                        }}
                      >
                        {businessSold.termsOfDeal ? (
                          <Popup
                            content={businessSold.termsOfDeal}
                            trigger={<Button size="mini" color="green" icon="comment outline" />}
                          />
                        ) : null}
                        {businessSold.specialNotes ? (
                          <Popup
                            content={businessSold.specialNotes}
                            trigger={<Button size="mini" color="olive" icon="comment outline" />}
                          />
                        ) : null}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Dimmer.Dimmable>
        </Segment>
        <Form.Group>
          <Form.Field>
            <Form.Checkbox
              label="Please confirm that you have completed the above information"
              name="confirmComparableData"
              onChange={this._handleCheckBox}
              disabled={this.props.listSelected && this.props.listSelected.length === 0}
              checked={values.confirmComparableData}
              onClick={() => this.props.confirmsCompleteSteps('confirmComparableData', !values.confirmComparableData)}
            />
          </Form.Field>
        </Form.Group>
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
  isLoadingListSelected: PropTypes.bool,
  confirmsCompleteSteps: PropTypes.func,
  typeOptions: PropTypes.array,
  getBusinessTypeAny: PropTypes.func,
  getAppraisal: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  lastBusiness: 20,
  businessType: '',
  priceFrom: 0,
  priceTo: 0,
  pebitdaFrom: 0,
  pebitdaTo: 0,
  pebitdaLastYearOrAvg: true,
  ebitdaFrom: 0,
  ebitdaTo: 0,
  ebitdaLastYearOrAvg: true,
  trend: ['up', 'down', 'steady'],
  sumMEbitdaLastYear: 0,
  industry: '',
  stockValue: 0
})

const mapStateToProps = state => {
  return {
    listBusinessesSold: state.businessSold.getAll.array,
    isLoadingBusinessesSold: state.businessSold.getAll.isLoading,
    listSelected: state.businessSold.getList.array,
    isLoadingListSelected: state.businessSold.getList.isLoading,
    typeOptions: state.businessSold.getBusinessTypeAny.array
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
      removeSelectedList,
      getBusinessTypeAny,
      getAppraisal
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
