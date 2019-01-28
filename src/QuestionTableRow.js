import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import QuestionTableAnswerCell from './QuestionTableAnswerCell';
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class QuestionTableRow extends Component {

  render() {
    return (
      <TableRow>
        <TableCell>
          <IconButton
              onClick={() => this.props.onDelete()}
              disabled={this.props.disabled}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <QuestionTableAnswerCell
              question_text={this.props.question.question_text}
              answer_index={this.props.question.correct_choice_index}
              answers={this.props.question.choices} />
        </TableCell>
      </TableRow>
    );
  }
}

export default QuestionTableRow;
