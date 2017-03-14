import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { requestPasswordResetCodeThroughSocket } from '../../../web-mobile-common/access/authentication/actionGenerators';
import { emptyMapStateToProps } from '../../../web-mobile-common/common/misc.jsx';

class RequestResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error: '',
        emailError: '',
        linkSentMessage: ''
    };

    this.onSendPasswordResetLink = this.onSendPasswordResetLink.bind(this);
  }

  onSendPasswordResetLink(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    this.props.requestPasswordResetCodeThroughSocket(email)
  }

  render() {
    return (
      <div className="container">
          <div className="row main">
              <div className="col-md-4 col-md-offset-4">
                  <div className="panel-heading">
                      <div className="panel-title text-center">
                          <h1 className="title">Send Password Reset Link</h1>
                          <hr />
                      </div>
                  </div>
                  <div className="main-login main-center">
                      <form className="form-horizontal">
                          <div className="text-help">
                            {this.state.error}
                          </div>
                          <div className="text-link-sent">
                            {this.state.linkSentMessage}
                          </div>
                          <div className="form-group">
                              <label htmlFor="email" className="control-label">Your Email</label>
                              <div className="cols-sm-10">
                                  <div className={`input-group`}>
                                      <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                                      <input type="text" className="form-control" name="email" id="email" ref="email"  placeholder="Enter your email address" />
                                  </div>
                                  <div className="text-help">
                                    {this.state.emailError}
                                  </div>
                              </div>
                          </div>

                          <div className="form-group ">
                              <button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={this.onSendPasswordResetLink}>Send Password Reset Link</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    );

  }
}

export default connect(emptyMapStateToProps, { requestPasswordResetCodeThroughSocket })(RequestResetPassword);
