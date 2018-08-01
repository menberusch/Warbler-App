import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from '../assets/images/warbler-logo.png';
import {logout} from '../store/actions/auth';
import DefaultProfileImg from '../assets/images/default-profile-image.jpg';
import {Tooltip, Popover, PopoverHeader, PopoverBody} from 'reactstrap';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileTooltipOpen: false,
      profileSettingsOpen: false,
      location: document.location.pathname
    };

    props.history.listen(({pathname}) => {
      this.setState(prevState => (
        prevState.location !== pathname ? {location: pathname} : ''
      ));
    });
  }
  
  toggleProfileTooltip = () => {
    if(this.state.profileSettingsOpen) return;
    this.setState({
      profileTooltipOpen: !this.state.profileTooltipOpen
    });
  };

  toggleProfileSettings = () => {
    this.setState({
      profileSettingsOpen: !this.state.profileSettingsOpen,
      profileTooltipOpen: false
    });
  }

  logout = e => {
    e.preventDefault();
    this.props.history.push('/');
    this.props.logout();
    this.setState({profileSettingsOpen: false});
  };

  render() {
    let {isAuthenticated, user} = this.props.currentUser;
    let {profileSettingsOpen, profileTooltipOpen, location} = this.state;
    let profileImg = user.profileImgUrl || DefaultProfileImg; 
    
    return(
      <nav className="navbar sticky-top navbar-expand">
        <div className="container">
          {isAuthenticated && (
            <ul className="nav navbar-nav navbar-left">
              <li className={location === '/' ? 'active' : ''}>
                <Link to="/">
                  <i className="icon-home"></i> <span>Home</span>
                  <div className="underline"></div>
                </Link>
              </li>
              {/* <li>
                <Link to="/">
                  <i className="icon-bell"></i> <span>Notifications</span>
                  <div className="underline"></div>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="icon-mail"></i> <span>Messages</span>
                  <div className="underline"></div>
                </Link>
              </li> */}
            </ul>
          )}
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Warbler Home"/>
          </Link>
          {isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right d-flex align-items-center">
              <li>
                <div
                  className="rounded-circle user-settings-btn"
                  id="profile_button"
                  style={{
                    backgroundImage: `url('${profileImg}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '40px',
                    height: '40px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={this.toggleProfileSettings}  
                >
                  <Tooltip 
                    placement="bottom"
                    isOpen={profileTooltipOpen}
                    target="profile_button"
                    toggle={this.toggleProfileTooltip}>
                    Profile and settings
                  </Tooltip>
                  <Popover 
                    isOpen={profileSettingsOpen} 
                    target="profile_button"
                    placement="bottom-end"
                    toggle={this.toggleProfileSettings}
                    className="profile-settings-popover"
                  >
                    <PopoverHeader>@{user.username}</PopoverHeader>
                    <PopoverBody>
                      <ul className="profile-settings">
                        <li>
                          <Link 
                            to={`/${user.username}`} 
                            onClick={this.toggleProfileSettings}
                          >
                            <i className="icon-user"></i><span>&nbsp;Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to='/settings' 
                            onClick={this.toggleProfileSettings}
                          >
                            <i className="icon-cog"></i><span>&nbsp;Settings</span>
                          </Link>
                        </li>
                        <li>
                          <a href="/" onClick={this.logout}>
                            <i className="icon-power"></i><span>&nbsp;Logout</span>
                          </a>
                        </li>
                      </ul>
                    </PopoverBody>
                  </Popover>
                </div>
              </li>
              <li>
                <Link to={`/users/${user.id}/posts/new`}>
                  New post
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/signin">Log in</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {logout})(Navbar);