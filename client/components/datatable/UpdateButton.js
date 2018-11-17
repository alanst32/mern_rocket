import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Button, Glyphicon}  from 'react-bootstrap';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    UpdateButton: {
    },
    button: {
        margin: theme.spacing.unit,
        fontSize: 12
    },
});


class UpdateButton extends React.Component {

    constructor() {
        super();

        this.updateUser = this.updateUser.bind(this);
    }

    /**
     * Update user
     */
    updateUser() {
        axios.post(
            '/api/updateUser',
            JSON.stringify(this.props.row),
            {headers: { 'Content-Type': 'application/json' }}
        )
        .then( res => {
            this.getData(this);
        })
        .catch( err => {
            console.log(err)
        });
    }

    render(){
        const { classes } = this.props;

        return(
            <div className="UpdateButton">
                 <Button
                    size="medium"
                    className={classes.button}
                    variant="contained"
                    onClick={(event) => this.updateUser()}>
                    <Glyphicon glyph="glyphicon glyphicon-save" />
                    Save
                </Button>
            </div>
        );
    }
}

UpdateButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateButton);