import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import PostList from '../containers/PostList';
import UserAside from './UserAside';

class Profilepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'posts'
    };
  };

  toggleTab(tab) {
    if(this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    };
  };
  
  render() {
    const {user, userPosts} = this.props;
    console.log(user);
    return(
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
                  <PostList user={user} posts={userPosts} />
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
    );
  };
};

export default Profilepage;