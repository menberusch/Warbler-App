import React, {Component} from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
    this.unlisten = props.history.listen(() => { 
      props.removeError();
      this.setState({
        email: '',
        username: '',
        password: ''
      });
      this.refs.password.value = '';
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? 'signup' : 'signin';
    this.props.onAuth(authType, this.state).then(() => {
      this.unlisten();
      this.props.history.push('/');
    }).catch((err) => {
      return;
    });
  }

  render() {
    const {email, username} = this.state;
    const {heading, buttonText, signUp, errors} = this.props;

    return(
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">Email:</label>
              <input 
                className="form-control" 
                id="email"
                name="email" 
                type="text" 
                onChange={this.handleChange} 
                value={email}
              />
              <label htmlFor="password">Password:</label>
              <input 
                className="form-control" 
                id="password"
                name="password" 
                type="password" 
                ref="password"
                onChange={this.handleChange}
              />
              {signUp && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input 
                    className="form-control" 
                    id="username"
                    name="username" 
                    type="text" 
                    onChange={this.handleChange} 
                    value={username}
                  />
                </div>
                )
              }
              <button type="submit" className="btn btn-primary btn-block btn-lg">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};