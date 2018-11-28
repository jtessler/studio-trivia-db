import QuestionForm from './QuestionForm';
import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
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
  }

  handleSubmit(formData) {
    firebase.database().ref("/questions").push(formData);
  }

  render() {
    return (
      <div className="App">
        <QuestionForm
            onSubmit={data => this.handleSubmit(data)} />
      </div>
    );
  }
}

export default App;
