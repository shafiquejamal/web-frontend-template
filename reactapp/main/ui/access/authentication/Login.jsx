import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { REGISTER_LINK, REGISTER_TEXT, REQUEST_RESET_PASSWORD_LINK, REQUEST_RESET_PASSWORD_TEXT, MANAGE_ACCOUNT_LINK, RESEND_ACTIVATION_LINK, RESEND_ACTIVATION_TEXT } from '../../../../routes';
import { logUserInThroughSocket } from '../../../web-mobile-common/access/authentication/actionGenerators';
import { emptyMapStateToProps } from '../../../web-mobile-common/common/misc.jsx';

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loginError: ''
      };

      this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { emailOrUsername, password } = this.refs;
    this.props.logUserInThroughSocket(emailOrUsername.value, password.value);
  }

  render() {
    return (
      <div className="container">
          <div className="row main">
              <div className="col-md-4 col-md-offset-4">
                  <div className="panel-heading">
                      <div className="panel-title text-center">
                          <h1 className="title">Login</h1>
                          <hr />
                      </div>
                  </div>
                  <div className="main-login main-center">
                      <form className="form-horizontal">
                          <div className="text-help">
                            {this.state.loginError}
                          </div>
                          <div className="form-group">
                              <label htmlFor="emailOrUsername" className="control-label">Your Email or Username</label>
                              <div className="cols-sm-10">
                                  <div className={`input-group`}>
                                      <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                                      <input type="text" className="form-control" name="emailOrUsername" id="emailOrUsername" ref="emailOrUsername"  placeholder="Enter your Email or Username" />
                                  </div>
                                  <div className="text-help">

                                  </div>
                              </div>
                          </div>

                          <div className="form-group">
                              <label htmlFor="password" className="control-label">Password</label>
                              <div className="cols-sm-10">
                                  <div className={`input-group`}>
                                      <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                      <input type="password" className="form-control" name="password" id="password" ref="password" placeholder="Enter your Password" />
                                  </div>
                                  <div className="text-help">

                                  </div>
                              </div>
                          </div>

                          <div className="form-group ">
                              <button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={this.onLogin}>Login</button>
                          </div>
                          <div className="login-register">
                              <p><Link to={REGISTER_LINK}>{REGISTER_TEXT}</Link></p>
                              <p><Link to={REQUEST_RESET_PASSWORD_LINK}>{REQUEST_RESET_PASSWORD_TEXT}</Link></p>
                              <p><Link to={RESEND_ACTIVATION_LINK}>{RESEND_ACTIVATION_TEXT}</Link></p>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    );

  }
}

export default connect(emptyMapStateToProps, { logUserInThroughSocket })(Login);
