import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removePost} from '../store/actions/posts';
import PostItem from '../components/PostItem';
import {fetchUser} from '../store/actions/users';

class PostList extends Component {

  render() {
    const {posts, user, removePost, currentUser, fetchUser} = this.props;

    const postList = posts.map(m => (
      <PostItem 
        key={m._id} 
        date={m.createAt}
        text={m.text}
        username={m.user.username ? m.user.username : user.username}
        profileImgUrl={m.user.profileImgUrl || !user ? m.user.profileImgUrl : user.profileImgUrl}
        removePost={()=>{
          removePost(m.user._id ? m.user._id : user._id, m._id);
          fetchUser(m.user.username ? m.user.username : user.username);
        }}
        isCurrentUser={m.user._id ? 
          currentUser.id === m.user._id 
          :
          currentUser.id === user._id}
      />
    ));

    return (
      <ul className="list-group w-100" id="posts">
        {postList}
      </ul>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user
  };
};

export default connect(mapStateToProps, {removePost, fetchUser})(PostList);