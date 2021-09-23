import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SignIn, SignOut } from '../actions';

class GoogleAuth extends Component {
  constructor() {
    super();
    this.onAuthChange = this.onAuthChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.renderSignInStatus = this.renderSignInStatus.bind(this);
  }
  
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '783895884194-naci0a893g3ojukhkmm2u06uiq4365vb.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(() => this.onAuthChange(this.auth.isSignedIn.get()));
      });
    });
  }

  onAuthChange(isSignedIn) {
    if(isSignedIn) {
      this.props.SignIn(this.auth.currentUser.get().getId());
    } else {
      this.props.SignOut();
    }
  }

  onSignIn () {
    this.auth.signIn();
  }

  onSignOut() {
    this.auth.signOut();
  }

  renderSignInStatus() {
    if(this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon"></i>
          Sign out
        </button>
    } else {
      return <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon"></i>
          Sign in with google
        </button>
    }
  }

  render() {
    return (
      <div>
        {this.renderSignInStatus()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(mapStateToProps, { SignIn, SignOut })(GoogleAuth);