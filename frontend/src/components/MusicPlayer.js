import React, { Component } from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }

    skipSong() {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('/spotify/skip', requestOptions);
    }


    pauseSong() {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/pause", requestOptions);
    }

    playSong() {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/play", requestOptions);
    }

    render() {
        const songProgress = (this.props.time / this.props.duration) * 100;

        // USE THIS TO COMMENT INSIDE RENDER BLOCK >>>>>> {/* THIS ONE IS A VALID COMMENT */}
        return (
            <Card>
                <Grid container alignItems="center">
                    {/* DISPLAY ALBUM COVER*/}
                    <Grid item align="center" xs={4}>
                        <img src={this.props.image_url} height="100%" width="100%" /> 
                    </Grid>
                    <Grid item align="center" xs={8}>
                        {/* DISPLAY SONG TITLE*/}
                        <Typography component="h5" variant="h5">
                            {this.props.title}
                        </Typography>
                        {/* DISPLAY ARTIST(S)*/}
                        <Typography color="textSecondary" variant="subtitle1">
                            {this.props.artist}
                        </Typography>
                        <div>
                            {/* DISPLAY PAUSE OR PLAY BUTTON*/}
                                {/* IF SONG IS PLAYING, SHOW PauseIcon*/}
                                    {/* CALL pauseSong() WHEN CLICKED*/}
                                {/* IF SONG IS PAUSED, SHOW PlayArrowIcon*/}
                                    {/* CALL playSong() WHEN CLICKED*/}
                            <IconButton
                                onClick={() => {
                                    this.props.is_playing ? this.pauseSong() : this.playSong(); 
                                }}
                            >
                                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                            </IconButton>
                            {/* DISPLAY SKIP BUTTON */}
                            {/* CALL skipSong() WHEN CLICKED*/}
                            <IconButton onClick={() => this.skipSong()}> 
                                <SkipNextIcon />  {/* SKIP BUTTON */}
                                {/* DISPLAY # of CURRENT VOTES & VOTES REQUIRED TO SKIP SONG */}
                                {this.props.votes} / {" "}
                                {this.props.votes_required}
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                 {/* SHOW LINEAR PROGRESS BAR FOR SONG UNTIL FINISHED */}
                <LinearProgress variant="determinate" value={songProgress} />
            </Card>
        );
    }
}