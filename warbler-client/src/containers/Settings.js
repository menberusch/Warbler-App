import React, {Component} from 'react';

class Settings extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    document.title = 'Warbler / Settings';
  }
  render() {
    return (
      <div>
        <h1>Edit your profile</h1>
        <form>
          <div className="form-group">
            <label htmlFor="edit_username">Username</label>
            <input className="form-control" type="text" id="edit_username" />
            <small className="form-text text-muted">localhost:3000/yourusername</small>
          </div>
          <div className="form-group">
            <label htmlFor="edit_email">Email</label>
            <input className="form-control" type="text" id="edit_email" />
            <small className="form-text text-muted">Email will not be publicly displayed</small>
          </div>
          <div className="form-group">
            <label htmlFor="edit_name">Name</label>
            <input className="form-control" type="text" id="edit_name" />
          </div>
          <div className="form-group">
            <label htmlFor="edit_birthday">Birthday</label>
            <input className="form-control" type="date" id="edit_birthday"/>
            <small className="form-text text-muted">This should be your date of birth</small>
          </div>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </form>
      </div>
    )
  }
}

export default Settings; 