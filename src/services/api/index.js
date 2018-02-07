import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5000'
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

      return Promise.reject(error.response.data.error)
    }

    // console.error('Error Message:', error.message)
    return Promise.reject(error.message)
  }

  try {
    const response = await client(options)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

export default request