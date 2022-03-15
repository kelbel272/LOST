import React, { Component } from "react";
import {
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import MusicPlayer from "./MusicPlayer";


export default class SongPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={1}>
                 <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        This is the song page 
                    </Typography>
                 </Grid>
                 <MusicPlayer {...this.state.song} />
            
                <Grid item xs={12} align="center">
                    <Button>Back </Button>
                </Grid>
            </Grid>
       
        );
    }
}