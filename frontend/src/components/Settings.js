
import React, { Component } from 'react';
import Home from "./Home";
import { Button, Grid, Typography, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core"


export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nightMode: this.defaultTheme,
        };
        this.handleThemeChange = this.handleThemeChange.bind(this);
    }

    handleThemeChange(e) {
        this.setState({
            nightMode: e.target.value === "false" ? true : false,
        });
    }


    handleUpdateButtonPressed() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            night_mode: this.state.nightMode,
          }),
        };
        fetch("/api/update-home", requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data));
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Settings
                    </Typography>
                </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">Display Settings</div>
                    </FormHelperText>
                    <RadioGroup
                        row
                        defaultValue="true"
                        onChange={this.handleThemeChange}
                    >
                    <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        label="Day Mode"
                        labelPlacement="bottom"
                    />
                  < FormControlLabel
                        value="false"
                        control={<Radio color="secondary" />}
                        label="Night Mode"
                        labelPlacement="bottom"
                    />
                    </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
              <Button color="secondary" variant="contained" to="/">
                    Back
              </Button>
            </Grid>
          </Grid>
        );
    }

}

