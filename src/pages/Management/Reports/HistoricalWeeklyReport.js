import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Table, Segment, Header } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import { getUserLogged } from '../../../redux/ducks/user'

class HistoricalWeeklyReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataRegion: [
        { key: 1, text: 'Adelaide Office', value: 'Adelaide Office' },
        { key: 2, text: 'Camberra Office', value: 'Camberra Office' },
        { key: 3, text: 'Cowra Office', value: 'Cowra Office' },
        { key: 4, text: 'Gosford Office', value: 'Gosford Office' },
        { key: 5, text: 'Melbourne Office', value: 'Melbourne Office' },
        { key: 6, text: 'Sydney Office', value: 'Sydney Office' },
        { key: 7, text: 'Queensland Office', value: 'Queensland Office' }
      ],
      isGotUser: true
    }
  }
  componentDidMount () {
    this.props.getUserLogged(this.props.location.state.business.brokerAccountName)
  }

  render () {
    const { broker } = this.props
    const { business } = this.props.location.state
    return (
      <Wrapper>
        <Segment style={{ paddingLeft: '0px', paddingRight: '0px' }} size="small">
          <Fragment>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Header style={{ marginLeft: '10px' }} floated="left" color="red">
                    {business.businessName}
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  {broker ? (
                    <Header style={{ marginLeft: '10px' }} floated="right" color="red">
                      {broker.firstName} {broker.lastName}
                    </Header>
                  ) : null}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
                <Grid.Column
                  style={{ paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px' }}
                >
                  <Table celled striped selectable compact size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Text</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Commission</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body />
                  </Table>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Fragment>
        </Segment>
      </Wrapper>
    )
  }
}

HistoricalWeeklyReport.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  location: PropTypes.object,
  getUserLogged: PropTypes.func,
  broker: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    dataRegion: '',
    brokerAccountName: 0
  }
}

const mapStateToProps = state => ({
  broker: state.user.getLogged.object
})

const mapDispatchToProps = dispatch => bindActionCreators({ getUserLogged }, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(HistoricalWeeklyReport)
)
