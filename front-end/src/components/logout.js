import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  logout: {
    color: theme.palette.secondary.contrastText,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const Logout = (props) => {
  const [open, setOpen] = [props.open, props.setOpen];
  let history = useHistory();
  const { classes } = props;
  return (
    <Container>
      <Dialog open={open} disableBackdropClick={false}>
        <DialogTitle id="alert-dialog-title">{"Logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => history.push("/")} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default withStyles(styles)(Logout);
