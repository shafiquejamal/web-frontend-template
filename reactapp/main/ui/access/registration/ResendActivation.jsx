import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import validator from 'validator';

import { resendActivationCodeThroughSocket } from '../../../web-mobile-common/access/activation/actionGenerators';
import { updateEmail, updateUsername } from '../../../web-mobile-common/access/authentication/actionGenerators';
import { LOGOUT_LINK } from '../../../../routes';

class ResendActivation extends Component {

    componentWillMount() {
        if (this.props.user) {
            hashHistory.push(LOGOUT_LINK)
        }

        this.checkEmail = this.checkEmail.bind(this);
    }

    componentDidMount() {
        this.refs.email.value = this.props.email;
    }

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
        if (this.state.emailError === '') {
            const email = this.refs.email.value;
            this.setState({ error: ''});
            this.props.resendActivationCodeThroughSocket(email);

        } else {
            this.setState({ error: 'Please fix error'});
        }
    }

    checkEmail(e) {
        const email = this.refs.email.value.trim();
        this.refs.email.value = email;
        if (email !== '' && !validator.isEmail(email)) {
            this.setState({ emailError: 'Must be a valid email address' });
        } else {
            this.props.updateEmail(email);
            this.setState({ emailError: '' });
        }
    }

  render() {
    return (
      <div className="container">
          <div className="row main">
              <div className="col-md-4 col-md-offset-4">
                  <div className="panel-heading">
                      <div className="panel-title text-center">
                          <h3 className="title">Re-send Activation Code</h3>
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
                                      <input type="text" className="form-control" name="email" id="email" ref="email"  placeholder="Enter your email address"  onChange={this.checkEmail} onBlur={this.checkEmail}  />
                                  </div>
                                  <div className="text-help">
                                    {this.state.emailError}
                                  </div>
                              </div>
                          </div>

                          <div className="form-group ">
                              <button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={this.onSendPasswordResetLink}>Re-send Activation Link</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    );

  }
}

const mapStateToProps = ({ authentication }) => {
    const { user, email } = authentication;
    return { user, email }
};

export default connect(mapStateToProps, { resendActivationCodeThroughSocket })(ResendActivation);
