import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import Accordion from "@material-ui/core/Accordion";
import TextField from "@material-ui/core/TextField";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import styles from "../styles/playlistComponentStyles.js"

const pressButton = (event, added, setAdded) => {
    event.stopPropagation() //Prevents dropdown from opening when button is pressed
    setAdded(!added); 

    //In a later sprint (2 or 3), we should also actually add the playlist to the pool
}

const Playlist = (props) => {
    const playlist = props.playlist 
    const { classes } = props
    const [added, setAdded] = useState(false); //keeps track of whether the playlist has been added to the pool or not. 
    let buttonIcon;

    if (!added) { /*Icon must update depending on whether the playlist is added or not*/
        buttonIcon = <AddIcon color = 'secondary' />    
    } else {
        buttonIcon = <RemoveIcon color = 'secondary' />
    }

    console.log("playlist name: " , playlist.name)
    return (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.summaryContainer}>
                <div className ={classes.imageContainer}>
                    {/*This should be the playlist image pulled from Spotify*/}
                    <img className={classes.playlistImage} src ={playlist.images[0].url} alt ='playlist'/> 
                </div>
                <div className={classes.playlistNameContainer}>
                    {playlist.name}
                </div>
                <div className={classes.buttonContainer}>
                    <IconButton className={classes.button} color = "primary"  onFocus={(event) => event.stopPropagation()} onClick={(event) => pressButton(event, added, setAdded)}>
                        {buttonIcon} 
                    </IconButton>
                </div>
            </div>
        </AccordionSummary>
        <Divider />
        <AccordionDetails className={classes.accordionDetails}>
            <div className={classes.tracklistContainer}>
                {playlist.tracks.items.map((curSong) => (
                    <Song classes={classes} song={curSong} /> //Creates a song card for each song in the playlist
                ))}
            </div>
        </AccordionDetails>
    </Accordion>
    );
}

const Song = (props) => {
    const song = props.song;
    const classes = props.classes;
    return (
        <Card className={classes.songCard} variant="square">
            <Typography align="center" className={classes.songName}>
                {song.name}
            </Typography>
            <Typography align="center" className={classes.artistName}>
                {song.artists[0].name}
            </Typography>
        </Card>
    )
}

export default withStyles(styles)(Playlist);