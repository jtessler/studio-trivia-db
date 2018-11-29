import Header from './Header';
import QuestionForm from './QuestionForm';
import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

const AUTH_STATE = Object.freeze({
  LOADING: 0,
  SIGNED_IN: 1,
  SIGNED_OUT: 2,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: AUTH_STATE.LOADING,
    };
  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyADAYC7lX5QVEspv8BUeV2uDqrFle8yQpk",
      authDomain: "studio-trivia-db.firebaseapp.com",
      databaseURL: "https://studio-trivia-db.firebaseio.com",
      projectId: "studio-trivia-db",
      storageBucket: "studio-trivia-db.appspot.com",
      messagingSenderId: "736024037811"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        this.setState({ auth: AUTH_STATE.SIGNED_OUT });
      } else {
        this.setState({ auth: AUTH_STATE.SIGNED_IN });
      }
    });
  }

  handleSubmit(formData) {
    firebase.database().ref("/questions").push(formData);
  }

  handleHeaderAction() {
    switch (this.state.auth) {
      case AUTH_STATE.SIGNED_IN:
        firebase.auth().signOut();
        break;

      case AUTH_STATE.SIGNED_OUT:
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        break;

      default:
        console.warn("Invalid auth state", this.state.auth);
    }
  }

  getHeaderActionLabel() {
    switch (this.state.auth) {
      case AUTH_STATE.LOADING:
        return "Loading";

      case AUTH_STATE.SIGNED_IN:
        return "Sign out";

      case AUTH_STATE.SIGNED_OUT:
        return "Sign in";

      default:
        console.error("Invalid auth state", this.state.auth);
        return "Error";
    }
  }

  render() {
    return (
      <div>
        <Header
              disabled={this.state.auth === AUTH_STATE.LOADING}
              actionLabel={this.getHeaderActionLabel()}
              onAction={() => this.handleHeaderAction()}/>

        <div className="App">
          <QuestionForm
              disabled={this.state.auth !== AUTH_STATE.SIGNED_IN}
              onSubmit={data => this.handleSubmit(data)} />
        </div>
      </div>
    );
  }
}

export default App;
