import React, { Component } from 'react';
import * as Redux from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { resetPasswordThroughSocket } from '../../../web-mobile-common/access/authentication/actionGenerators';

export const ResetPassword = React.createClass({
    getInitialState: function() {
      return {
        resetPasswordError: '',
        newpasswordError: '',
        confirmError: ''
      };
    },
    checkPassword: function(e) {
      const inputValue = e.target.value;
      const checkVariable = e.target.getAttribute('data-check').toLowerCase();
      const errorVariable = checkVariable + 'Error';
      this.setState({
          [errorVariable]: inputValue === '' ? 'This field is required' : ''
      });
      if ((checkVariable === 'confirm' || checkVariable === 'newpassword' ) && this.refs.newpassword.value !== this.refs.confirm.value) {
        this.setState({
          confirmError: 'Passwords do not match'
        });
      } else {
        this.setState({
          confirmError: ''
        });
      }
    },
    onResetPassword() {
      const { newpasswordError, confirmError} = this.state;
      const { dispatch } = this.props;
      const { email, code } = this.props.location.query;
      if (newpasswordError === '' && confirmError === '' ) {
        dispatch(resetPasswordThroughSocket(email, code, this.refs.newpassword.value))
      }
    },
    render() {
        return (
            <div className="container">
                <div className="row main">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel-heading">
                            <div className="panel-title text-center">
                                <h1 className="title">Reset Password</h1>
                                <hr />
                            </div>
                        </div>
                        <div className="main-login main-center">
                            <form className="form-horizontal">
                              <div className="text-help">
                                {this.state.resetPasswordError}
                              </div>
                                <div className="form-group">
                                    <label htmlFor="newpassword" className="control-label">New Password</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.newpasswordError !== '' ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                            <input type="password" className="form-control" name="newpassword" id="newpassword" ref="newpassword" placeholder="Enter your new password" data-check="newpassword" ref="newpassword" onBlur={this.checkPassword} onChange={this.checkPassword} />
                                        </div>
                                        <div className="text-help">
                                          {this.state.newpasswordError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm" className="control-label">Confirm New Password</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.confirmError !== ''  ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                            <input type="password" className="form-control" name="confirm" id="confirm"  placeholder="Confirm your new password" data-check="confirm" ref="confirm" onBlur={this.checkPassword} onChange={this.checkPassword} />
                                        </div>
                                        <div className="text-help">
                                          {this.state.confirmError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group ">
                                    <button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={this.onResetPassword}>Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Redux.connect((state) => {
  return state;
}, { })(ResetPassword);
