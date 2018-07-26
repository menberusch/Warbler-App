import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../store/actions/users';
import MessageList from './MessageList';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import UserAside from '../components/UserAside';

class Profilepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'posts',
      user: false
    };
  };

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.username)
    .then(() => {
      document.title = `@${this.props.user.username} | Warbler`;
      this.setState({user: this.props.user});
    });
  };

  toggleTab(tab) {
    if(this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    };
  };
  
  render() {
    const {user} = this.state;
    return(
      <div>
        {!user ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="row">
            <UserAside {...user}/>
            <div className="col-12 col-md-6">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === 'posts'})}
                    onClick={() => {this.toggleTab('posts')}}
                  >
                    Posts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === 'following'})}
                    onClick={() => {this.toggleTab('following')}}
                  >
                    Following
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="posts">
                  <Row>
                    <Col sm="12">
                      <MessageList profilepage user={user} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="following">
                  <Row>
                    <Col sm="12">
                      <h4>You are not following anyone...</h4>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        )}
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    user: state.users
  };
}

export default connect(mapStateToProps, {fetchUser})(Profilepage);