import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

class QuestionTable extends Component {

  renderAnswerCell(question) {
    var correct_choice_index = question.correct_choice_index;
    if (correct_choice_index < 0 ||
        correct_choice_index >= question.choices.length) {
      console.error("Invalid answer choice index", question);
      return <i>Error fetching answer</i>;
    }

    var incorrect_choices = question.choices
        .filter((choice, i) => i !== correct_choice_index)
        .map((choice, i) => (
            <Typography
                variant="caption"
                gutterBottom={true}
                key={i}>
              {choice}
            </Typography>
        ));

    return (
      <ExpansionPanel style={{boxShadow: 'none'}}>

        <ExpansionPanelSummary
            style={{paddingLeft: 0}}
            expandIcon={<ExpandMoreIcon />}>
          {
            <Typography>
              {question.choices[correct_choice_index]}
            </Typography>
          }
        </ExpansionPanelSummary>

        <ExpansionPanelDetails
            style={{display: 'block', paddingLeft: 0}}>
          {incorrect_choices}
        </ExpansionPanelDetails>

      </ExpansionPanel>
    );
  }

  renderRows() {
    return Object.keys(this.props.questions).map((key) => {
      var question = this.props.questions[key];
      return (
        <TableRow key={key}>
          <TableCell>
            <Typography>{question.question_text}</Typography>
          </TableCell>
          <TableCell>{this.renderAnswerCell(question)}</TableCell>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Answers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.renderRows()}
        </TableBody>
      </Table>
    );
  }
}

export default QuestionTable;
