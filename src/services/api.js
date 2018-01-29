import axios from 'axios';

export default {
  user: {
    login: async credentials => {
      return await axios.post('/api/auth', { credentials });
    },
    resetPasswordRequest: async email => {
      return await axios.post('/api/auth/reset_password_request', { email });
    }
  }
};
