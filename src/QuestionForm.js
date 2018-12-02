import Button from '@material-ui/core/Button';
import QuestionChoiceFields from './QuestionChoiceFields';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import './QuestionForm.css';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question_text: "",
      choices: new Array(4).fill(""),
      correct_choice_index: 0,
    };
  }

  handleQuestionTextChange(event) {
    this.setState({ question_text: event.target.value });
  }

  handleChoiceSelect(i) {
    if (i < 0 || i >= this.state.choices.length) {
      console.error("Invalid question choice index for selection", i);
    } else {
      this.setState({ correct_choice_index: i });
    }
  }

  handleChoiceTextChange(i, event) {
    if (i < 0 || i >= this.state.choices.length) {
      console.error("Invalid question choice index for text change", i);
    } else {
      var choices = Array.from(this.state.choices);
      choices[i] = event.target.value;
      this.setState({ choices: choices });
    }
  }

  isReadyToSubmit() {
    var hasText = (text) => text.trim().length > 0;
    return hasText(this.state.question_text)
        && this.state.choices.every(hasText);
  }

  handleSubmitButtonClick() {
    this.props.onSubmit(this.state);
    // Reset state to default values.
    this.setState({
      question_text: "",
      choices: new Array(4).fill(""),
      correct_choice_index: 0,
    });
  }

  render() {
    return (
      <div className="QuestionForm">
        <QuestionTextField
            disabled={this.props.disabled}
            value={this.state.question_text}
            onChange={(event) => this.handleQuestionTextChange(event)} />

        <QuestionChoiceFields
            disabled={this.props.disabled}
            choices={this.state.choices}
            correct_choice_index={this.state.correct_choice_index}
            onChoiceSelect={(i) => this.handleChoiceSelect(i)}
            onChoiceTextChange={
              (i, event) => this.handleChoiceTextChange(i, event)
            } />

        <SubmitButton
            disabled={this.props.disabled || !this.isReadyToSubmit()}
            onClick={() => this.handleSubmitButtonClick()} />
      </div>
    );
  }
}

var QuestionTextField = (props) => (
  <div className="QuestionTextField">
    <TextField
        onChange={props.onChange}
        disabled={props.disabled}
        value={props.value}
        label="Enter a question"
        fullWidth={true}
        multiline={true}
        variant="outlined" />
  </div>
);

var SubmitButton = (props) => (
  <div className="SubmitButton">
    <Button
        onClick={props.onClick}
        disabled={props.disabled}
        variant="contained"
        size="large"
        fullWidth={true}
        color="primary">
      Submit
    </Button>
  </div>
)

export default QuestionForm;
