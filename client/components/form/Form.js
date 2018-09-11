import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const styles = theme => ({
    divStyle: {
        display:'block',
        'text-align': 'left'
    },
    textField: {
        width: '400px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    datePicker: {
        width: '400px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    button: {
        margin: theme.spacing.unit,
        fontSize: 14
    }
})


class Form extends React.Component {

    constructor(){
        super();

        this.state={
            person: {
                firstName: '',
                lastName: '',
                country: '',
                dateBirth: moment()
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.persist();

        this.setState((state) => state.person[event.target.id] = event.target.value);
    }

    handleDateChange(date) {
        event.persist();

        this.setState((state) => state.person.dateBirth = date);
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
                <div className={classes.divStyle}>
                    Date of birth: 
                    <DatePicker selected={this.state.startDate} onChange={this.handleDateChange}/>
                </div>
                <div className={classes.divStyle}>
                    <Button className={classes.datePicker} variant="contained" size="small" className={classes.button}>
                        <SaveIcon className={classes.button} />
                        Save
                    </Button>
                </div>
            </form>
        );
    }
}


Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
