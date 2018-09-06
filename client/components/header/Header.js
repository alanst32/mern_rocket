import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Label, Jumbotron } from 'react-bootstrap';
import ReactImage from "../../images/logo.svg";

class Header extends React.Component {

    constructor(){
        super();

        this.state={
            labelStyle:{
                'fontSize': '32px',
                'bold': true,
                'color': 'blue'
            }
        }
    }

    render(){
        return(
            <header className="MERN TUTORIAL">
                <Jumbotron align="center">
                    <img src={ReactImage} alt="react" width={150} height={100} />
                    <h1>Users list: <Label style={this.state.labelStyle} bsStyle="info">{this.props.totalUsers}</Label></h1>
                </Jumbotron>
            </header>
        );
    }
}

export default Header;


