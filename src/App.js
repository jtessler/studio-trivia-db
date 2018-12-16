import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Paper from '@material-ui/core/Paper';
import QuestionForm from './QuestionForm';
import QuestionTable from './QuestionTable';
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
      question_data: {},
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
        this.handleSignOut();
      } else {
        this.handleSignIn(user);
      }
    });
  }

  handleSignIn(user) {
    var ref = firebase.database().ref("/questions");
    ref.orderByChild("user_id").equalTo(user.uid).on("value", (snapshot) => {
      if (snapshot.exists()) {
        this.setState({ question_data: snapshot.val() });
      } else {
        this.setState({ question_data: [] });  // Default to an empty list.
      }
    });
    this.setState({ auth: AUTH_STATE.SIGNED_IN });
  }

  handleSignOut() {
    firebase.database().ref("/questions").off("value");
    this.setState({
      auth: AUTH_STATE.SIGNED_OUT,
      question_data: {},
    });
  }

  handleSubmit(formData) {
    firebase.database().ref("/questions").push({
      question_text: formData.question_text.trim(),
      choices: formData.choices.map(choice => choice.trim()),
      correct_choice_index: formData.correct_choice_index,
      user_id: firebase.auth().currentUser.uid,
    });
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

  handleDeleteQuestion(key) {
    firebase.database().ref("/questions").child(key).remove();
  }

  render() {
    return (
      <div className="App">
        <Header
            disabled={this.state.auth === AUTH_STATE.LOADING}
            actionLabel={this.getHeaderActionLabel()}
            onAction={() => this.handleHeaderAction()}/>

        <div className="Content">
          <Grid container spacing={16}>

            <Grid item xs={12} lg={4}>
              <Paper className="Container">
                <QuestionForm
                    disabled={this.state.auth !== AUTH_STATE.SIGNED_IN}
                    onSubmit={data => this.handleSubmit(data)} />
              </Paper>
            </Grid>

            <Grid item xs={12} lg={8}>
              <Paper className="Container">
                <QuestionTable
                    disabled={this.state.auth !== AUTH_STATE.SIGNED_IN}
                    onDeleteQuestion={(key) => this.handleDeleteQuestion(key)}
                    questions={this.state.question_data} />
              </Paper>
            </Grid>

          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
