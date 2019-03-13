import React from 'react';
import {
    Button,
    ButtonVariant,
    InputGroup,
    PageSection,
    PageSectionVariants,
    TextArea,
    Text
  } from '@patternfly/react-core';

const request = require('request-promise')

class TextCreateInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleClick = this.handleClick.bind(this);
      this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    }
    
    handleTextAreaChange = value => {
      this.setState({ value });
    };
  
    // "title" : "clip-3",
    // "value" : "Hello RubiX"
  
    handleClick(e) {
      e.preventDefault();
      var options = { method: 'POST',
      url: 'http://localhost:8081',
      headers: 
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json' },
      body:{
        title : "clip1",
        value : this.state.value
      },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if(response.statusCode === 200){
        console.log('We got a response', body)
      }
    });
      console.log('Convert Button Clicked ', this.state.value)
      this.setState({value: ''})
    }
  
    render(){
      const { value } = this.state;
      return (
        <PageSection variant={PageSectionVariants.dark}>
        <Text component="h3">Enter the text you wish to convert to speech</Text>
          <InputGroup>
            <TextArea value={value} onChange={this.handleTextAreaChange} name="textarea2" id="textarea2" aria-label="textarea with button" />
              <Button id="textinputbutton" variant={ButtonVariant.primary} onClick={this.handleClick}>
                Convert
              </Button>
            </InputGroup>
          </PageSection>
      )
    }
}

export default TextCreateInput;
  