import React, { Component } from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.div`
  padding: 0 10px 0 10px;
`;

class Wrapper extends Component {
  render() {
    return <WrapperStyled>{this.props.children}</WrapperStyled>;
  }
}

export default Wrapper;
