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
        await fetchUser(match.params.username);
        document.title = `@${this.props.user.username} | Warbler`;
        this.setState({isLoading: false});
        
      } else if(currentUser.isAuthenticated){
        await fetchPosts();
        await fetchUser(currentUser.user.username);
        this.setState({isLoading: false});

      } else {
        this.setState({isLoading: false});
      }      
    };

    loadedProps = () => {
      const {currentUser, user, posts} = this.props;

      if(profilepage) {
        return {
          user: user,
          userPosts: posts.filter(post => post.user._id === currentUser.user.id),
          postsCount: posts.length
        }
      } else if(currentUser.isAuthenticated) {
        return {
          isAuthenticated: currentUser.isAuthenticated,
          user: user,
          allPosts: posts,
          postsCount: posts.length
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