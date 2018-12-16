import Radio from '@material-ui/core/Radio';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import './QuestionChoiceFields.css';

class QuestionChoiceFields extends Component {
  render() {
    return (
      <div>
        {
          this.props.choices.map((choice, i, choices) => (
            <div
                key={i}
                className="ChoiceField">
              <Radio
                  disabled={this.props.disabled}
                  checked={this.props.correct_choice_index === i}
                  onChange={() => this.props.onChoiceSelect(i)} />
              <TextField
                  disabled={this.props.disabled}
                  value={choice}
                  onChange={event => this.props.onChoiceTextChange(i, event)}
                  className="ChoiceTextField"
                  label="Enter an answer"
                  variant="outlined" />
            </div>
          ))
        }
      </div>
    );
  }
}

export default QuestionChoiceFields;
