import React from 'react';
import {
  BackgroundImage,
  BackgroundImageSrc,
  Button,
  ButtonVariant,
  InputGroup,
  Nav,
  NavGroup,
  NavItem,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  TextArea,
  TextContent,
  Text,
  Toolbar,
} from '@patternfly/react-core';

class PageLayoutGroupsNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isKebabDropdownOpen: false,
      activeItem: 'grp-1_itm-1'
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
    const PageToolbar = (
      <Toolbar>
    
      </Toolbar>
    );
    const bgImages = {
      [BackgroundImageSrc.lg]: '/assets/images/pfbg_1200.jpg',
      [BackgroundImageSrc.sm]: '/assets/images/pfbg_768.jpg',
      [BackgroundImageSrc.sm2x]: '/assets/images/pfbg_768@2x.jpg',
      [BackgroundImageSrc.xs]: '/assets/images/pfbg_576.jpg',
      [BackgroundImageSrc.xs2x]: '/assets/images/pfbg_576@2x.jpg',
      [BackgroundImageSrc.filter]: '/assets/images/background-filter.svg#image_overlay'
    };

    const logoProps = {
      href: 'https://github.com/rubixFunctions',
      onClick: () => console.log('clicked logo, navigate to GitHub'),
      target: '_blank'
    };

    const Header = (
      <PageHeader
        logo="RubiX"
        logoProps={logoProps}
        toolbar={PageToolbar}
        showNavToggle
      />
    );
    const Sidebar = <PageSidebar nav={PageNav} />;

    return (
      <React.Fragment>
        <BackgroundImage src={bgImages} />
        <Page header={Header} sidebar={Sidebar} isManagedSidebar>
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Text component="h1">RubiX Notes</Text>
              <Text component="p">
                Convert Text to Speech 
              </Text>
            </TextContent>
          </PageSection>
            <TextDictateInput/>
        </Page>
      </React.Fragment>
    );
  }
}

class TextDictateInput extends React.Component {
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

export default PageLayoutGroupsNav;