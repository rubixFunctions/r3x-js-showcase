import React from 'react';
import {
  BackgroundImage,
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
import TextDictateInput from './components/TextDictateInput'
import SpeechListInput from './components/SpeechListInput'
import AboutRubix from './components/AboutRubix'


class RubiXApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKebabDropdownOpen: false,
      soundClips: []
    };
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

  componentDidMount(){
    this.getSoundClips();
  }

  getSoundClips(){
    let clips = [{'title':'wubba lubba dub dub'},{'title':'i am a placeholder note'}, {'title':"Oh, yeah!You gotta get schwifty.You gotta get schwifty in here.It's time to get schwifty.Oh-oh.You gotta get schwifty.Oh, yeah!"}]
    this.setState({soundClips: clips})
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
      href: 'https://github.com/rubixFunctions',
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
    const Sidebar = <PageSidebar nav={PageNav}/>;

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
            <TextDictateInput/>
            <SpeechListInput soundClips={this.state.soundClips}/>
          <PageSection variant={PageSectionVariants.darker}>
            <Text style={fStyle} component={TextVariants.p}>Powered By RubiX & Knative</Text>
          </PageSection>
        </Page>
      </React.Fragment>
    );
  }
}
export default RubiXApp;