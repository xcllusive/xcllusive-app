import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form } from 'semantic-ui-react'
import { openModal } from '../../../redux/ducks/modal'
import Wrapper from '../../../components/content/Wrapper'
import { getBrokersPerRegion } from '../../../redux/ducks/broker'

class BrokersWeeklyReports extends Component {
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
      ]
    }
  }
  componentDidMount () {}

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    if (name === 'dataRegion') this.props.getBrokersPerRegion(value)
  }

  render () {
    const { values, brokersPerRegion, isLoadingBroker } = this.props
    const { dataRegion } = this.state
    console.log(brokersPerRegion)
    return (
      <Wrapper>
        <Form>
          <Form.Group>
            <Form.Field>
              <Form.Select
                required
                label="Select One Region"
                name="dataRegion"
                options={dataRegion}
                value={values.dataRegion}
                onChange={this._handleSelectChange}
              />
            </Form.Field>
            {brokersPerRegion.length > 0 ? (
              <Form.Field>
                <Form.Select
                  required
                  label="Select One Broker"
                  options={brokersPerRegion}
                  name="brokerAccountName"
                  autoComplete="brokerAccountName"
                  value={values.brokerAccountName}
                  onChange={this._handleSelectChange}
                  loading={isLoadingBroker}
                />
              </Form.Field>
            ) : null}
          </Form.Group>
        </Form>
        <Grid padded="horizontally">
          <Grid.Row columns={3}>
            <Grid.Column />
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

BrokersWeeklyReports.propTypes = {
  values: PropTypes.object,
  openModal: PropTypes.func,
  setFieldValue: PropTypes.func,
  getBrokersPerRegion: PropTypes.func,
  brokersPerRegion: PropTypes.array,
  isLoadingBroker: PropTypes.bool
}

const mapPropsToValues = props => {
  return {
    dataRegion: '',
    brokerAccountName: 0
  }
}

const mapStateToProps = state => ({
  brokersPerRegion: state.broker.getBrokersPerRegion.array,
  isLoadingBroker: state.broker.getBrokersPerRegion.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getBrokersPerRegion
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(BrokersWeeklyReports)
)
