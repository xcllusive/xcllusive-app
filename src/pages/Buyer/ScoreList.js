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
                <Header
                  as="h2"
                  color="blue"
                  content={`Sellability Score Log: ${business.businessName}`}
                />
              </Grid.Column>
              <Grid.Column>
                <Button
                  color="facebook"
                  onClick={() => history.push(`/buyer/business/${business.id}/makeNewScore`)}
                  size="small"
                  floated="right"
                >
                  <Icon name="star" />
                  Make New Score
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
                      <Table.HeaderCell>Created</Table.HeaderCell>
                      <Table.HeaderCell>Title</Table.HeaderCell>
                      <Table.HeaderCell>Score</Table.HeaderCell>
                      <Table.HeaderCell>Sent</Table.HeaderCell>
                      <Table.HeaderCell>Edit</Table.HeaderCell>
                      <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {listBuyersList.map(buyersList => (
                      <Table.Row
                        active
                        key={buyersList.Buyer.id}
                      >
                        <Table.Cell>
                          {buyersList.Buyer.firstName} {buyersList.Buyer.surname}
                        </Table.Cell>
                        <Table.Cell>{buyersList.Buyer.buyerNotes}</Table.Cell>
                        <Table.Cell>{30}</Table.Cell>
                        <Table.Cell>{'Yes'}</Table.Cell>
                        <Table.Cell><Icon
                          link
                          name="edit"
                          size="large"
                          // onClick={() => this._editBusiness(sourceOptions, 1)}
                        /></Table.Cell>
                        <Table.Cell><Icon
                          link
                          name="trash"
                          color="red"
                          size="large"
                          // onClick={() =>
                          //   this._toggleModalConfirm(sourceOptions.value, 1)
                          // }
                        /></Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Grid.Row>
            </Grid>
          ) : null}
          <Grid style={{ marginTop: 0 }}>
            <Grid.Column>
              <Button
                color="green"
                onClick={() => history.push('/buyer')}
                size="small"
                floated="left"
              >
                <Icon name="backward" />
                  Return to Business
              </Button>
            </Grid.Column>
          </Grid>
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
