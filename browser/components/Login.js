import React from 'react';
import { connect } from'react-redux';
import { browserHistory, Link } from 'react-router';
import { loginUser } from '../redux/login';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    console.log("props", this.props);
    return (
      <div className="signin-container">
        <div className="buffer local">
            <form onSubmit={this.onLoginSubmit}>
                <div className="form-group">
                  <label>email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    ref={(inputElement) => {this.state.email = inputElement}}
                    required
                  />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      ref={(inputElement) => {this.state.password = inputElement}}
                      required
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary">{message}</button>
            </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a target="_self"
               href="/auth/google"
               className="btn btn-social btn-google">
            <i className="fa fa-google"></i>
            <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    const { message } = this.props;
    event.preventDefault()
    this.props.login(this.state.email.value, this.state.password.value);

  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' })
const mapDispatch = (dispatch) => ({
  login: (email, password) => {
    return dispatch(loginUser(email, password))
  }
})

export default connect(mapState, mapDispatch)(Login);
