import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form, Header, Segment, Dropdown, Button, Label } from 'semantic-ui-react'
import { listIssue } from '../../../redux/ducks/issue'
import { exportIssue } from '../../../redux/ducks/systemSettings'
import Wrapper from '../../../components/content/Wrapper'

class Issue extends Component {
  componentDidMount () {
    this.props.listIssue()
  }

  _exportBuyers = values => {
    this.props.issueOptions.map(item => {
      if (item.value === values.issueId) this.props.exportIssue(values.issueId, item.text)
    })
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const { values, errors, touched, isLoading, issueOptions } = this.props
    return (
      <Wrapper>
        <Segment>
          <Header textAlign="center" color="red">
            Exporting Issue
          </Header>
          <Form>
            <Grid>
              <Grid.Row style={{ paddingBottom: '0px' }}>
                <Grid.Column>
                  <Form.Group>
                    <Form.Field width={5}>
                      <Dropdown
                        name="issueId"
                        placeholder="Select Issue"
                        fluid
                        search
                        selection
                        options={issueOptions}
                        value={values.issueId}
                        onChange={this._handleSelectChange}
                        onSearchChange={this._handleSearchChange}
                      />
                      {errors.issueList && touched.issueList && (
                        <Label basic color="red" pointing content={errors.issueList} />
                      )}
                    </Form.Field>
                    <Form.Field>
                      <Button
                        positive
                        icon="checkmark"
                        labelPosition="right"
                        loading={isLoading}
                        content="Export"
                        onClick={() => this._exportBuyers(values)}
                      />
                    </Form.Field>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </Wrapper>
    )
  }
}

Issue.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  setFieldValue: PropTypes.func,
  match: PropTypes.func,
  exportIssue: PropTypes.func,
  isLoading: PropTypes.bool,
  listIssue: PropTypes.func,
  issueOptions: PropTypes.array
}

const mapPropsToValues = props => {
  return {
    issueId: null
  }
}

const mapStateToProps = state => ({
  isLoading: state.systemSettings.exportIssue.isLoading,
  issueOptions: state.issue.get.issuesAvailable
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      exportIssue,
      listIssue
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(Issue)
)
