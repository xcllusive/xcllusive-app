import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Table,
  Grid,
  Header,
  Dimmer,
  Loader,
  Button,
  Icon
} from 'semantic-ui-react'

import { getBuyersFromBusiness, getBusiness } from '../../redux/ducks/business'

import Wrapper from '../../components/content/Wrapper'

class ScoreListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getBuyersFromBusiness(this.props.match.params.id)
    this.props.getBusiness(this.props.match.params.id)
  }

  render () {
    const { listBuyersList, history, business, isLoadingBusiness } = this.props
    return (
      <Wrapper>
        <Dimmer.Dimmable dimmed={isLoadingBusiness} style={{ height: '80vh' }}>
          <Dimmer inverted active={isLoadingBusiness}>
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid style={{ marginTop: 0 }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                {listBuyersList ? (
                  <Header
                    as="h2"
                    content={`${business.businessName} / (${
                      listBuyersList.length
                    } records)`}
                  />
                ) : <Header
                  as="h2"
                  content={'0 records'}
                />}
              </Grid.Column>
              <Grid.Column>
                <Button
                  color="green"
                  onClick={() => history.push('/buyer')}
                  size="small"
                  floated="right"
                >
                  <Icon name="backward" />
                  Return to Business
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {listBuyersList ? (
            <Grid padded="horizontally" style={{ marginTop: 0 }}>
              <Grid.Row>
                <Table
                  color="blue"
                  celled
                  inverted
                  selectable
                  size="small"
                  compact
                >
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
                        <Table.Cell>
                          {buyersList.Buyer.firstName} {buyersList.Buyer.surname}
                        </Table.Cell>
                        <Table.Cell>{buyersList.Buyer.buyerNotes}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Grid.Row>
            </Grid>
          ) : null}

        </Dimmer.Dimmable>
      </Wrapper>
    )
  }
}

ScoreListPage.propTypes = {
  getBuyersFromBusiness: PropTypes.func,
  match: PropTypes.object,
  listBuyersList: PropTypes.array,
  history: PropTypes.object,
  getBusiness: PropTypes.func,
  business: PropTypes.object,
  isLoadingBusiness: PropTypes.bool
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBuyersFromBusiness, getBusiness }, dispatch)

const mapStateToProps = state => ({
  listBuyersList: state.business.getBuyersFromBusiness.array,
  business: state.business.get.object,
  isLoadingBusiness: state.business.get.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(ScoreListPage)
