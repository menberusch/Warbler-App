import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {updateUser} from '../store/actions/users'

class Settings extends Component {
  constructor(props) {
    super(props);
    const {username, email, name, birthday} = this.props.currentUser.user;
    this.state = {
      username, 
      email, 
      name: name ? name : '',
      birthday: birthday ? moment(birthday).format('YYYY-MM-DD') : ''
    };

    document.title = 'Warbler / Settings';
  }

  updateProfile = e => {
    e.preventDefault();
    const {id, username, email, name, birthday} = this.props.currentUser.user;
    const {
      username: newUsername, 
      email: newEmail, 
      name: newName,
      birthday: newBirthday
    } = this.state;
    let user_obj = {};

    if(username !== newUsername) user_obj.username = newUsername;
    if(email !== newEmail) user_obj.email = newEmail;
    if(name !== newName) user_obj.name = newName;
    if(birthday !== newBirthday) user_obj.birthday = newBirthday;
    if(!!Object.keys(user_obj).length) this.props.updateUser(id, user_obj);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {username, email, name, birthday} = this.state;
    return (
      <div>
        <h1>Edit your profile</h1>
        <form onSubmit={this.updateProfile}>
          <div className="form-group">
            <label htmlFor="edit_username">Username</label>
            <input 
              onChange={this.handleChange}
              value={username} 
              className="form-control" 
              type="text" 
              name="username" 
              id="edit_username" 
            />
            <small className="form-text text-muted">localhost:3000/{username}</small>
          </div>
          <div className="form-group">
            <label htmlFor="edit_email">Email</label>
            <input 
              onChange={this.handleChange}
              value={email} 
              className="form-control" 
              type="text" 
              name="email" 
              id="edit_email" 
            />
            <small className="form-text text-muted">Email will not be publicly displayed</small>
          </div>
          <div className="form-group">
            <label htmlFor="edit_name">Name</label>
            <input 
              onChange={this.handleChange}
              value={name} 
              className="form-control" 
              type="text" 
              name="name" 
              id="edit_name" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit_birthday">Birthday</label>
            <input 
              onChange={this.handleChange}
              value={birthday} 
              className="form-control" 
              name="birthday" 
              type="date" 
              id="edit_birthday"
            />
            <small className="form-text text-muted">This should be your date of birth</small>
          </div>
          <button type="submit" className="btn btn-primary">Save changes</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {updateUser})(Settings); 