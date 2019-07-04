import axios from 'axios'
import { store } from '../../redux/store'
import { logout } from '../../redux/ducks/auth'

const client = axios.create({
  // baseURL: 'http://docker-xcllusive-test-api.ap-southeast-2.elasticbeanstalk.com'
  // baseURL: 'http://xcllusive-api-prod.ap-southeast-2.elasticbeanstalk.com'
  baseURL: process.env.REACT_APP_API_URL
  // baseURL: 'http://localhost:5000'
})

const request = async options => {
  const onSuccess = response => {
    return Promise.resolve(response.data)
  }

  const onError = error => {
    if (error.response) {
      // console.error('Status:', error.response.status)
      // console.error('Data:', error.response.data)
      // console.error('Headers:', error.response.headers)

      if (error.response.status === 401) {
        store.dispatch(logout(error.response.data.message))
        return Promise.reject(error.response.data)
      }

      return Promise.reject(error.response.data)
    }

    // console.error('Error Message:', error.message)
    return Promise.reject(error)
  }

  try {
    const response = await client(options)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

export default request
