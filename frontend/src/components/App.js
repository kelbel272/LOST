import React, { Component } from "react";
import { render } from "react-dom";
import Home from './Home';
import Login from './Login';
import SongPage from "./SongPage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div>
                <Login />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);