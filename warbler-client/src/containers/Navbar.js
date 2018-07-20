import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from '../assets/images/warbler-logo.png';
import {logout} from '../store/actions/auth';
import DefaultProfileImg from '../assets/images/default-profile-image.jpg';
import {Tooltip} from 'reactstrap';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileTooltipOpen: false
    };
  }
  
  profileTooltip = () => {
    console.log(this.state)
    this.setState({
      profileTooltipOpen: !this.state.profileTooltipOpen
    });
  }

  logout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    let {isAuthenticated, user} = this.props.currentUser;
    let profileImg = user.profileImgUrl ? user.profileImgUrl : DefaultProfileImg; 
    return(
      <nav className="navbar sticky-top navbar-expand">
        <div className="container">
          <ul className="nav navbar-nav navbar-left">
            <li><i className="icon-home"></i> Home</li>
            <li><i className="icon-bell"></i> Notifications</li>
            <li><i className="icon-mail"></i> Messages</li>
          </ul>
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Warbler Home"/>
          </Link>
          {isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right d-flex align-items-center">
              <li>
                <div
                  className="rounded-circle"
                  id="profile_button"
                  style={{
                    backgroundImage: `url(${profileImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '40px',
                    height: '40px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  // onClick={showUserSettings}  
                >
                </div>
                <Tooltip 
                  placement="bottom"
                  isOpen={this.state.profileTooltipOpen}
                  target="profile_button"
                  toggle={this.profileTooltip}>
                  Profile and settings
                </Tooltip>
                {/* <a onClick={this.logout} href="/">Log out</a> */}
              </li>
              <li>
                <Link to={`/users/${user.id}/messages/new`}>
                  New message
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