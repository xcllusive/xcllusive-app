import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, Icon, Button, Grid } from 'semantic-ui-react'

import Wrapper from '../../components/content/Wrapper'

import NewBusinessRegisterForm from '../../components/forms/NewBusinessRegisterForm'

import { getBusiness } from '../../redux/ducks/business'

class BusinessRegisters extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.createBusinessRegister !== nextProps.createBusinessRegister && nextProps.createBusinessRegister) {
      await this._toggleModal(false, false)
      this.props.getBusiness()
    }
    if (this.props.updateBusinessRegister !== nextProps.updateBusinessRegister && nextProps.updateBusinessRegister) {
      await this._toggleModal(false, false)
      this.props.getBusiness()
    }
  }

  componentDidMount () {
    this.props.getBusiness()
  }

  _toggleModal = (editBusinessRegister, registerType) => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      editBusinessRegister,
      registerType
    }))
  }

  render () {
    return (
      <Wrapper>
        {
          this.state.modalOpen ? (
            <NewBusinessRegisterForm
              modalOpen={this.state.modalOpen}
              toggleModal={this._toggleModal}
              editBusinessRegister={this.state.editBusinessRegister}
              registerType={this.state.registerType}
            />
          ) : null
        }
        <Grid padded='horizontally'>
          <Grid.Row columns={1}>
            <Grid.Column floated='right' width={2}>
              <Button onClick={() => this._toggleModal(false, false)} color='facebook'>
                <Icon name='add' />
                  New Register
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Source </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Rating </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Product </div></b></h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color='blue' celled inverted>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.sourceOptions.map(sourceOptions => {
                    return (
                      <Table.Row active >
                        <Table.Cell>{sourceOptions.value}</Table.Cell>
                        <Table.Cell>{sourceOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon name='edit' link
                            onClick={() => this._toggleModal(sourceOptions, 1)}
                          />
                          <Icon link
                            //  onClick={() => this.props.history.push(`${this.props.match.path}/${item.buyerID}`)}
                            color='red' name='trash' />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.ratingOptions.map(ratingOptions => {
                    return (
                      <Table.Row active >
                        <Table.Cell>{ratingOptions.value}</Table.Cell>
                        <Table.Cell>{ratingOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon name='edit' link
                            onClick={() => this._toggleModal(ratingOptions, 2)}
                          />
                          <Icon link
                            //  onClick={() => this.props.history.push(`${this.props.match.path}/${item.buyerID}`)}
                            color='red' name='trash' />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.productOptions.map(productOptions => {
                    return (
                      <Table.Row active >
                        <Table.Cell>{productOptions.value}</Table.Cell>
                        <Table.Cell>{productOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon name='edit' link
                            onClick={() => this._toggleModal(productOptions, 3)}
                          />
                          <Icon link
                            //  onClick={() => this.props.history.push(`${this.props.match.path}/${item.buyerID}`)}
                            color='red' name='trash' />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Industry </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Type </div></b></h5>
            </Grid.Column>
            <Grid.Column floated='left' width={5}>
              <h5><b><div align='left'> Business Owner's Time </div></b></h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Table color='blue' celled inverted>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.industryOptions.map(industryOptions => {
                    return (
                      <Table.Row active >
                        <Table.Cell>{industryOptions.value}</Table.Cell>
                        <Table.Cell>{industryOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon name='edit' link
                            onClick={() => this._toggleModal(industryOptions, 4)}
                          />
                          <Icon link
                            //  onClick={() => this.props.history.push(`${this.props.match.path}/${item.buyerID}`)}
                            color='red' name='trash' />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.typeOptions.map(typeOptions => {
                    return (
                      <Table.Row active >
                        <Table.Cell>{typeOptions.value}</Table.Cell>
                        <Table.Cell>{typeOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon name='edit' link
                            onClick={() => this._toggleModal(typeOptions, 5)}
                          />
                          <Icon link
                            //  onClick={() => this.props.history.push(`${this.props.match.path}/${item.buyerID}`)}
                            color='red' name='trash' />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table color='blue' celled inverted>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.ownersTimeOptions.map(ownersTimeOptions => {
                    return (
                      <Table.Row active >
                        <Table.Cell>{ownersTimeOptions.value}</Table.Cell>
                        <Table.Cell>{ownersTimeOptions.text}</Table.Cell>
                        <Table.Cell>
                          <Icon name='edit' link
                            onClick={() => this._toggleModal(ownersTimeOptions, 6)}
                          />
                          <Icon link
                            //  onClick={() => this.props.history.push(`${this.props.match.path}/${item.buyerID}`)}
                            color='red' name='trash' />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

BusinessRegisters.propTypes = {
  getBusiness: PropTypes.func,
  sourceOptions: PropTypes.array,
  ratingOptions: PropTypes.array,
  productOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  typeOptions: PropTypes.array,
  ownersTimeOptions: PropTypes.array,
  createBusinessRegister: PropTypes.bool,
  updateBusinessRegister: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.get.isLoading,
    sourceOptions: state.business.get.sourceOptions,
    ratingOptions: state.business.get.ratingOptions,
    productOptions: state.business.get.productOptions,
    industryOptions: state.business.get.industryOptions,
    typeOptions: state.business.get.typeOptions,
    ownersTimeOptions: state.business.get.ownersTimeOptions,
    createBusinessRegister: state.business.createBusinessRegister.isCreated,
    updateBusinessRegister: state.business.updateBusinessRegister.isUpdated
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBusiness }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessRegisters)
