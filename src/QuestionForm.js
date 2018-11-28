import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import './QuestionForm.css';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      choices: new Array(4).fill(""),
      correct_choice: 0,
    };
  }

  isReadyToSubmit() {
    var hasText = (s) => s.trim().length > 0;
    return hasText(this.state.question) && this.state.choices.every(hasText);
  }

  handleClick() {
    this.props.onSubmit(this.state);
    this.setState({
      question: "",
      choices: new Array(4).fill(""),
      correct_choice: 0,
    });
  }

  renderChoiceFields() {
    return this.state.choices.map((choice, i, choices) => {
      var handleRadioChange = () => this.setState({ correct_choice: i });
      var handleTextChange = (e) => {
        choices[i] = e.target.value;
        this.setState({ choices: choices });
      };
      return (
        <ChoiceField
            key={i}
            onRadioChange={handleRadioChange}
            onTextChange={handleTextChange}
            value={choice}
            checked={this.state.correct_choice === i} />
      );
    });
  }

  render() {
    return (
      <div className="QuestionForm">
        <QuestionTextField
            value={this.state.question}
            onChange={(e) => this.setState({ question: e.target.value })} />

        { this.renderChoiceFields() }

        <SubmitButton
            disabled={!this.isReadyToSubmit()}
            onClick={() => this.handleClick()} />
      </div>
    );
  }
}

var QuestionTextField = (props) => (
  <div className="QuestionTextField">
    <TextField
        onChange={props.onChange}
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
        checked={props.checked}
        onChange={props.onRadioChange} />
    <TextField
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
