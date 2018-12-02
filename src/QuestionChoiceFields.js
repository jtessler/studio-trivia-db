import Radio from '@material-ui/core/Radio';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import './QuestionChoiceFields.css';

class QuestionChoiceFields extends Component {
  render() {
    var choiceFields = this.props.choices.map((choice, i, choices) => (
      <ChoiceField
          key={i}
          disabled={this.props.disabled}
          onRadioChange={() => this.props.onChoiceSelect(i)}
          onTextChange={(event) => this.props.onChoiceTextChange(i, event)}
          value={choice}
          checked={this.props.correct_choice_index === i} />
    ));
    return (
      <div>
        { choiceFields }
      </div>
    );
  }
}

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

export default QuestionChoiceFields;
