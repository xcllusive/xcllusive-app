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
      sumAvgEbitda: null,
      sumLastYearEbitda: null,
      sumSoldPrice: null,
      sumStockValue: null,
      sumAssetsValue: null,
      sumPriceStock: null,
      sumTOAvgYX: null,
      sumLastYX: null,
      sumLastStockX: null,
      sumAvgEbitdaX: null,
      sumAvgEbitdaXStockX: null
    }
  }

  componentDidMount () {
    this.props.getBusinessesSold(this.props.values)
    this.props.getSelectedList(this.props.appraisalObject.id)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.listSelected && nextProps.listSelected !== prevState.isLoadingListSelected) {
      var tempTO = 0
      var tempAvgEbitda = 0
      var tempLastYearEbitda = 0
      var tempSoldPrice = 0
      var tempStockValue = 0
      var tempAssetsValue = 0
      var tempPriceStock = 0
      var tempTOAvgYX = 0
      var tempLastYX = 0
      var tempLastYXAdd = 0
      var tempLastStockX = 0
      var tempLastStockXAdd = 0
      var tempAvgEbitdaX = 0
      var tempAvgEbitdaXStockX = 0
      nextProps.listSelected.forEach(function (item) {
        /* T/O */
        tempTO = item.latestFullYearTotalRevenue + tempTO

        /* Average Ebitda */
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
        var avgEbitda = 0
        avgEbitda = totalYear / count
        tempAvgEbitda = avgEbitda + tempAvgEbitda

        /* Avg Ebitda X */
        var avgEbitdaX = item.soldPrice / (totalYear / count)
        tempAvgEbitdaX = avgEbitdaX + tempAvgEbitdaX

        /* Avg Ebitda X + Stock X */
        var avgEbitdaXStockX = (item.soldPrice + item.stockValue) / (totalYear / count)
        tempAvgEbitdaXStockX = avgEbitdaXStockX + tempAvgEbitdaXStockX

        /* Last Year Ebitda */
        var went = false
        if (item.year4 > 0) {
          tempLastYearEbitda = item.year4 + tempLastYearEbitda

          /* Last Y X */
          tempLastYXAdd = item.soldPrice / item.year4

          /* Last + Stock X */
          tempLastStockXAdd = (item.soldPrice + item.stockValue) / item.year4

          went = true
        }
        if (item.year3 > 0 && !went) {
          tempLastYearEbitda = item.year3 + tempLastYearEbitda

          /* Last Y X */
          tempLastYXAdd = item.soldPrice / item.year3

          /* Last + Stock X */
          tempLastStockXAdd = (item.soldPrice + item.stockValue) / item.year3

          went = true
        }
        if (item.year2 > 0 && !went) {
          tempLastYearEbitda = item.year2 + tempLastYearEbitda

          /* Last Y X */
          tempLastYXAdd = item.soldPrice / item.year2

          /* Last + Stock X */
          tempLastStockXAdd = (item.soldPrice + item.stockValue) / item.year2

          went = true
        }
        if (item.year1 > 0 && !went) {
          tempLastYearEbitda = item.year1 + tempLastYearEbitda

          /* Last Y X */
          tempLastYXAdd = item.soldPrice / item.year1

          /* Last + Stock X */
          tempLastStockXAdd = (item.soldPrice + item.stockValue) / item.year1

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

        /* Last Y X */
        tempLastYX = tempLastYXAdd + tempLastYX

        /* Last + Stock X */
        tempLastStockX = tempLastStockXAdd + tempLastStockX
      })

      return {
        sumTO: tempTO,
        sumAvgEbitda: tempAvgEbitda,
        sumLastYearEbitda: tempLastYearEbitda,
        sumSoldPrice: tempSoldPrice,
        sumStockValue: tempStockValue,
        sumAssetsValue: tempAssetsValue,
        sumPriceStock: tempPriceStock,
        sumTOAvgYX: tempTOAvgYX,
        sumLastYX: tempLastYX,
        sumLastStockX: tempLastStockX,
        sumAvgEbitdaX: tempAvgEbitdaX,
        sumAvgEbitdaXStockX: tempAvgEbitdaXStockX
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
    if (this.props.listSelected.length === 0) {
      this.props.addSelectedList(objectBusinessSold)
    } else {
      if (!_.find(this.props.listSelected, o => o.id === objectBusinessSold.id)) {
        this.props.addSelectedList(objectBusinessSold)
      } else this._showMsg()
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
          // this.setState(prevState => ({
          //   selectedList: [..._.remove(this.state.selectedList, item => item.id === idSelected)]
          // }))
          this.props.removeSelectedList(idSelected)
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

  _lastYearEbitda = businessSold => {
    if (businessSold.year4 > 0) return businessSold.year4 - businessSold.agreedWageForWorkingOwners
    if (businessSold.year3 > 0) return businessSold.year3 - businessSold.agreedWageForWorkingOwners
    if (businessSold.year2 > 0) return businessSold.year2 - businessSold.agreedWageForWorkingOwners
    if (businessSold.year1 > 0) return businessSold.year1 - businessSold.agreedWageForWorkingOwners
  }

  _averageEbitda = businessSold => {
    let count = 0
    let totalYear = 0

    /* MINUS (Agreed Wage For Working Owners) <- business stage sold */

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

  _pEbitdaLastYear = businessSold => {
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

  _pEbitdaAvg = businessSold => {
    if (businessSold.business_id === 20) console.log(businessSold)
    return (
      this._averageEbitda(businessSold) -
      (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner) +
      businessSold.agreedWageForMainOwner
    )
  }

  _pEbitdaLastYearStock = businessSold => {
    return this._pEbitdaLastYear(businessSold) + businessSold.stockValue
  }

  _pEbitdaAvgStock = businessSold => {
    return this._pEbitdaAvg(businessSold) + businessSold.stockValue
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
          <Table color="blue" celled inverted size="small" compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Business Type</Table.HeaderCell>
                <Table.HeaderCell>T/O</Table.HeaderCell>
                <Table.HeaderCell>Average Ebitda</Table.HeaderCell>
                <Table.HeaderCell>Last year Ebitda</Table.HeaderCell>
                <Table.HeaderCell>Trend</Table.HeaderCell>
                <Table.HeaderCell>Sold Price</Table.HeaderCell>
                <Table.HeaderCell>Stock Value</Table.HeaderCell>
                <Table.HeaderCell>Assets Value</Table.HeaderCell>
                <Table.HeaderCell>Price inc. Stock</Table.HeaderCell>
                <Table.HeaderCell>T/O Avr Y X</Table.HeaderCell>
                <Table.HeaderCell>Last Y X</Table.HeaderCell>
                <Table.HeaderCell>Last + Stock X</Table.HeaderCell>
                <Table.HeaderCell>Avg Ebitda X</Table.HeaderCell>
                <Table.HeaderCell>Avg Ebitda + Stock X</Table.HeaderCell>
                <Table.HeaderCell>Terms Of Deal</Table.HeaderCell>
                <Table.HeaderCell>Special Notes</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {listSelected.map(selectedList => (
                <Table.Row active key={selectedList.id}>
                  <Table.Cell>{selectedList.businessType}</Table.Cell>
                  <Table.Cell>{numeral(selectedList.latestFullYearTotalRevenue).format('$0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(this._averageEbitda(selectedList)).format('$0,0.[99]')}</Table.Cell>
                  <Table.Cell>{numeral(this._lastYearEbitda(selectedList)).format('$0,0.[99]')}</Table.Cell>
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
                    {numeral(selectedList.soldPrice / this._lastYearEbitda(selectedList)).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(
                      (selectedList.soldPrice + selectedList.stockValue) / this._lastYearEbitda(selectedList)
                    ).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(selectedList.soldPrice / this._averageEbitda(selectedList)).format('0,0.[99]')}
                  </Table.Cell>
                  <Table.Cell>
                    {numeral(
                      (selectedList.soldPrice + selectedList.stockValue) / this._averageEbitda(selectedList)
                    ).format('0,0.[99]')}
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
                  {this.state.sumAvgEbitda ? (
                    <b>{numeral(this.state.sumAvgEbitda / listSelected.length).format('$0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumLastYearEbitda ? (
                    <b>{numeral(this.state.sumLastYearEbitda / listSelected.length).format('$0,0.[99]')}</b>
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
                  {this.state.sumLastYX ? (
                    <b>{numeral(this.state.sumLastYX / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumLastStockX ? (
                    <b>{numeral(this.state.sumLastStockX / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumAvgEbitdaX ? (
                    <b>{numeral(this.state.sumAvgEbitdaX / listSelected.length).format('0,0.[99]')}</b>
                  ) : null}
                </Table.Cell>
                <Table.Cell>
                  {this.state.sumAvgEbitdaXStockX ? (
                    <b>{numeral(this.state.sumAvgEbitdaXStockX / listSelected.length).format('0,0.[99]')}</b>
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
            <Table color="blue" celled inverted size="small" compact selectable structured>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} textAlign="center" colSpan="9">
                    Sold Business Information
                  </Table.HeaderCell>
                  <Table.HeaderCell color="red" textAlign="center" colSpan="4">
                    Multiplier
                  </Table.HeaderCell>
                  <Table.HeaderCell color="red" textAlign="center" colSpan="5">
                    Values
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ backgroundColor: '#115ea2' }} textAlign="center" colSpan="2">
                    Notes
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell rowSpan="1">Business Type</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">T/O</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Average EBITDA</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Last year EBITDA</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">Average PEBITDA</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">Last Year PEBITDA</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Trend</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Sold Price</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Stock Value</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Assets Value</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="1">Price inc. Stock</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">T/O</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Last Year EBITDA</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Last Year EBITDA Inc. Stock</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Avg EBITDA X</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Avg EBITDA + Stock X</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">M. PEBITDA Last Year + Stock</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="3">PEBITDA Average + Stock</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="4">Terms Of Deal</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="4">Special Notes</Table.HeaderCell>
                </Table.Row>
                <Table.Row />
                <Table.Row />
              </Table.Header>
              <Table.Body>
                {listBusinessesSold.map(businessSold => (
                  <Table.Row active key={businessSold.id} onClick={() => this._addToSelectedList(businessSold)}>
                    <Table.Cell>{businessSold.businessType}</Table.Cell>
                    <Table.Cell>{numeral(businessSold.latestFullYearTotalRevenue).format('$0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._averageEbitda(businessSold)).format('$0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._lastYearEbitda(businessSold)).format('$0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._pEbitdaAvg(businessSold)).format('0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._pEbitdaLastYear(businessSold)).format('0,0.[99]')}</Table.Cell>
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
                      {numeral(businessSold.soldPrice / this._lastYearEbitda(businessSold)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(
                        (businessSold.soldPrice + businessSold.stockValue) / this._lastYearEbitda(businessSold)
                      ).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(businessSold.soldPrice / this._averageEbitda(businessSold)).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>
                      {numeral(
                        (businessSold.soldPrice + businessSold.stockValue) / this._averageEbitda(businessSold)
                      ).format('0,0.[99]')}
                    </Table.Cell>
                    <Table.Cell>{numeral(this._pEbitdaLastYearStock(businessSold)).format('0,0.[99]')}</Table.Cell>
                    <Table.Cell>{numeral(this._pEbitdaAvgStock(businessSold)).format('0,0.[99]')}</Table.Cell>
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
