import React, { Component } from 'react';
import { Modal, Form, Icon, Checkbox } from 'semantic-ui-react';

import styled from 'styled-components';

const officeRegion = [
  { key: '1', text: 'Sydney Office', value: '1' },
  { key: '2', text: 'Melbourne Office', value: '2' }
];

const listingAgent = [
  { key: '1', text: 'Yes', value: '1' },
  { key: '2', text: 'No', value: '2' }
];

const userType = [
  { key: '1', text: 'Admin', value: '1' },
  { key: '2', text: 'Staff', value: '2' },
  { key: '3', text: 'Introducer', value: '3' }
];

const state = [
  { key: '1', text: 'NSW', value: '1' },
  { key: '2', text: 'ACT', value: '2' }
];

const CheckboxFormatted = styled.div`
  padding-right: 1em;
`;

class NewUserModal extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      inputSearch: '',
      user: null
    };
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.setState(prevState => ({
      [value]: !prevState[value]
    }));
  };

  _renderTitle = () => {
    return this.props.user ?
    this.props.user.firstName :
    'New User'
  }

  render() {
    console.log(this.props.user)
    return (            
      <Modal open={this.props.modalOpen}>
        <Modal.Header align='center'> {this.props.user !== undefined ? `${this.props.user.firstName} ${this.props.user.lastName}` : 'New User'}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input required label="Username" value={this.props.user.userName}/>
              <Form.Input required label="Password" value={this.props.user.password}/>
            </Form.Group>
            <Form.Group widths="equal">              
              <Form.Input required label="First Name" value={this.props.user.firstName} />
              <Form.Input required label="Last Name" value={this.props.user.lastName}/>
              <Form.Input required label="Email" value={this.props.user.email}/>             
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input label="Home Phone" value={this.props.user.phoneHome}/>
              <Form.Input label="Work Phone" value={this.props.user.phoneWork}/>
              <Form.Input label="Mobile Phone" value={this.props.user.phoneMobile}/>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select                
                label="State"
                options={this.props.user.state}
                value={this.props.user.state}
              />
              <Form.Input label="Suburb" value={this.props.user.suburb}/>
              <Form.Input label="Street" value={this.props.user.street}/>
              <Form.Input label="Post Code" value={this.props.user.postCode}/>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select required label="Office Region" options={officeRegion} value={this.props.user.dataRegion} />
              <Form.Select required label="Listing Agent" options={listingAgent} value={this.props.user.listingAgent} />
              <Form.Select required label="User Type" options={userType} value={this.props.user.userTypeId} />
            </Form.Group>
            <Form.Group widths="equal">
              <h4><b><div align='left'> Menu Access: </div></b></h4>
              <Checkbox
                as={CheckboxFormatted}
                label='Buyer'
                value='buyerMenu'
                checked={this.state.buyerMenu === true}
                onChange={this._handleChangeCheckBox}
              />           
              <Checkbox
                as={CheckboxFormatted}
                label='Business'
                value='businessMenu'
                checked={this.state.businessMenu === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='Pre Sale'
                value='preSaleMenu'
                checked={this.state.preSaleMenu === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='Resources'
                value='resourcesMenu'
                checked={this.state.resourcesMenu === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='Client Manager'
                value='clientManagerMenu'
                checked={this.state.clientManagerMenu === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='System Settings'
                value='systemSettingsMenu'
                checked={this.state.systemSettingsMenu === true}
                onChange={this._handleChangeCheckBox}
              />              
            </Form.Group>
            <Form.Group>
              <Form.Button color="blue">
                <Icon name="save" />
                {this.props.user !== undefined ? 'Update User' : 'Create User'}                
              </Form.Button>
              <Form.Button color="red" onClick={this.props.funcao}>
                <Icon name="cancel" />
                Cancel
              </Form.Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default NewUserModal;
