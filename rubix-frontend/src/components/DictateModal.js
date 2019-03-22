import React from 'react';
import {
  Button,
  Modal
} from '@patternfly/react-core';
const request = require('request-promise')

class DictateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      data: this.props.data,
      url: ''
    };
  };

  handleModalToggle = () => {
    this.handleDictate(this.props.data)
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen
    }));
  }

  handleDictate(data) {
    var options = {
      method: 'POST',
      url: 'http://localhost:8081/dictate',
      headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
      body: {
        title: data.title,
        value: data.clip
      },
      json: true
    };

    let _ = this
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if (response.statusCode === 200) {
        _.setState({ url: body.url })
      }
    }).then(() => _.toggleModal());
  }

  render() {
    const { isModalOpen } = this.state;

    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>
          Listen
          </Button>
        <Modal
          title="RubiX Note Clip"
          isOpen={isModalOpen}
          onClose={this.handleModalToggle}
          actions={[
            <Button key="cancel" variant="secondary" onClick={this.handleModalToggle}>
              Cancel
              </Button>
          ]}
        >
          <iframe title='rubix clip' src={this.state.url} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default DictateModal;