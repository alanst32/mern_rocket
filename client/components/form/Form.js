import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import SaveIcon from '@material-ui/icons/Save';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const styles = theme => ({
    divStyle: {
        display:'block',
        'text-align': 'left',
        paddingTop: '25px',
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
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleChange(event) {
        event.persist();
        
        this.setState((state) => state.person[event.target.id] = event.target.value);
    }

    handleDateChange(date) {
        this.setState({ dateBirth: date });
    }

    render(){
        const { classes } = this.props;

        return(
            <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.divStyle}>
                    <Input required="true" id="firstName" placeholder="First Name" className={classes.textField} 
                         onChange={this.handleChange} />
                </div>
                <div className={classes.divStyle}>
                    <span>
                        <Input id="lastName" placeholder="Last Name" className={classes.textField} 
                            required={true} onChange={this.handleChange} />
                    </span>
                </div>
                <div className={classes.divStyle}>
                    <Input id="country" placeholder="Country" className={classes.textField} 
                            required={true} onChange={this.handleChange} />
                </div>
                <div className={classes.divStyle}>
                    <p></p>
                    <DatePicker id="dateBirth" placeholderText="Date of Birth" required={true} 
                        className={classes.datePicker} selected={this.state.dateBirth} onChange={this.handleDateChange}/>
                </div>
                <div className={classes.divStyle}>
                    <p></p>
                    <Button className={classes.button} variant="contained" size="small" className={classes.button}>
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
