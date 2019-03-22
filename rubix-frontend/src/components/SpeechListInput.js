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
    var options = {
      method: 'POST',
      url: 'http://localhost:8081/delete',
      headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
      body: {
        clipId: data.id
      },
      json: true
    };
    let _ = this;
    request(options, function (err, resp, body) {
      _.props.updateListCallback();
    }).catch(function (err) {
      console.log(err)
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