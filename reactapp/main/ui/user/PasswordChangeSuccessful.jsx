import React from 'react';
import { connect } from 'react-redux';

import { emptyMapStateToProps } from '../../web-mobile-common/common/misc.jsx';

export const PasswordChangeSuccessful = React.createClass({
  render() {
    return (
      <div className="container">
          <div className="row main">
              <div className="col-md-4 col-md-offset-4">
                <h1 className="title">Password Change Successful</h1>
                <p>Password successfully changed.</p>
              </div>
          </div>
      </div>
    );
  }
});

export default connect(emptyMapStateToProps, { })(PasswordChangeSuccessful)
