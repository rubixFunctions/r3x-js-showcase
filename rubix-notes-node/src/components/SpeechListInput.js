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

class SpeechListInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleListenClick = this.handleListenClick.bind(this)
      this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }
  
    handleListenClick(e){
      e.preventDefault();
      console.log('Listen Button Clicked')
    }
  
    handleDeleteClick(e){
      e.preventDefault();
      console.log('Delete Button Clicked')
    }
  
    buildList(){
      return this.props.soundClips.map((data) => {
          return <DataListItem aria-labelledby="data._id" key={data.id}>
            <DataListCell width={4}>
              <span id="data._id">{data.title}</span>
              </DataListCell>
              <DataListCell>
              <Button variant="Primary" onClick={this.handleListenClick}>Listen</Button> <Button variant="danger" onClick={this.handleDeleteClick}>Delete</Button>
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