import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  padding: 25px 0 40px 0;
`

class GridBusinessStage extends Component {
  render () {
    return <WrapperStyled>{this.props.children}</WrapperStyled>
  }
}

GridBusinessStage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
    PropTypes.element
  ]).isRequired
}

export default GridBusinessStage
