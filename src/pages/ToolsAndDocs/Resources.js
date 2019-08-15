import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../../components/content/Wrapper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Header, Segment, Grid, Label, Button, Icon, Divider } from 'semantic-ui-react'
import _ from 'lodash'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import { getResource, removeResource } from '../../redux/ducks/resource'

class Resource extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getResource()
  }

  _isUserSystemSettings = () => {
    return _.includes(this.props.userRoles, 'SYSTEM_SETTINGS_MENU')
  }

  _newResource = () => {
    this.props.openModal(TypesModal.MODAL_NEW_RESOURCE, {
      titleModal: 'New Resource'
    })
  }

  _editResource = resource => {
    this.props.openModal(TypesModal.MODAL_NEW_RESOURCE, {
      titleModal: 'Edit Resource',
      linkObject: resource
    })
  }

  _removeResource = resource => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Resource',
        text: 'Are you sure you want to delete the resource?',
        id: resource.id
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.removeResource(isConfirmed)
        }
      }
    })
  }

  render () {
    const { listResources } = this.props
    return (
      <Wrapper>
        {this._isUserSystemSettings() ? (
          <Header textAlign="right">
            <Button size="small" color="facebook" onClick={() => this._newResource()}>
              <Icon name="add" />
              New Link
            </Button>
          </Header>
        ) : null}
        {listResources && listResources.length > 0 ? (
          <Segment style={{ backgroundColor: '#f7f7f7' }} size="tiny">
            <Header style={{ paddingBottom: '10px' }} as="h2" textAlign="center" content="Resources" />
            <Grid style={{ marginTop: '10px' }} divided="vertically">
              {listResources.map((resource, index) => {
                return (
                  <Fragment key={index}>
                    <Grid.Row
                      style={{ paddingBottom: '0px', paddingTop: '0px' }}
                      columns={this._isUserSystemSettings() ? 3 : 2}
                    >
                      {this._isUserSystemSettings() ? (
                        <Grid.Column width={2}>
                          <Icon
                            name="edit"
                            color="green"
                            size="large"
                            link
                            onClick={() => this._editResource(resource)}
                          />
                          <Icon
                            name="trash"
                            color="red"
                            size="large"
                            link
                            onClick={() => this._removeResource(resource)}
                          />
                        </Grid.Column>
                      ) : null}
                      <Grid.Column style={{ textAlign: 'left' }} width={4}>
                        <Label
                          style={{ backgroundColor: '#f7f7f7', color: '#0f98ff' }}
                          as="a"
                          size="big"
                          onClick={() => window.open(resource.link)}
                        >
                          <u>{resource.title}</u>
                        </Label>
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Label
                          style={{ backgroundColor: '#2285d0', color: 'white', fontWeight: 'normal' }}
                          size="large"
                          pointing="left"
                        >
                          {resource.description}
                        </Label>
                      </Grid.Column>
                    </Grid.Row>
                  </Fragment>
                )
              })}
            </Grid>
          </Segment>
        ) : null}
        <Divider horizontal inverted />
      </Wrapper>
    )
  }
}

Resource.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  userRoles: PropTypes.array,
  openModal: PropTypes.func,
  getResource: PropTypes.func,
  listResources: PropTypes.array,
  removeResource: PropTypes.func
}

const mapStateToProps = state => ({
  userRoles: state.auth.user.roles,
  listResources: state.resource.get.array,
  isCreated: state.resource.create.isCreated,
  isUpdated: state.resource.create.isUpdated
})

const mapDispatchToProps = dispatch => bindActionCreators({ openModal, getResource, removeResource }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resource)
