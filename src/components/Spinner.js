import React, { Component } from "react";
import Loader from '../images/spinner.gif';

export default class Spinner extends Component {
    render() {
        return (
            <div>
                <img src={Loader} alt="loading" style={{width: "150px"}} />
            </div>
        )
    }
}