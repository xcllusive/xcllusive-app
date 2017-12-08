import React, { Component } from 'react';
import { Modal, Form, Icon } from 'semantic-ui-react';
import BusinessDetail from '../../components/BusinessDetail';

class AddModal extends Component {
  render() {
    return (
      <Modal open={this.props.teste}>
        <Modal.Header align="center">New Business</Modal.Header>
        <Modal.Content>
          <div>
            <BusinessDetail />
          </div>
          <Form>
            <Form.Group>
              <Form.Button color="blue">
                <Icon name="save" /> Create Business
              </Form.Button>
              <Form.Button color="red" onClick={this.props.funcao}>
                <Icon name="cancel" /> Cancel
              </Form.Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddModal;
