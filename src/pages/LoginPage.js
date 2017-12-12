import React from 'react';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
  state = {
    redirectToReferrer: false
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return <div>oi login page</div>;
  }
}

export default LoginPage;
