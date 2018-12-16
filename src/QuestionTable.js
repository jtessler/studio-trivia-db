import QuestionTableRow from './QuestionTableRow';
import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class QuestionTable extends Component {

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
          {
            Object.keys(this.props.questions).map((key) => (
              <QuestionTableRow
                  key={key}
                  question={this.props.questions[key]} />
            ))
          }
        </TableBody>
      </Table>
    );
  }
}

export default QuestionTable;
