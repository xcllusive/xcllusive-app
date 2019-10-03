import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { getUserLogged } from '../../redux/ducks/user'
import { getSystemSettings } from '../../redux/ducks/systemSettings'
import { Grid, Image, Message } from 'semantic-ui-react'
import mercuryIcon from './mercury.png'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class DashBoardPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean']
        ]
      },

      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image'
      ]
    }
  }

  componentDidMount () {
    this.props.getUserLogged()
    this.props.getSystemSettings(1)
  }

  _createMarkup () {
    return { __html: this.props.messageMercury }
  }

  render () {
    // const { values } = this.props
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Image src={mercuryIcon} style={{ marginTop: '50px' }} size="small" verticalAlign="middle" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1 style={{ color: 'rgb(7, 85, 148)' }}>Hello {this.props.user ? this.props.user.firstName : null},</h1>
            <h1 style={{ color: 'rgb(7, 85, 148)' }}>Welcome to Mercury!</h1>
          </Grid.Column>
        </Grid.Row>
        {this.props.messageMercury ? (
          <Grid.Row>
            <Grid.Column>
              <Message style={{ marginRight: '100px', marginLeft: '100px' }}>
                <div dangerouslySetInnerHTML={this._createMarkup()} />
              </Message>
            </Grid.Column>
          </Grid.Row>
        ) : null}
      </Grid>
    )
  }
}

DashBoardPage.propTypes = {
  values: PropTypes.object,
  getUserLogged: PropTypes.func,
  user: PropTypes.object,
  getSystemSettings: PropTypes.func,
  messageMercury: PropTypes.string
}

const mapPropsToValues = props => ({
  messageMercury: props.messageMercury ? props.messageMercury : ''
})

const mapStateToProps = state => ({
  user: state.user.getLogged.object,
  messageMercury: state.systemSettings.get.object.messageMercury
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserLogged,
      getSystemSettings
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true
  })(DashBoardPage)
)
