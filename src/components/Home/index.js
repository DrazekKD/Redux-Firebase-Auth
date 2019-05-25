import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import { withFirebase } from '../Firebase';
import Words from '../Words';

class HomePage extends Component {
  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.props.onSetUsers(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        <h1>Translate</h1>
        <AuthUserContext.Consumer>
          {authUser => (
             <Words authUser={authUser}/>
          )}
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userState.users,
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
