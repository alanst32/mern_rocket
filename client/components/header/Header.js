import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Label, Jumbotron } from 'react-bootstrap';
import ReactImage from "../../images/logo.svg";
import styles from './Header.css';

class Header extends React.Component {

    constructor(){
        super();

        this.state={
        }
    }

    render(){
        return(
            <header className="MERN TUTORIAL">
                <Jumbotron align="center" marginWidth="auto">
                    <img src={ReactImage} alt="react" width={150} height={100} />
                    <h1>Users list: <Label style={styles.labelStyle} bsStyle="info">{this.props.totalUsers}</Label></h1>
                </Jumbotron>
            </header>
        );
    }
}

export default Header;


