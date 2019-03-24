import React from 'react';
import {
  BackgroundImage,
  Bullseye,
  Nav,
  NavGroup,
  NavItem,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  TextContent,
  Text,
  TextVariants,
} from '@patternfly/react-core';
import TextCreateInput from './components/TextCreateInput'
import SpeechListInput from './components/SpeechListInput'
import AboutRubix from './components/AboutRubix'
import loading from './assets/images/loading.png'

const request = require('request-promise')

class RubiXApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKebabDropdownOpen: false,
      isProgressOpen: false,
      soundClips: []
    };
    this.updateListCallback = this.updateListCallback.bind(this)
  }

  onKebabDropdownToggle = isKebabDropdownOpen => {
    this.setState({
      isKebabDropdownOpen
    });
  };

  onKebabDropdownSelect = event => {
    this.setState({
      isKebabDropdownOpen: !this.state.isKebabDropdownOpen
    });
  };

  componentDidMount() {
    this.getSoundClips();
  }

  updateListCallback() {
    this.getSoundClips();
  }

  getSoundClips() {
    this.toggleProgress();
    let _ = this;
    let data = this.list()
    data.then(function(result){
      _.toggleProgress();
      _.setState({soundClips: JSON.parse(result).clips})
    })
  }

  toggleProgress = () => {
    this.setState(({ isProgressOpen }) => ({
      isProgressOpen: !isProgressOpen
    }));
  }

  renderProgress = () => {
    let content = <div></div>
    if (this.state.isProgressOpen) {
      content = <PageSection variant={PageSectionVariants.default}>
      <Bullseye>
        <img src={loading} alt="Loading" width="50" height="20"/>
      </Bullseye>
      <Bullseye>
        <TextContent>
          <Text component={TextVariants.h3}>Executing Function</Text>
        </TextContent>
      </Bullseye>
      </PageSection>
    }
    return content;
  }

  list() {
    var options = {
        method: 'POST',
        url: 'http://r3x-rubix-list.default.35.246.108.94.xip.io',
        headers:
        {
            'Content-Type': 'application/json'
        },
    };
    return new Promise(function (resolve, reject) {
        request(options, function (err, resp, body) {
            if (err) {
              reject(err);
            } else {
              resolve(body)
            }
        }).catch(function (err) {
            console.log(err)
        })
    })
}

  render() {
    const PageNav = (
      <Nav onSelect={this.onNavSelect} aria-label="Nav">
        <NavGroup title="RubiX">
          <NavItem to="#grouped-1" itemId="grp-1_itm-1" href="https://github.com/rubixFunctions/r3x-docs/blob/master/README.md">
            Documentation
          </NavItem>
          <NavItem to="#grouped-2" itemId="grp-1_itm-2" href="https://github.com/rubixFunctions/r3x-cli">
            Command Line Tool
          </NavItem>
          <NavItem to="#grouped-3" itemId="grp-1_itm-3" href="https://github.com/rubixFunctions/r3x-js-sdk">
            Software Development Kit
          </NavItem>
        </NavGroup>
        <NavGroup title="Knative">
          <NavItem to="#grouped-7" itemId="grp-2_itm-1" href="https://cloud.google.com/knative/">
            About
          </NavItem>
          <NavItem to="#grouped-8" itemId="grp-2_itm-2" href="https://github.com/knative/docs">
            Documentation
          </NavItem>
        </NavGroup>
      </Nav>
    );

    const logoProps = {
      href: this.audio,
      onClick: () => console.log('clicked logo, navigate to GitHub'),
      target: '_blank'
    };

    const Header = (
      <PageHeader
        logo="RubiX"
        logoProps={logoProps}
        showNavToggle
      />
    );
    const Sidebar = <PageSidebar nav={PageNav} />;

    const fStyle = {
      float: 'right'
    };


    return (
      <React.Fragment>
        <BackgroundImage src={'./assets/images/background_large.jpg'} />
        <Page header={Header} sidebar={Sidebar} isManagedSidebar>
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Text component={TextVariants.h1}>RubiX Notes</Text>
              <AboutRubix />
            </TextContent>
          </PageSection>
          {this.renderProgress()}
          <TextCreateInput updateListCallback={this.updateListCallback} toggleProgress={this.toggleProgress} />
          <SpeechListInput soundClips={this.state.soundClips} updateListCallback={this.updateListCallback} toggleProgress={this.toggleProgress} />
          <PageSection variant={PageSectionVariants.darker}>
            <Text style={fStyle} component={TextVariants.p}>Powered By RubiX & Knative</Text>
          </PageSection>
        </Page>
      </React.Fragment>
    );
  }
}
export default RubiXApp;