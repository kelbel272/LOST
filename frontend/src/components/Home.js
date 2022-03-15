import React, { Component } from 'react';
import { Button, Grid, Typography, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import MusicPlayer from './MusicPlayer';
import Login from './Login';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nightMode: false,
            spotifyAuthenticated: false,
        };
       
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.homeCode = this.props.match.params.homeCode;
        this.getHomeDetails = this.getHomeDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getHomeDetails();  //Update the states
    }

    // Get Details for the Users Home Page 
    getHomeDetails() {
        fetch('/api/get-home' + '?code=' + this.homeCode).then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                nightMode: data.night_mode,
                isUser: data.is_user,
            });
            this.authenticateSpotify();
        });
    }

    //Ask if current user is authenticated 
    authenticateSpotify() {
        fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then((data) => {
                this.setState({spotifyAuthenticated: data.status })
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                    .then((response) => response.json())
                    .then((data) => {
                        window.location.replace(data.url);
                    });
                }
        });
    }

    //Display info on the home page 
    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {this.homeCode}
                    </Typography>
                </Grid>
                <MusicPlayer {...this.state.song} />
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                    >
                        Log Out
                    </Button>
                </Grid>
          </Grid>
        );
    }
}