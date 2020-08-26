
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
class TenentPage extends Component {

    render() {
 
    
        return (
          <p>Tenet Page</p>
        );
      }
}
const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });
  const condition = authUser => !!authUser;
export default compose(
  connect(mapStateToProps),
  withAuthorization(condition),
  withEmailVerification,
)(TenentPage);