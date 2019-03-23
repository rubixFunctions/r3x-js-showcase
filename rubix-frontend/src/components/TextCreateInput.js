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
  
    handleClick(e) {
      e.preventDefault();
      let _ = this;
      let resp = this.create(this.state.value);
      resp.then(function (result) {
        _.props.updateListCallback();
      })
      this.setState({value: ''})
    }

    create(clipName) {
      var options = {
          method: 'POST',
          url: 'http://r3x-rubix-create.default.35.197.208.7.xip.io',
          headers:
          {
              'cache-control': 'no-cache',
              'content-type': 'application/json'
          },
          body: {
              title: "clip1",
              value: clipName
          },
          json: true
      };
      let _ = this;
      return new Promise(function (resolve, reject) {
          request(options, function (err, resp, body) {
              if (err) {
                  reject(err);
              } else {
                  resolve(body)
              }
          });
      })
  }
  
    render(){
      const { value } = this.state;
      return (
        <PageSection variant={PageSectionVariants.dark}>
        <Text component="h3">Enter the text you wish to convert to speech</Text>
          <InputGroup>
            <TextArea value={value} onChange={this.handleTextAreaChange} name="textarea2" id="textarea2" aria-label="textarea with button" />
              <Button id="textinputbutton" variant={ButtonVariant.primary} onClick={this.handleClick}>
                Create
              </Button>
            </InputGroup>
          </PageSection>
      )
    }
}

export default TextCreateInput;
  