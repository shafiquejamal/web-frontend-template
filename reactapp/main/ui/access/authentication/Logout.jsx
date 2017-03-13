import React from 'react';
import * as Redux from 'react-redux';
import { logoutUser } from '../../../web-mobile-common/access/authentication/actionGenerators';

export const Logout = React.createClass({
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  },
  render() {
    return (
      <div className="container">
          <div className="row main">
              <div className="col-md-4 col-md-offset-4">
                <h1 className="title">Logged Out</h1>
                <p>You are now logged out.</p>
              </div>
          </div>
      </div>
    );
  }
});

export default Redux.connect((state) => { return state; })(Logout)
