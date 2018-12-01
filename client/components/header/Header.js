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
            <header className={styles.header}>
                <Jumbotron className={styles.jumbotron}>
                        <img src={ReactImage} alt="react" width={150} height={100} />
                        <h1>Users list:</h1>
                        <Label className={styles.labelStyle} bsStyle="info">{this.props.totalUsers}</Label>
                </Jumbotron>
            </header>
        );
    }
}

export default Header;


