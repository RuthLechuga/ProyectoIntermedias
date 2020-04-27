import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { Button } from '@material-ui/core';

export default class Vendedor_home extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render() {
        return (
            <Router>
                <div>
                    <br/>
                    <h2>GOT QUESTIONS?</h2>
                    <p>The easiest thing to do is post on
                    our <a href="http://forum.kirupa.com">forums</a>.
                    </p>
                    <Button color="secondary">Hello World</Button>
                </div>
            </Router>
        );
    }
}