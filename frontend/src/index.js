import App from './components/App';

import React, { Component } from "react";
import { render } from "react-dom";

export class index extends Component {
    render() {
        return (
            <div>
            <App>
            </App>
            <h1>Hello</h1>
            </div>
        )
    }
}

const container = document.getElementById("app");
render(<index />, container);
