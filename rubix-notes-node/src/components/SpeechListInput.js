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
  const request = require('request-promise')

class SpeechListInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    handleListenClick(data){
      console.log('Listen Button Clicked')
      this.handleDictate(data)
    }
  
    handleDeleteClick(data){
      var options = { method: 'POST',
      url: 'http://localhost:8080',
      headers: 
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json' },
      body:{
        clipId : data.id
      },
      json: true };
    
    let _ = this;
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
        if(response.statusCode === 200){
          console.log('We got a response', body)
          _.props.updateListCallback();
        }
      });
    }

    handleDictate(data){
      var options = { method: 'POST',
      url: 'http://localhost:8082',
      headers: 
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json' },
      body:{
        title : data.title,
        value : data.clip
      },
      json: true };
    
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
          if(response.statusCode === 200){
            console.log('We got a response', body)
          }
        });
      }
  
    buildList(){
      return this.props.soundClips.map((data) => {
          return <DataListItem aria-labelledby="data._id" key={data.id}>
            <DataListCell width={4}>
              <span id="data._id">{data.clip}</span>
              </DataListCell>
              <DataListCell>
              <Button variant="Primary" onClick={this.handleListenClick.bind(this, data)}>Listen</Button> <Button variant="danger" onClick={this.handleDeleteClick.bind(this,data)}>Delete</Button>
              </DataListCell>
          </DataListItem>
      })
    }
  
    render(){
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