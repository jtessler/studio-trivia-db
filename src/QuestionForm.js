import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
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

  isReadyToSubmit() {
    var hasText = (text) => text.trim().length > 0;
    return hasText(this.state.question_text)
        && this.state.choices.every(hasText);
  }

  handleClick() {
    this.props.onSubmit(this.state);
    // Reset state to default values.
    this.setState({
      question_text: "",
      choices: new Array(4).fill(""),
      correct_choice_index: 0,
    });
  }

  renderChoiceFields() {
    return this.state.choices.map((choice, i, choices) => {
      var handleRadioChange = () => this.setState({ correct_choice_index: i });
      var handleTextChange = (event) => {
        choices[i] = event.target.value;
        this.setState({ choices: choices });
      };
      return (
        <ChoiceField
            key={i}
            disabled={this.props.disabled}
            onRadioChange={handleRadioChange}
            onTextChange={handleTextChange}
            value={choice}
            checked={this.state.correct_choice_index === i} />
      );
    });
  }

  render() {
    var handleTextChange = (event) => {
      this.setState({ question_text: event.target.value });
    };
    return (
      <div className="QuestionForm">
        <QuestionTextField
            disabled={this.props.disabled}
            value={this.state.question_text}
            onChange={handleTextChange} />

        { this.renderChoiceFields() }

        <SubmitButton
            disabled={this.props.disabled || !this.isReadyToSubmit()}
            onClick={() => this.handleClick()} />
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

var ChoiceField = (props) => (
  <div className="ChoiceField">
    <Radio
        disabled={props.disabled}
        checked={props.checked}
        onChange={props.onRadioChange} />
    <TextField
        disabled={props.disabled}
        value={props.value}
        onChange={props.onTextChange}
        className="ChoiceTextField"
        label="Enter an answer"
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
