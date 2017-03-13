import React from 'react';
import { connect } from 'react-redux';

import { activateUserThroughSocket } from '../../../web-mobile-common/access/activation/actionGenerators';
import { emptyMapStateToProps } from '../../../web-mobile-common/common/misc.jsx';

export const Activate = React.createClass({
  componentWillMount() {
    const { email, code } = this.props.location.query;
    this.props.activateUserThroughSocket(email, code)
  },
  render() {
    return (
        <div className="container">
          <div className="row main">
            <div className="col-md-4 col-md-offset-4">
              <h1 className="title">Activation Successful</h1>
              <p>Please log in to your account to continue.</p>
            </div>
          </div>
        </div>
    );
  }
});

export default connect(emptyMapStateToProps, { activateUserThroughSocket })(Activate);
