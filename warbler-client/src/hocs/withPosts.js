import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../store/actions/posts';
import {fetchUser} from '../store/actions/users';

export default function withPosts(ComponentToBeRendered, profilepage=false) {
  class PostsProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      }
    }

    async componentDidMount() {
      const {fetchUser, fetchPosts, currentUser, match} = this.props;

      if(profilepage) {
        if(currentUser.isAuthenticated) await fetchPosts();

        await fetchUser(match.params.username);
        this.setState({isLoading: false});

      } else if(currentUser.isAuthenticated){
        await fetchPosts();
        await fetchUser(currentUser.user.username);
        this.setState({isLoading: false});

      } else {
        this.setState({isLoading: false});
      }      
    };

    getUserPosts = (allPosts, user_id) => allPosts.filter(post => post.user._id === user_id)

    loadedProps = () => {
      const {currentUser, user, posts} = this.props;
      
      if(user.errorMsg) {
        return {errorMsg: user.errorMsg}
      } else if(profilepage) {
        let profilePageProps = {user, currentUser}; 

        if(currentUser.isAuthenticated) {
          let userPosts = this.getUserPosts(posts, user._id);
          profilePageProps.userPosts = userPosts;
          profilePageProps.postsCount = userPosts.length;

        } else {
          profilePageProps.userPosts = user.posts;
          profilePageProps.postsCount = user.posts.length;
        }

        return profilePageProps;

      } else if(currentUser.isAuthenticated) {
        return {
          currentUser,
          user,
          allPosts: posts,
          postsCount: this.getUserPosts(posts, user._id).length
        }

      } else {
        return {currentUser}
      }
    }

    componentWillUnmount() {
      this.setState({isLoading: true});
    };

    render() {
      const {isLoading} = this.state;
      let componentProps;

      if(!isLoading) componentProps = this.loadedProps();

      return(
        <div>
          {isLoading ? (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <ComponentToBeRendered 
              {...componentProps} 
            />
          )}
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      posts: state.posts,
      user: state.users
    }
  }

  return connect(mapStateToProps, {fetchUser, fetchPosts})(PostsProvider);
}