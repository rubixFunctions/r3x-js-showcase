import React from 'react';
import { AboutModal, Button, TextContent, TextList, TextListItem } from '@patternfly/react-core';
import { InfoAltIcon } from '@patternfly/react-icons';

class AboutRubix extends React.Component {
  state = {
    isModalOpen: false
  };

  handleModalToggle = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen
    }));
  };

  render() {
    const { isModalOpen } = this.state;

    return (
      <React.Fragment>
        <Button variant="link" onClick={this.handleModalToggle}>
          <InfoAltIcon /> About the App
        </Button>
        <AboutModal
          isOpen={isModalOpen}
          onClose={this.handleModalToggle}
          productName="RubiX Showcase Application"
          trademark="This project is licensed under the Apache 2.0 License"
        >
          <TextContent>
            <TextList component="dl">
              <TextListItem component="dt">About</TextListItem>
              <TextListItem component="dd">RubiX is a Framework which provides a suite of SDK’s and a CLI that will reduce the barrier of entry to serverless development within Knative</TextListItem>
              <TextListItem component="dt">Knative</TextListItem>
              <TextListItem component="dd">Is a Kubernetes-based platform to build, deploy, and manage modern serverless workloads.</TextListItem>
              <TextListItem component="dt">Application</TextListItem>
              <TextListItem component="dd">This app is to demonstrate a serverless workload built using both, RubiX and Knative</TextListItem>
              <TextListItem component="dt">Features</TextListItem>
              <TextListItem component="dd">Serverless functions that bridge between a serverless frontend and Google Services such as Speech API and Google Storage</TextListItem>
            </TextList>
          </TextContent>
        </AboutModal>
      </React.Fragment>
    );
  }
}

export default AboutRubix;