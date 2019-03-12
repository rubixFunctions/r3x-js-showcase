import React from 'react';
import {
  BackgroundImage,
  Button,
  DataList,
  DataListItem,
  DataListCheck,
  DataListAction,
  DataListCell,
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
  Toolbar,
} from '@patternfly/react-core';
import TextDictateInput from './components/TextDictateInput'

class RubiXApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isKebabDropdownOpen: false,
      activeItem: 'grp-1_itm-1',
      soundClips: []
    };
  }

  onDropdownToggle = isDropdownOpen => {
    this.setState({
      isDropdownOpen
    });
  };

  onDropdownSelect = event => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  };

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

  onNavSelect = result => {
    this.setState({
      activeItem: result.itemId
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
    const { activeItem } = this.state;

    const PageNav = (
      <Nav onSelect={this.onNavSelect} aria-label="Nav">
        <NavGroup title="RubiX">
          <NavItem to="#grouped-1" itemId="grp-1_itm-1" isActive={activeItem === 'grp-1_itm-1'}>
            Documentation
          </NavItem>
          <NavItem to="#grouped-2" itemId="grp-1_itm-2" isActive={activeItem === 'grp-1_itm-2'}>
            Command Line Tool
          </NavItem>
          <NavItem to="#grouped-3" itemId="grp-1_itm-3" isActive={activeItem === 'grp-1_itm-3'}>
            Software Development Kit
          </NavItem>
        </NavGroup>
        <NavGroup title="Knative">
          <NavItem to="#grouped-7" itemId="grp-2_itm-1" isActive={activeItem === 'grp-2_itm-1'}>
            About
          </NavItem>
          <NavItem to="#grouped-8" itemId="grp-2_itm-2" isActive={activeItem === 'grp-2_itm-2'}>
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
    const Sidebar = <PageSidebar nav={PageNav} />;

    return (
      <React.Fragment>
        <BackgroundImage src={'./assets/images/background_large.jpg'} />
        <Page header={Header} sidebar={Sidebar} isManagedSidebar>
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Text component={TextVariants.h1}>RubiX Notes</Text>
              <Text component={TextVariants.p}>
                Convert Text to Speech 
              </Text>
            </TextContent>
          </PageSection>
            <TextDictateInput/>
            <SpeechListInput soundClips={this.state.soundClips}/>
        </Page>
      </React.Fragment>
    );
  }
}

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
        return <DataListItem aria-labelledby="data._id">
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

export default RubiXApp;