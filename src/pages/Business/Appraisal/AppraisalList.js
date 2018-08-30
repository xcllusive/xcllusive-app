import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Grid, Header, Button, Icon } from 'semantic-ui-react'

import { theme } from '../../../styles'

// import moment from 'moment'

import Wrapper from '../../../components/content/Wrapper'

class AppraisalListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {}

  render () {
    const { history } = this.props
    const { business } = this.props.location.state
    return (
      <Wrapper>
        <Grid style={{ marginTop: 0 }}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header
                as="h2"
                color="blue"
                content={`Appraisal Log: ${business.businessName}`}
              />
            </Grid.Column>
            <Grid.Column>
              <Button
                color={theme.buttonNew}
                onClick={() =>
                  history.push({
                    pathname: 'appraisalMenu',
                    state: { business: business }
                  })
                }
                size="small"
                floated="right"
              >
                <Icon name="add" />
                New Appraisal
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* {listScoreList.array.length > 0 ? ( */}
        <Grid padded="horizontally" style={{ marginTop: 0 }}>
          <Grid.Row>
            <Table color="blue" celled inverted selectable size="small" compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Created</Table.HeaderCell>
                  <Table.HeaderCell>Appraisal No</Table.HeaderCell>
                  <Table.HeaderCell>Appr. Low</Table.HeaderCell>
                  <Table.HeaderCell>Appr. High</Table.HeaderCell>
                  <Table.HeaderCell>% Completed</Table.HeaderCell>
                  <Table.HeaderCell>Sent</Table.HeaderCell>
                  <Table.HeaderCell>Sent Date</Table.HeaderCell>
                  <Table.HeaderCell>Resend</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Duplicate</Table.HeaderCell>
                  <Table.HeaderCell>Download</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {/* {listScoreList.array.map((listScore, key) => ( */}
                <Table.Row active /* key={listScore.id} */>
                  <Table.Cell />
                  <Table.Cell>Score Version </Table.Cell>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell>
                    <Button
                      icon
                      // onClick={() =>
                      //   history.push(
                      //     `/buyer/business/${business.id}/make-new-score/${
                      //       listScore.id
                      //     }`
                      //   )
                      // }
                    >
                      <Icon link name="edit" size="large" />
                    </Button>
                  </Table.Cell>
                  <Table.Cell />
                  <Table.Cell>Yes</Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      // disabled={listScore.dateSent !== null}
                      // onClick={() =>
                      //   this._toggleModalConfirmDelete(listScore.id)
                      // }
                    >
                      <Icon link color="red" size="large" name="trash" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
                {/* ))} */}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
        {/* ) : null} */}
        <Grid style={{ marginTop: 0 }}>
          <Grid.Column>
            <Button
              color="green"
              onClick={() => history.push('/business')}
              size="small"
              floated="left"
            >
              <Icon name="backward" />
              Return to Business
            </Button>
          </Grid.Column>
        </Grid>
      </Wrapper>
    )
  }
}

AppraisalListPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  getBusiness: PropTypes.func,
  location: PropTypes.object
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppraisalListPage)
