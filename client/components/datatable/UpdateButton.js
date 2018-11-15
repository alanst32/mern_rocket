import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    UpdateButton: {
    },
    button: {
        margin: theme.spacing.unit,
        fontSize: 8
    },
});


class UpdateButton extends React.Component {

    constructor() {
        super();

        console.log('update button');

        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(userId) {
        console.log(this.props);
        console.log(userId);
    }

    render(){
        const { classes } = this.props;

        return(
            <div className="UpdateButton">
                <Button
                    className={classes.button}
                    variant="contained"
                    size="small"
                    onClick={(event) => this.updateUser(userId)}>
                    <SaveIcon className={classes.button} />
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