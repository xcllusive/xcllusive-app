import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import { withFormik } from 'formik'
import NewUserForm from '../../components/forms/NewUserForm'
import Yup from 'yup'

class NewUserModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputSearch: '',
      user: null
    }
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.setState(prevState => ({
      [value]: !prevState[value]
    }))
  }

  _renderTitle = () => {
    return this.props.user
      ? this.props.user.firstName
      : 'New User'
  }

  render () {
    return (
      <Modal open={this.props.modalOpen}>
        <Modal.Header align='center'> {this.props.user !== undefined ? `${this.props.user.firstName} ${this.props.user.lastName}` : 'New User'}</Modal.Header>
        <Modal.Content>
          <NewUserForm
          />
        </Modal.Content>
      </Modal>
    )
  }
}

NewUserModal.propTypes = {
  user: PropTypes.object,
  modalOpen: PropTypes.bool
}

const mapPropsToValues = () => ({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneHome: '',
  phoneWork: '',
  phoneMobile: '',
  suburb: '',
  street: '',
  postCode: '',
  listingAgent: '',
  userType: ''
})

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
    .min(4, 'Password required minimum 4 characters.')
    .max(20, 'Password require max 20 characters.'),
  firstName: Yup.string()
    .required('First Name is required.')
    .max(20, 'First Name require max 20 characters.'),
  lastName: Yup.string()
    .required('Last Name is required.')
    .max(20, 'Last Name require max 20 characters.'),
  phoneHome: Yup.string()
    .max(20, 'Home Phone require max 20 characters.'),
  phoneWork: Yup.string()
    .max(20, 'Work Phone require max 20 characters.'),
  phoneMobile: Yup.string()
    .max(20, 'Mobile Phone require max 20 characters.'),
  suburb: Yup.string()
    .max(40, 'Suburb require max 40 charecters.'),
  street: Yup.string()
    .max(40, 'Street require max 40 charecters.'),
  postCode: Yup.number()
    .integer('Only numbers are permitted.'),
  dataRegion: Yup.string()
    .required('Office Region is required.'),
  listingAgent: Yup.string()
    .required('Listing Agent is required.'),
  userType: Yup.string()
    .required('User Type is required.')
})

const handleSubmit = ({ email, firstName }) =>
  console.log(email, firstName)

export default withFormik({ mapPropsToValues, validationSchema, handleSubmit })(
  NewUserModal
)
