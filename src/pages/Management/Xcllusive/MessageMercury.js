import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Grid, Icon } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import 'jodit'
import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'
import { getSystemSettings, updateSystemSettings } from '../../../redux/ducks/systemSettings'

class MessageMercury extends Component {
  constructor (props) {
    super(props)
    this.state = {
      state: []
    }
  }

  componentDidMount () {
    this.props.getSystemSettings(1)
  }

  _handleChangeBody = value => {
    this.props.setFieldValue('messageMercury', value)
  }

  _config = () => {}

  render () {
    const { values, isValid, isSubmitting } = this.props

    return (
      <Wrapper>
        <Form>
          <Grid style={{ marginTop: '10px' }} padded="horizontally">
            <Grid.Row>
              <Form.Field width={16} style={{ alignSelf: 'flex-end' }}>
                <Form.Button
                  floated="right"
                  type="submit"
                  color="red"
                  disabled={isSubmitting || !isValid}
                  // loading={isLoadingUpdate}
                  onClick={() => this.props.updateSystemSettings(values)}
                >
                  <Icon name="save" />
                  Save
                </Form.Button>
              </Form.Field>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column floated="left" width={16} style={{ paddingLeft: '0px', paddingRight: 0 }}>
                <Form.Field>
                  <JoditEditor value={values.messageMercury} config={this._config} onChange={this._handleChangeBody} />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Wrapper>
    )
  }
}

MessageMercury.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  setFieldValue: PropTypes.func,
  getSystemSettings: PropTypes.func,
  updateSystemSettings: PropTypes.func
}

const mapPropsToValues = props => ({
  messageMercury: props.messageMercury ? props.messageMercury : ''
})

const mapStateToProps = state => ({
  messageMercury: state.systemSettings.get.object ? state.systemSettings.get.object.messageMercury : ''
})

const mapDispatchToProps = dispatch => bindActionCreators({ getSystemSettings, updateSystemSettings }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true
  })(MessageMercury)
)
