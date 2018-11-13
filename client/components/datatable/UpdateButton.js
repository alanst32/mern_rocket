import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        fontSize: 10
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
        const { userId } = this.props;

        return(
            <Button
                className={classes.button}
                variant="contained"
                size="small"
                onClick={(event) => this.updateUser(userId)}>
                <SaveIcon className={classes.button} />
                Save
            </Button>
        );
    }
}

UpdateButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateButton);