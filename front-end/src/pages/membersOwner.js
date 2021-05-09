import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Loading from "../components/loading";
import styles from "../styles/membersStyles";
import axios from "axios";
import members from "./members";
import { get_bearer, is_expired, set_authentication } from "../components/authentication.js";
import Logout from "../components/logout";


const MembersOwner = (props) => {
  let back_end_uri 
  back_end_uri = process.env.REACT_APP_BACK_END_URI
  let history = useHistory();
  let location = useLocation();
  let state = location.state;
  let group_id = state.id;
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [memberlist, setMemberlist] = useState(null);
  const [errors, setErrors] = useState("");
  const [refreshCount, setRefreshCount] = useState(0); //there's no actual need to keep track of the number of refreshes,
                                                       //but we just add this to the depencies array so we can refresh the page
                                                       //whenever a user is successfully kicked or banned.

  const handleBan = (member) => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    set_authentication(localStorage, axios);
    axios({
      method: "put",
      url: `${back_end_uri}/groups/add_to_ban/${group_id}/${member.name}/${get_bearer(localStorage)}`,
    })
      .then((res) => {
        console.log(
          `You have banned ${member.name}`
        );
        setRefreshCount(refreshCount + 1);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(member);
  };

  const handleKick = (member) => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    set_authentication(localStorage, axios);
    axios({
      method: "put",
      url: `${back_end_uri}/groups/kick_member/${group_id}/${member.name}/${get_bearer(localStorage)}`,
    })
      .then((res) => {
        console.log(
          `You have kicked ${member.name}`
        );
        setRefreshCount(refreshCount + 1);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(member);
  };

  const goToBanList = () => {
    return history.push({
      pathname: "bannedMembers",
      state: state,
    });
  };

  const goLastPage = () => {
    return history.push({
      pathname: "/groupMenuOwner",
      state: state,
    });
  };

  useEffect(() => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }

    axios(
      `${back_end_uri}/groups/get_members_and_owners/${group_id}/${get_bearer(
        localStorage
      )}`
    )
      .then((res) => {
        console.log("res=", res);
        let new_memberlist = [];
        res.data.members.forEach((member) => {
          new_memberlist.push({
            name: member,
            owner: res.data.owners.includes(member),
            self: res.data.requester === member,
          });
        });
        setMemberlist(new_memberlist);
        setuiLoading(false);
      })
      .catch((err) => {
        console.log("Error encountered in membersOwner.js");
        console.log(err);
      });
  }, [refreshCount]);

  if (uiLoading === true) {
    return <Loading />;
  } else {
    return (
      <div className={classes.body}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.root}>
            <div style={{ width: "200px", height: "70px" }}></div>
            <AppBar>
              <Toolbar className={classes.toolbar}>
                <Button
                  onClick={goLastPage}
                  startIcon={<ArrowBackIosIcon className={classes.back} />}
                ></Button>
                <Typography variant="h5" className={classes.heading}>
                  Member List
                </Typography>
                <Button
                  color="inherit"
                  onClick={() => {
                    setOpenConfirmLogout(!openConfirmLogout);
                  }}
                  className={classes.logout}
                >
                  Logout
                </Button>
                <div style={{ position: "absolute" }}>
                  <Logout
                    open={openConfirmLogout}
                    setOpen={setOpenConfirmLogout}
                  />
                </div>
              </Toolbar>
            </AppBar>
            <div className={classes.banListButtonContainer}>
              <Button
                color="secondary"
                variant="contained"
                onClick={goToBanList}
              >
                View Ban List
              </Button>
            </div>
            {memberlist.map((member, i) => (
              <Card
                key={i}
                fullWidth
                className={member.owner ? classes.cardsALT : classes.cards}
              >
                <CardContent className={classes.mainCard}>
                  <div className={classes.mainContainer}>
                    <Box>
                      <Avatar className={classes.avatar} variant="rounded" />
                    </Box>
                    <Box>
                      <Typography>
                        {member.self ? "You" : member.name}
                      </Typography>
                    </Box>

                    <Box className={classes.kickBanContainer}>
                      {!member.owner && (
                        <div>
                          <Button
                            className={classes.button}
                            color="primary"
                            size="small"
                            variant="contained"
                            onClick={() => handleKick(member)}
                          >
                            <Typography color="secondary">Kick</Typography>
                          </Button>
                          <Box>
                            <Button
                              className={classes.button}
                              color="primary"
                              size="small"
                              variant="contained"
                              onClick={() => handleBan(member)}
                            >
                              <Typography color="secondary">Ban</Typography>
                            </Button>
                          </Box>
                        </div>
                      )}
                    </Box>
                    {member.owner && (
                      <Box>
                        <Typography className={classes.ownerIndicator}>
                          O
                        </Typography>
                      </Box>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    );
  }
};

export default withStyles(styles)(MembersOwner);
