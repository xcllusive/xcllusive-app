import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Grid, Header, Button, Icon, Pagination, Form } from 'semantic-ui-react'

import { getBusinessFromBuyer } from '../../redux/ducks/buyer'
import { listScore, removeScore } from '../../redux/ducks/score'
import moment from 'moment'
import { TypesModal, openModal } from '../../redux/ducks/modal'

import Wrapper from '../../components/content/Wrapper'

class ScoreListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.listScore(this.props.match.params.id)
    this.props.getBusinessFromBuyer(this.props.match.params.id)
  }

  _toggleModalConfirmDelete = idScore => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Score',
        text: 'Are you sure you want to delete this score?'
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.removeScore(idScore)
          this.props.listScore(this.props.match.params.id)
          this.props.getBusinessFromBuyer(this.props.match.params.idBusiness)
        }
      }
    })
  }

  _handlePaginationChange = (e, { activePage }) => {
    this.props.listScore(this.props.match.params.id, 5, activePage)
  }

  render () {
    const { listScoreList, history, business, isLoadingBusiness } = this.props
    return (
      <Wrapper loading={isLoadingBusiness}>
        <Grid style={{ marginTop: 0 }}>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left">
              <Form>
                <Form.Group style={{ marginBottom: '0px' }}>
                  <Form.Field>
                    <h2>Sellability Score Log:</h2>
                  </Form.Field>
                  <Form.Field>
                    {/* <h2 style={{ color: 'blue' }}>{business.businessName}</h2> */}
                    <Header
                      style={{ marginTop: '0px' }}
                      as="h2"
                      color="blue"
                      content={business ? business.businessName : null}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button
                color="facebook"
                onClick={() => history.push(`/buyer/business/${business.id}/make-new-score`)}
                size="small"
                floated="right"
              >
                <Icon name="star" />
                Make New Score
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {listScoreList.array.length > 0 ? (
          <Grid padded="horizontally" style={{ marginTop: 0 }}>
            <Grid.Row>
              <Table color="blue" celled inverted selectable size="small" compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Created</Table.HeaderCell>
                    <Table.HeaderCell>Version</Table.HeaderCell>
                    <Table.HeaderCell>Score</Table.HeaderCell>
                    <Table.HeaderCell>Sent</Table.HeaderCell>
                    <Table.HeaderCell>Options</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {listScoreList.array.map((listScore, key) => (
                    <Table.Row active key={listScore.id}>
                      <Table.Cell>{moment(listScore.dateTimeCreated).format('DD/MM/YYYY - HH:mm')}</Table.Cell>
                      <Table.Cell>Score Version {listScore.version}</Table.Cell>
                      <Table.Cell>{listScore.total}</Table.Cell>
                      <Table.Cell>{listScore.dateSent ? 'Yes' : 'No'}</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon
                          onClick={() => history.push(`/buyer/business/${business.id}/make-new-score/${listScore.id}`)}
                        >
                          <Icon link name="edit" size="large" />
                        </Button>
                        <Button
                          icon
                          disabled={listScore.dateSent !== null}
                          onClick={() => this._toggleModalConfirmDelete(listScore.id)}
                        >
                          <Icon link color="red" size="large" name="trash" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Pagination
                size="mini"
                onPageChange={(e, data) => this._handlePaginationChange(e, data)}
                defaultActivePage={this.props.listScoreList.activePage}
                totalPages={this.props.listScoreList.pages}
                firstItem={null}
                lastItem={null}
              />
            </Grid.Row>
          </Grid>
        ) : null}
        <Grid style={{ marginTop: 0 }}>
          <Grid.Column>
            <Button color="green" onClick={() => history.push('/buyer')} size="small" floated="left">
              <Icon name="backward" />
              Return to Business
            </Button>
          </Grid.Column>
        </Grid>
      </Wrapper>
    )
  }
}

ScoreListPage.propTypes = {
  getBuyersFromBusiness: PropTypes.func,
  match: PropTypes.object,
  listScoreList: PropTypes.object,
  history: PropTypes.object,
  getBusinessFromBuyer: PropTypes.func,
  business: PropTypes.object,
  isLoadingBusiness: PropTypes.bool,
  listScore: PropTypes.func,
  removeScore: PropTypes.func,
  openModal: PropTypes.func
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBusinessFromBuyer, listScore, removeScore, openModal }, dispatch)

const mapStateToProps = state => ({
  listScoreList: state.score.listScore,
  business: state.buyer.getBusinessFromBuyer.object,
  isLoadingBusiness: state.buyer.getBusinessFromBuyer.isLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreListPage)
