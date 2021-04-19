import React, { useEffect, useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/icons/Close";

import styles from "../styles/errorStyles";
import { IconButton } from "@material-ui/core";

const Error = (props) => {
  const { classes } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = [props.error, props.setError];

  const handleClose = () => {
    setError("");
  };

  return (
    <div className={classes.root}>
      <div
        // onClose={handleEmptyField}
        // open={this.state.openEmptyField}
        style={
          error
            ? {
                display: "block",
                // zIndex: 9999,
                top: "700px",
              }
            : { display: "none" }
        }
      >
        <Collapse in={error}>
          <Alert
            // className={classes.alert}
            severity="error"
            open={true}
            // onClose={handleEmptyField}
          >
            <AlertTitle>Error</AlertTitle>
            <IconButton
              onClick={handleClose}
              className={classes.close}
              color="primary"
            >
              <CloseIcon />
            </IconButton>
            {error}
          </Alert>
        </Collapse>
      </div>
    </div>
  );
};
export default withStyles(styles)(Error);
