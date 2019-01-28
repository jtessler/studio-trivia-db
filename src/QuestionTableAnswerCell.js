import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class QuestionTableAnswerCell extends Component {
  render() {
    if (this.props.answer_index < 0 ||
        this.props.answer_index >= this.props.answers.length) {
      console.error("Invalid answer choice index", this.props.answer_index);
      return <i>Error fetching answer</i>;
    }

    return (
      <ExpansionPanel style={{boxShadow: 'none'}}>

        <ExpansionPanelSummary
            style={{paddingLeft: 0}}
            expandIcon={<ExpandMoreIcon />}>
          {
            <Typography>
              {this.props.question_text}
            </Typography>
          }
        </ExpansionPanelSummary>

        <ExpansionPanelDetails
            style={{display: 'block', paddingLeft: 0}}>
          {
            this.props.answers
                .map((choice, i) => (
                  <Typography
                      variant="caption"
                      gutterBottom={true}
                      key={i}>
                    {i === this.props.answer_index ? (<b>{choice}</b>) : choice}
                  </Typography>
                ))
          }
        </ExpansionPanelDetails>

      </ExpansionPanel>
    );
  }
}

export default QuestionTableAnswerCell;
