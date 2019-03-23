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
    let _ = this;
    let resp = this.dictate(data);
    resp.then(function(result){
      _.setState({ url: result.url })
    }).then(() => _.toggleModal());
  }

  dictate(data) {
    var options = {
        method: 'POST',
        url: 'http://r3x-rubix-dictate.default.35.197.208.7.xip.io',
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
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error)
            } else {
                resolve(body)
            }
        });
    })
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