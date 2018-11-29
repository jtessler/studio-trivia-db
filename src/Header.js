import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography
              variant="h6"
              color="inherit"
              className="Title">
            Studio Trivia Database
          </Typography>

          <Button
              disabled={this.props.disabled}
              onClick={this.props.onAction}
              color="inherit">
            {this.props.actionLabel}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
