import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Grid } from 'semantic-ui-react'

import { getBuyersFromBusiness } from '../../redux/ducks/business'

import Wrapper from '../../components/content/Wrapper'

class BuyerListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getBuyersFromBusiness(this.props.match.params.id)
  }

  render () {
    const { listBuyersList, history } = this.props

    return (
      <Wrapper>
        <Grid padded="horizontally">
          <Grid.Row>
            <Table color="blue" celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Buyer</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listBuyersList.map(buyersList => (
                  <Table.Row
                    active
                    key={buyersList.Buyer.id}
                    onClick={() =>
                      history.push(
                        `/buyer/${buyersList.Buyer.id}/business/${
                          this.props.match.params.id
                        }`
                      )
                    }
                  >
                    <Table.Cell>{buyersList.Buyer.firstName}</Table.Cell>
                    <Table.Cell>{buyersList.Buyer.buyerNotes}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

BuyerListPage.propTypes = {
  getBuyersFromBusiness: PropTypes.func,
  match: PropTypes.object,
  listBuyersList: PropTypes.array,
  history: PropTypes.object
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBuyersFromBusiness }, dispatch)

const mapStateToProps = state => ({
  listBuyersList: state.business.getBuyersFromBusiness.array
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerListPage)
