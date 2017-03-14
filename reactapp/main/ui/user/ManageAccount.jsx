import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { CHANGE_PASSWORD_LINK, CHANGE_PASSWORD_TEXT, LOGOUT_ALL_DEVICES_LINK, LOGOUT_ALL_DEVICES_TEXT } from '../../../routes';

class ManageAccount extends Component {
  render() {
    return (
      <div className="container">
          <div className="row main">
              <div className="col-md-4 col-md-offset-4">
                  <div className="panel-heading">
                      <div className="panel-title text-center">
                          <h1 className="title">My Account</h1>
                          <hr />
                          <div className="cols-sm-10">
                            <div className="form-group">
                              <div className={`input-group`}>
                                <p>Username: {this.props.username}</p>
                                <p>Email: {this.props.email}</p>
                                <div className="login-register">
                                    <Link to={CHANGE_PASSWORD_LINK}>{CHANGE_PASSWORD_TEXT}</Link>
                                </div>
                                <div className="login-register">
                                    <Link to={LOGOUT_ALL_DEVICES_LINK}>{LOGOUT_ALL_DEVICES_TEXT}</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => {
    const { username, email } = authentication;
    return { username, email }
};

export default connect(mapStateToProps, { })(ManageAccount)
