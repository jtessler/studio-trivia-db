import QuestionTableAnswerCell from './QuestionTableAnswerCell';
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

class QuestionTableRow extends Component {

  render() {
    return (
      <TableRow>
        <TableCell>
          <Typography>{this.props.question.question_text}</Typography>
        </TableCell>
        <TableCell>
          <QuestionTableAnswerCell
              answer_index={this.props.question.correct_choice_index}
              answers={this.props.question.choices} />
        </TableCell>
      </TableRow>
    );
  }
}

export default QuestionTableRow;
