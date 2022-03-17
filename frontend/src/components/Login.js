import React, { Component } from 'react';
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import Home from './Home';
import SongPage from './SongPage';
import Settings from './Settings';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom"


export default class Login extends Component {

    static defaultProps = {
        nightMode: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            nightMode: this.props.nightMode,
        }
        this.handleLoginButtonPressed = this.handleLoginButtonPressed.bind(this);
    }


    handleLoginButtonPressed() {
        // What happens when you press Login Room button 
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                night_mode: this.state.nightMode // Need to match what is in views.py
            }),
        };
        fetch("/api/create-home", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                //test for error (this.props.history <- shows undefined)
                console.log(this.props.history)
                //new code to redirect user
                window.location.href = '/home/' + data.code
                //old code
                //this.props.history.push("/home/" + data.code)
            }); //redirect user to room/roomcodenamehere
    }

    renderLoginPage() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    {/* DISPLAY HOUSE PARTY */}
                    <Typography variant="h3" compact="h3">
                        Life OST
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    {/* LOGIN BUTTON*/}
                    <Button color="secondary" variant="contained" onClick={this.handleLoginButtonPressed} >
                        Login
                    </Button>
                </Grid>
            </Grid>
        );
    }


    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        {this.renderLoginPage()}
                    </Route>
                    <Route path="/home" component={Home} />
                    <Route path="/song" component={SongPage} />
                    <Route path="/settings" component={Settings} />
                </Switch>
            </Router>
        );
    }
}