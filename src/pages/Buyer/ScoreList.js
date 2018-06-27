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

import { getBusiness } from '../../redux/ducks/business'
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
    this.props.getBusiness(this.props.match.params.id)
  }

  _toggleModalConfirmDelete = idScore => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Score',
        text: 'Are you sure you want to delete this score?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.removeScore(idScore)
        }
      }
    })
  }

  render () {
    const { listScoreList, history, business, isLoadingBusiness } = this.props
    console.log(this.state)
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
                  onClick={() =>
                    history.push(
                      `/buyer/business/${business.id}/make-new-score`
                    )
                  }
                  size="small"
                  floated="right"
                >
                  <Icon name="star" />
                  Make New Score
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {listScoreList.length > 0 ? (
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
                    {listScoreList.map((listScore, key) => (
                      <Table.Row active key={listScore.id}>
                        <Table.Cell>
                          {moment(listScore.dateTimeCreated).format(
                            'DD/MM/YYYY - HH:mm'
                          )}
                        </Table.Cell>
                        <Table.Cell>Score {key + 1}</Table.Cell>
                        <Table.Cell>{30}</Table.Cell>
                        <Table.Cell>
                          {listScore.dateSent ? 'Yes' : 'No'}
                        </Table.Cell>
                        <Table.Cell>
                          <Icon
                            link
                            name="edit"
                            size="large"
                            disabled={listScore.dateSent}
                            onClick={() =>
                              history.push(
                                `/buyer/business/${
                                  business.id
                                }/make-new-score/${listScore.id}`
                              )
                            }
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Icon
                            link
                            name="trash"
                            color="red"
                            size="large"
                            disabled={!listScore.dateSent}
                            onClick={() =>
                              this._toggleModalConfirmDelete(listScore.id)
                            }
                          />
                        </Table.Cell>
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
  listScoreList: PropTypes.array,
  history: PropTypes.object,
  getBusiness: PropTypes.func,
  business: PropTypes.object,
  isLoadingBusiness: PropTypes.bool,
  listScore: PropTypes.func,
  removeScore: PropTypes.func,
  openModal: PropTypes.func
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getBusiness, listScore, removeScore, openModal },
    dispatch
  )

const mapStateToProps = state => ({
  listScoreList: state.score.listScore.array,
  business: state.business.get.object,
  isLoadingBusiness: state.business.get.isLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreListPage)
