import React from 'react';
import {
  Button,
  DataList,
  DataListItem,
  DataListCell,
  PageSection,
  PageSectionVariants,
  Text,
  TextVariants,
} from '@patternfly/react-core';
import DictateModal from './DictateModal'
const request = require('request-promise')

class SpeechListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleListenClick(data) {
    this.handleDictate(data)
  }

  handleDeleteClick(data) {
    let _ = this;
    let resp = this.deleteCLip(data.id);
    resp.then(function (result){
      _.props.updateListCallback();
    })
  }

  deleteCLip(id) {
    var options = {
        method: 'POST',
        url: 'http://r3x-rubix-delete.default.35.246.108.94.xip.io',
        headers:
        {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: {
            clipId: id
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

  buildList() {
    return this.props.soundClips.map((data) => {
      return <DataListItem aria-labelledby="data._id" key={data.id}>
        <DataListCell width={4}>
          <span id="data._id">{data.clip}</span>
        </DataListCell>
        <DataListCell>
          <DictateModal data={data} /><Button variant="danger" onClick={this.handleDeleteClick.bind(this, data)}>Delete</Button>
        </DataListCell>
      </DataListItem>
    })
  }

  render() {
    return (
      <PageSection variant={PageSectionVariants.light}>
        <Text component={TextVariants.h2}>Speech Clips</Text>
        <DataList aria-label="List Sound Clips">
          {this.buildList()}
        </DataList>
      </PageSection>
    )
  }
}

export default SpeechListInput;