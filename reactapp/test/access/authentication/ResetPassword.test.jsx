var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import { ResetPassword } from '../../../main/ui/access/authentication/ResetPassword';

describe('ResetPassword', () => {

  it('should exist', () => {
    expect(ResetPassword).toExist();
  });

});
