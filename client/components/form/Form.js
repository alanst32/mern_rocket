import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    divStyle: {
        display:'block',
        'text-align': 'left'
    },
    textField: {
        width: '400px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
})


class Form extends React.Component {

    constructor(){
        super();

        this.state={
            person: {
                firstName: '',
                lastName: '',
                country: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event): void {
        event.persist();

        console.log(event);

        this.setState((state) => state.person[event.target.id] = event.target.value);
    }

    render(){
        const { classes } = this.props;

        return(
            <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.divStyle}>
                    <TextField id="firstName" label="First name" className={classes.textField} value={this.state.firstName}
                               onChange={this.handleChange} margin="normal"/>
                </div>
                <div className={classes.divStyle}>
                    <TextField id="lastName" label="Last name" className={classes.textField} value={this.state.lastName}
                               onChange={this.handleChange} margin="normal"/>
                </div>
                <div className={classes.divStyle}>
                    <TextField id="country" label="Country" className={classes.textField} value={this.state.country}
                               onChange={this.handleChange} margin="normal"/>
                </div>
                <div>
                    <Button/>
                </div>
            </form>
        );
    }
}


Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
