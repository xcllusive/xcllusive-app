import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'

const WrapperStyled = styled.div`
  padding: 0 10px 0 10px
`

class Wrapper extends Component {
  render () {
    if (this.props.loading) {
      return <Loader active />
    }
    return (
      <WrapperStyled>
        {this.props.children}
      </WrapperStyled>
    )
  }
}

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
    PropTypes.element
  ]).isRequired,
  loading: PropTypes.bool
}

export default Wrapper
